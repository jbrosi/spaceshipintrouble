define(["require", "exports", 'lodash'], function(require, exports, _) {
    var KeyboardHelper = (function () {
        function KeyboardHelper() {
            this._keysDown = {
                right: false,
                up: false,
                left: false,
                down: false,
                space: false,
                floatLeft: false,
                floatRight: false
            };
            _.bindAll(this);
        }
        KeyboardHelper.prototype.getKeys = function () {
            return this._keysDown;
        };

        KeyboardHelper.prototype.register = function () {
            document.body.onkeydown = this._onKeyDown;
            document.body.onkeyup = this._onKeyUp;
        };

        KeyboardHelper.prototype.unregister = function () {
            delete document.body.onkeydown;
            delete document.body.onkeyup;
        };

        KeyboardHelper.prototype._onKeyUp = function (event) {
            this._onKeyDown(event, false);
        };

        KeyboardHelper.prototype.isLeftPressed = function () {
            return this._keysDown.left;
        };

        KeyboardHelper.prototype.isUpPressed = function () {
            return this._keysDown.up;
        };

        KeyboardHelper.prototype.isDownPressed = function () {
            return this._keysDown.down;
        };

        KeyboardHelper.prototype.isRightPressed = function () {
            return this._keysDown.right;
        };

        KeyboardHelper.prototype.isSpacePressed = function () {
            return this._keysDown.space;
        };

        KeyboardHelper.prototype._onKeyDown = function (event, upDown) {
            if (typeof upDown === "undefined") { upDown = true; }
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
        };
        return KeyboardHelper;
    })();
    
    return KeyboardHelper;
});
