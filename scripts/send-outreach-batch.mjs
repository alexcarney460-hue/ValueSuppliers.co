#!/usr/bin/env node
/**
 * Batch outreach email sender — reads from master CSV, sends via Resend.
 *
 * Sends personalized plain-text emails to cannabis/hemp leads.
 * Tracks sent/bounced/unsubscribed in a local JSONL log.
 *
 * Usage:
 *   RESEND_API_KEY=xxx node scripts/send-outreach-batch.mjs                    # Send 200 (default daily batch)
 *   RESEND_API_KEY=xxx node scripts/send-outreach-batch.mjs --limit 500        # Send 500
 *   RESEND_API_KEY=xxx node scripts/send-outreach-batch.mjs --state CA         # CA only
 *   RESEND_API_KEY=xxx node scripts/send-outreach-batch.mjs --template lab     # Use lab template
 *   RESEND_API_KEY=xxx node scripts/send-outreach-batch.mjs --dry-run          # Preview only
 *   RESEND_API_KEY=xxx node scripts/send-outreach-batch.mjs --preview          # Show email for first lead
 */

import { readFileSync, writeFileSync, appendFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const MASTER_CSV = join(__dirname, '..', 'cannabis-hemp-grows-2026-03-17.csv');
const SENT_LOG = join(__dirname, '..', 'tmp', 'outreach-sent.jsonl');
const UNSUB_FILE = join(__dirname, '..', 'tmp', 'unsubscribed.txt');

const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const DRY_RUN = process.argv.includes('--dry-run');
const PREVIEW = process.argv.includes('--preview');
const LIMIT_IDX = process.argv.indexOf('--limit');
const LIMIT = LIMIT_IDX !== -1 ? parseInt(process.argv[LIMIT_IDX + 1], 10) : 200;
const STATE_IDX = process.argv.indexOf('--state');
const ONLY_STATE = STATE_IDX !== -1 ? process.argv[STATE_IDX + 1]?.toUpperCase() : null;
const TPL_IDX = process.argv.indexOf('--template');
const FORCE_TEMPLATE = TPL_IDX !== -1 ? process.argv[TPL_IDX + 1] : null;

const FROM = 'Value Suppliers <grow@mail.valuesuppliers.co>';
const UNSUB_BASE = 'https://valuesuppliers.co/api/unsubscribe';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------------------------------------------------------------------------
// CSV parser
// ---------------------------------------------------------------------------

function parseCSV(text) {
  const lines = text.split('\n');
  const headers = parseCSVLine(lines[0]);
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const values = parseCSVLine(lines[i]);
    const row = {};
    for (let j = 0; j < headers.length; j++) row[headers[j]] = values[j] || '';
    rows.push(row);
  }
  return { headers, rows };
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) { result.push(current); current = ''; }
    else current += ch;
  }
  result.push(current);
  return result;
}

// ---------------------------------------------------------------------------
// Templates
// ---------------------------------------------------------------------------

