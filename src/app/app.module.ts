import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ValidateEqualModule } from 'ng-validate-equal';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomerRegistrationComponent } from './customer/customerregistration/customerregistration.component';
import { AppCommonRoutingModule } from './app-common.routing';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './shared/service/auth.service';
import { AccountsummaryComponent } from './customer/accountsummary/accountsummary.component';
import { FundtransferComponent } from './customer/fundtransfer/fundtransfer.component';
import { AccountcreationComponent } from './admin/accountcreation/accountcreation.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReportsComponent } from './accounts/reports/reports.component';
import { AuthGuardService } from './shared/service/authguard.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchPipe } from './shared/pipes/search.pipe';
import { CustomerdetailComponent } from './admin/accountcreation/customerdetail/customerdetail.component';
import { MinistatementComponent } from './accounts/ministatement/ministatement.component';
import { AccountdetailsComponent } from './admin/accountdetails/accountdetails.component';
import { ExportexcelService } from './shared/service/exportexcel.service';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CustomerRegistrationComponent,
    HeaderComponent,
    AccountsummaryComponent,
    FundtransferComponent,
    AccountcreationComponent,
    NotFoundComponent,
    ReportsComponent,
    SearchPipe,
    CustomerdetailComponent,
    MinistatementComponent,
    AccountdetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    //NgbActiveModal,
    HttpClientModule, 
    AppCommonRoutingModule
  ],
  providers: [AuthService,AuthGuardService,ExportexcelService],
  entryComponents:[CustomerdetailComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
