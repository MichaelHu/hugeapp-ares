import * as at from './constants';
import { combineReducers } from 'redux';
import vis from 'vis';

function layout( state = at.GRAPH_LAYOUT_FORCE, action ) {
    switch ( action.type ) {
        case at.GRAPH_LAYOUT_LINE:
        case at.GRAPH_LAYOUT_GRID:
        case at.GRAPH_LAYOUT_CIRCLE:
        case at.GRAPH_LAYOUT_FORCE:
        case at.GRAPH_LAYOUT_TREE:
            return action.type;
        default:
            return state;
    }
}

function data( state = { 
        nodes: new vis.DataSet( [] )
        , edges: new vis.DataSet( [] )
    }, action ) {
    switch ( action.type ) {
        case at.GRAPH_DATA_SUCCESS:
            return Object.assign( 
                {}
                , state
                , {
                    nodes: new vis.DataSet( action.data.nodes )
                    , edges: new vis.DataSet( action.data.edges )
                }
            );

        case at.GRAPH_DATA_SUCCESS:
        default: 
            return state;
    }
}

export default combineReducers( { layout, data } );
