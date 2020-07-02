import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { ApiService } from "../../services/api.service";
import { AccountService } from "../../services/account.service";
import { NotificationsService } from "angular2-notifications";

@Component({
  selector: 'app-header-account',
  templateUrl: './header-account.component.html',
  styleUrls: ['./header-account.component.css']
})
export class HeaderAccountComponent implements OnInit {
  exchangeSellmodel: string;

  constructor(
    private router: Router,
    private authApi: ApiService,
    private notif: NotificationsService,
    private accountService: AccountService,
    private userService: UserService
  ) { }

  ngOnInit() {
    if (this.authApi.isLoggedIn()) {
      this.isTFA();
      this.isProfile();
    } else {
      this.router.navigateByUrl('/login');
    }
  }
  isProfile(){
    this.accountService.getprofile().subscribe((result) => {
      if(result.Profile.profile.sex !== ''){
      }else{
        this.notif.error(null, 'Your Profile and KYC is not completed.');
        this.router.navigateByUrl('/user/profile/kyc');
      }
    }, (error) => {
      this.notif.error(null, 'Your Profile and KYC is not completed.');
      this.router.navigateByUrl('/user/profile');
    })
  }
  openExchangeSellModal() {
    this.exchangeSellmodel = 'block';
  }
  closeExchangeSellModal() {
    this.exchangeSellmodel = 'none';
  }
  isTFA(){
    this.accountService.isTfa().subscribe((result) => {
      if(!result.twofa.enabled){
        this.openExchangeSellModal();
      }
    }, (error) => {
      console.log(error.message);
    })
  }
}
