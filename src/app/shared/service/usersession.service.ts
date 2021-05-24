import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { CustomerModel } from "../model/customer.model";

@Injectable({providedIn:'root'})

export class UserSessionService{
    isUserLogin = new Subject<boolean>();
    user: CustomerModel;
    RoleType: string ='';
    updateUserSession(data: boolean){
        this.isUserLogin.next(data);
    }
}