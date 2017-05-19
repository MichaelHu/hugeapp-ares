let nodes = [
    {id: 1, label: '实体 1', x: -400, y: 0 }
    , {id: 2, label: '实体 2', x: -300, y: 0 }
    , {id: 3, label: '实体 3', x: -200, y: 0 }
    , {id: 4, label: '实体 4', x: -100, y: 0 }
    , {id: 5, label: '实体 5', x: 0, y: 0 }
    , {id: 6, label: '实体 6', x: 100, y: 0 }
    , {id: 7, label: '实体 7', x: 200, y: 0 }
    , {id: 8, label: '实体 8', x: 300, y: 0 }
    , {id: 9, label: '实体 9', x: 400, y: 0 }
    , {id: 10, label: '实体 10', x: 500, y: 0 }
];

let len = nodes.length
    , R = 200
    ;
for ( let i = 0, angle = 0, angleStep = 2 * Math.PI / ( len || 1 ); i < len; i++ ) {
    nodes[ i ].x = R * Math.cos( angle );
    nodes[ i ].y = R * Math.sin( angle );
    angle += angleStep;
}

let edges = [
    {from: 1, to: 3}
    , {from: 1, to: 2}
    , {from: 2, to: 4}
    , {from: 2, to: 5}
    , {from: 4, to: 6}
    , {from: 4, to: 7}
    , {from: 5, to: 7}
    , {from: 3, to: 10}
    , {from: 10, to: 8}
    , {from: 10, to: 9}
];

export default {
    nodes, edges
};

