import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransactionModel } from '../model/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  accountNumber:number;
  private baseurl: string ='http://localhost:3000/';
  constructor(private http:HttpClient){}
  
  fundTransfer(transaction:TransactionModel){
    let URL = this.baseurl + 'Transaction';
    return this.http.post(URL,transaction,{observe:'response'});
  }
  getMiniStatement(accountNumber:number){
    let URL = this.baseurl + 'Transaction?_limit=10&_sort=TransactionDate&_order=desc&q=' +accountNumber ;
    return this.http.get<TransactionModel[]>(URL);
  }
  getDetailedStatement(filterQuery:string){
    let URL = this.baseurl + 'Transaction?_sort=TransactionDate&_order=desc&' + filterQuery;
    return this.http.get<TransactionModel[]>(URL);
  }
}
