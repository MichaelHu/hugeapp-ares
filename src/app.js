import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import Todo from './views/todo';
import todoapp from './views/todo/modules/reducers';
import Trackable from './components/trackable';

let topReducer = combineReducers( { todoapp } );
let store = createStore( topReducer );

ReactDOM.render( 
    <Provider store={store}>
        <Todo />
    </Provider>
    , document.getElementById( 'root' ) 
);

Trackable.replay.start( 500 );
