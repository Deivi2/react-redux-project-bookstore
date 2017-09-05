"use strict";

//IMPORT REACT
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
//REACT-ROUTER
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';


// IMPORT COMBINED REDUCERS
import reducers from './reducers/index';

// IMPORT ACTIONS
import {addToCart} from './actions/cartActions';
import {postBooks, deleteBooks, updateBooks} from './actions/booksActions';


// STEP 1 create the store
const middleware = applyMiddleware(thunk, logger);

//WE WILL PASS INITIAL STATE FROM SERVER STORE
const initialState = window.INITIAL_STATE;
console.log('INITIAL STATE:', initialState);
const store = createStore(reducers, initialState , middleware);

// store.subscribe(function () {
//    console.log('current state is: ' , store.getState());
//    // console.log('price: ' , store.getState()[1].price);
// });


import routes from './routes';

const Routes = (
    <Provider store={store}>
        {routes}
    </Provider>);

render(
    Routes, document.getElementById('app')
);
