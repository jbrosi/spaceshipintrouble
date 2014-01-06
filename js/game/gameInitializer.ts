/// <reference path="../lib/three.d.ts" />

import THREE = require("three");
import _ = require("lodash");


class GameInitializer {



    _canvas = null;
    _renderer = null;
    _renderContainer = null;

    constructor() {
        _.bindAll(this);
    }
    
    init () {
        console.log("initializing...");
        this._initializeCanvasContainer();
        this._initializeThreeJS();
    }
    
    private _initializeThreeJS () {
        this._canvas = document.createElement(navigator.isCocoonJS ? 'screencanvas' : 'canvas');
        this._canvas.style.cssText="idtkscale:ScaleAspectFit;";  // CocoonJS extension

        this._renderer = new THREE.WebGLRenderer({canvas: this._canvas});
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        this._renderContainer.appendChild(this._renderer.domElement);
        
        window.addEventListener('resize', this.onWindowResized);
    }
    
    public onWindowResized () {
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        //TODO: resize all the camera's aspect ratios ? Maybe provide a callback hook for this or enhance ThreeJS camera directly
    }
    
    private _initializeCanvasContainer () {
        this._renderContainer = document.getElementById('canvas-container');
    }
    
    public getRenderer () {
        return this._renderer;
    }
    
}
export = GameInitializer;