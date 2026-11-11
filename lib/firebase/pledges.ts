import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getFirebaseConfig } from './config';
import { getFirestoreDb } from './client';

const COLLECTION = 'supportPledges';

export function isFirebasePledgesConfigured(): boolean {
  return Boolean(getFirebaseConfig());
}

export async function recordSupportPledgeFirestore(payload: {
  name: string;
  amountEur: number;
  source?: string;
}): Promise<boolean> {
  const db = getFirestoreDb();
  if (!db) return false;

  try {
    await addDoc(collection(db, COLLECTION), {
      name: payload.name.trim().slice(0, 120),
      amountEur: payload.amountEur,
      currency: 'EUR',
      source: payload.source ?? 'perspectra-site',
      createdAt: serverTimestamp()
    });
    return true;
  } catch {
    return false;
  }
}
