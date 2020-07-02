import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "../../../services/user.service";
import { ApiService } from "../../../services/api.service";
import { AccountService } from "../../../services/account.service";
import { NotificationsService } from "angular2-notifications";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.css']
})
export class AccountSettingComponent implements OnInit {
  countrylist = {};
  profileObj: Object;
  profilePanel: boolean;
  editProfilePanel: boolean;
  tfaPanel: boolean;
  updateVerify = {
    _csrf: '',
    secondauthKey: '',
    callbackData: ''
  }
  updateObj = {
    person_type: 'Private person',
    name: '',
    midName: '',
    surName: '',
    city: '',
    state: '',
    postal: '',
    sex: 'male',
    acceptNews: true,
    dob: null,
    address: '',
    address1: '',
    _csrf: '',
  }

  constructor(
    private fadeLoader: Ng4LoadingSpinnerService,
    private router: Router,
    private authApi: ApiService,
    private notif: NotificationsService,
    private accountService: AccountService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.profilePanel = true;
    this.editProfilePanel = false;
    this.tfaPanel = false;
    this.getCountry();
    this.getprofile();
    this.csrf();
  }
  csrf() {
    this.userService.gtcsrf().subscribe((success) => {
      this.updateObj._csrf = success._csrf;
      this.updateVerify._csrf = success._csrf;
    }, (error) => {
    })
  }
  getCountry() {
    this.fadeLoader.show();
    this.accountService.getCountries().subscribe((success) => {
      this.fadeLoader.hide();
      this.countrylist = success;
    }, (error) => {
      this.fadeLoader.hide();
      this.notif.error(
        'Error',
        error.error.message,
      )
    })
  }

  getprofile() {
    this.accountService.getprofile().subscribe((result) => {
      this.profileObj = result.Profile;
    }, (error) => {
      this.notif.error('Error', 'Something wrong, please try again');
      this.authApi.logout();
    })
  }
  updatefn() {
    this.fadeLoader.show();
    this.accountService.update(this.updateObj).subscribe((result) => {
      this.fadeLoader.hide();
      this.updateVerify.callbackData = result.secret;
      this.profilePanel = false;
      this.editProfilePanel = false;
      this.tfaPanel = true;
      this.notif.success(
        'Success', result.message);
      this.csrf();
    }, (error) => {
      this.notif.error('Error', 'Something wrong, please try again');
    })
  }
  updateConfirm() {
    this.fadeLoader.show();
    this.accountService.updateVerify(this.updateVerify).subscribe((result) => {
      this.fadeLoader.hide();
      this.tfaPanel = false;
      this.notif.success(
        'Success', result.message);
        this.fadeLoader.show();
        this.getprofile();
        this.profilePanel = true;
        console.log(this.profilePanel)
        this.fadeLoader.hide();
      this.router.navigateByUrl('/user/profile/account-setting');
    }, (error) => {
      this.notif.error(
        'Error', error.error.message);
      this.router.navigateByUrl('/user/profile');
    })
  }
  hello(){
    alert('hello');
  }
}
