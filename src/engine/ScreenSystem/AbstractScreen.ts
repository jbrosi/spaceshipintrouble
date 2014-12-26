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
     * Base class for all screens shown by the `ScreenManager`
     *
     */
    export class AbstractScreen {

        private _renderer;

        /**
         * Creates a new screen
         *
         * @param renderer {THREE.Renderer} the renderer to be used in this screen
         */
        public constructor(renderer) {
            this._renderer = renderer;
        }

        /**
         * Returns the renderer used for this screen
         *
         * @returns {THREE.WebGLRenderer} the renderer used for this screen
         */
        public getRenderer() {
            return this._renderer;
        }

        /**
         * Gets called when the screen is about to get visible
         * Override to implement your own behavior
         *
         */
        public show() {
            //gets callend when the screen gets visible
        }

        /**
         * Gets called whenever this screen should render itself.
         * Override to implement your own behavior
         *
         * @param timeStep {number} the time that passed since the last render step
         */
        public render(timeStep:number) {
            //implement for drawing
        }
    }
}