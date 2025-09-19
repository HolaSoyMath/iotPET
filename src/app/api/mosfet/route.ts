/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { payload } = await req.json().catch(() => ({}));

  // botão manda "ON"/"OFF"; vamos só agir no "ON"
  if (payload !== "ON" && payload !== "OFF") {
    return NextResponse.json({ ok: false, error: 'payload deve ser "ON" ou "OFF"' }, { status: 400 });
  }

  const apiBase   = process.env.EMQX_API_BASE;   // ex.: https://<host>:8443/api/v5
  const appId     = process.env.EMQX_APP_ID;
  const appSecret = process.env.EMQX_APP_SECRET;

  const topicCmd  = process.env.TOPIC_CMD || "alimentador/ESP32-Alimentador/cmd";
  const topicLed = process.env.TOPIC_LED || "alimentador/ESP32-Alimentador/mosfet";

  if (!apiBase || !appId || !appSecret) {
    return NextResponse.json({ ok:false, error:"Env faltando (EMQX_API_BASE/ID/SECRET)" }, { status:500 });
  }

  const base = apiBase.replace(/\/+$/, "");
  const url  = `${base}/publish`;
  const auth = "Basic " + Buffer.from(`${appId}:${appSecret}`).toString("base64");

  // Se ON -> manda comando de feed no /cmd; se OFF -> manda OFF no /led (aborta)
  const pub = payload === "ON"
    ? { topic: topicCmd, qos: 1, retain: false, payload: JSON.stringify({ action: "activate", grams: 300 }) }
    : { topic: topicLed, qos: 1, retain: false, payload: "OFF" };

  console.log("[PUB]", pub);

  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: auth },
    body: JSON.stringify(pub),
  });

  const text = await r.text();
  let emqx: any = null; try { emqx = JSON.parse(text); } catch {}

  const noSubs = r.status === 202 && emqx && emqx.message === "no_matching_subscribers";
  if (!r.ok || noSubs) {
    return NextResponse.json({ ok:false, status:r.status, emqx: emqx ?? text, sent: pub }, { status: 502 });
  }

  return NextResponse.json({ ok:true, status:r.status, emqx: emqx ?? text });
}
