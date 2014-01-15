define(["require", "exports", 'q'], function(require, exports, Q) {
    var AbstractMapLoader = (function () {
        function AbstractMapLoader() {
        }
        AbstractMapLoader.prototype.getProgressInPercent = function () {
            return 0;
        };

        AbstractMapLoader.prototype.getProgressAsText = function () {
            return "initializing";
        };

        AbstractMapLoader.prototype.loadLevel = function (levelFile) {
            return Q("not yet implemented");
        };
        return AbstractMapLoader;
    })();
    ;

    
    return AbstractMapLoader;
});
