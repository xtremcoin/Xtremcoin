import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { ApiService } from "../services/api.service";
import { NotificationsService } from "angular2-notifications";
import { ActivatedRoute, Router } from "@angular/router";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginCredentials = {
    email: '',
    password: '',
    _csrf: null,
  }
  loginByPhone = {
    _csrf: null,
    phone: '',
  }
  emailVerifyTFA = {
    _csrf: null,
    code: '',
    email: ''
  }
  otpObj = {
    otp: '',
    _csrf: '',
    phone: '',
    pin: '',
    code: ''
  }
  IPcountryCode = 'TR';
  otpPanel: boolean;
  loginPanel: boolean;
  emailTFApanel: boolean;
  user: Object;
  public declarativeFormCaptchaValue: string;
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
      this.csrf();
      this.getIPInfo();
      this.otpPanel = false;
      this.loginPanel = true;
      this.emailTFApanel = false;
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
      this.loginCredentials._csrf = success._csrf;
      this.loginByPhone._csrf = success._csrf;
      this.otpObj._csrf = success._csrf;
      this.emailVerifyTFA._csrf = success._csrf;
    }, (error) => {
      console.log(error);
    })
  }
  getNumber(events) {
    this.loginByPhone.phone = events;
  }
  loginfn() {
    this.fadeLoader.show();
    this.userService.login(this.loginCredentials).subscribe((success) => {
      if (!success.tfa) {
        this.fadeLoader.hide();
        this.router.navigateByUrl('/user');
      }else {
        this.fadeLoader.hide();
        this.loginPanel = false;
        this.emailTFApanel = true;
      }
      this.csrf();
    }, (error) => {
      this.fadeLoader.hide();
      this.notif.error(
        'Error', error.error.message);
      this.router.navigateByUrl('/login');
    })
  }
  loginPhonefn() {
    this.fadeLoader.show();
    this.userService.login(this.loginByPhone).subscribe((success) => {
      this.user = success.customer;
      this.otpObj.phone = success.customer.phone;
      this.loginPanel = false;
      this.fadeLoader.hide();
      this.otpPanel = true;
      this.notif.success(
        'Success', success.message);
      this.csrf();
    }, (error) => {
      this.fadeLoader.hide();
      this.notif.error(
        'Error', error.error.message);
      this.router.navigateByUrl('/login');
    })
  }
  loginOtpfn() {
    this.fadeLoader.show();
    this.userService.loginSms(this.otpObj).subscribe((success) => {
      this.fadeLoader.hide();
      this.notif.success(
        'Success', success.message);
      this.csrf();
      this.router.navigateByUrl('/user/dashboard');
    }, (error) => {
      this.fadeLoader.hide();
      this.notif.error(
        'Error', error.error.message);
    })
  }
  twofaByEmail(){
    this.emailVerifyTFA.email = this.loginCredentials.email;
    console.log(this.emailVerifyTFA);
    this.userService.verifyTFA(this.emailVerifyTFA).subscribe((success) => {
      this.router.navigateByUrl('/user/dashboard');
    }, (error) => {
      this.notif.error(
        null, error.error.message);
    })
  }
}
