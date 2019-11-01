import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { combineReducers, compose, applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import firebaseReducer from './redux-store/redux-reducers/firebase';
import FirebaseApp, { FirebaseContext } from './firebase';
import * as serviceWorker from './serviceWorker';

const rootReducer = combineReducers({
    firebase: firebaseReducer
});
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const enhancer = composeEnhancers(
    applyMiddleware(thunk)
);
const store = createStore(rootReducer, enhancer);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <FirebaseContext.Provider value={new FirebaseApp()}>
                <App />
            </FirebaseContext.Provider>
        </BrowserRouter>
    </Provider>
);
ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
