var queue = [];
var id = 1;
var last, cur;
var popupTipDom;

function add( inst, info ) {
    if ( inst ) {
        queue.push( {
            id: id++
            , inst: inst
            , info: info
        } );
    }
}

function start( interval ) {
    setInterval( () => {
        play();
    }, interval || 1000 );
}

function play() {
    if ( !queue.length ) {
        if ( last ) {
            last.dom.style.border = last.savedStyle;
            last.removeTip();
            last = null;
        }
        return;
    }
    let { inst, id, info } = queue.shift();
    let st;
    if ( inst && inst.refs.dom ) {
        console.log( `replay: [ ${id} ] ${info}` );
        cur = inst.refs.dom;
        st = window.getComputedStyle( cur );
        if ( last ) {
            last.dom.style.border = last.savedStyle;
            last.removeTip();
        }
        last = {
            dom: cur 
            , savedStyle: st[ 'border' ]
            , removeTip: appendTip( cur, `[ ${id} ] ${info}` )
        };
        cur.style.border = '1px solid red';
    }
    else {
        popupTip( info );
    }
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
    tipDom.style.top = '0';
    tipDom.style.right = '0';
    tipDom.style.width = '50%';
    tipDom.style.paddingLeft = '5px';
    tipDom.style.paddingRight = '5px';
    tipDom.style.backgroundColor = '#eee';
    tipDom.style.textAlign = 'left';
    tipDom.style.fontSize = '16px';
    tipDom.style.color = '#00f';
    return function() {
        dom.style.position = positionStyle;
        dom.removeChild( tipDom );
    }
}

function popupTip( info ) {
    let tipDom = ( 
            popupTipDom = popupTipDom 
            || document.createElement( 'div' ) 
        );

    if ( last ) {
        last.dom.style.border = last.savedStyle;
        last.removeTip();
    }
    last = null;

    tipDom.style.display = 'block';
    tipDom.innerHTML = `[ ${id} ] ${info}`;
    document.body.appendChild( tipDom );
    tipDom.style.position = 'absolute';
    tipDom.style.top = '50%';
    tipDom.style.left = '50%';
    tipDom.style.width = '500px';
    tipDom.style.marginLeft = '-250px';
    tipDom.style.paddingLeft = '5px';
    tipDom.style.paddingRight = '5px';
    tipDom.style.backgroundColor = '#eee';
    tipDom.style.border = '1px solid red';
    tipDom.style.textAlign = 'center';
    tipDom.style.fontSize = '16px';
    tipDom.style.color = '#00f';

    setTimeout( () => {
        tipDom.style.display = 'none';
    }, 1000 );
}


function flush() {
    queue.length = 0;
    if ( last ) {
        last.dom.style.border = last.savedStyle;
        last.removeTip();
        last = null;
    }
}

document.addEventListener( 'keydown', function( e ) {
    if ( e.altKey && e.keyCode == 27 ) {
        flush();
    }
}, false );

export default {
    add: add
    , start: start
};
