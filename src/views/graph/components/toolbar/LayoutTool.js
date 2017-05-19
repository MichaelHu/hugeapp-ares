import React from 'react';
import Trackable from '../../../../components/trackable';
import * as at from '../../constants';
import css from './LayoutTool.scss';
import mockData_grid from '../../mockdata/graph-1';
import mockData_line from '../../mockdata/graph-2';
import mockData_circle from '../../mockdata/graph-3';

let replay = Trackable.replay;

export default class LayoutTool extends Trackable {
    constructor( props ) {
        super( props, 'LayoutTool' );
    }

    render() {
        super.render();
        return (
            <div ref="dom" className={css.layouttool}>
                <span>布局</span>
                <ul>
                    <li onClick={this.onLineClick.bind( this )} 
                        className={this.props.layout == at.GRAPH_LAYOUT_LINE ? css.current : ''}
                        >线形</li>
                    <li onClick={this.onGridClick.bind( this )} 
                        className={this.props.layout == at.GRAPH_LAYOUT_GRID ? css.current : ''}
                        >矩形</li>
                    <li onClick={this.onCircleClick.bind( this )} 
                        className={this.props.layout == at.GRAPH_LAYOUT_CIRCLE ? css.current : ''}
                        >环形</li>
                    <li onClick={this.props.graph_layout_force.bind( this )}
                        className={this.props.layout == at.GRAPH_LAYOUT_FORCE ? css.current : ''}
                        >力导向</li>
                    <li onClick={this.props.graph_layout_tree.bind( this )}
                        className={this.props.layout == at.GRAPH_LAYOUT_TREE ? css.current : ''}
                        >树形</li>
                </ul>
            </div>
        );
    }

    onLineClick() {
        this.props.graph_layout_line(); 
        this.props.graph_data_success( mockData_line );
    }

    onGridClick() {
        this.props.graph_layout_grid(); 
        this.props.graph_data_success( mockData_grid );
    }

    onCircleClick() {
        this.props.graph_layout_circle(); 
        this.props.graph_data_success( mockData_circle );
    }

}

