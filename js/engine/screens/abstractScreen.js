define(["require", "exports"], function(require, exports) {
    var AbstractScreen = (function () {
        function AbstractScreen(renderer) {
            this._renderer = renderer;
        }
        AbstractScreen.prototype.getRenderer = function () {
            return this._renderer;
        };

        AbstractScreen.prototype.show = function () {
            //gets callend when the screen gets visible
        };

        AbstractScreen.prototype.render = function (timeStep) {
            //implement for drawing
        };
        return AbstractScreen;
    })();
    ;

    
    return AbstractScreen;
});
