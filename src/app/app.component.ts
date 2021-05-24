import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BranchService } from './shared/service/branch.service';
import { UserSessionService } from './shared/service/usersession.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'arc-retail-banking';
  isUserLoggedIn: boolean = false;
  isUserSubscription :Subscription;
  
  constructor(private userSessionService:UserSessionService, private branchService: BranchService) { }

  ngOnInit(): void {
    this.branchService.getBranch();
    this.isUserSubscription= this.userSessionService.isUserLogin.subscribe(userLogin =>{
      this.isUserLoggedIn = userLogin;
    });
 }
}
