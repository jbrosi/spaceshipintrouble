define(["require", "exports", 'q'], function(require, exports, Q) {
    var AbstractMapLoader = (function () {
        function AbstractMapLoader(mapFile) {
            this._mapFile = mapFile;
        }
        AbstractMapLoader.prototype.getMapFile = function () {
            return this._mapFile;
        };

        AbstractMapLoader.prototype.getProgressInPercent = function () {
            return 0;
        };

        AbstractMapLoader.prototype.getProgressAsText = function () {
            return "initializing";
        };

        AbstractMapLoader.prototype.loadMap = function () {
            return Q("not yet implemented");
        };
        return AbstractMapLoader;
    })();
    ;

    
    return AbstractMapLoader;
});
