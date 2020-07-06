import React, {createContext, useEffect, useState} from 'react'


export const DataContext = createContext({data: []})



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


    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    )
}

