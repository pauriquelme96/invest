import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  public doLogin({ email, password }: any) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          this.storeUser({
            token: 'laksdlaksjdlakjdslak',
          })
        );
      }, 1000);
    });

    return this.http
      .post(environment.server + '/login', {
        email,
        password,
      })
      .toPromise()
      .then((user) => this.storeUser(user));
  }

  public storeUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }

  public destroyUser() {
    localStorage.setItem('user', 'false');
  }

  public getUser() {
    return JSON.parse(localStorage.getItem('user') || 'false');
  }

  public verify() {
    const currentUser = this.getUser();
    return Promise.resolve(!!(currentUser && currentUser.token));
  }
}
