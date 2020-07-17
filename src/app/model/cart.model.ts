export class cartmodel{
    _id:String;
    username: String;
    email: String;
    phoneNumber: String;
    address: String;
    listCart:String;
    totalQty: Number;
    totalPrice: Number;
    createdAt:   Number;
    updatedAt:   Number; 
}
export class listCart{
    idItem:string;
    title:string;
    soluong:number;
    totalPriceItem: number;
}