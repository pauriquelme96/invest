import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): Promise<boolean> {
    return this.loginService.verify().then((valid: any) => {
      if (!valid) this.router.navigate(['']);
      return valid;
    });
  }
}
