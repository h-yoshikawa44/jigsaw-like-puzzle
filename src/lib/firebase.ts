import { initializeApp, getApps } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

if (typeof window !== 'undefined' && getApps().length === 0) {
  const config = {
    apiKey: process.env.REACT_APP_APP_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  };

  initializeApp(config);

  if (process.env.NODE_ENV === 'production') {
    getAnalytics();
  }
}
