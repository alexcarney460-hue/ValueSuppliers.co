import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are a helpful assistant for ValueSuppliers.co, a professional supplier of disposable gloves and cannabis trimming supplies. Keep answers concise and friendly.

PRODUCTS:
- Nitrile gloves: 5mil blue (100/case), 5mil black (100/case), exam grade nitrile
- Latex: exam gloves (100/box)
- Vinyl: clear vinyl gloves (100/box)
- Cannabis trimming: premium scissors, trimming trays, trim bins, extraction supplies
- Available sizes: XS, S, M, L, XL

PRICING TIERS:
- Retail: $80/case ($8/box), 1–29 cases, buy online at /catalog
- Wholesale: $70/case ($7/box), save $10/case off retail, minimum 30 cases, apply at /wholesale
- Distribution: $60/case ($6/box), save $20/case off retail, minimum 120 cases, NET 30 available, apply at /distribution

AFFILIATE PROGRAM:
- Commission tiers: Starter 10% ($0–$10k), Growth 12% ($10k–$25k), Pro 15% ($25k–$75k), Elite 18% ($75k–$150k), Apex 20% ($150k+)
- NET-7 payouts for Elite & Apex
- Apply at /affiliate

SERVICES:
- On-site trimming services available
- Custom orders and bulk sourcing
- Contact for custom branding

CONTACT:
- Email: orders@valuesuppliers.co
- Website: valuesuppliers.co

Always be helpful and direct. If asked about something outside your knowledge, direct them to orders@valuesuppliers.co. Do not make up prices or product specs not listed above.`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body?.messages;

    if (!Array.isArray(messages)) {
      return Response.json({ error: 'Bad Request: expected { messages: [...] }' }, { status: 400 });
    }

    const response = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '';

    return Response.json({
      choices: [{ message: { role: 'assistant', content: text } }],
    });
  } catch (err: unknown) {
    console.error('[/api/chat] error:', err);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
