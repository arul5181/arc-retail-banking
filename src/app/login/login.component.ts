import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { CustomerModel } from '../shared/model/customer.model';
import { AuthService } from '../shared/service/auth.service';
import { UserSessionService } from '../shared/service/usersession.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  roleType:string ='';
  LoginRole: string;
  @ViewChild('lo',{static:true})loginForm: NgForm;
  constructor(private router:Router, private authService:AuthService
    , private userSessionService:UserSessionService){
  }
  ngOnInit(){
    this.roleType = this.userSessionService.RoleType;
    if(!this.roleType){
      alert('Please select valid login type');
      this.router.navigate(['/home']);
    }
    else{
      this.LoginRole = this.roleType ==='A'? 'Corporate' : 'Customer';
    }
  }
  onLoginForm(){
      this.authService.validateUser(this.loginForm.value['userName'],this.loginForm.value['password'])
      .subscribe
        (
          (response:CustomerModel[])=>
          {
            if(response?.length > 0  && response[0].RoleType === this.roleType){
              if(response[0].IsAccountActive){
                if(response[0].IsAccountMapped && response[0].RoleType === 'U'){
                  this.userSessionService.updateUserSession(true);
                  this.userSessionService.user = response[0];
                  this.authService.login();
                  this.router.navigate(['/customerdashboard']);
                }
                else if(response[0].RoleType === 'A'){
                  this.userSessionService.updateUserSession(true);
                  this.userSessionService.user = response[0];
                  this.authService.login();
                  this.router.navigate(['/searchaccount']);
                }
                else{
                  alert('Account is not mapped with this customerid. Please contact customer care');
                }

              }else{
                alert('Account is inactive. Please contact customer care');
              }
            }
            else{
              alert('Invalid Credentials');
            }
          },
          (error) => console.log(error)
        );
        
      
  }
}
