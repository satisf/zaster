import React, {useEffect, useState} from "react";
import {Button} from "@material-ui/core"
import {Link} from "react-router-dom"

const Home = () => {

    const [data, setData] = useState([])

    const fetchData = async () =>{
        const response = await fetch('/api/purchases')
        const body = await response.json()
        return body
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
            {data.map(purchase => {
                return <p>{JSON.stringify(purchase)}</p>
            })}
        </div>
    )
}

export default Home