var queue = [];
var startTime = Date.now();
var id = 1;
var last, cur;
var popupTipDom, popupTimer = null;
var _lastAction = null;

// can be modified in console
window.TRACKABLE_FILTER = /.*/;

function getFilter() {
    return window.TRACKABLE_FILTER || /.*/;
}

function getTrackEnabled() {
    return window.TRACKABLE_ENABLED || false;
}

function add( inst, info ) {
    if ( inst && getTrackEnabled() ) {
        let action = _lastAction || 'SET_STATE', last;
        console.log( '-> ' + action + ', ' + inst._replay_name + ', ' +  info );
        queue.push( {
            id: id++
            , ts: Date.now()
            , inst: inst
            , info: info
            , action: action
        } );
    }
}

function start( interval, trackEnabled ) {
    window.TRACKABLE_ENABLED = trackEnabled; 
    if ( !window.TRACKABLE_ENABLED ) {
        return;
    }

    console.info( [
        'From Trackable: '
        , '1. [ Alt-Q ]: stop play;'
        , '2. set `window.TRACKABLE_FILTER` to a RegExp to filter messages' 
        , '3. set `window.TRACKABLE_ENABLED` to `true` to enable trackable'
    ].join( '\n' ) );

    setInterval( () => {
        play();
    }, interval || 1000 );
}

function init( store, filter ) {
    var dispatch = store.dispatch;
    store.dispatch = function() {
        window.TRACKABLE_ENABLED 
            && console.info( 'dispatch ' + ( arguments[ 0 ].type || 'middleware action' ) );
        dispatch( ...arguments );
    };

    if ( filter && 'function' == typeof filter.test ) {
        window.TRACKABLE_FILTER = filter;
    }
    return this;
}

function traceAction( action ) {
    _lastAction = action; 
    setTimeout( () => {
        _lastAction = null; 
    }, 5000 );
}

function play() {
    if ( !queue.length ) {
        if ( last ) {
            last.removeTip();
            last = null;
        }
        return;
    }

    let { inst, id, info, ts, action } = {};
    let item, matched = 0;
    while ( queue.length ) {
        item = queue.shift();
        info = item.info;
        if ( getFilter().test( info ) ) {
            matched = 1;
            inst = item.inst;
            id = item.id;
            ts = item.ts;
            action = item.action;
            break;
        }
    }
    if ( !matched ) {
        return;
    }

    let elapsedTime = ( ( ts - startTime ) / 1000 ).toFixed( 3 ); 
    let formatInfo;
    // ${inst._replay_name}在``表达式中解析不了
    formatInfo = `[ ${info} - ${action} ] ( ${inst['_replay_name']}@${elapsedTime}s ${id} )`;
    if ( inst && ( inst.refs.dom || inst.refs[ inst._replay_ref ] ) ) {
        // console.log( `replay: ${formatInfo}` );
        cur = inst.refs.dom || inst.refs[ inst._replay_ref ];
        if ( last ) {
            last.removeTip();
        }

        if ( !isRealShow( cur ) || cur && cur.nodeType != 1) {
            popupTip( formatInfo );
        }
        else {
            last = {
                dom: cur 
                , removeTip: appendTip( cur, formatInfo )
                , hasRemoved: false
            };
        }
    }
    else {
        popupTip( formatInfo );
    }
}

function isRealShow( dom ) {
    let st, node = dom;
    while ( node && node.nodeType == 1 ) {
        st = window.getComputedStyle( node );
        if ( st[ 'display' ] == 'none' || st[ 'visibility' ] == 'hidden' ) {
            return false;
        }
        node = node.parentNode;
    }  
    return true;
}

function appendTip( dom, info ) {
    let st = window.getComputedStyle( dom );
    let positionStyle = st[ 'position' ];
    if ( positionStyle != 'relative'
        && positionStyle != 'absolute' ) {
        dom.style.position = 'relative';
    }
    let tipDom = document.createElement( 'div' );
    tipDom.innerHTML = info;
    dom.appendChild( tipDom );
    tipDom.style.position = 'absolute';
    tipDom.style.zIndex = '9999';
    tipDom.style.pointerEvents = 'none';
    tipDom.style.top = '0';
    tipDom.style.right = '0';
    tipDom.style.left = '0';
    tipDom.style.bottom = '0';
    tipDom.style.paddingLeft = '5px';
    tipDom.style.paddingRight = '5px';
    // tipDom.style.backgroundColor = 'rgba(238, 238, 238, 0.8)';
    tipDom.style.backgroundColor = 'rgba(255, 127, 14, 0.6)';
    tipDom.style.textAlign = 'right';
    tipDom.style.fontSize = '14px';
    tipDom.style.color = '#00f';
    return function() {
        if ( !this.hasRemoved ) {
            this.hasRemoved = true;
            dom.style.position = positionStyle;
            dom.removeChild( tipDom );
        }
    }
}

function popupTip( info ) {
    let tipDom;

    if ( !popupTipDom ) {
        tipDom = popupTipDom = document.createElement( 'div' );
        document.body.appendChild( tipDom );

        tipDom.style.display = 'block';
        tipDom.style.position = 'absolute';
        tipDom.style.zIndex = '9999';
        tipDom.style.pointerEvents = 'none';
        tipDom.style.top = '5px';
        tipDom.style.left = '50%';
        tipDom.style.width = '500px';
        tipDom.style.marginLeft = '-250px';
        tipDom.style.paddingLeft = '5px';
        tipDom.style.paddingRight = '5px';
        tipDom.style.backgroundColor = 'rgba(200, 200, 200, 0.8)';
        tipDom.style.border = '1px solid #aaa';
        tipDom.style.borderRadius = '3px';
        tipDom.style.textAlign = 'center';
        tipDom.style.fontSize = '14px';
        tipDom.style.color = '#00f';
    }

    if ( last ) {
        last.removeTip();
    }
    last = null;

    tipDom = popupTipDom;
    tipDom.innerHTML = info;
    if ( popupTimer ) {
        clearTimeout( popupTimer );
    }
    tipDom.style.display = 'block';

    popupTimer = setTimeout( () => {
        tipDom.style.display = 'none';
        popupTimer = null;
    }, 1000 );
}


function flush() {
    queue.length = 0;
    if ( last ) {
        last.removeTip();
        last = null;
    }
}

document.addEventListener( 'keydown', function( e ) {
    // Alt+Q
    if ( e.altKey && e.keyCode == 81 ) {
        flush();
    }
}, true );

export default {
    init: init
    , add: add
    , start: start
    , traceAction: traceAction
};
