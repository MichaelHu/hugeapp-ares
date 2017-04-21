import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo } from './actions';
import TodoList from './components/TodoList'; 
import TodoItem from './components/TodoItem';
import replay from './utils/replay';


class TodoView extends Component {
    constructor( props ) {
        super( props );
        this._name = 'TodoView';
        let info = this._name + ' constructor';
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
        setTimeout( () => {
            let info = this._name + ' data ready' ;
            console.log( info );
            replay.add( this, info );
            // this.setState( { items: [ { state: true, content: 'go swimming' } ]} ); 
        }, 1000 );
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
        let { todos, toggleTodo, deleteTodo } = this.props;
        let info = this._name + ' render' ;
        console.log( info );
        replay.add( this, info );
        return (
            <div ref="dom">
                <input type="text" ref="todo_text" 
                    placeholder="输入待办事项"
                    onKeyUp={this.onKeyUp.bind( this )}
                    />
                <input type="button" value="OK" onClick={this.onClick.bind( this )}/>
                {
                    todos.length
                    ? <TodoList items={todos} 
                        toggleTodo={toggleTodo} 
                        deleteTodo={deleteTodo}
                        />
                    : <div>无待办事项</div>
                }
            </div>
        );
    }
}

const mapStateToProps = ( state ) => {
    return {
        todos: state.todoapp.todos
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
    };
};

const TodoViewContainer = connect( mapStateToProps, mapDispatchToProps )(TodoView);

export default TodoViewContainer;
