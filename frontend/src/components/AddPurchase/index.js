import React, {useContext, useState} from "react"
import {FormControl, TextField, Button} from "@material-ui/core"
import {Link, useHistory} from 'react-router-dom'
import {DataContext} from '../../provider/DataProvider'


const AddPurchase = () => {

    let data = useContext(DataContext)

    const [productName, setProductName] = useState("")
    const [price, setPrice] = useState(0)
    const [shopName, setShopName] = useState("")
    const [location, setLocation] = useState({})

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
                shop: {
                    name: shopName,
                    location: {
                        lat: location.coords.latitude,
                        lng: location.coords.longitude
                    }
                }
            })
        }).then(()=> {
            history.push('/')
        })
    }

    const getLocation = () => {
        navigator.geolocation.getCurrentPosition(
            pos => {
                setLocation(pos)
            }, err => {
                        console.log(err)
            }
        )
    }


    return (
        <div>
            {console.log(data)}
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
                {location.coords && (
                    <TextField
                        name="shopLocation"
                        type="text"
                        label="Position"
                        value={`${location.coords.latitude} ${location.coords.longitude}`}
                        disabled/>
                )}
                    <Button onClick={()=>submitPurchase()}>eintragen</Button>
            </FormControl>
            <Button onClick={getLocation}>Position hinzufügen</Button>
        </div>
    )
}

export default AddPurchase

