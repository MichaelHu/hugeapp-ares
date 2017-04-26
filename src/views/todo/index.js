import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo, switchCurrentTodo } from './actions';
import TodoList from './components/TodoList'; 
import TodoItem from './components/TodoItem';
import TodoBlackboard from './components/TodoBlackboard';
import TodoRelatedInfo from './components/TodoRelatedInfo';
import Trackable from '../../components/Trackable';
import replay from '../../utils/replay';

class TodoView extends Trackable {
    constructor( props ) {
        super( props, 'TodoView' );
    }

    componentDidMount() {
        super.componentDidMount();
        setTimeout( () => {
            let info = this._name + ' data ready' ;
            console.log( info );
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
            let info = this._name + ' addTodo ' + text ;
            console.log( info );
            replay.add( this, info );
        }
    }

    render() {
        let { todos, cur_todo, toggleTodo, deleteTodo, switchCurrentTodo } = this.props;
        super.render();
        return (
            <div ref="dom">
                <input type="text" ref="todo_text" 
                    placeholder="输入待办事项"
                    onKeyUp={this.onKeyUp.bind( this )}
                    />
                <input type="button" value="OK" onClick={this.onClick.bind( this )}/>
                {
                    todos.length
                    ? (
                        <div>
                            <TodoList items={todos} 
                                toggleTodo={toggleTodo} 
                                deleteTodo={deleteTodo}
                                switchCurrentTodo={switchCurrentTodo}
                            />

                            <TodoRelatedInfo title={cur_todo.content}/>

                            <TodoBlackboard items={todos} 
                                toggleTodo={toggleTodo} 
                                deleteTodo={deleteTodo}
                            />
                        </div>
                    )
                        
                    : <div>无待办事项</div>
                }
            </div>
        );
    }
}

const mapStateToProps = ( state ) => {
    return {
        todos: state.todoapp.todos
        , cur_todo: state.todoapp.cur_todo
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        addTodo: ( content ) => {
            dispatch( addTodo( content ) );
        }
        , toggleTodo: ( index ) => {
            dispatch( toggleTodo( index ) );
        }
        , deleteTodo: ( index ) => {
            dispatch( deleteTodo( index ) );
        }
        , switchCurrentTodo: ( index, content ) => {
            dispatch( switchCurrentTodo( index, content ) );
        }
    };
};

const TodoViewContainer = connect( mapStateToProps, mapDispatchToProps )(TodoView);

export default TodoViewContainer;
