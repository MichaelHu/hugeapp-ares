import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import Todo from './views/todo';
import todoapp from './views/todo/modules/reducers';
import Trackable from './components/trackable';

let topReducer = combineReducers( { todoapp } );
let store = createStore( topReducer );

let enableTrack = true;
Trackable.replay
    .init( store, /render|did-update|did-mount/ )
    .start( 1000, enableTrack );

ReactDOM.render( 
    <Provider store={store}>
        <Todo />
    </Provider>
    , document.getElementById( 'root' ) 
);

