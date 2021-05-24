import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserSessionService } from '../shared/service/usersession.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private router:Router, private userSessionService:UserSessionService) { }

  ngOnInit(): void {
  }
  onRegisterForm(){
      this.router.navigate(['/userregistration']);
  }
  onLoginForm(selectedRole:string){
    this.userSessionService.RoleType = selectedRole;
    this.router.navigate(['/login']);
  }
}
