import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BranchModel } from 'src/app/shared/model/branch.model';
import { BranchService } from 'src/app/shared/service/branch.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountsService } from 'src/app/shared/service/accounts.service';
import { CustomerModel } from 'src/app/shared/model/customer.model';
import { CustomerdetailComponent } from './customerdetail/customerdetail.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountModel } from 'src/app/shared/model/account.model';
import uniqueRandom from 'unique-random';
@Component({
  selector: 'app-accountcreation',
  templateUrl: './accountcreation.component.html',
  styleUrls: ['./accountcreation.component.css']
})
export class AccountcreationComponent implements OnInit {
branchDetails: BranchModel[];
customerDetail : CustomerModel;
accountCreationForm: FormGroup;
  constructor(private branchService:BranchService, private modal:NgbModal, private accountsService:AccountsService) { }

  ngOnInit(): void {
    this.branchDetails = this.branchService.branchList;
    this.customerDetail = {CustomerId:'',DateOfBirth: null,Email:'', FirstName:'', PANNo:''
                          ,Gender:'', IsAccountActive: false,IsAccountMapped:false,LastName:'',MobileNumber:0
                          ,Password:'', RoleType:'', Salutation:''};
    this.accountCreationForm = new FormGroup({
      'accounttype': new FormControl({value:'S', disabled:true}, Validators.required),
      'customer': new FormGroup({
        'customerId': new FormControl({value:null, disabled:true}, Validators.required),
        'customername': new FormControl({value:null, disabled:true}, Validators.required)
      }),
      'branch': new FormControl(null, Validators.required),
      'balance': new FormControl(null, Validators.required)
    });
  }
  openPopup(){   
    const modalRef = this.modal.open(CustomerdetailComponent,{ scrollable: true});
    modalRef.componentInstance.emitService.subscribe((data)=>{
      this.customerDetail = data;
    })
  }
  onOpenAccount(){
    const random=uniqueRandom(10000000,19999999)();
    console.log(this.customerDetail);
    let accountdetail:AccountModel={
        AccountNumber:random,
        AccountType:this.accountCreationForm.get('accounttype').value,
        CustomerID:this.accountCreationForm.get('customer.customerId').value,
        BranchID:this.accountCreationForm.get('branch').value,
        OpeningBalance:this.accountCreationForm.get('balance').value,
        CurrentBalance:this.accountCreationForm.get('balance').value
    };
    this.accountsService.activateAccountUserMapped(this.customerDetail.id)
    .subscribe();
    this.accountsService.openAccount(accountdetail)
    .subscribe(response =>{
      if(response.status === 200 || response.status === 201){
        alert('Account Opened Successfully with this customerid. Your Account number is - '+ random);
        this.onReset();
      }
    });
  }
  onReset(){
    this.accountCreationForm.reset();
    this.accountCreationForm.patchValue({
      'accounttype':'S'});
  }
}
