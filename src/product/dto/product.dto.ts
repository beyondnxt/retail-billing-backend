export class CreateProductDto {
    userId: number;
    code: string;
    barcode: string;
    name: string;
    printName: string;
    purchasePrice: number;
    taxPercentage: number;
    mrp: number;
    retailPrice: number;
    wholesalePrice: number;
    category: string;
    manufacturer: string;
    hsnCode: string;
    unitDescription: string;
    openingStock: number;
    inStock: number;
    reOrderQty: number;
    maxStockQty: number;
    location: string;
    createdOn: Date;
    createdBy: number
    updatedOn: Date;
    updatedBy: number
}