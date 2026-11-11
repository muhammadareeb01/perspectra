import { promises as fs } from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import type { SupportPledge } from '@/lib/pledges';

export const dynamic = 'force-dynamic';

const JSON_PATH = path.join(process.cwd(), 'public/data/pledges.json');
const TXT_PATH = path.join(process.cwd(), 'data/pledges.txt');

async function readPledgesFile(): Promise<SupportPledge[]> {
  try {
    const raw = await fs.readFile(JSON_PATH, 'utf8');
    const parsed = JSON.parse(raw) as SupportPledge[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function GET() {
  const pledges = await readPledgesFile();
  return Response.json(pledges);
}

export async function POST(request: Request) {
  let body: Partial<SupportPledge>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const name = body.name?.trim() ?? '';
  const amountEur = body.amountEur;
  if (!name || name.length > 120 || typeof amountEur !== 'number' || !Number.isFinite(amountEur) || amountEur <= 0) {
    return Response.json({ error: 'Invalid name or amount' }, { status: 400 });
  }

  const pledge: SupportPledge = {
    id: typeof body.id === 'string' && body.id.length <= 64 ? body.id : randomUUID(),
    name,
    amountEur,
    currency: 'EUR',
    createdAt: typeof body.createdAt === 'string' ? body.createdAt : new Date().toISOString()
  };

  const pledges = await readPledgesFile();
  pledges.unshift(pledge);
  await fs.writeFile(JSON_PATH, `${JSON.stringify(pledges, null, 2)}\n`, 'utf8');
  await fs.appendFile(TXT_PATH, `${pledge.createdAt}\t${pledge.name}\t${pledge.amountEur}\n`, 'utf8');

  return Response.json(pledge, { status: 201 });
}
