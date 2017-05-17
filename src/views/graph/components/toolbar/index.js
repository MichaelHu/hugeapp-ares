import React from 'react';
import LayoutTool from './LayoutTool';
import GraphTool from './GraphTool';
import Trackable from '../../../../components/trackable';
import styles from './index.scss';

let replay = Trackable.replay;

class Toolbar extends Trackable {
    constructor( props ) {
        super( props, 'Toolbar' );
    }

    render() {
        super.render();
        return (
            <div ref="dom" className={styles.toolbar}>
                <LayoutTool />
                <GraphTool />
            </div>
        );
    }
}

export default Toolbar;
