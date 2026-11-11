import { getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getAnalytics, isSupported, type Analytics } from 'firebase/analytics';
import { getFirebaseConfig } from './config';

let analyticsInit: Promise<Analytics | null> | null = null;

export function getFirebaseApp(): FirebaseApp | null {
  const config = getFirebaseConfig();
  if (!config) return null;
  return getApps()[0] ?? initializeApp(config);
}

/** Browser-only Google Analytics via Firebase. Safe to call from client components. */
export function initFirebaseAnalytics(): Promise<Analytics | null> {
  if (typeof window === 'undefined') {
    return Promise.resolve(null);
  }
  if (!analyticsInit) {
    analyticsInit = (async () => {
      const supported = await isSupported();
      if (!supported) return null;
      const app = getFirebaseApp();
      if (!app) return null;
      return getAnalytics(app);
    })();
  }
  return analyticsInit;
}
