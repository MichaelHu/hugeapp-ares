import React from 'react';
import Trackable from '../../../../components/trackable';
import css from './index.scss';

let replay = Trackable.replay;

class Graph extends Trackable {
    constructor( props ) {
        super( props, 'Graph' );
    }

    render() {
        super.render();
        return (
            <div ref="dom" className={css.graph}>
                <div ref="graph-container">
                </div>
            </div>
        );
    }
}

export default Graph;
