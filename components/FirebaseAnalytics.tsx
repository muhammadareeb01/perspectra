'use client';

import { useEffect } from 'react';
import { initFirebaseAnalytics } from '@/lib/firebase/client';

export function FirebaseAnalytics() {
  useEffect(() => {
    initFirebaseAnalytics().catch(() => {
      /* analytics blocked or unsupported */
    });
  }, []);

  return null;
}
