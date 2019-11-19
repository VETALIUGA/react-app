import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import reducer from './store/reducer';
import GitApi from './containers/GitApi';
   

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(ReduxThunk)
));

ReactDOM.render(
    <Provider store={store}>
        <GitApi />
    </Provider>,
    document.getElementById('root')
);
