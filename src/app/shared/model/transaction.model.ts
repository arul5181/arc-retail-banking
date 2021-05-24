export interface TransactionModel{
    CustomerID: string;
    TransactionDate:Date;
    TransactionType:string;
    FromAccountNumber: number;
    ToAccountNumber: number;
    TransactionAmount: number;
    TransactionRemarks:string;
    BalanceonDate?: number;
    TransactionID:number;
    TransactionStatus: string;
    DebitBalanceonDate?: number;
    CreditBalanceonDate?: number;
}