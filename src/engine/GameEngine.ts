/**
 * Spaceship in trouble - a Game & GameEngine in TypeScript
 *
 * Copyright (c) 2014 Johannes Brosi <me@brosi.me>
 *
 * Released under the MIT license
 * https://github.com/jbrosi/spaceshipintrouble/blob/master/LICENSE
 */


module SpaceshipInTrouble.Engine {

    /**
     * Responsible for initializing the engine & game stuff like the canvas and threejs as well as the screensystem
     *
     * @namespace engine
     * @class GameInitializer
     */
    export class GameEngine {



        private _canvas : HTMLCanvasElement = null;
        private _renderer : THREE.WebGLRenderer = null;
        private _renderContainer : HTMLElement = null;
        private _screenManager : SpaceshipInTrouble.Engine.ScreenSystem.ScreenManager = null;

        /**
         * Creates a new GameInitializer
         *
         * @method __constructor
         */
        public constructor() {
            _.bindAll(this);
        }

        public getScreenManager() : SpaceshipInTrouble.Engine.ScreenSystem.ScreenManager {
            return this._screenManager;
        }


        /**
         * Initializes the canvasContainer and the ThreeJS environment
         *
         * @method init
         */
        public init() : Q.Promise<any> {
            JL("GameEngine").info("*** initializing ***");
            var that = this;
            return this._initializeCanvasContainer()
                .then(this._initializeThreeJS)
                .then(function () {
                    that._screenManager = new SpaceshipInTrouble.Engine.ScreenSystem.ScreenManager(that._renderer);
                });
        }

        public start() : Q.Promise<boolean> {
            JL("GameEngine").info("*** starting ***");
            return Q(true);
        }

        /**
         * Internal method for initializig three js
         *
         * @method _initializeThreeJS
         * @private
         */
        private _initializeThreeJS () : Q.Promise<THREE.WebGLRenderer> {
            JL("GameEngine").info("- Creating canvas element... (" + (navigator.hasOwnProperty("isCocoonJS") ? 'screencanvas' : 'canvas') + ")");

            this._canvas = <HTMLCanvasElement>document.createElement(navigator.hasOwnProperty("isCocoonJS") ? 'screencanvas' : 'canvas');
            this._canvas.style.cssText="idtkscale:ScaleAspectFit;";  // CocoonJS extension

            JL("GameEngine").info("- setting up THREE WebGLRenderer...");
            this._renderer = new THREE.WebGLRenderer({canvas: this._canvas});
            this._renderer.setSize(window.innerWidth, window.innerHeight);
            this._renderContainer.appendChild(this._renderer.domElement);

            JL("GameEngine").info("- adding resize listener...");
            window.addEventListener('resize', this.onWindowResized);
            return Q(this._renderer);
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
        private _initializeCanvasContainer () : Q.Promise<HTMLElement> {
            JL("GameEngine").info("- preparing canvas container");
            this._renderContainer = document.getElementById('canvas-container');
            return Q(this._renderContainer);
        }

        /**
         * Helper method which returns the intialized ThreeJS Renderer. Call `init` first!
         * @returns {THREE.Renderer}
         */
        public getRenderer () {
            return this._renderer;
        }

    }
}