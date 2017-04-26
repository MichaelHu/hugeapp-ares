import React, { Component } from 'react';
import Trackable from '../../../components/Trackable';

class TodoRelatedInfo extends Trackable {

    constructor( props ) {
        super( props, 'TodoRelatedInfo' );
        this.state = { relatedContent: null };
    }

    componentDidMount() {
        super.componentDidMount();
        let { title } = this.props;
        this.doRequest( title ); 
    }

    componentWillReceiveProps( nextProps ) {
        super.componentWillReceiveProps( nextProps );
        if ( nextProps.title != this.props.title ) {
            this.setState( { relatedContent: null } );
            this.doRequest( nextProps.title );
        }
    }

    render() {
        let { title } = this.props;
        super.render();
        return (
            title
            ? (
            <dl ref="dom">
                <dt>{title} 相关信息</dt>
                <dd>{
                    this.state.relatedContent || 'loading ...'
                }</dd>
            </dl>
            )
            : null
        );
    }

    doRequest( title ) {
        if ( title ) {
            setTimeout( () => {
                    this.setState( {
                        relatedContent: escape( title )
                    } );
            }, 1000 );
        }             
    }

}

export default TodoRelatedInfo;
