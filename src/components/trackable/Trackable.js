import React, { Component } from 'react';
import replay from './replay';

class Trackable extends Component {

    constructor( props, _name ) {
        super( props );
        this._name = _name;
        if ( this._name === void 0 ) {
            console.error( 'this._name is undefined' );
            this._name = 'undefined-name';
        }
        let info = this._name + ' constructor' ;
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
    }

    componentWillReceiveProps( nextProps ) {
        let info = this._name + ' componentWillReceiveProps' ;
        console.log( info );
        replay.add( this, info );
    }

    shouldComponentUpdate( nextProps, nextState ) {
        let info = this._name + ' shouldComponentUpdate' ;
        console.log( info );
        replay.add( this, info );
        return true;
    }

    componentWillUpdate( nextProps, nextState ) {
        let info = this._name + ' componentWillUpdate' ;
        console.log( info );
        replay.add( this, info );
    }

    componentDidUpdate( prevProps, prevState ) {
        let info = this._name + ' componentDidUpdate' ;
        console.log( info );
        replay.add( this, info );
    }

    componentWillUnmount() {
        let info = this._name + ' componentWillUnmount' ;
        console.log( info );
        replay.add( this, info );
    }

    render() {
        let info = this._name + ' render' ;
        console.log( info );
        replay.add( this, info );
    }
} 

export default Trackable;
