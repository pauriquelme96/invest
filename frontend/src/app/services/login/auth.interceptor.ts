import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.getSessionToken();

    if (token) {
      req = req.clone({
        setHeaders: { 'access-token': token },
      });
    }

    return next.handle(req).pipe(
      catchError((response: HttpErrorResponse) => {
        if (response.status === 401) {
          this.loginService.destroyUser();
          this.router.navigate(['']);
        }

        return throwError(response);
      })
    );
  }

  public getSessionToken() {
    const user = this.loginService.getUser();

    return user ? user.token : false;
  }
}
