import React, { Component } from 'react';
import TodoItem from './TodoItem';
import Trackable from '../../../components/Trackable';

class TodoList extends Trackable {

    constructor( props ) {
        super( props, 'TodoList' );
    }

    render() {
        let { items, toggleTodo, deleteTodo, switchCurrentTodo } = this.props;
        super.render();
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
                                switchCurrentTodo={switchCurrentTodo}
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
