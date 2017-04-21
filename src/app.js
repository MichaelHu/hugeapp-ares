import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import Todo from './views/todo';
import todoapp from './views/todo/reducers';
import replay from './views/todo/utils/replay';

let topReducer = combineReducers( { todoapp } );
let store = createStore( topReducer );

// ReactDOM.render( <Todo />, document.getElementById( 'root' ) );
ReactDOM.render( 
    <Provider store={store}>
        <Todo />
    </Provider>
    , document.getElementById( 'root' ) 
);

replay.start( 1500 );
