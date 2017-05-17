import React from 'react';
import Trackable from '../../../../components/trackable';
import css from './GraphTool.scss';

let replay = Trackable.replay;

export default class GraphTool extends Trackable {
    constructor( props ) {
        super( props, 'GraphTool' );
    }

    render() {
        super.render();
        return (
            <div ref="dom" className={css.graphtool}>
                <span className={'iconfont icon-pointer'}></span>
                <span className={'iconfont icon-pointer1'}></span>
                <span className={'iconfont icon-cog'}></span>
                <span className={'iconfont icon-zoomin'}></span>
                <span className={'iconfont icon-zoomout'}></span>
            </div>
        );
    }
}

