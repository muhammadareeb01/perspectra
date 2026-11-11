import { withBasePath } from '@/lib/base-path';

export type SupportPledge = {
  id: string;
  name: string;
  amountEur: number;
  currency: 'EUR';
  createdAt: string;
};

const STORAGE_KEY = 'perspectra-support-pledges-v1';

export function createSupportPledge(name: string, amountEur: number): SupportPledge {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    name: name.trim(),
    amountEur,
    currency: 'EUR',
    createdAt: new Date().toISOString()
  };
}

export function readLocalPledges(): SupportPledge[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SupportPledge[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeLocalPledges(pledges: SupportPledge[]): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(pledges));
}

export function appendLocalPledge(pledge: SupportPledge): void {
  const existing = readLocalPledges();
  writeLocalPledges([pledge, ...existing]);
}

export function mergePledges(...lists: SupportPledge[][]): SupportPledge[] {
  const byId = new Map<string, SupportPledge>();
  for (const list of lists) {
    for (const pledge of list) {
      byId.set(pledge.id, pledge);
    }
  }
  return [...byId.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function sumPledgesEur(pledges: SupportPledge[]): number {
  return pledges.reduce((sum, row) => sum + row.amountEur, 0);
}

export function formatPledgeEuro(amount: number): string {
  return new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(amount);
}

export function formatPledgeWhen(iso: string): string {
  try {
    return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function pledgesToTxt(pledges: SupportPledge[]): string {
  const lines = [
    'Perspectra support pledges',
    `Exported: ${new Date().toISOString()}`,
    '',
    'Date (UTC)\tName\tAmount (EUR)',
    ...pledges.map((p) => `${p.createdAt}\t${p.name}\t${p.amountEur}`)
  ];
  return `${lines.join('\n')}\n`;
}

export function downloadPledgesTxt(pledges: SupportPledge[]): void {
  const blob = new Blob([pledgesToTxt(pledges)], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'perspectra-pledges.txt';
  anchor.click();
  URL.revokeObjectURL(url);
}

export async function fetchPublicPledges(): Promise<SupportPledge[]> {
  try {
    const response = await fetch(withBasePath('/data/pledges.json'), { cache: 'no-store' });
    if (!response.ok) return [];
    const data = (await response.json()) as SupportPledge[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function savePledgeToServer(pledge: SupportPledge): Promise<SupportPledge | null> {
  try {
    const response = await fetch(withBasePath('/api/pledges'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pledge)
    });
    if (!response.ok) return null;
    return (await response.json()) as SupportPledge;
  } catch {
    return null;
  }
}

export async function fetchAllPledges(): Promise<SupportPledge[]> {
  let server: SupportPledge[] = [];
  try {
    const response = await fetch(withBasePath('/api/pledges'), { cache: 'no-store' });
    if (response.ok) {
      const data = (await response.json()) as SupportPledge[];
      if (Array.isArray(data)) server = data;
    }
  } catch {
    server = await fetchPublicPledges();
  }
  if (!server.length) server = await fetchPublicPledges();
  return mergePledges(server, readLocalPledges());
}
