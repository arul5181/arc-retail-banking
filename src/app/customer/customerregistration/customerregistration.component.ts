import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../shared/service/user.service';
import { CustomerModel } from '../../shared/model/customer.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customerregistration',
  templateUrl: './customerregistration.component.html',
  styleUrls: ['./customerregistration.component.css']
})
export class CustomerRegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  constructor(private userService:UserService, private router:Router) { }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      'salutation': new FormControl(null, Validators.required),
      'fname': new FormControl(null, Validators.required),
      'lname': new FormControl(null, Validators.required),
      'emailid': new FormControl(null, [Validators.required,Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      'passwords': new FormGroup({
        'password': new FormControl(null, Validators.required),
        'cpassword': new FormControl(null, Validators.required)
      },{validators:this.confirmPasswordEqual}),
      'terms': new FormControl(false, Validators.requiredTrue),
      'customerid': new FormControl(null, Validators.required),
      'mobilenumber': new FormControl(null, Validators.required),
      'gender': new FormControl(null, Validators.required),
      'dateofbirth': new FormControl(null, Validators.required),
      'panno': new FormControl(null, [Validators.required]),
    });
  }

  onSubmitRegister(){
    if (this.registrationForm.invalid) {
      return;
    }
    
    console.log(this.registrationForm);
    let users:CustomerModel = {FirstName: this.registrationForm.get('fname').value, 
                            LastName: this.registrationForm.get('lname').value,
                            Salutation: this.registrationForm.get('salutation').value,
                            Email: this.registrationForm.get('emailid').value,
                            Password: this.registrationForm.get('passwords.password').value,
                            CustomerId: this.registrationForm.get('customerid').value,
                            MobileNumber: this.registrationForm.get('mobilenumber').value,
                            Gender: this.registrationForm.get('gender').value,
                            DateOfBirth: this.registrationForm.get('dateofbirth').value,
                            PANNo: this.registrationForm.get('panno').value,
                            RoleType: 'U',
                            IsAccountMapped: false,
                            IsAccountActive: true
                        };

  //   let users:CustomerModel = {FirstName: 'ARC Banking', 
  //   LastName: 'Admin',
  //   Salutation: 'Mr',
  //   Email: 'arcadmin@arc.com',
  //   Password: 'admin@123',
  //   CustomerId: 'ADMIN',
  //   MobileNumber: 9876543210,
  //   Gender: 'M',
  //   DateOfBirth: null,
  //   RoleType: 'A',
  //   IsAccountMapped: false,
  //   IsAccountActive: true
  // };
    this.userService.createUser(users)
    .subscribe(response =>{
      if(response.status === 200 || response.status === 201){
        alert('Customer Created Successfully! Will get an update once Account mapped');
        this.onReset();
        this.router.navigate(['/home']);
      }
    });
  }
  onReset() {
      this.registrationForm.reset();
  }
  confirmPasswordEqual(controls: FormGroup):{[response:string]:boolean}{
    if(controls.get('password').value !== controls.get('cpassword').value){
      return {'mismatch':true};
    }
    return null;
  }
}
