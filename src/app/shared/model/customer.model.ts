export interface CustomerModel{
    id?:number;
    Salutation: string;
    FirstName: string;
    LastName: string;
    Email: string;
    Password:string;
    CustomerId: string;
    PANNo: string;
    MobileNumber:number;
    Gender:string;
    DateOfBirth: Date;
    RoleType:string;
    IsAccountMapped :boolean;
    IsAccountActive:boolean;
}