import React from 'react';
import Trackable from '../../../../components/trackable';
import css from './LayoutTool.scss';

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
                    <li>线形</li>
                    <li>矩形</li>
                    <li>环形</li>
                    <li>力导向</li>
                    <li>树形</li>
                </ul>
            </div>
        );
    }
}

