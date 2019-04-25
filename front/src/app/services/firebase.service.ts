import { Injectable } from '@angular/core';
import { initializeApp, app } from 'firebase/app';
import { environment } from 'src/environments/environment';

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
}

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private config: FirebaseConfig;
  private app: app.App;

  constructor() {
    this.config = environment.firebase;
    this.app = initializeApp(this.config);
  }

  getApp(): app.App {
    return this.app;
  }
}