function buildEmail(lead, template) {
  const firstName = (lead.Owner || lead.Name || '').split(/[,\s]/)[0] || 'there';
  const company = lead.Name || '';
  const loc = [lead.City, lead.County ? `${lead.County} County` : '', lead.State].filter(Boolean).join(', ');
  const unsubUrl = `${UNSUB_BASE}?email=${encodeURIComponent(lead.Email)}`;

  const templates = {
    intro: {
      subject: `gloves for ${company}?`,
      body: `Hey ${firstName},

Saw you guys are licensed in ${loc}.

We supply 5 mil nitrile gloves at $60-80/case (1,000 gloves per case) — most grows and labs in ${lead.State} are restocking with us monthly.

Would it make sense to send you a sample case?

— Alex
Value Suppliers
orders@valuesuppliers.co
valuesuppliers.co`,
    },
    lab: {
      subject: `lab gloves for ${company}?`,
      body: `Hey ${firstName},

Noticed ${company} is a licensed testing lab in ${loc}.

We supply exam-grade 5 mil nitrile gloves — ASTM certified, powder-free, XS through XXL. Case pricing starts at $80/case (1,000 gloves), wholesale $70 for 30+ cases.

Most labs we work with restock monthly. Want me to send pricing for your volume?

— Alex
Value Suppliers
orders@valuesuppliers.co`,
    },
    distributor: {
      subject: `glove supply for ${company}`,
      body: `Hey ${firstName},

${company} showed up on our radar as a licensed distributor in ${lead.State}.

If you're moving product that needs PPE — we do distribution pricing at $60/case (120+ cases) with NET 30 terms. 5 mil nitrile, case of 1,000.

Worth a conversation?

— Alex
Value Suppliers
orders@valuesuppliers.co`,
    },
    manufacturer: {
      subject: `PPE for ${company}?`,
      body: `Hey ${firstName},

Running a licensed manufacturing operation in ${loc} means your team goes through gloves fast.

We supply 5 mil nitrile at case pricing — $80 retail, $70 wholesale (30+ cases), $60 distribution (120+). 1,000 gloves per case, ships same week.

Want me to put together a quote based on your volume?

— Alex
Value Suppliers
orders@valuesuppliers.co`,
    },
  };

  const t = templates[template] || templates.intro;
  const footer = `\n\n---\nTo stop receiving these emails: ${unsubUrl}`;

  return {
    subject: t.subject,
    text: t.body + footer,
    html: `<pre style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:14px;line-height:1.7;color:#1a1a1a;white-space:pre-wrap;max-width:600px;">${t.body.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre><p style="font-size:11px;color:#999;margin-top:32px;"><a href="${unsubUrl}" style="color:#999;">Unsubscribe</a> · Value Suppliers, 1401 N Clovis Ave STE #103, Clovis, CA 93727</p>`,
    unsubUrl,
  };
}

function pickTemplate(lead) {
  if (FORCE_TEMPLATE) return FORCE_TEMPLATE;
  const type = (lead['License Type'] || '').toUpperCase();
  if (type.includes('LAB') || type.includes('TEST')) return 'lab';
  if (type.includes('DISTRIBUT') || type.includes('WHOLESALE')) return 'distributor';
  if (type.includes('MANUFACTUR') || type.includes('PROCESSOR') || type.includes('INFUSE')) return 'manufacturer';
  return 'intro';
}

// ---------------------------------------------------------------------------
// Resend sender
// ---------------------------------------------------------------------------

