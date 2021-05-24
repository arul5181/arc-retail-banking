import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MinistatementComponent } from 'src/app/accounts/ministatement/ministatement.component';
import { AccountModel } from 'src/app/shared/model/account.model';
import { AccountsService } from 'src/app/shared/service/accounts.service';
import { BranchService } from 'src/app/shared/service/branch.service';
import { UserSessionService } from 'src/app/shared/service/usersession.service';

@Component({
  selector: 'app-accountdetails',
  templateUrl: './accountdetails.component.html',
  styleUrls: ['./accountdetails.component.css']
})
export class AccountdetailsComponent implements OnInit {
  isClicked:boolean = false;
  accountStatementForm:FormGroup;
  accountList:AccountModel[]=[];
  constructor(private accountsService:AccountsService, private userSessionService:UserSessionService
    , private modal:NgbModal, private branchService:BranchService) { }

  ngOnInit(): void {
    this.accountStatementForm = new FormGroup({
      'searchCriteria': new FormControl(null, Validators.required),
      'searchtext': new FormControl(null,Validators.required),
    });
  }
  onFilterAccount(){
    this.isClicked = true;
    if(this.accountStatementForm.invalid)
      return;

      let filterQry:string ='';
      if(this.accountStatementForm.get('searchCriteria').value === "AccNo"){
        filterQry = "AccountNumber_like=" + this.accountStatementForm.get('searchtext').value;
      }
      else if(this.accountStatementForm.get('searchCriteria').value === "CustomerId"){
        filterQry = "CustomerID_like=" + this.accountStatementForm.get('searchtext').value;
      }
      this.accountsService.getAccountbySearch(filterQry)
      .subscribe
      (
        (response:AccountModel[])=>
        {
          this.isClicked = false;
          this.accountList = response;
          this.accountList.forEach(a=>{
              a.BranchID = this.branchService.branchList.filter(br=> br.BranchID === a.BranchID)[0].BranchName;
          });
        },
        (error) => console.log(error)
      );
  }
  onReset(){
    this.accountStatementForm.reset();
  }
  viewMiniStatement(accountNumber:number){
    const modalRef = this.modal.open(MinistatementComponent, {scrollable: true, centered:true, size:'xl'});
    modalRef.componentInstance.accountNumber = accountNumber;
  }
}
