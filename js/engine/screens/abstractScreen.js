define(["require", "exports"], function(require, exports) {
    var AbstractScreen = (function () {
        function AbstractScreen() {
        }
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
