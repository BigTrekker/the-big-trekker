import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../auth';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.auth.getUser()) {
      return next.handle(request);
    }

    return from(this.auth.getUser().getIdToken())
      .pipe(
        switchMap(token => {
          console.log('token', token);
          const headers = request.headers
                   .set('Authorization', 'Bearer ' + token)
                   .append('Content-Type', 'application/json');

          return next.handle(request.clone({ headers }));
        }));
  }
}
