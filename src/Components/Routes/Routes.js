import React from 'react'
import Cart from '../Cart/Cart'
import { Switch } from '@material-ui/core'
import { Route } from '@material-ui/core';

const Routes = () => {
  return (
    <div>
      <Switch >
        <Route path="/cart" exact>
            <Cart/>
        </Route>
      </Switch>
    </div>
  )
}

export default Routes
