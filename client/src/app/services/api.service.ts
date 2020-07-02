import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

interface TokenResponse {
  token: string;
}

@Injectable()
export class ApiService {
  url: string = environment.url;
  private token: string;
  constructor(private http: HttpClient, private router: Router) { }
  /*
        save token into localStorage as a item with specific key
     */
  private saveToken(token: string): void {
      localStorage.setItem('Bearer', token);
      this.token = token;
  }
  /*
      call for fetch token from localStrogae
   */
  private getToken(): string {
      if (!this.token) {
          this.token = localStorage.getItem('Bearer');
      }
      return this.token;
  }
  /*
      fetch user token details
   */
  public getUserDetails() {
      const token = this.getToken();
      let payload;
      if (token) {
          payload = token.split('.')[1];
          payload = window.atob(payload);
          return JSON.parse(payload);
      } else {
          return null;
      }
  }
  /*
      call for check the user session
   */
  public isLoggedIn(): boolean {
      const user = this.getUserDetails();
      if (user) {
          //return user.expiresIn > Date.now() / 1000;
          return true;
      } else {
          return false;
      }
  }
  /*
      call for delete the user session
   */
  public logout(): void {
      this.token = '';
      window.localStorage.removeItem('Bearer');
      this.router.navigateByUrl('/login');
  }

  public request(method: 'post' | 'get', type, user?, paramslist?): Observable<any> {
      let base;

      if (method === 'post') {
          if (type === 'user/signup' || type === 'user/login' || type === 'securityauth' || type === 'user/verify') {
              base = this.http.post<any>(this.url + type, user, { withCredentials: true, params: paramslist});
          } else {
              base = this.http.post<any>(this.url + type, user, {
                  withCredentials: true,
                  headers: { Authorization: `Bearer ${this.getToken()}` }
              });
          }
      } else {
          base = this.http.get<any>(this.url + type, { withCredentials: true, params: paramslist });

      }
      const request = base.pipe(
          map((data: TokenResponse) => {
              if (data !== null && data.token) {
                  this.saveToken(data.token);
              }
              return data;
          })
      );

      return request;
  }
  public authRequest(method: 'post' | 'get', type, user?, paramslist?): Observable<any> {
    let base;

    if (method === 'post') {
        if (type === 'user/signup' || type === 'user/login' || type === 'securityauth' || type === 'user/verify') {
            base = this.http.post<any>(this.url + type, user, { withCredentials: true, params: paramslist});
        } else {
            base = this.http.post<any>(this.url + type, user, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${this.getToken()}` }
            });
        }
    } else {
        base = this.http.get<any>(this.url + type, { withCredentials: true, headers: {Authorization: `Bearer ${this.getToken()}`}, params: paramslist });

    }
    const request = base.pipe(
        map((data: TokenResponse) => {
            if (data !== null && data.token) {
                this.saveToken(data.token);
            }
            return data;
        })
    );

    return request;
}

}
