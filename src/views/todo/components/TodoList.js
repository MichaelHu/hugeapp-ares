import React, { Component } from 'react';
import TodoItem from './TodoItem';
import Trackable from '../../../components/trackable';

class TodoList extends Trackable {

    constructor( props ) {
        super( props, 'TodoList' );
    }

    render() {
        let { items, curTodo, toggleTodo, deleteTodo, switchCurrentTodo } = this.props;
        super.render();
        return (
            ( items && items.length ) 
                ? (
                    <ol ref="dom">
                    {
                        items.map( ( item ) => {
                            return <TodoItem 
                                key={item.id} 
                                index={item.id} 
                                item={item} 
                                isCurItem={curTodo.id == item.id ? true : false}
                                toggleTodo={toggleTodo}
                                deleteTodo={deleteTodo}
                                switchCurrentTodo={switchCurrentTodo}
                            />;
                        } )
                    }
                    </ol>
                )
                : (
                    <div> Empty List </div>
                )

        );
    }

} 


export default TodoList;
