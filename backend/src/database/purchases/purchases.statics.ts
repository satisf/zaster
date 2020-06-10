import {IPurchaseDocument, IPurchaseModel, IShop} from "./purchases.types";
// export async function findOneOrCreate(
//     this: IPurchaseModel,
//     purchaseId: string
// ): Promise<IPurchaseDocument> {
//     const record = await this.findOne({ _id: purchaseId });
//     if (record) {
//         return record;
//     } else {
//         return this.create({ _id: purchaseId });
//     }
// }
export async function findByGtinCode(
    this: IPurchaseModel,
    gtinCode: string
): Promise<IPurchaseDocument[]> {
    return this.find({ gtinCode: { $eq: gtinCode } });
}

export async function findByShopName(
    this: IPurchaseModel,
    shop: IShop
): Promise<IPurchaseDocument[]> {
    return this.find({ shop: {name: shop.name}});
}

export async function findByLocation(
    this: IPurchaseModel,
    range: number,
    lat: number,
    lng: number
): Promise<IPurchaseDocument[]> {
    return this.find({
        'shop.location.lat': {$gte: (lat - range), $lte: (lat + range)},
        'shop.location.lng': {$gte: (lng - range), $lte: (lng + range)}
    })
}