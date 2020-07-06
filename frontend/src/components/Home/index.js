import React, {useEffect, useState} from "react";
import {Button, Card, CardContent} from "@material-ui/core"
import {Link} from "react-router-dom"

const Home = () => {

    const [data, setData] = useState([])

    const fetchData = async () =>{
        const response = await fetch('/api/purchases')
        return await response.json()
    }

    useEffect(() => {
        fetchData().then(newData => {
            setData(newData)
            console.log(data)
        })
        // eslint-disable-next-line
    }, [])

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
                            <p>{purchase?.shop?.name && purchase.shop.name}</p>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}

export default Home