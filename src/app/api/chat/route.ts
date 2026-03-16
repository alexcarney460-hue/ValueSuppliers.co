import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are a helpful assistant for ValueSuppliers.co, a professional commercial and industrial disposable glove supplier. Keep answers concise and friendly.

PRODUCTS:
- Nitrile gloves: 5mil blue (100/case), 5mil black (100/case), exam grade nitrile, XL nitrile
- Latex: exam gloves (100/box)
- Vinyl: clear vinyl gloves (100/box)
- Available sizes: XS, S, M, L, XL, XXL

PRICING TIERS:
- Retail: standard case pricing, buy online at /catalog
- Wholesale: 20% off, minimum order $500, apply at /wholesale
- Distribution: 30% off, minimum order $2,000, apply at /distribution

AFFILIATE PROGRAM:
- Commission tiers: Starter 10% ($0–$10k), Growth 12% ($10k–$25k), Pro 15% ($25k–$75k), Elite 18% ($75k–$150k), Apex 20% ($150k+)
- NET-7 payouts for Elite & Apex
- Apply at /affiliate

INDUSTRIES SERVED:
- Food service, medical & dental, janitorial, automotive, laboratory, safety & compliance, industrial manufacturing

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
