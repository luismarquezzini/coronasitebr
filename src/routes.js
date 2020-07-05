import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Geral from './pages/geral';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Geral}/>
            </Switch>
        </BrowserRouter>
    )
}