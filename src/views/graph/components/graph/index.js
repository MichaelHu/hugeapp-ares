import React from 'react';
import Trackable from '../../../../components/trackable';
import * as at from '../../constants';
import vis from 'vis';
import immutable from 'immutable';
import css from './index.scss';
import mockData from '../../mockdata/graph-1';

let replay = Trackable.replay;

class Graph extends Trackable {
    constructor( props ) {
        super( props, 'Graph' );

		this.container = null;
		this.network = null;
		this.defaultGraphOptions = {
            autoResize: true
            , height: '100%' 
            , width: '100%' 
            , locale: 'en'
            , clickToUse: false
            , edges: {
                color: {
                    color: '#333'
                }
            }
            , nodes: {
                borderWidth: 0
                , shape: 'circle'
                , font: {
                    size: 12
                }
                , color: {
                    background: '#cdcdcd'
                }
                , chosen: {
                    node: function( values, id, selected, hovering ){
                        values.color = '#ff8080';
                    }
                }
            }
            , layout: {
                randomSeed: undefined
                , improvedLayout: true
                , hierarchical: {
                    enabled: false
                    , sortMethod: 'directed'
                    , levelSeparation: 100
                }
            }
            , physics: {
                enabled: true
                , stabilization: false
                // , stabilization: {
                //     iterations: 2000
                // }
            }
            // , configure: {}
            // , interaction: {}
            // , manipulation: {}
            // , groups: {}
        };

    }

    componentDidMount() {
        super.componentDidMount();
        this.container = this.refs[ 'graph-container' ];
        this.initializeGraph();
        this.props.graph_data_success( mockData );
    }
    
    componentWillUnmount() {
        super.componentWillUnmount();
        this.network && this.network.destroy();
    }

    componentWillReceiveProps( nextProps ) {
        super.componentWillReceiveProps( nextProps );
        if ( this.network ) {
            if ( nextProps.layout != this.props.layout ) {
                let options = null;
                switch ( nextProps.layout ) {
                    case at.GRAPH_LAYOUT_LINE:
                    case at.GRAPH_LAYOUT_GRID:
                    case at.GRAPH_LAYOUT_CIRCLE:
                        options = { 
                                layout: {
                                    hierarchical: {
                                        enabled: false
                                    }
                                }
                            };
                        this.network.setOptions( options );
                        options = { 
                                physics: {
                                    enabled: false
                                }
                            };
                        this.network.setOptions( options );
                        break;
                    case at.GRAPH_LAYOUT_FORCE:
                        options = { 
                                layout: {
                                    hierarchical: {
                                        enabled: false
                                    }
                                }
                                , physics: {
                                    enabled: true
                                }
                            };
                        break;
                    case at.GRAPH_LAYOUT_TREE:
                        options = { 
                                layout: {
                                    hierarchical: {
                                        enabled: true
                                    }
                                }
                                , physics: {
                                    enabled: true
                                }
                            };
                        break;
                }
                options && this.network.setOptions( options );
            }
            this.network.setData( nextProps.data );
        }

    }

    shouldComponentUpdate( nextProps, nextState ) {
        super.shouldComponentUpdate( nextProps, nextState );
        return false;
    }

    render() {
        super.render();
        return (
            <div ref="dom" className={css.graph}>
                <div ref="graph-container" className={css[ 'graph-container' ]}>
                </div>
            </div>
        );
    }

    initializeGraph() {
		let nodes = new vis.DataSet( [] );
		let edges = new vis.DataSet( [] );
		let data = { nodes, edges };
		this.network = new vis.Network( 
            this.container, data, this.defaultGraphOptions
        );
    }

}

export default Graph;
