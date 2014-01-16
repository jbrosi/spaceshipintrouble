/// <reference path="../lib/three.d.ts" />
define(["require", "exports", "three", "lodash"], function(require, exports, THREE, _) {
    var GameInitializer = (function () {
        function GameInitializer() {
            this._canvas = null;
            this._renderer = null;
            this._renderContainer = null;
            _.bindAll(this);
        }
        GameInitializer.prototype.init = function () {
            console.log("initializing...");
            this._initializeCanvasContainer();
            this._initializeThreeJS();
        };

        GameInitializer.prototype._initializeThreeJS = function () {
            this._canvas = document.createElement(navigator.isCocoonJS ? 'screencanvas' : 'canvas');
            this._canvas.style.cssText = "idtkscale:ScaleAspectFit;"; // CocoonJS extension

            this._renderer = new THREE.WebGLRenderer({ canvas: this._canvas });
            this._renderer.setSize(window.innerWidth, window.innerHeight);
            this._renderContainer.appendChild(this._renderer.domElement);

            window.addEventListener('resize', this.onWindowResized);
        };

        GameInitializer.prototype.onWindowResized = function () {
            this._renderer.setSize(window.innerWidth, window.innerHeight);
            //TODO: resize all the camera's aspect ratios ? Maybe provide a callback hook for this or enhance ThreeJS camera directly
        };

        GameInitializer.prototype._initializeCanvasContainer = function () {
            this._renderContainer = document.getElementById('canvas-container');
        };

        GameInitializer.prototype.getRenderer = function () {
            return this._renderer;
        };
        return GameInitializer;
    })();
    
    return GameInitializer;
});
//# sourceMappingURL=gameInitializer.js.map
