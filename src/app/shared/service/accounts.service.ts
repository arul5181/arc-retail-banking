import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountModel } from '../model/account.model';
import { CustomerModel } from '../model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  private baseurl: string ='http://localhost:3000/';
  constructor(private http:HttpClient){}
  getCustomer(){
    let userURL = this.baseurl + 'Users?IsAccountMapped=false&RoleType=U';
      return this.http.get<CustomerModel[]>(userURL);
  }
  openAccount(account:AccountModel){
    let URL = this.baseurl + 'Account';
    return this.http.post(URL,account,{observe:'response'});
  }
  activateAccountUserMapped(id:number){
    let URL = this.baseurl + 'Users/' + id;
    return this.http.patch(URL,{'IsAccountMapped':true},{observe:'response'});
  }
  getAccounts(){
    let URL = this.baseurl + 'Account';
      return this.http.get<AccountModel[]>(URL);
  }
  getAccountbyID(id:number){
    let URL = this.baseurl + 'Account/' + id;
      return this.http.get<AccountModel>(URL);
  }
  getAccountbyCustomerID(customerId:string){
    let URL = this.baseurl + 'Account?CustomerID=' + customerId;
      return this.http.get<AccountModel[]>(URL);
  }
  updateCurrentBalance(id:number, amount:number){
    let URL = this.baseurl + 'Account/' + id;
    return this.http.patch(URL,{'CurrentBalance':amount},{observe:'response'});
  }
  getAccountbySearch(searchText:string){
    let URL = this.baseurl + 'Account?' + searchText;
      return this.http.get<AccountModel[]>(URL);
  }
}
