import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchModel } from '../model/branch.model';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
branchList: BranchModel[];
private baseurl: string ='http://localhost:3000/Branch';
  constructor(private http:HttpClient) {
   }
   getBranch(){
     if(!this.branchList || this.branchList?.length == 0){
       this.http.get<BranchModel[]>(this.baseurl)
       .subscribe(
         (response:BranchModel[])=>{
           this.branchList = [...response];
         }
       )
     }
   }
}
