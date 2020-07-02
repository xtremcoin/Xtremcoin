import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { ApiService } from "../services/api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NotificationsService } from "angular2-notifications";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  smsVerfication: boolean;
  signuppanel: boolean;
  thanksPanel: boolean;
  emailVerifyPanel: boolean;
  userObj = {
    firstname: '',
    surname: '',
    phone: '',
    email: '',
    password: '',
    passwordrepeat: '',
    _csrf: null,
  }
  verificationstr: String;
  otpObj = {
    otp: '',
    email: '',
    _csrf: null
  };
  errMsg = {
    password: '',
    passwordrepeat: ''
  };
  verificationObj = {
    code: '',
    email: ''
  };
  passclass = 'bar';
  IPcountryCode = 'TR';
  message = '';
  public declarativeFormCaptchaValue: string;
  expiredlink = false;
  constructor(
    private fadeLoader: Ng4LoadingSpinnerService,
    private router: Router,
    private userService: UserService,
    private authApi: ApiService,
    private actroute: ActivatedRoute,
    private notif: NotificationsService,
  ) {
    this.getIPInfo();
   }

  ngOnInit() {
    if (this.authApi.isLoggedIn()) {
      this.router.navigateByUrl('/user');
    } else {
      this.csrf();
      this.getIPInfo();
      this.smsVerfication = false;
      this.signuppanel = true;
      this.thanksPanel = false;
      this.emailVerifyPanel = false;
      this.verificationObj.code = this.actroute.snapshot.queryParamMap.get('code');
      this.verificationObj.email = this.actroute.snapshot.queryParamMap.get('email');
      if (this.verificationObj.code && this.verificationObj.email) {
        this.verifyemail(this.verificationObj);
      }
    }
  }

  checkpassword(val) {
    var strongRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$", "g");

    var mediumRegex = new RegExp("((^)(^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$|^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{6,}$|^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$|^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$))+$", "g");

    if (strongRegex.test(val)) {
      this.passclass = 'strong';
    } else if (mediumRegex.test(val)) {
      this.passclass = 'medium';
    } else {
      this.passclass = 'weakasa';
    }
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
  getIPInfo() {
    this.userService.getDetailsIP().subscribe((ip_details) => {
      if (ip_details.country && ip_details.ip !== 'undefined') {
         this.IPcountryCode = ip_details.country;
      }
    }, (err) => {
      console.log(err.message);
    });
  }
  csrf() {
    this.userService.gtcsrf().subscribe((success) => {
      this.userObj._csrf = success._csrf;
      this.otpObj._csrf = success._csrf;
    }, (error) => {
      console.log(error);
    })
  }
  getNumber(events) {
    this.userObj.phone = events;
  }
  signupFn() {
    this.fadeLoader.show();
    this.otpObj.email = this.userObj.email;
    this.userService.signup(this.userObj).subscribe((success) => {
      if (success.status === 200) {
        this.fadeLoader.hide();
        this.notif.success(
          'Success', success.message);
        this.csrf();
        this.signuppanel = false;
        this.smsVerfication = true;
      }
    }, (error) => {
      this.notif.error(
        'Error', error.error.message);
    })
  }
  verifyemail(Obj) {
    this.signuppanel = false;
    this.fadeLoader.show();
    this.userService.getEmailVerified(Obj).subscribe((result) => {
      this.fadeLoader.hide();
      this.emailVerifyPanel = true;
      this.message = result.message;
      this.notif.success(
        'Great,',
        result.message)
      this.router.navigateByUrl('/login');
    }, (err) => {
      this.fadeLoader.hide();
      this.message = err.message;
      this.notif.error(
        'Error',
        err.error.message)
      this.router.navigateByUrl('/');
    })
  }
  submitOTP() {
    this.fadeLoader.show();
    this.userService.verifyotp(this.otpObj).subscribe((success) => {
      this.fadeLoader.hide();
      this.smsVerfication = false;
      this.thanksPanel = true;
      this.notif.success(
        'Success', success.message);
      this.csrf();
    }, (error) => {
      this.fadeLoader.hide();
      this.notif.error(
        'Error', error.error.message);
      this.router.navigateByUrl('/signup');
    })
  }
}