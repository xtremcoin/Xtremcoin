import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SimpleNotificationsModule } from "angular2-notifications";
import { RecaptchaModule, RECAPTCHA_SETTINGS } from "ng-recaptcha";
import { RecaptchaFormsModule } from "ng-recaptcha/forms";
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { APP_BASE_HREF } from '@angular/common';
import { Ng2TelInputModule } from "ng2-tel-input";
import { AppComponent } from './app.component';
import { HeaderComponent } from './_layout/header/header.component';
import { FooterComponent } from './_layout/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { LoginComponent } from './login/login.component';
import { environment } from "../environments/environment";
import { RegisterComponent } from "./register/register.component"
import { UserService } from './services/user.service';
import { KycService } from './services/kyc.service';
import { ApiService } from './services/api.service';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { RecoverpasswordComponent } from './recoverpassword/recoverpassword.component';
import { HeaderAccountComponent } from './_layout-account/header-account/header-account.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './user/profile/profile/profile.component';
import { WalletsComponent } from './user/wallets/wallets.component';
import { ExchangeComponent } from './user/exchange/exchange.component';
import { MerchantComponent } from './user/merchant/merchant.component';
import { DepositComponent } from './user/deposit/deposit.component';
import { CardsComponent } from './user/cards/cards.component';
import { WithdrawComponent } from './user/withdraw/withdraw.component';
import { AccountSettingComponent } from './user/profile/account-setting/account-setting.component';
import { AccountService } from './services/account.service';
import { TwoFaComponent } from './user/profile/two-fa/two-fa.component';
import { KycComponent } from './user/profile/kyc/kyc.component';
import { TransactionComponent } from './user/profile/transaction/transaction.component';
import { LoginLogsComponent } from './user/profile/login-logs/login-logs.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SiteLayoutComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    RecoverpasswordComponent,
    HeaderAccountComponent,
    NotFoundComponent,
    ProfileComponent,
    WalletsComponent,
    ExchangeComponent,
    MerchantComponent,
    DepositComponent,
    CardsComponent,
    WithdrawComponent,
    AccountSettingComponent,
    TwoFaComponent,
    KycComponent,
    TransactionComponent,
    LoginLogsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    Ng2TelInputModule,
    Ng4LoadingSpinnerModule.forRoot(),
    SimpleNotificationsModule.forRoot({
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      maxLength: 50
    }),
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    UserService,
    AccountService,
    ApiService,
    KycService,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptchsitekey,
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
