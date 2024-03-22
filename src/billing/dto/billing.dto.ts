export class CreateBillingDto{
    billId: string;
    inventoryId: number;
    date: string;
    customerName: string;
    subtotal: number;
    totalAmount: number;
    paymentMethod: string;
    cashReceived: number | null;
    change: number | null;
    createdOn: Date;
    createdBy: number
}