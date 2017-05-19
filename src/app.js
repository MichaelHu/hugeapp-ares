import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import Todo from './views/todo';
import Graph from './views/graph';
import todoappReducer from './views/todo/modules/reducers';
import graphReducer from './views/graph/reducers';
import Trackable from './components/trackable';
import './components/iconfont/iconfont.css';
import './app.scss';

let topReducer = combineReducers( { todoapp: todoappReducer, graph: graphReducer } );
let store = createStore( topReducer );

let enableTrack = false;
Trackable.replay
    .init( store, /render/ )
    .start( 1000, enableTrack );

ReactDOM.render( 
    <Provider store={store}>
        <Graph />
    </Provider>
    , document.getElementById( 'root' ) 
);

