
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot
    ,RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
 
 
@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
 
    constructor(private router:Router, private authService: AuthService ) {
    }
 
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.isAuthenticated().then(
            (authenticated:boolean)=>{
                    if(authenticated){

                        return true;
                    }
                    else{
                        alert('You are not allowed to view this page. Please login!');
                        this.router.navigate(["home"]);
                    }
            });
    }
    canActivateChild(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
           return this.canActivate(route,state);
        }
}