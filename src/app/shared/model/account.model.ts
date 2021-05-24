export interface AccountModel{
    id?:number;
    CustomerID: string;
    AccountNumber: number;
    AccountType:string;
    BranchID: string;
    OpeningBalance:number;
    CurrentBalance: number;
}