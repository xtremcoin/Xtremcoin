import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';

@Injectable()
export class KycService {

  constructor(
    private authApi: ApiService,
  ) { }
  public kycPrivate(files, kycDetails): Observable<any> {
    const formData = new FormData();
    for (var filekey in files) {
      if (files[filekey] !== null || typeof files[filekey] !== undefined || files[filekey] !== "") {
        formData.append(filekey, files[filekey], files[filekey].name);
      }
    }
    for (var key in kycDetails) {
      if (kycDetails[key] !== null || typeof kycDetails[key] !== undefined || kycDetails[key] !== "") {
        formData.append(key, kycDetails[key]);
      }
    }
    return this.authApi.authRequest('post', 'account/kycp' + '?_csrf=' + kycDetails._csrf, formData);
  }
  public kycCompany(files, kycDetails): Observable<any> {
    const formData = new FormData();
    for (var filekey in files) {
      if (files[filekey] !== null || typeof files[filekey] !== undefined || files[filekey] !== "") {
        formData.append(filekey, files[filekey], files[filekey].name);
      }
    }
    for (var key in kycDetails) {
      if (kycDetails[key] !== null || typeof kycDetails[key] !== undefined || kycDetails[key] !== "") {
        formData.append(key, kycDetails[key]);
      }
    }
    return this.authApi.authRequest('post', 'account/kycc' + '?_csrf=' + kycDetails._csrf, formData);
  }
  public kycBank(files, kycDetails): Observable<any> {
    const formData = new FormData();
    for (var filekey in files) {
      if (files[filekey] !== null || typeof files[filekey] !== undefined || files[filekey] !== "") {
        formData.append(filekey, files[filekey], files[filekey].name);
      }
    }
    for (var key in kycDetails) {
      if (kycDetails[key] !== null || typeof kycDetails[key] !== undefined || kycDetails[key] !== "") {
        formData.append(key, kycDetails[key]);
      }
    }
    return this.authApi.authRequest('post', 'account/kycb' + '?_csrf=' + kycDetails._csrf, formData);
  }
}
