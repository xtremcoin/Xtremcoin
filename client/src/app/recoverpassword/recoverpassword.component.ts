import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { ApiService } from "../services/api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NotificationsService } from "angular2-notifications";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-recoverpassword',
  templateUrl: './recoverpassword.component.html',
  styleUrls: ['./recoverpassword.component.css']
})
export class RecoverpasswordComponent implements OnInit {
  recoverObj = {
    email: '',
    _csrf: ''
  }
  newPasswordObj = {
    email: '',
    otp: '',
    password: '',
    passwordrepeat: '',
    _csrf: ''
  }
  errMsg = {
    password: '',
    passwordrepeat: ''
  };
  public declarativeFormCaptchaValue: string;
  recoveryPanel: boolean;
  recoveryOtpPanel: boolean;
  constructor(
    private fadeLoader: Ng4LoadingSpinnerService,
    private router: Router,
    private authApi: ApiService,
    private userService: UserService,
    private actroute: ActivatedRoute,
    private notif: NotificationsService
  ) { }

  ngOnInit() {
    if (this.authApi.isLoggedIn()) {
      this.router.navigateByUrl('/user');
    } else {
      this.recoveryPanel = true;
      this.recoveryOtpPanel = false;
      this.csrf();
    }
  }
  csrf() {
    this.userService.gtcsrf().subscribe((success) => {
      this.recoverObj._csrf = success._csrf;
      this.newPasswordObj._csrf = success._csrf;
    }, (error) => {
      console.log(error);
    })
  }
  clearError(field) {
    switch (field) {
      case 'password':
        this.errMsg.password = '';
        break;
      case 'passwordrepeat':
        this.errMsg.passwordrepeat = '';
        break;
    }
  }
  matchPassword(obj) {
    if (obj.password && obj.passwordrepeat && (obj.password !== obj.passwordrepeat)) {
      this.errMsg.passwordrepeat = "Password does not match";
      return false;
    } else {
      return true;
    }
  }
  recoveryfn() {
    this.fadeLoader.show();
    this.userService.recoveryPassword(this.recoverObj).subscribe((success) => {
      this.fadeLoader.hide();
      this.recoveryPanel = false;
      this.recoveryOtpPanel = true;
      this.newPasswordObj.email = this.recoverObj.email;
      this.notif.success(
        'Success', success.message);
      this.csrf();
    }, (error) => {
      this.fadeLoader.hide();
      this.notif.error(
        'Error', error.error.message);
      this.router.navigateByUrl('/forgotpassword');
    })
  }
  newPasswordfn() {
    this.fadeLoader.show();
    this.userService.changePassword(this.newPasswordObj).subscribe((success) => {
      this.fadeLoader.hide();
      this.notif.success(
        'Success', success.message);
      this.router.navigateByUrl('/login');
    }, (error) => {
      this.fadeLoader.hide();
      this.notif.error(
        'Error', error.error.message);
      this.router.navigateByUrl('/forgotpassword');
    })

  }
}
