import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TransactionModel } from 'src/app/shared/model/transaction.model';
import { TransactionService } from 'src/app/shared/service/transaction.service';

@Component({
  selector: 'app-ministatement',
  templateUrl: './ministatement.component.html',
  styleUrls: ['./ministatement.component.css']
})
export class MinistatementComponent implements OnInit {
  accountNumber : number = 0;
  transactionDetail: TransactionModel[] = [];
  constructor(private activeModal: NgbActiveModal,private transactionService: TransactionService
    ,private router:Router) { }

  ngOnInit(): void {
    if(this.accountNumber === 0){
      this.router.navigate(['/customerdashboard']);
    }
    else{
    this.transactionService.getMiniStatement(this.accountNumber)
    .subscribe
    (
      (response:TransactionModel[])=>
      {
        this.transactionDetail = response;
        this.transactionDetail.forEach(t=> {
          t.TransactionType = t.FromAccountNumber === this.accountNumber ? 'Debit' : 'Credit';
          t.BalanceonDate = t.TransactionType ==='Debit' ? t.DebitBalanceonDate : t.CreditBalanceonDate;
          t.DebitBalanceonDate = null;
          t.CreditBalanceonDate = null;
        });
      },
      (error) => console.log(error)
    );
    }
  } 
  onCloseModal(){
    this.activeModal.close();
  }
  onDetailStatement(){
    this.transactionService.accountNumber = this.accountNumber;
    this.router.navigate(['/accountstatement']);
    this.onCloseModal();
  }
}
