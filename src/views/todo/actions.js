export function addTodo( content ) {
    return {
        type: 'TODO_ADD'
        , content: content
        , id: Date.now()
    };
}

export function deleteTodo( id ) {
    return {
        type: 'TODO_DELETE'
        , id: id
    };
}

export function toggleTodo( id ) {
    return {
        type: 'TODO_TOGGLE'
        , id: id
    };
}
