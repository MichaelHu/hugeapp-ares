import { combineReducers } from 'redux';
import Trackable from '../../../components/trackable';

function todos( state = [], action ) {
    switch( action.type ) {
        case 'TODO_ADD':
            return [
                ...state
                , {
                    content: action.content
                    , id: action.id
                    , completed: false
                }
            ];
        case 'TODO_TOGGLE':
            return state.map( ( item, index ) => {
                let newItem;
                if ( item.id  === action.id ) {
                    newItem =Object.assign( {}
                        , item, { completed: !item.completed }
                    );
                }
                return item;
            } );
        case 'TODO_DELETE':
            let _newState = [];
            for ( var i = 0; i < state.length; i++ ) {
                if ( state[ i ].id != action.id ) {
                    _newState.push( state[ i ] );
                }
            }
            return _newState;

        default:
            return state;
    }
}

function cur_todo( state = {}, action ) {
    switch( action.type ) {
        case 'TODO_SWITCH_CURRENT':
            return {
                id: action.id
                , content: action.content
            };
        default:
            return state;
    }
}

function __lastAction( state = 'NO_ACTION', action ) {
    Trackable.replay.traceAction( action.type );
    return state;
}

const todoapp = combineReducers( {
    todos
    , cur_todo
    , __lastAction
} );

export default todoapp;
