import React, { Component } from 'react';
import Trackable from '../../../components/trackable';

class TodoBlackboard extends Trackable {

    constructor( props ) {
        super( props, 'TodoBlackboard' );
    }

    componentDidMount() {
        super.componentDidMount();
        this.fitDevice();
        this.drawText();
    }

    componentDidUpdate() {
        super.componentDidUpdate();
        this.drawText();
    }

    fitDevice() {
        let board = this.refs.board;
        let ratio = window.devicePixelRatio || 1;
        if ( board ) {
            board.width = ratio * board.offsetWidth;
            board.height = ratio * board.offsetHeight;
            board.getContext( '2d' ).scale( ratio, ratio );
        }
    }

    drawText() {
        let { items } = this.props;
        let board = this.refs.board;
        if ( board ) {
            let context = board.getContext( '2d' );
            let top = 20;

            context.clearRect( 0, 0, board.offsetWidth, board.offsetHeight );
            context.save();
            context.font = 'italic mono-space normal 12px arial';
            context.rotate( -45 * Math.PI / 180 );
            items.forEach( ( item ) => {
                context.save();
                let w = context.measureText( item.content ).width;
                context.translate( - 0.5 * w, 100 );
                context.strokeText( item.content, 20, top, 200 );
                context.restore();
                top += 20;
            } );
            context.restore();
        }
    }

    render() {
        let { items, toggleTodo, deleteTodo } = this.props;
        let styles = {
            width: '100%'
            , height: '500px'
        };
        super.render();
        return <div ref="dom">{
            ( items && items.length ) 
            ? (
                <canvas ref="board" style={styles}></canvas>
            )
            : (
                <div> Empty Board </div>
            )
        }</div>;
    }

}

export default TodoBlackboard;
