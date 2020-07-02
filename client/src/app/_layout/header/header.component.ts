import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NotificationsService } from "angular2-notifications";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogged: boolean;
  constructor(
    private notif: NotificationsService,
    private authApi: ApiService,
    private fadeLoader: Ng4LoadingSpinnerService,    
  ) { }

  ngOnInit() {
    if (this.authApi.isLoggedIn()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }
}
