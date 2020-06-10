import { model } from "mongoose";
import { IPurchaseDocument } from "./purchases.types";
import PurchaseSchema from "./purchases.schema";

export const PurchaseModel = model<IPurchaseDocument>("purchase", PurchaseSchema);