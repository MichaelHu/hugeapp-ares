import React, { Component } from 'react';
import replay from '../utils/replay';

class TodoItem extends Component {

    constructor( props ) {
        super( props );
        this._name = 'TodoItem';
        let info = this._name + ' constructor' ;
        console.log( info );
        replay.add( this, info );
    }

    componentWillMount() {
        let info = this._name + ' componentWillMount' ;
        console.log( info );
        replay.add( this, info );
    }

    componentDidMount() {
        let info = this._name + ' componentDidMount' ;
        console.log( info );
        replay.add( this, info );
    }

    componentWillReceiveProps() {
        let info = this._name + ' componentWillReceiveProps' ;
        console.log( info );
        replay.add( this, info );
    }

    shouldComponentUpdate() {
        let info = this._name + ' shouldComponentUpdate' ;
        console.log( info );
        replay.add( this, info );
        return true;
    }

    componentWillUpdate() {
        let info = this._name + ' componentWillUpdate' ;
        console.log( info );
        replay.add( this, info );
    }

    componentDidUpdate() {
        let info = this._name + ' componentDidUpdate' ;
        console.log( info );
        replay.add( this, info );
    }

    componentWillUnmount() {
        let info = this._name + ' componentWillUnmount' ;
        console.log( info );
        replay.add( this, info );
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
        let info = this._name + ' render' ;
        console.log( info );
        replay.add( this, info );
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
