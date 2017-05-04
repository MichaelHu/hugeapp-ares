import React, { Component } from 'react';
import replay from './replay';

class Trackable extends Component {

    constructor() {
        let [ props, _replay_name, _replay_ref ] = arguments;
        super( ...arguments );
        this._replay_ref = _replay_ref || null;
        this._replay_name = _replay_name;
        if ( this._replay_name === void 0 ) {
            console.error( 'this._replay_name is undefined' );
            this._replay_name = 'undefined-name';
        }
        let info = 'constructor';
        replay.add( this, info );
    }

    setState() {
        let info = 'set-state';
        replay.add( this, info ); 
        super.setState( ...arguments );
    }

    componentWillMount() {
        let info = 'will-mount';
        replay.add( this, info );
    }

    componentDidMount() {
        let info = 'did-mount';
        replay.add( this, info );
    }

    componentWillReceiveProps( nextProps ) {
        let info = 'will-receive';
        replay.add( this, info );
    }

    shouldComponentUpdate( nextProps, nextState ) {
        let info = 'should-update';
        replay.add( this, info );
        return true;
    }

    componentWillUpdate( nextProps, nextState ) {
        let info = 'will-update';
        replay.add( this, info );
    }

    componentDidUpdate( prevProps, prevState ) {
        let info = 'did-update';
        replay.add( this, info );
    }

    componentWillUnmount() {
        let info = 'will-unmount';
        replay.add( this, info );
    }

    render() {
        let info = 'render';
        replay.add( this, info );
    }
} 

export default Trackable;
