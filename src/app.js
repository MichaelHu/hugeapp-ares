import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import Todo from './views/todo';
import Graph from './views/graph';
import todoapp from './views/todo/modules/reducers';
import Trackable from './components/trackable';
import './components/iconfont/iconfont.css';
import './app.scss';

let topReducer = combineReducers( { todoapp } );
let store = createStore( topReducer );

let enableTrack = true;
Trackable.replay
    .init( store, /render/ )
    .start( 1000, enableTrack );

ReactDOM.render( 
    <Provider store={store}>
        <Graph />
    </Provider>
    , document.getElementById( 'root' ) 
);

