
import {
  ApplicationConfig,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import {
  provideFirebaseApp,
  initializeApp
} from '@angular/fire/app';
import {
  provideFirestore,
  getFirestore
} from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDUq4BxL_X8iWduDLWaSXeEfTP6zdzpOx0',
  authDomain: 'seg4505-lab-5.firebaseapp.com',
  projectId: 'seg4505-lab-5',
  storageBucket: 'seg4505-lab-5.firebasestorage.app',
  messagingSenderId: '677691291165',
  appId: '1:677691291165:web:a439a6d0dd9e22006cb8f4'
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore())
  ]
};
