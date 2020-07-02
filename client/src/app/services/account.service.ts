import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';

@Injectable()
export class AccountService {
  constructor(
    private authApi: ApiService,
  ) {
  }
  public isKyc(): Observable<any> {
    return this.authApi.authRequest('get', 'account/iskyc');
  }
  public isProfile(): Observable<any> {
    return this.authApi.authRequest('get', 'account/isprofile');
  }
  public isTfa(): Observable<any> {
    return this.authApi.authRequest('get', 'account/get2fa');
  }
  public getprofile(): Observable<any> {
    return this.authApi.authRequest('get', 'account/getprofile');
  }
  public getCountries(): Observable<any> {
    return this.authApi.authRequest('get', 'account/countrylist');
  }
  public update(Obj): Observable<any> {
    return this.authApi.authRequest('post', 'account/updateprofile', Obj);
  }
  public updateVerify(Obj): Observable<any> {
    return this.authApi.authRequest('post', 'account/updateverify', Obj);
  }
  public get2fa(): Observable<any> {
    return this.authApi.authRequest('get', 'account/get2fa');
  }
  public post2fa(Obj): Observable<any> {
    return this.authApi.authRequest('post', 'account/enable2fa', Obj);
  }
  public postDisable2fa(Obj): Observable<any> {
    return this.authApi.authRequest('post', 'account/disable2fa', Obj);
  }
}
