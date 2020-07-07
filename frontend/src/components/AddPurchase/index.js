import React, {useContext, useEffect, useState} from "react"
import {FormControl, TextField, Button, ButtonGroup} from "@material-ui/core"
import {Link, useHistory} from 'react-router-dom'
import {DataContext, DataActions} from '../../provider/DataProvider'
import happySound from './happySound.mp3'
import neutralSound from './neutralSound.mp3'
import sadSound from './sadSound.mp3'


export const EMOTIONS = [
    {
        name: 'happy',
        displayName: 'fröhlich',
        sound: new Audio(happySound),
        emoji: '😊'
    },
    {
        name: 'neutral',
        displayName: 'neutral',
        sound: new Audio(neutralSound),
        emoji: '😐'
    },
    {
        name: 'sad',
        displayName: 'traurig',
        sound: new Audio(sadSound),
        emoji: '😢'
    }
]

const AddPurchase = () => {

    const ALLOWED_DISTANCE = 25
    const data = useContext(DataContext)
    const dataActions = useContext(DataActions)

    const [productName, setProductName] = useState("")
    const [price, setPrice] = useState(0)
    const [shopName, setShopName] = useState("")
    const [location, setLocation] = useState({})
    const [emotion, setEmotion] = useState('')



    let history = useHistory()

    const submitPurchase = () => {
        dataActions.addPurchase({
                productName,
                price,
                emotion,
                shop: {
                    name: shopName,
                    location
                }
            })
            history.push('/')
    }

    useEffect(() => {
        getLocation()
    }, [])

    const getLocation = () => {
        navigator.geolocation.getCurrentPosition(
            pos => {
                setLocation({lat: pos.coords.latitude, lng: pos.coords.longitude})
            }, err => {
                        console.log(err)
            }
        )
    }

    const calculateDistance = (posA, posB) => {
        // generally used geo measurement function
        const R = 6378.137; // Radius of earth in KM
        const dLat = posB.lat * Math.PI / 180 - posA.lat * Math.PI / 180;
        const dLng = posB.lng * Math.PI / 180 - posA.lng * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(posA.lat * Math.PI / 180) * Math.cos(posB.lat * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const d = R * c;
        return d * 1000; // meters
    }

    const findShopByLocation = () => {
        if(location.lat && location.lng) {
            const sortedPurchases = data.map(purchase => {
                const distance = (location.lat && purchase.shop?.location) ?
                    calculateDistance(purchase.shop.location, location) :
                    Number.MAX_SAFE_INTEGER
                return {distance, purchase}
            }).sort((a, b) => a.distance - b.distance)
            if(sortedPurchases[0].distance <= ALLOWED_DISTANCE){
                setShopName(sortedPurchases[0].purchase.shop.name)
        }

        }
    }

    const emotionClick = emotion => {
        setEmotion(emotion.name)
        emotion.sound.play()
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
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    {EMOTIONS.map((emo => (<Button onClick={() => emotionClick(emo)} disableElevation={emo.name !== emotion}>{emo.emoji}</Button>)))}
                </ButtonGroup>
                    <Button onClick={()=>submitPurchase()}>eintragen</Button>
            </FormControl>
            <Button onClick={findShopByLocation}>Laden durch Position finden</Button>
        </div>
    )
}

export default AddPurchase

