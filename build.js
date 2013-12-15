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
        'stats': {
            exports: 'Stats'
        }
        
    },
    paths: {           
        stats: 'lib/stats',
        three: 'lib/three',
        'helvetiker-font': '../assets/fonts/helvetiker_regular.typeface',
		lodash: 'lib/lodash',
		box2d: 'lib/box2dweb',
		require: 'lib/require'
    },
    name: "lib/almond",
    include: ["app"],
    insertRequire: ["app"],
    out: "main-built.js"
})