/**
 * Spaceship in trouble - a Game & GameEngine in TypeScript
 *
 * Copyright (c) 2014 Johannes Brosi <me@brosi.me>
 *
 * Released under the MIT license
 * https://github.com/jbrosi/spaceshipintrouble/blob/master/LICENSE
 */

import THREE = require("three");
import _ = require("lodash");

/**
 * Responsible for initializing some game stuff like the canvas and threejs
 *
 * @namespace engine
 * @class GameInitializer
 */
class GameInitializer {



    _canvas = null;
    _renderer = null;
    _renderContainer = null;

    /**
     * Creates a new GameInitializer
     *
     * @method __constructor
     */
    constructor() {
        _.bindAll(this);
    }

    /**
     * Initializes the canvasContainer and the ThreeJS environment
     *
     * @method init
     */
    init () {
        console.log("initializing...");
        this._initializeCanvasContainer();
        this._initializeThreeJS();
    }

    /**
     * Internal method for initializig three js
     *
     * @method _initializeThreeJS
     * @private
     */
    private _initializeThreeJS () {
        this._canvas = document.createElement(navigator.isCocoonJS ? 'screencanvas' : 'canvas');
        this._canvas.style.cssText="idtkscale:ScaleAspectFit;";  // CocoonJS extension

        this._renderer = new THREE.WebGLRenderer({canvas: this._canvas});
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        this._renderContainer.appendChild(this._renderer.domElement);
        
        window.addEventListener('resize', this.onWindowResized);
    }

    /**
     * Callback for window resizing events
     * @method onWindowResized
     */
    public onWindowResized () {
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        //TODO: resize all the camera's aspect ratios ? Maybe provide a callback hook for this or enhance ThreeJS camera directly
    }

    /**
     * Internal method for initializing the canvas container and dom elements for the canvas
     *
     * @method _initializeCanvasContainer
     * @private
     */
    private _initializeCanvasContainer () {
        this._renderContainer = document.getElementById('canvas-container');
    }

    /**
     * Helper method which returns the intialized ThreeJS Renderer. Call `init` first!
     * @returns {THREE.Renderer}
     */
    public getRenderer () {
        return this._renderer;
    }
    
}
export = GameInitializer;