async function sendViaResend(to, emailData) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM,
      to,
      subject: emailData.subject,
      text: emailData.text,
      html: emailData.html,
      headers: {
        'List-Unsubscribe': `<${emailData.unsubUrl}>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      },
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);
  return data;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log(`\n${'='.repeat(60)}`);
  console.log('VALUE SUPPLIERS — Outreach Batch Sender');
  console.log(`${'='.repeat(60)}`);
  console.log(`  Mode: ${DRY_RUN ? 'DRY RUN' : PREVIEW ? 'PREVIEW' : 'LIVE'}`);
  console.log(`  Limit: ${LIMIT}`);
  console.log(`  State: ${ONLY_STATE || 'ALL'}`);
  console.log(`  Template: ${FORCE_TEMPLATE || 'auto'}`);
  if (!RESEND_API_KEY && !DRY_RUN && !PREVIEW) {
    console.error('\n  ERROR: RESEND_API_KEY not set');
    process.exit(1);
  }

  // Load already-sent emails
  const sentEmails = new Set();
  if (existsSync(SENT_LOG)) {
    const lines = readFileSync(SENT_LOG, 'utf-8').split('\n').filter(Boolean);
    for (const line of lines) {
      try { sentEmails.add(JSON.parse(line).email); } catch {}
    }
  }

  // Load unsubscribed
  const unsubs = new Set();
  if (existsSync(UNSUB_FILE)) {
    readFileSync(UNSUB_FILE, 'utf-8').split('\n').filter(Boolean).forEach((e) => unsubs.add(e.trim().toLowerCase()));
  }

  console.log(`  Already sent: ${sentEmails.size}`);
  console.log(`  Unsubscribed: ${unsubs.size}`);

  // Read CSV
  const { rows } = parseCSV(readFileSync(MASTER_CSV, 'utf-8'));

  // Filter to sendable leads
  const targets = rows.filter((r) => {
    if (!r.Email?.trim()) return false;
    if (sentEmails.has(r.Email.toLowerCase())) return false;
    if (unsubs.has(r.Email.toLowerCase())) return false;
    if (ONLY_STATE && r.State !== ONLY_STATE) return false;
    // Skip generic/junk emails
    const email = r.Email.toLowerCase();
    if (email.includes('noreply') || email.includes('no-reply') || email.includes('donotreply')) return false;
    if (email.endsWith('.gov') || email.endsWith('.edu')) return false;
    return true;
  }).slice(0, LIMIT);

  console.log(`  Sendable leads: ${targets.length}\n`);

  if (PREVIEW) {
    const lead = targets[0];
    if (!lead) { console.log('  No leads to preview'); return; }
    const tpl = pickTemplate(lead);
    const email = buildEmail(lead, tpl);
    console.log(`TO: ${lead.Email}`);
    console.log(`SUBJECT: ${email.subject}`);
    console.log(`TEMPLATE: ${tpl}`);
    console.log(`${'─'.repeat(50)}`);
    console.log(email.text);
    return;
  }

  if (DRY_RUN) {
    for (const t of targets.slice(0, 20)) {
      console.log(`  [${pickTemplate(t)}] ${t.Email} — ${t.Name}, ${t.City} ${t.State}`);
    }
    if (targets.length > 20) console.log(`  ... and ${targets.length - 20} more`);
    return;
  }

  // Send
  let sent = 0;
  let failed = 0;

  for (let i = 0; i < targets.length; i++) {
    const lead = targets[i];
    const tpl = pickTemplate(lead);
    const emailData = buildEmail(lead, tpl);

    try {
      await sendViaResend(lead.Email, emailData);
      sent++;
      process.stdout.write(`  [${sent}] ✓ ${lead.Email}\n`);

      // Log to JSONL
      appendFileSync(SENT_LOG, JSON.stringify({
        email: lead.Email.toLowerCase(),
        name: lead.Name,
        state: lead.State,
        template: tpl,
        subject: emailData.subject,
        timestamp: new Date().toISOString(),
      }) + '\n');

    } catch (err) {
      failed++;
      console.log(`  [${i + 1}] ✗ ${lead.Email} — ${err.message}`);

      // Log failure
      appendFileSync(SENT_LOG, JSON.stringify({
        email: lead.Email.toLowerCase(),
        status: 'failed',
        error: err.message,
        timestamp: new Date().toISOString(),
      }) + '\n');

      // If rate limited, back off
      if (err.message?.includes('429') || err.message?.includes('rate')) {
        console.log('  Rate limited — waiting 60s...');
        await sleep(60000);
      }
    }

    // Pace: ~3 emails/second (well under Resend limits)
    await sleep(350);

    if ((i + 1) % 50 === 0) {
      console.log(`\n  --- Progress: ${sent} sent, ${failed} failed, ${targets.length - i - 1} remaining ---\n`);
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log('BATCH COMPLETE');
  console.log(`${'='.repeat(60)}`);
  console.log(`  Sent: ${sent}`);
  console.log(`  Failed: ${failed}`);
  console.log(`  Total in sent log: ${sentEmails.size + sent}`);
  console.log(`${'='.repeat(60)}\n`);
}

main().catch((err) => { console.error('Fatal:', err); process.exit(1); });
