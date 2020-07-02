import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "../../../services/user.service";
import { ApiService } from "../../../services/api.service";
import { AccountService } from "../../../services/account.service";
import { NotificationsService } from "angular2-notifications";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-two-fa',
  templateUrl: './two-fa.component.html',
  styleUrls: ['./two-fa.component.css']
})
export class TwoFaComponent implements OnInit {
  tfaPanel: boolean;
  tfaDisable: boolean;
  twofaObj: Object;
  twofaDisableObj = {
    code: '',
    _csrf: ''
  }
  createTFA = {
    backupCheck: '',
    _csrf: '',
    code: '',
    secret: ''
  };
  constructor(
    private fadeLoader: Ng4LoadingSpinnerService,
    private router: Router,
    private authApi: ApiService,
    private notif: NotificationsService,
    private accountService: AccountService,
    private userService: UserService
  ) {
    this.tfaPanel = false;
    this.tfaDisable = false;
   }
  ngOnInit() {
    this.get2fa();
    this.csrf();
  }
  csrf() {
    this.userService.gtcsrf().subscribe((success) => {
      this.createTFA._csrf = success._csrf;
      this.twofaDisableObj._csrf = success._csrf;
    }, (error) => {
    })
  }
  get2fa() {
    this.fadeLoader.show();
    this.accountService.get2fa().subscribe((success) => {
      this.fadeLoader.hide();
      if(success.twofa.enabled === false){
        this.tfaDisable = false;
        this.tfaPanel = true;
      }else{
        this.tfaDisable = true;
        this.tfaPanel = false;
      }
      this.twofaObj = success.twofa;
      this.createTFA.secret = success.twofa.secret;
      this.csrf();
    }, (error) => {
      this.fadeLoader.hide();
      this.notif.error(
        'Error',
        error.error.message,
      )
    })
  }
  twofafn(){
    this.fadeLoader.show();
    this.accountService.post2fa(this.createTFA).subscribe((success) => {
      this.fadeLoader.hide();
      this.get2fa();
      this.twofaObj = success.twofa;
      this.csrf();
    }, (error) => {
      this.fadeLoader.hide();
      this.notif.error(
        'Error',
        error.error.message,
      )
    })
  }
  twofaDisablefn(){
    this.fadeLoader.show();
    this.accountService.postDisable2fa(this.twofaDisableObj).subscribe((success) => {
      this.get2fa();
      this.fadeLoader.hide();
      this.csrf();
    }, (error) => {
      this.fadeLoader.hide();
      this.notif.error(
        'Error',
        error.error.message,
      )
    })
  }
}
