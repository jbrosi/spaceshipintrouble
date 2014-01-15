({
    baseUrl: "js",               
    shim: {
        'three': {
            exports: 'THREE'
        },
        'helvetiker-font': {
            deps: ['three']
        },
        'box2d': { 
            exports: 'Box2D'
        },
        'box2d-cocoon': {
           exports: 'Box2D'
        },
        'stats': {
            exports: 'Stats'
        },
        'hammer': {
            exports: 'Hammer'
        },
        'quadtree': {
            exports: 'Quadtree'
        }
    },
    paths: {           
        q: 'lib/q',
        stats: 'lib/stats',
        three: 'lib/three',
        'helvetiker-font': '../assets/fonts/helvetiker_regular.typeface',
		lodash: 'lib/lodash',
		box2d: 'lib/box2dweb',
		'box2d-cocoon': 'lib/box2d_cocoonJS',
		require: 'lib/require',
		hammer: 'lib/hammer',
		quadtree: 'lib/quadtree'
    },
    name: "lib/almond",
    include: ["app", "game/screens/game-menu", "game/screens/main-menu", "game/screens/settings-menu", "game/screens/standard-level", 'box2d', 'box2d-cocoon'],
    insertRequire: ["app"],
    out: "main-built.js"
})