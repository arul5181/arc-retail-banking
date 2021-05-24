import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TransactionModel } from 'src/app/shared/model/transaction.model';
import { ExportexcelService } from 'src/app/shared/service/exportexcel.service';
import { TransactionService } from 'src/app/shared/service/transaction.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})

export class ReportsComponent implements OnInit {
  transactionDetail:TransactionModel[]=[];
  accountNumber : number = 0;
  filterType='';
  isClicked:boolean = false;
  accountStatementForm:FormGroup;
  constructor(private transactionService: TransactionService
    ,private router:Router, private excelService:ExportexcelService) { }

  ngOnInit(): void {
    if(this.transactionService.accountNumber === 0){
      this.router.navigate(['/customerdashboard']);
    }
    else{
      this.accountNumber = this.transactionService.accountNumber;
      this.accountStatementForm = new FormGroup({
        'filterCriteria': new FormControl(null, Validators.required),
        'transactionType': new FormControl(null,Validators.required),
        'daterange': new FormGroup({
          'fromdate': new FormControl(null, Validators.required),
          'todate': new FormControl(null, Validators.required)
        }),
        'amountrange': new FormGroup({
          'amountrangetype': new FormControl(null, Validators.required),
          'amount': new FormControl(null, Validators.required)
        })
      });
    }
  }
  onFilterReport(){
    console.log(this.accountStatementForm);
    this.isClicked= true;
    let validFilter: boolean = false;
    let filterQry : string ='';
    if(this.accountStatementForm.get('filterCriteria').status==="VALID"){
      if(this.accountStatementForm.get('amountrange').status==="VALID" 
        && this.accountStatementForm.get('filterCriteria').value==="Amount Range"){
        validFilter = true;
        filterQry += "q=" + this.accountNumber;
        filterQry += "&TransactionAmount" ;
        switch(this.accountStatementForm.get('amountrange.amountrangetype').value){
          case 'GT':
            filterQry += "_gte=";
            break;
          case 'LT':
            filterQry += "_lte=";
              break;
          default:
            filterQry += "=";
            break;
        }
        filterQry += this.accountStatementForm.get('amountrange.amount').value;
      }
      else if(this.accountStatementForm.get('daterange').status==="VALID" 
        && this.accountStatementForm.get('filterCriteria').value==="Date Range"){
        validFilter = true;
        filterQry += "q=" + this.accountNumber;
      }
      else if(this.accountStatementForm.get('transactionType').status==="VALID" 
        && this.accountStatementForm.get('filterCriteria').value==="Transaction Type"){
        validFilter = true;
        filterQry = this.accountStatementForm.get('transactionType').value === "Debit" ? "FromAccountNumber=":"ToAccountNumber=";
        filterQry += this.accountNumber;
      }
    }
    this.transactionDetail = [];

    if(!validFilter)
      return;
console.log(filterQry);
    this.transactionService.getDetailedStatement(filterQry)
    .subscribe
    (
      (response:TransactionModel[])=>
      {
        this.transactionDetail = response;
        this.isClicked = false;
        if(this.accountStatementForm.get('filterCriteria').value==="Date Range"){
          var fromDate = this.getdateonly(new Date(this.accountStatementForm.get('daterange.fromdate').value));
          var toDate = this.getdateonly(new Date(this.accountStatementForm.get('daterange.todate').value));
          this.transactionDetail =[];

          response.forEach(t => {
            var transDate = this.getdateonly(new Date(t.TransactionDate));
            if(transDate >= fromDate && transDate <= toDate){
              this.transactionDetail.push(t);
            }
          });
        }
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
  getdateonly(dateTime){
    var date = new Date(dateTime.getTime());
    date.setHours(0,0,0,0);
    return date;
  }
  onReset(){
    this.transactionDetail = [];
    this.isClicked = false;
    this.accountStatementForm.reset();
  }
  onExporttoExcel(){
    let exportDetails : any[] =[];
    this.transactionDetail.filter( tran =>{
      exportDetails.push({
        'TransactionID' : tran.TransactionID.toString(),
        'TransactionDate' : tran.TransactionDate,
        'TransactionType' : tran.TransactionType,
        'TransactionAmount' : tran.TransactionAmount,
        'Remarks' : tran.TransactionRemarks,
        'FromAccountNumber' : tran.FromAccountNumber,
        'ToAccountNumber' : tran.ToAccountNumber,
        'TransactionStatus' : tran.TransactionStatus,
        'BalanceonDate' : tran.BalanceonDate
      });
    });

    this.excelService.exportAsExcelFile(exportDetails, 'Account_'+ this.accountNumber);
  }
}
