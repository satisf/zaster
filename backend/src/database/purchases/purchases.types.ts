import { Document, Model } from "mongoose";
export interface IPurchase {
    productName: string;
    shop?: IShop;
    price: number;
    gtinCode?: string;
    category?: string;
    emotion?: string;
    dateOfPurchase?: Date;
}

export interface IShop {
    name?: string;
    location?: {
        lat: number;
        lng: number;
    }
}
export interface IPurchaseDocument extends IPurchase, Document {}
export interface IPurchaseModel extends Model<IPurchaseDocument> {
    findByGtinCode: (
            this: IPurchaseModel,
            { gtinCode }: {gtinCode: string}
        ) => Promise<IPurchaseDocument[]>;
    findByShopName: (
        this: IPurchaseModel,
        {shop}: { shop: IShop }
    ) => Promise<IPurchaseDocument[]>;
    findByLocation: (
        this: IPurchaseModel,
        {range, lat, lng}: {
            range: number,
            lat: number,
            lng: number
        }
    ) => Promise<IPurchaseDocument[]>;
}