var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'q', 'engine/map/abstractMapLoader', 'engine/util/resourceLoader'], function(require, exports, Q, AbstractMapLoader, ResourceLoader) {
    var TiledJSONMapLoader = (function (_super) {
        __extends(TiledJSONMapLoader, _super);
        function TiledJSONMapLoader() {
            _super.apply(this, arguments);
            this._progress = 0;
            this._status = "initializing map loader";
        }
        TiledJSONMapLoader.prototype.getProgressInPercent = function () {
            return this._progress;
        };

        TiledJSONMapLoader.prototype.getProgressAsText = function () {
            return this._status;
        };

        TiledJSONMapLoader.prototype.loadLevel = function () {
            console.log("trying to load level " + this.getLevelFile());

            var rl = ResourceLoader.getInstance();
            rl.loadJSONFile(this.getLevelFile()).then(function (data) {
                console.log("Loaded the level: ", data);
            }, function (error) {
                console.log(error);
                console.log("failed to load file :(");
            });
            return Q("not yet implemented");
        };
        return TiledJSONMapLoader;
    })(AbstractMapLoader);
    ;

    
    return TiledJSONMapLoader;
});
