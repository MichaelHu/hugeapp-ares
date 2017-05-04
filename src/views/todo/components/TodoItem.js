import React, { Component } from 'react';
import Trackable from '../../../components/trackable';

let replay = Trackable.replay;

class TodoItem extends Trackable {

    constructor( props ) {
        super( props, 'TodoItem' );
    }

    onItemChange( e ) {
        let { item, toggleTodo, index } = this.props;
        let info = `toggleTodo ${item.content}`;
        replay.add( this, info );
        toggleTodo( index );
    }

    onDeleteButtonClick( e ) {
        let { item, deleteTodo, index } = this.props;
        let info = `deleteTodo ${item.content}`;
        replay.add( this, info );
        deleteTodo( index );
    }

    onViewButtonClick( e ) {
        let { item, switchCurrentTodo, index } = this.props;
        let info = `switchCurrentTodo ${item.content}`;
        replay.add( this, info );
        switchCurrentTodo( index, item.content );
    }

    render() {
        let { item, isCurItem } = this.props;
        super.render();
        return (
            <li ref="dom">
                <input type="checkbox" 
                    value={item.completed}
                    onChange={this.onItemChange.bind( this )}/>
                &nbsp; 
                <span style={{color: isCurItem ? '#f00' : '#000'}}>{item.content}</span>
                &nbsp; 
                <button onClick={this.onViewButtonClick.bind( this )}>view</button>
                &nbsp; 
                <button onClick={this.onDeleteButtonClick.bind( this )}>del</button>
            </li>
        );
    }

} 

export default TodoItem;
