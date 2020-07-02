import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';

@Injectable()
export class UserService {
    constructor(
        private http: HttpClient,
        private router: Router,
        private authApi: ApiService
    ) { }

    public getDetailsIP(): Observable<any> {
        return this.http.get('https://ipinfo.io/')
    }
    public gtcsrf(): Observable<any> {
        return this.authApi.request('get', 'csrf')
    }
    public login(credentialsObj): Observable<any> {
        return this.authApi.request('post', 'user/login', credentialsObj);
    }
    public signup(credentialsObj): Observable<any> {
        return this.authApi.request('post', 'user/signup', credentialsObj);
    }
    public verifyotp(credentialsObj): Observable<any> {
        return this.authApi.request('post', 'user/signupverify', credentialsObj);
    }
    public verifyTFA(credentialsObj): Observable<any> {
        return this.authApi.request('post', 'user/authentication', credentialsObj );
    }
    public getEmailVerified(credentialsObj): Observable<any> {
        return this.authApi.request('get', 'user/verify',null,{code: credentialsObj.code, email: credentialsObj.email} );
    }
    public loginSms(credentialsObj): Observable<any> {
        return this.authApi.request('post', 'user/verifyotp', credentialsObj );
    }
    public recoveryPassword(credentialsObj): Observable<any> {
        return this.authApi.request('post', 'user/forgotpassword', credentialsObj );
    }
    public changePassword(credentialsObj): Observable<any> {
        return this.authApi.request('post', 'user/passwordrecovery', credentialsObj );
    }
}
