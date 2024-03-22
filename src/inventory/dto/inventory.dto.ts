export class CreateInventoryDto{
    transactionId: string;
    productCode: string;
    date: string;
    type: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    location: string;
    remarks: string;
    createdOn: Date;
    createdBy: number
    updatedOn: Date;
    updatedBy: number
}