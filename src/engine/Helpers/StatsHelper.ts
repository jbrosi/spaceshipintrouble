/**
 * Spaceship in trouble - a Game & GameEngine in TypeScript
 *
 * Copyright (c) 2014 - 2015 Johannes Brosi <me@brosi.me>
 *
 * Released under the MIT license
 * https://github.com/jbrosi/spaceshipintrouble/blob/master/LICENSE
 */


module SpaceshipInTrouble.Engine.Helpers {


    /**
     * Provides a StatsHelper for recording and showing performance stats
     * Note: On cocoonJS the stats don't get shown as we already have a fps counter there
     *
     * Warning: This is a SINGLETON(!) it get's automatically instantiated
     *
     * @namespace engine.helper
     * @class StatsHelper
     */
    export class StatsHelper {
        private _stats: any;
        private static _instance: StatsHelper = null;

        /**
         * @method __constructor
         */
        public constructor() {
            if (navigator.hasOwnProperty("isCocoonJS")) {
                //skip all as we don't want the fps counter in cocoon
                return;
            }

            this._stats = new Stats();
            this._stats.setMode(0); // 0: fps, 1: ms

            // Align top-left
            this._stats.domElement.style.position = 'absolute';
            this._stats.domElement.style.left = '0px';
            this._stats.domElement.style.top = '0px';

            document.body.appendChild( this._stats.domElement );

        }

        /**
         * Start counting for the frame (should be executed right after your requestAnimationFrame callback starts)
         */
        public begin() {
            if (this._stats)
                this._stats.begin();
        }

        /**
         * Ends counting for the frame (should be executed right before your requestAnimationFrame callback ends)
         */
        public end () {
            if (this._stats)
                this._stats.end();
        }

        public static getInstance() : StatsHelper {
            if (StatsHelper._instance === null) {
                StatsHelper._instance = new StatsHelper();
            }
            return StatsHelper._instance;
        }


    }
}

