import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomerModel } from '../shared/model/customer.model';
import { AuthService } from '../shared/service/auth.service';
import { UserSessionService } from '../shared/service/usersession.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  //@Output() formTypeSelected= new EventEmitter<string>();
  //featureSelected ='directives';
  isUserLoggedIn: boolean = false;
  isAdminLogged: boolean = false;
  userDetail: CustomerModel;
  constructor(private authService:AuthService, 
    private router:Router, private userSessionService:UserSessionService) { }

  ngOnInit(): void {
    this.isUserLoggedIn = this.authService.isUserLoggedIn();
    this.isAdminLogged = this.authService.isAdminLoggedIn();
    this.userDetail = this.userSessionService.user;
  }
 
  logout() {
    this.authService.logoutUser();
    this.userSessionService.updateUserSession(false);
    this.router.navigate(['home']);
  }
}
