import { Injectable, EventEmitter } from '@angular/core';
import { auth } from 'firebase/app';
import { User } from 'firebase';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { FirebaseService } from 'src/app/services/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  redirectUrl: string;
  private auth: auth.Auth;
  private userStatusChanged = new EventEmitter<User>();

  constructor(firebaseService: FirebaseService, private router: Router) {
    this.auth = auth(firebaseService.getApp());
    this.auth.useDeviceLanguage();
    this.auth.setPersistence(auth.Auth.Persistence.LOCAL);
    this.auth.onAuthStateChanged((user) => {
      this.userStatusChanged.emit(user);

      if (!user) {
        return;
      }

      const url = this.redirectUrl || '/';
      this.router.navigate([url]);
    });
  }

  async login(): Promise<User> {
    try {
      await this.auth.signInWithPopup(new auth.GoogleAuthProvider());
    } catch (e) {
      console.log('login error', e);
    }

    return this.auth.currentUser;
  }

  async logout(): Promise<void> {
    await this.auth.signOut();
    this.router.navigate(['/']);
  }

  async getToken(): Promise<string> {
    if (this.auth.currentUser) {
      return this.auth.currentUser.getIdToken();
    }

    return null;
  }

  getUser(): User {
    return this.auth.currentUser;
  }

  userStatusChangedSubscription(fn: Function): Subscription {
    return this.userStatusChanged.subscribe(fn);
  }
}
