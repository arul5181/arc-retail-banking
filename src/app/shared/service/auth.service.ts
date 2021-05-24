
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerModel } from '../model/customer.model';
import { UserSessionService } from './usersession.service';
 
@Injectable()
export class AuthService { 
    private isloggedIn: boolean;
    private baseurl: string ='http://localhost:3000/Users';
    constructor(private http:HttpClient, private userSessionService: UserSessionService) {
        this.isloggedIn=false;
    }
    isAuthenticated() {
        const promise= new Promise((resolve, reject)=>{
            resolve(this.isUserLoggedIn())
        });
        return promise;
    }
 
    login() {
        this.isloggedIn=true;
        return this.isloggedIn;
    }
    validateUser(emailID : string, password: string){
        let url: string = this.baseurl + "?Email=" + emailID +"&Password="+ password;
        return this.http.get<CustomerModel[]>(url);
    }
    isUserLoggedIn(): boolean {
        return this.isloggedIn;
    }
    isAdminLoggedIn(): boolean {
        return this.isloggedIn && this.userSessionService.RoleType ==='A';
    }
    logoutUser(): void{
        this.userSessionService.RoleType = '';
        this.userSessionService.user = null;
        this.isloggedIn = false;
    }
 
} 
 