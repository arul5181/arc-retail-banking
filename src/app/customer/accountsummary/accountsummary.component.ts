import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountModel } from 'src/app/shared/model/account.model';
import { TransactionModel } from 'src/app/shared/model/transaction.model';
import { AccountsService } from 'src/app/shared/service/accounts.service';
import { TransactionService } from 'src/app/shared/service/transaction.service';
import { UserSessionService } from 'src/app/shared/service/usersession.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MinistatementComponent } from 'src/app/accounts/ministatement/ministatement.component';
@Component({
  selector: 'app-accountsummary',
  templateUrl: './accountsummary.component.html',
  styleUrls: ['./accountsummary.component.css']
})
export class AccountsummaryComponent implements OnInit {
  accountList: AccountModel[];
  transactionDetail: TransactionModel[];
  constructor(private accountsService:AccountsService, private transactionService: TransactionService
    ,private userSessionService:UserSessionService, private router:Router, private modal:NgbModal) { }

  ngOnInit(): void {
    this.accountsService.getAccountbyCustomerID(this.userSessionService.user.CustomerId)
    .subscribe
    (
      (response:AccountModel[])=>
      {
        this.accountList = response;
      },
      (error) => console.log(error)
    );
  }

  viewMiniStatement(accountNumber:number){
    const modalRef = this.modal.open(MinistatementComponent, {scrollable: true, centered:true, size:'xl'});
    modalRef.componentInstance.accountNumber = accountNumber;
  }
}
