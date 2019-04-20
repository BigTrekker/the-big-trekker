import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from 'firebase';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private token: string = null;
  private loggedIn = false;

  constructor(private auth: AuthService, private http: HttpClient) {
    this.loggedIn = !!this.auth.getUser();
    this.auth.userStatusChangedSubscription((user: User) => {
      this.loggedIn = !!user;
      console.log(user);

      if (!user) {
        this.token = null;
        return;
      }

      user.getIdToken().then((token) => console.log(token))
      this.refreshToken();
    });
  }

  private refreshToken() {
    this.http.get(`${environment.apiUrl}/test`, {
      responseType: 'text',
    }).subscribe((data) => {
      console.log(data);
    });
  }
}
