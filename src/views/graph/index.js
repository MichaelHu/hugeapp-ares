import React, { Component } from 'react';
import { connect } from 'react-redux';
import Trackable from '../../components/trackable';
import Toolbar from './components/toolbar'; 
import Graph from './components/graph'; 
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

    onKeyUp( e ) {
        if ( e.keyCode == 13 ) {
            this.addNewTodo();
        }
    }

    onClick( e ) {
        this.addNewTodo();
    }

    addNewTodo() {
        let { addTodo } = this.props;
        let text = this.refs.todo_text.value.replace( /^\s+|\s+$/g, '' );
        if ( text.length > 0 ) { 
            addTodo( this.refs.todo_text.value );
            this.refs.todo_text.value = '';
            let info = 'addTodo ' + text ;
            replay.add( this, info );
        }
    }

    render() {
        super.render();
        return (
            <div ref="dom" className={css.graphview}>
                <h2>大数据可视化系统 - V1.0</h2>
                <Toolbar />
                <Graph />
            </div>
        );
    }
}

const mapStateToProps = ( state ) => {
    return {
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
    };
};

const GraphViewContainer = connect( mapStateToProps, mapDispatchToProps )(GraphView);

export default GraphViewContainer;

