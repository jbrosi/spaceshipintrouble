/**
 * Spaceship in trouble - a Game & GameEngine in TypeScript
 *
 * Copyright (c) 2014 Johannes Brosi <me@brosi.me>
 *
 * Released under the MIT license
 * https://github.com/jbrosi/spaceshipintrouble/blob/master/LICENSE
 */


module SpaceshipInTrouble.Engine.ScreenSystem {


    /**
     * Manages all the screens shown. You may stack multiple screens.
     *
     * @namespace engine.screens
     * @class Screenmanager
     */
    export class ScreenManager {

        private _screenStack = [];
        private _renderer : THREE.WebGLRenderer;
        private _currentScreen: SpaceshipInTrouble.Engine.ScreenSystem.AbstractScreen;
        private _isRendering = false;

        private _timeDiff: number;
        private _currentTime: number;
        private _lastTime: number;

        /**
         * Creates a new `ScreenManager`
         *
         * @method __constructor
         */
        public constructor(renderer:  THREE.WebGLRenderer) {
            this._renderer = renderer;
            _.bindAll(this);
        }


        /**
         * Starts rendering of the screens. This will start a requestAnimationFrame-loop until there
         * is no more screen left to show or until you call `stopRendering`.
         *
         */
        public startRendering () {
            if (this._currentScreen && ! this._isRendering) {
                this._isRendering = true;
                requestAnimationFrame(this._render);
            }
        }

        /**
         * Stops a previously invoked `startRendering`. No more screens will be rendered after calling this.
         * Call `startRendering` again to continue with rendering.
         *
         */
        public stopRendering () {
            this._isRendering = false;
        }

        /**
         * Load and create a screen with the given `screenName`. Returns a promise for the loaded screen
         *
         * @param screenName {string} name of the screen to be loaded
         * @returns {Promise(AbstractScreen)} promise for the loaded screen
         */
        public createScreen(screenName: string) {
            console.log("trying to create screen");
            var deferred = Q.defer();
            var that = this;
            $.ajax('game/screens/'+screenName, {
                success: function(Screen) {
                    console.log("Creating Screen "+screenName);
                    deferred.resolve(new Screen(that._renderer));
                }
            });
            return deferred.promise;
        }

        /**
         * Drops the given `screen`. If it's the current top screen the one beneath it will get the current screen.
         *
         * @param screen {AbstractScreen} the screen to be dropped
         */
        public dropScreen (screen) {
            if (screen === this._currentScreen) {
                this._screenStack.pop();

                if (this._screenStack.length > 0) {
                    this._currentScreen = this._screenStack[this._screenStack.length - 1];
                } else {
                    this._currentScreen = null;
                }
            }
        }

        /**
         * Makes the given `screen` the current one and adds it to the top of the screen stack
         *
         * @param screen {AbstractScreen} the screen to be shown
         */
        public showScreen (screen: AbstractScreen) {
            console.log("showing screen...");
            this._currentScreen = screen;
            this._screenStack.push(this._currentScreen);
            this._currentScreen.show();
            this.startRendering();
        }

        public getRenderer () : THREE.WebGLRenderer {
            return this._renderer;
        }

        /**
         * Loads and shows a screen by `screenName`
         *
         * @param screenName {string} the screen to be loaded and shown
         * @returns {Promise|Promise<ScreenManager>} for the screen when it's loaded and shown
         */
        public showScreenByName (screenName: string) {
            var that = this;

            var deferred = Q.defer();

            $.ajax('game/screens/' + screen, {success: function (Screen) {
                that.showScreen(new Screen(that.getRenderer()));
                deferred.resolve(that);
            }}
            );

            return deferred.promise;
        }

        /**
         * Internal method for rendering the currentScreen
         *
         * @private
         */
        private _render () {

            if (!this._currentScreen) {
                console.log("no active screen - stopping rendering");
                this.stopRendering();
                return;
            }

            SpaceshipInTrouble.Engine.Helpers.StatsHelper.getInstance().begin();
            //render current screen
            this._currentTime = SpaceshipInTrouble.Engine.Helpers.performanceTimer();
            this._timeDiff = this._currentTime - this._lastTime;
            this._lastTime = this._currentTime;

            if (this._timeDiff > 60) {
                this._timeDiff = 60;    //max
            }

            this._currentScreen.render(this._timeDiff);

            if (this._isRendering) {
                requestAnimationFrame(this._render);
            }
            SpaceshipInTrouble.Engine.Helpers.StatsHelper.getInstance().end();
        }

    }

}
