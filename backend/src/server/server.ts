import express from "express";
import { connect } from "../database/database";
import {PurchaseModel} from "../database/purchases/purchases.model";


const app = express();

app.use(express.json())

const port = 5002;
connect();

app.post('/api/purchase', (req, res) => {
    PurchaseModel.create(req.body).then(() => res.send("ok"), () => res.send("error"))
})

app.post('/api/purchase/:purchaseId/edit', (req, res) => {
    PurchaseModel.replaceOne({_id: req.params.purchaseId}, req.body).then(() => res.send("ok"), () => res.send("error"))
})

app.get('/api/purchase/:purchaseId', (req, res) => {
    PurchaseModel.findById(req.params.purchaseId).then(purchase => {
        return res.send(purchase)
    }, () => {
        res.status(404)
        return res.send("not found")
    })
})

app.get('/api/purchases', (req, res) => {
    PurchaseModel.find().then(purchases => {
        return res.send(purchases)
    }, () => {
        res.status(404)
        return res.send("not found")
    })
})

app.delete('/api/purchase/:purchaseId/delete', (req, res) => {
    PurchaseModel.deleteOne({_id: req.params.purchaseId}).then(() => res.send("ok"), () => res.send("error"))
})


app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});