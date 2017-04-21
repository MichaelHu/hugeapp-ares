import React, { Component } from 'react';
import TodoItem from './TodoItem';
import replay from '../utils/replay';

class TodoList extends Component {

    constructor( props ) {
        super( props );
        this._name = 'TodoList';
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

    render() {
        let { items, toggleTodo, deleteTodo } = this.props;
        let info = this._name + ' render' ;
        console.log( info );
        replay.add( this, info );
        return (
            ( items && items.length ) 
                ? (
                    <ul ref="dom">
                        {
                            items.map( ( item ) => {
                                return <TodoItem 
                                    key={item.id} 
                                    index={item.id} 
                                    item={item} 
                                    toggleTodo={toggleTodo}
                                    deleteTodo={deleteTodo}
                                />;
                            } )
                        }
                    </ul>
                )
                : (
                    <div> Empty List </div>
                )

        );
    }

} 


export default TodoList;
