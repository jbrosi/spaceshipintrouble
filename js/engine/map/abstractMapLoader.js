define(["require", "exports", 'q'], function(require, exports, Q) {
    var AbstractMapLoader = (function () {
        function AbstractMapLoader(levelFile) {
            this._levelFile = levelFile;
        }
        AbstractMapLoader.prototype.getLevelFile = function () {
            return this._levelFile;
        };

        AbstractMapLoader.prototype.getProgressInPercent = function () {
            return 0;
        };

        AbstractMapLoader.prototype.getProgressAsText = function () {
            return "initializing";
        };

        AbstractMapLoader.prototype.loadLevel = function () {
            return Q("not yet implemented");
        };
        return AbstractMapLoader;
    })();
    ;

    
    return AbstractMapLoader;
});
