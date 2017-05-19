import React, { Component } from 'react';
import { connect } from 'react-redux';
import Trackable from '../../components/trackable';
import Toolbar from './components/toolbar'; 
import Graph from './components/graph'; 
import * as actions from './actions';
import css from './index.scss';

let replay = Trackable.replay;

class GraphView extends Trackable {
    constructor( props ) {
        super( props, 'TodoView' );
    }

    componentDidMount() {
        super.componentDidMount();
        setTimeout( () => {
            let info = this._replay_name + ' data ready' ;
            replay.add( this, info );
        }, 1000 );
    }

    render() {
        super.render();
        return (
            <div ref="dom" className={css.graphview}>
                <h3>基于图论的大数据可视化系统 - V1.0</h3>
                <Toolbar {...this.props} />
                <Graph {...this.props} />
            </div>
        );
    }
}

const mapStateToProps = ( state ) => {
    return {
        layout: state.graph.layout
        , data: state.graph.data
    };
};

const mapDispatchToProps = ( dispatch ) => {
    let map = {};

    for ( let key in actions ) {
        map[ key ] = function() { dispatch( actions[ key ].apply( null, arguments ) ); };
    }

    return map;
};

const GraphViewContainer = connect( mapStateToProps, mapDispatchToProps )(GraphView);

export default GraphViewContainer;

