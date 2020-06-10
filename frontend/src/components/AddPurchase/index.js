import React, {useState} from "react"
import {FormControl, TextField, Button} from "@material-ui/core"
import {Link, useHistory} from 'react-router-dom'



const AddPurchase = () => {

    const [productName, setProductName] = useState("")
    const [price, setPrice] = useState(0)
    const [shopName, setShopName] = useState("")

    let history = useHistory()

    const submitPurchase = () => {
        fetch('api/purchase', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productName,
                price,
                shop: {name: shopName}
            })
        }).then(()=> {
            history.push('/')
        })
    }

    return (
        <div>
            <Link to="/"><Button>zurück</Button></Link>
            <FormControl>
                <TextField
                    name="productName"
                    type="text"
                    label="Produktname"
                    value={productName}
                    onChange={(event => setProductName(event.target.value))}/>
                <TextField
                    name="price"
                    type="number"
                    label="Preis"
                    value={price}
                    onChange={(event => setPrice(event.target.value))}/>
                <TextField
                    name="shopName"
                    type="text"
                    label="Laden"
                    value={shopName}
                    onChange={(event => setShopName(event.target.value))}/>
                    <Button onClick={()=>submitPurchase()}>eintragen</Button>
            </FormControl>
        </div>
    )
}

export default AddPurchase

