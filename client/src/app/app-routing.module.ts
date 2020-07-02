import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { RecoverpasswordComponent } from './recoverpassword/recoverpassword.component';
import { HeaderAccountComponent } from './_layout-account/header-account/header-account.component';
import { ProfileComponent } from './user/profile/profile/profile.component';
import { WalletsComponent } from './user/wallets/wallets.component';
import { ExchangeComponent } from './user/exchange/exchange.component';
import { MerchantComponent } from './user/merchant/merchant.component';
import { DepositComponent } from './user/deposit/deposit.component';
import { CardsComponent } from './user/cards/cards.component';
import { WithdrawComponent } from './user/withdraw/withdraw.component';
import { AccountSettingComponent } from './user/profile/account-setting/account-setting.component';
import { KycComponent } from './user/profile/kyc/kyc.component';
import { TwoFaComponent } from './user/profile/two-fa/two-fa.component';
import { NotFoundComponent } from './not-found/not-found.component';
const routes: Routes = [
  {
    path: '', component: SiteLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: RegisterComponent },
      { path: 'verify', component: RegisterComponent },
      { path: 'forgotpassword', component: RecoverpasswordComponent },
      { path: 'user', component: HeaderAccountComponent,
        children: [
          { path: 'profile', component: ProfileComponent,
            children: [
              { path: 'account-setting', component: AccountSettingComponent },
              { path: 'twfa', component: TwoFaComponent },
              { path: 'kyc', component: KycComponent },
              ]},
        { path: 'dashboard', component: DashboardComponent },
        { path: 'wallets', component: WalletsComponent },
        { path: 'cards', component: CardsComponent },
        { path: 'exchange', component: ExchangeComponent },
        { path: 'withdraw', component: WithdrawComponent },
        { path: 'deposit', component: DepositComponent },
        { path: 'merchant', component: MerchantComponent },
        //{ path: '**', component: NotFoundComponent },
      ]},
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: '', component: HomeComponent },
      //{ path: '**', component: NotFoundComponent },
    ]
  }]

@NgModule({
  imports: [
    CommonModule,
    [RouterModule.forRoot(routes),
    RouterModule.forChild(routes)]
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
