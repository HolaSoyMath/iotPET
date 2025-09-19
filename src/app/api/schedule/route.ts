import { NextResponse } from "next/server";

const DEVICE_ID = 'ESP32-Alimentador';
const CLOUDFLARE_WORKER_URL = process.env.CLOUDFLARE_WORKER_URL || 'https://seu-worker.workers.dev';

export async function GET() {
  try {
    // Faz requisição para o Cloudflare Worker
    const response = await fetch(`${CLOUDFLARE_WORKER_URL}/schedule?deviceId=${DEVICE_ID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Worker respondeu com status ${response.status}`);
    }

    const data = await response.json();
    
    // Retorna os dados diretamente
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('[API Schedule] Erro ao buscar horários:', error);
    
    // Retorna erro estruturado
    return NextResponse.json(
      { 
        error: 'Erro ao buscar horários programados',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
        schedules: [] // Fallback vazio
      }, 
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Faz requisição para salvar no Cloudflare Worker
    const response = await fetch(`${CLOUDFLARE_WORKER_URL}/schedule`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        deviceId: DEVICE_ID,
        tzOffsetMin: -180, // UTC-3 (Brasília)
        items: body.items
      }),
    });

    if (!response.ok) {
      throw new Error(`Worker respondeu com status ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('[API Schedule] Erro ao salvar horários:', error);
    
    return NextResponse.json(
      { 
        ok: false,
        error: 'Erro ao salvar horários programados',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      }, 
      { status: 500 }
    );
  }
}