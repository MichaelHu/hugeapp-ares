import React, { Component } from 'react';
import Trackable from '../../../components/Trackable';
import replay from '../../../utils/replay';

class TodoItem extends Trackable {

    constructor( props ) {
        super( props, 'TodoItem' );
    }

    onItemChange( e ) {
        let { item, toggleTodo, index } = this.props;
        let info = `${this._name} toggleTodo ${item.content}`;
        console.log( info );
        replay.add( this, info );
        toggleTodo( index );
    }

    onButtonClick( e ) {
        let { item, deleteTodo, index } = this.props;
        let info = `${this._name} deleteTodo ${item.content}`;
        console.log( info );
        replay.add( this, info );
        deleteTodo( index );
    }

    render() {
        let { item } = this.props;
        super.render();
        return (
            <li ref="dom">
                <input type="checkbox" 
                    value={item.completed}
                    onChange={this.onItemChange.bind( this )}/>
                &nbsp; <span>{item.content}</span>
                &nbsp; <button onClick={this.onButtonClick.bind( this )}>delete</button>
            </li>
        );
    }

} 

export default TodoItem;
