import Mongoose from "mongoose";
import { PurchaseModel } from "./purchases/purchases.model";

let database: Mongoose.Connection;
export const connect = () => {
    // add your own uri below
 //    const uri = "mongodb+srv://admin:fYySVZVOjbb52wlG@cluster0-seslf.mongodb.net/zaster?retryWrites=true&w=majority";
    const uri = process.env.ENV === 'DEV' ?
        "mongodb+srv://admin:fYySVZVOjbb52wlG@cluster0-seslf.mongodb.net/zaster?retryWrites=true&w=majority" :
        "mongodb://127.0.0.1:27017/zaster"
    if (database) {
        return;
    }
    Mongoose.connect(uri, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
    database = Mongoose.connection;
    database.once("open", async () => {
        console.log("Connected to database");
    });
    database.on("error", () => {
        console.log("Error connecting to database");
    });
};
export const disconnect = () => {
    if (!database) {
        return;
    }
    Mongoose.disconnect();
};