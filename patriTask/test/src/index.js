import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux';
import App from './App';
import postReducer from './Componnts/Reducers/postReducers'
import { Provider } from 'react-redux';

const store = createStore(postReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
