import { Schema } from "mongoose";
import {findByGtinCode, findByLocation, findByShopName} from "./purchases.statics";
const PurchaseSchema = new Schema({
    productName: String,
    shop: {
      name: String,
      location: {
        lat: Number,
        lng: Number
      }
    },
    price: Number,
    gtinCode: String,
    category: String,
    emotion: String,
    dateOfPurchase: {
        type: Date,
        default: new Date()
    }
});

PurchaseSchema.statics.findByGtinCode = findByGtinCode;
PurchaseSchema.statics.findByShopName = findByShopName;
PurchaseSchema.statics.findByLocation = findByLocation;


export default PurchaseSchema;