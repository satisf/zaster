import React from 'react'
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from '../Home'
import AddPurchase from '../AddPurchase'

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/add">
                    <AddPurchase />
                </Route>
            </Switch>

        </BrowserRouter>
    )
}

export default Router