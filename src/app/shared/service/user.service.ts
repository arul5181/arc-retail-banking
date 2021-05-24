import { Injectable } from "@angular/core";
import { HttpClient }from '@angular/common/http';
import { CustomerModel }from '../model/customer.model';
import{ map } from 'rxjs/operators';
@Injectable({providedIn:'root'})

export class UserService{
    private baseurl: string ='http://localhost:3000/Users';
    constructor(private http:HttpClient){}
    createUser(userData:CustomerModel){
        return this.http.post(this.baseurl,userData,{observe:'response'});
    }
}