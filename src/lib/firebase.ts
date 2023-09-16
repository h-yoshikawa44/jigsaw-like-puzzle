import { initializeApp, getApps } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

if (typeof window !== 'undefined' && getApps().length === 0) {
  const config = {
    apiKey: import.meta.env.VITE_APP_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_DATABASE_URL,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
  };

  initializeApp(config);

  if (import.meta.env.NODE_ENV === 'production') {
    getAnalytics();
  }
}
