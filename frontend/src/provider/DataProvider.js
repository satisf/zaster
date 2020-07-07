import React, {createContext, useEffect, useState, useCallback} from 'react'


export const DataContext = createContext({data: []})
export const DataActions = createContext({})



const fetchData = async () =>{
    const response = await fetch('/api/purchases')
    return await response.json()
}

export const DataProvider = ({children}) => {

    const [data, setData] = useState([])

    useEffect(() => {
            fetchData().then(newData => {
                setData(newData)
            })
            // eslint-disable-next-line
        }, [])

    const addPurchase = useCallback(async purchase => {
        setData([...data, purchase])
        fetch('api/purchase', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(purchase)
        })
    }, [data])




    return (
        <DataContext.Provider value={data}>
            <DataActions.Provider value={{addPurchase}}>
                {children}
            </DataActions.Provider>
        </DataContext.Provider>
    )
}

