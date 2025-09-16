import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { payload } = await req.json().catch(() => ({}));

  if (payload !== "ON" && payload !== "OFF") {
    return NextResponse.json(
      { ok: false, error: 'payload deve ser "ON" ou "OFF"' },
      { status: 400 }
    );
  }

  const apiBase  = process.env.EMQX_API_BASE;
  const appId    = process.env.EMQX_APP_ID;
  const appSecret= process.env.EMQX_APP_SECRET;
  const topic    = process.env.TOPIC_LED || "alimentador/ESP32-Alimentador/led";

  if (!apiBase || !appId || !appSecret) {
    return NextResponse.json({ ok: false, error: "Env faltando" }, { status: 500 });
    }

  const auth = "Basic " + Buffer.from(`${appId}:${appSecret}`).toString("base64");

  const r = await fetch(`${apiBase}/publish`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: auth },
    body: JSON.stringify({ topic, qos: 1, retain: false, payload }),
  });

  const text = await r.text();
  if (!r.ok) return new NextResponse(text, { status: r.status });

  return NextResponse.json({ ok: true });
}
