/**
 * Spaceship in trouble - a Game & GameEngine in TypeScript
 *
 * Copyright (c) 2014 - 2015 Johannes Brosi <me@brosi.me>
 *
 * Released under the MIT license
 * https://github.com/jbrosi/spaceshipintrouble/blob/master/LICENSE
 */

module SpaceshipInTrouble.Engine.Helpers.Input {

    /**
     * This class simplifies keyboard input for the game and provides simple methods for
     * checking which keys are pressed actually.
     *
     *
     */
    export class KeyboardHelper {
        private _keysDown = {
            right: false,
            up: false,
            left: false,
            down: false,
            space: false,
            floatLeft: false,
            floatRight: false
        };

        /**
         * Creates the KeyboardHelper
         *
         *
         */
        public constructor() {
            _.bindAll(this);
        }

        /**
         * Returns the currently pressed keys
         *
         * @returns {{right: boolean, up: boolean, left: boolean, down: boolean, space: boolean, floatLeft: boolean, floatRight: boolean}}
         */
        public getKeys() {
            return this._keysDown;
        }

        /**
         * Registers this on the `document.body` keypress events. Without this you won't receive any
         * key events and no keys will be pressed ever. Also see #unregister
         *
         */
        public register():void {
            document.body.onkeydown = this._onKeyDown;
            document.body.onkeyup = this._onKeyUp;
        }

        /**
         * Removes the key lsiteners from `document.body`. You won't receive any keypress events afterwards
         *
         */
        public unregister():void {
            delete document.body.onkeydown;
            delete document.body.onkeyup;
        }

        /**
         * Internal binding for the `onkeyup` event
         *
         * @param event
         */
        private _onKeyUp(event:KeyboardEvent) {
            this._onKeyUpDown(event, false);
        }

        /**
         * Internal binding for the onkeydown event
         *
         * @param event
         */
        private _onKeyDown(event:KeyboardEvent) {
            this._onKeyUpDown(event, true);
        }


        /**
         * @returns {boolean} True if the left key is actually pressed
         */
        public isLeftPressed():boolean {
            return this._keysDown.left;
        }

        /**
         * @returns {boolean} true if the up key is actually pressed
         */
        public isUpPressed():boolean {
            return this._keysDown.up;
        }

        /**
         * @returns {boolean} true if the down key is actually pressed
         */
        public isDownPressed():boolean {
            return this._keysDown.down;
        }

        /**
         * @returns {boolean} true if the right key is actually pressed
         */
        public isRightPressed() {
            return this._keysDown.right;
        }

        /**
         * @returns {boolean} true if the space key is actually pressed
         */
        public isSpacePressed() {
            return this._keysDown.space;
        }

        /**
         * Gets called by onKeyUp and onKeyDown and handles the keystrokes
         *
         * @param event {KeyboardEvent} the event received
         * @param upDown {boolean} true if the key is actually pressed
         */
        private _onKeyUpDown(event:KeyboardEvent, upDown:boolean = true) {

            switch (event.keyCode) {
                case 40:
                case 83:
                    this._keysDown.down = upDown;
                    break;
                case 39:
                case 68:
                    this._keysDown.right = upDown;
                    break;
                case 38:
                case 87:
                    this._keysDown.up = upDown;
                    break;
                case 37:
                case 65:
                    this._keysDown.left = upDown;
                    break;
                case 32:
                    this._keysDown.space = upDown;
                    break;
                case 81:
                    this._keysDown.floatLeft = upDown;
                    break;
                case 69:
                    this._keysDown.floatRight = upDown;
                    break;

            }
        }

    }
}