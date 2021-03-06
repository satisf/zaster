import React, {createContext, useEffect, useState, useCallback} from 'react'
import useOnlineStatus from '@rehooks/online-status'


export const DataContext = createContext({data: []})
export const DataActions = createContext({})



const fetchData = async () =>{
    const response = await fetch('/api/purchases')
    return await response.json()
}

export const DataProvider = ({children}) => {
    const onlineStatus = useOnlineStatus()
    const [purchases, setPurchases] = useState([])
    const [categories, setCategories] = useState([])
    const [unsentPurchases , setUnsentPurchases] = useState([])

    useEffect(() => {
        if (onlineStatus) {
            const purchasesToSend = unsentPurchases
            purchasesToSend.forEach(purchase => {
                sendPurchaseToApi(purchase)
                setUnsentPurchases(unsentPurchases.filter(p => p !== purchase))
            })
        }
    }, [onlineStatus])

    useEffect(() => {
            fetchData().then(newData => {
                let newCategories = new Set()
                setPurchases(newData)
                newData.forEach(purchase => {
                    purchase.category && newCategories.add(purchase.category)
                })
                setCategories([...newCategories])
            })
            // eslint-disable-next-line
        }, [])

    const sendPurchaseToApi = purchase => {
        fetch('api/purchase', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(purchase)
            }).then(response => {
                      // everything is okay
                  }).catch(error => {
                      setUnsentPurchases([...unsentPurchases, purchase])
                  });
    }

    const addPurchase = useCallback(async purchase => {
        setPurchases([...purchases, purchase])
        sendPurchaseToApi(purchase)
    }, [purchases])

    const addCategory = newCat => setCategories([...categories, newCat])

    return (
        <DataContext.Provider value={{purchases, categories}}>
            <DataActions.Provider value={{addPurchase, addCategory}}>
                {children}
            </DataActions.Provider>
        </DataContext.Provider>
    )
}

