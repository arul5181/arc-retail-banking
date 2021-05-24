import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerModel } from 'src/app/shared/model/customer.model';
import { AccountsService } from 'src/app/shared/service/accounts.service';

@Component({
  selector: 'app-customerdetail',
  templateUrl: './customerdetail.component.html',
  styleUrls: ['./customerdetail.component.css']
})
export class CustomerdetailComponent implements OnInit {
  customerList:CustomerModel[];
  @Output() emitService:EventEmitter<any> =new EventEmitter();
  searchKeyword='';
  constructor(private accountsService:AccountsService, private currentModal:NgbActiveModal) { }

  ngOnInit(): void { 
    this.accountsService.getCustomer()
    .subscribe
    (
      (response:CustomerModel[])=>
      {
        this.customerList = response;
      },
      (error) => console.log(error)
    );
  }

  onSelectedCustomer(item : any){
    this.emitService.emit(item);
    this.currentModal.close();
  }
  onCloseModal(){
    this.currentModal.close();
  }
}
