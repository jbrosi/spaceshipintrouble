/**
 * Spaceship in trouble - a Game & GameEngine in TypeScript
 *
 * Copyright (c) 2014 Johannes Brosi <me@brosi.me>
 *
 * Released under the MIT license
 * https://github.com/jbrosi/spaceshipintrouble/blob/master/LICENSE
 */

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
        },
        'zepto': {
            exports: 'Zepto'
        }
    },
    paths: {           
        q: 'lib/q',
        stats: 'lib/stats',
        three: 'lib/three',
        'helvetiker-font': '../assets/engine/fonts/helvetiker_regular.typeface',
		lodash: 'lib/lodash',
		box2d: 'lib/box2dweb',
		'box2d-cocoon': 'lib/box2d_cocoonJS',
		require: 'lib/require',
		hammer: 'lib/hammer',
		quadtree: 'lib/quadtree',
		zepto: 'lib/zepto'
    },
    name: "lib/almond",
    include: ["app", "game/screens/playLevel", "game/screens/loadLevel", 'box2d', 'box2d-cocoon'],
    insertRequire: ["app"],
    out: "main-built.js"
})