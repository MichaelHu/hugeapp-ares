import * as at from './constants';

export function graph_layout_line() {
    return {
        type: at.GRAPH_LAYOUT_LINE
    };
}

export function graph_layout_grid() {
    return {
        type: at.GRAPH_LAYOUT_GRID
    };
}

export function graph_layout_circle() {
    return {
        type: at.GRAPH_LAYOUT_CIRCLE
    };
}

export function graph_layout_force() {
    return {
        type: at.GRAPH_LAYOUT_FORCE
    };
}

export function graph_layout_tree() {
    return {
        type: at.GRAPH_LAYOUT_TREE
    };
}





export function graph_tool_zoomin() {
    return {
        type: at.GRAPH_TOOL_ZOOMIN
    };
}

export function graph_tool_zoomout() {
    return {
        type: at.GRAPH_TOOL_ZOOMOUT
    };
}

export function graph_tool_config() {
    return {
        type: at.GRAPH_TOOL_CONFIG
    };
}

export function graph_tool_select() {
    return {
        type: at.GRAPH_TOOL_SELECT
    };
}

export function graph_tool_moving() {
    return {
        type: at.GRAPH_TOOL_MOVING
    };
}




export function graph_data_success( data ) {
    return {
        type: at.GRAPH_DATA_SUCCESS
        , data: data 
    };
}

export function graph_data_failed() {
    return {
        type: at.GRAPH_DATA_FAILED
    };
}

