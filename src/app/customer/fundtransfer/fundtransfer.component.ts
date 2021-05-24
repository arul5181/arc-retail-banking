import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountModel } from 'src/app/shared/model/account.model';
import { TransactionModel } from 'src/app/shared/model/transaction.model';
import { AccountsService } from 'src/app/shared/service/accounts.service';
import { TransactionService } from 'src/app/shared/service/transaction.service';
import { UserSessionService } from 'src/app/shared/service/usersession.service';
import uniqueRandom from 'unique-random';

@Component({
  selector: 'app-fundtransfer',
  templateUrl: './fundtransfer.component.html',
  styleUrls: ['./fundtransfer.component.css']
})
export class FundtransferComponent implements OnInit {
accountList: AccountModel[];
allaccountList: AccountModel[];
customerAccountNo: number;
currentBalance:number;
fundTransferForm: FormGroup;
  constructor(private accountsService:AccountsService, private transactionService: TransactionService
    ,private userSessionService:UserSessionService, private router:Router) { }

  ngOnInit(): void {
    this.accountsService.getAccounts()
    .subscribe
    (
      (response:AccountModel[])=>
      {
        this.allaccountList = response;
        this.accountList = response.filter(f=>f.CustomerID !== this.userSessionService.user.CustomerId);
        this.customerAccountNo = response.filter(f=>f.CustomerID === this.userSessionService.user.CustomerId)[0].AccountNumber;
        this.currentBalance = response.filter(f=>f.CustomerID === this.userSessionService.user.CustomerId)[0].CurrentBalance;
        
      },
      (error) => console.log(error)
    );
    this.fundTransferForm = new FormGroup({
      'fromAccountNo': new FormControl({value: this.customerAccountNo,disabled:true}, Validators.required),
      'currentBalance': new FormControl({value: this.currentBalance,disabled:true}, Validators.required),
      'transactionType': new FormControl(null, Validators.required),
      'toAccountNo': new FormControl(null, Validators.required),
      'amount': new FormControl(null, Validators.required),
      'remarks': new FormControl(null, Validators.required)
    });
  }
  onTransferFund(){

    const transactionID=uniqueRandom(2000000000,4999999999)();
    let transactionDetail:TransactionModel={
      CustomerID:this.userSessionService.user.CustomerId,
      FromAccountNumber:this.customerAccountNo,
      ToAccountNumber:+this.fundTransferForm.get('toAccountNo').value,
      TransactionType:this.fundTransferForm.get('transactionType').value,
      TransactionAmount:this.fundTransferForm.get('amount').value,
      TransactionRemarks:this.fundTransferForm.get('remarks').value,
      TransactionDate: new Date(),
      TransactionStatus:'Success',
      DebitBalanceonDate: this.currentBalance - this.fundTransferForm.get('amount').value,
      CreditBalanceonDate: this.fundTransferForm.get('amount').value,
      TransactionID : transactionID
  };
  this.currentBalance = transactionDetail.DebitBalanceonDate;
  let payeeAccountDetail:AccountModel = this.allaccountList.filter(p=>p.AccountNumber == transactionDetail.ToAccountNumber)[0];
  let payerAccountDetail:AccountModel = this.allaccountList.filter(p=>p.AccountNumber == transactionDetail.FromAccountNumber)[0];
  transactionDetail.CreditBalanceonDate += payeeAccountDetail.CurrentBalance;
  this.accountsService.updateCurrentBalance(payerAccountDetail.id,this.currentBalance)
    .subscribe();

    let payeeBalance:number = payeeAccountDetail.CurrentBalance + transactionDetail.TransactionAmount;
    this.accountsService.updateCurrentBalance(payeeAccountDetail.id, payeeBalance)
    .subscribe();
  

    this.transactionService.fundTransfer(transactionDetail)
    .subscribe(response =>{
      if(response.status === 200 || response.status === 201){
        alert('Transaction is processed successfully. Transaction ID is - '+ transactionDetail.TransactionID);
        this.onReset();
        this.router.navigate(['/customerdashboard']);
      }
    });
  }
  onReset(){
    this.fundTransferForm.reset();
    
  let payerAccountDetail:AccountModel = this.allaccountList.filter(p=>p.CustomerID == this.userSessionService.user.CustomerId)[0];
    this.fundTransferForm.patchValue({
      'fromAccountNo': payerAccountDetail.AccountNumber,
      'currentBalance': payerAccountDetail.CurrentBalance
    });
  }
}
