import React, {useContext} from "react";
import {Button, Card, CardContent} from "@material-ui/core"
import {Link} from "react-router-dom"
import {DataContext} from '../../provider/DataProvider'
import {EMOTIONS} from "../AddPurchase";

const Home = () => {

    const data = useContext(DataContext)

    return (
        <div>
            <Link to="/add">
                <Button>neuen Kauf hinzufügen</Button>
            </Link>
            {data.map((purchase, idx) => {
                return (
                    <Card key={purchase?.productName + idx}>
                        <CardContent>
                            <p>{purchase?.productName && purchase.productName}</p>
                            <p>{purchase?.price && purchase.price}</p>
                            <p>{purchase?.emotion && EMOTIONS.filter(emo => emo.name === purchase.emotion)[0].emoji}</p>
                            <p>{purchase?.shop?.name && purchase.shop.name}</p>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}

export default Home