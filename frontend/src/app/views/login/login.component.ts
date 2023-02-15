import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { Form } from '../../../../../DevTools/control-core/Form';
import { Button } from '../../../../../DevTools/controls/button.controller';
import { LoginForm } from './login-form.definition';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form?: Form;

  public loginButton = new Button()
    .setDisabled(true)
    .setLabel('Iniciar sesión');

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.form = LoginForm();
    this.form.change.subscribe(() => {
      this.loginButton.setDisabled(!this.form.isValid);
    });

    this.loginButton.click.subscribe(() => {
      this.form.setStatus('');
      this.form.setFetching(true);

      this.loginButton.setFetching(true);
      this.loginButton.setStatus('');
      this.loginButton.setTooltip('');
      this.loginButton.setLabel('Entrando...');

      this.doLogin(this.form.value)
        .then(() => {
          this.router.navigate(['home']);
        })
        .finally(() => {
          this.form.setFetching(false);
          this.loginButton.setFetching(false);
        })
        .catch((err) => {
          this.loginButton.setTooltip(err.error.msg);
          this.loginButton.setStatus('error');
          this.loginButton.setLabel('Error...');
        });
    });

    this.loginService.verify().then((valid) => {
      if (valid) this.router.navigate(['home']);
    });
  }

  public doLogin(user) {
    return this.loginService.doLogin(user);
  }

  goForgotPassword() {
    this.router.navigate(['forgot']);
  }
}
