import { Injectable, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountcreationComponent } from "./admin/accountcreation/accountcreation.component";
import { ReportsComponent } from "./accounts/reports/reports.component";
import { AccountsummaryComponent } from "./customer/accountsummary/accountsummary.component";
import { CustomerRegistrationComponent } from "./customer/customerregistration/customerregistration.component";
import { FundtransferComponent } from "./customer/fundtransfer/fundtransfer.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { AuthGuardService } from "./shared/service/authguard.service";
import { AccountdetailsComponent } from "./admin/accountdetails/accountdetails.component";

Injectable({providedIn:'root'})
const appRoutes : Routes =[
    {path:'',component:HomeComponent},
    {path:'home',component:HomeComponent},
    {path:'userregistration',component:CustomerRegistrationComponent},
    {path:'login',component:LoginComponent},
    {path:'customerdashboard',component:AccountsummaryComponent, canActivate:[AuthGuardService]},
    {path:'transfer',component:FundtransferComponent, canActivate:[AuthGuardService]},
    {path:'accountstatement',component:ReportsComponent, canActivate:[AuthGuardService]},
    {path:'accountcreation',component:AccountcreationComponent, canActivate:[AuthGuardService]},
    {path:'searchaccount',component:AccountdetailsComponent, canActivate:[AuthGuardService]},
    {path:'404-not-found',component:NotFoundComponent},
    //{ path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule), canActivate:[AuthGuardService] },
    {path:'**', redirectTo:'/404-not-found', pathMatch:'full'}
  ]
@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports:[
        RouterModule
    ]
})
export class AppCommonRoutingModule{

}