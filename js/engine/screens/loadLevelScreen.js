var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'engine/screens/abstractScreen', 'engine/map/abstractMapLoader'], function(require, exports, AbstractScreen, AbstractMapLoader) {
    var LoadLevelScreen = (function (_super) {
        __extends(LoadLevelScreen, _super);
        function LoadLevelScreen() {
            _super.apply(this, arguments);
        }
        LoadLevelScreen.prototype.setMapLoader = function (mapLoader) {
            this._mapLoader = mapLoader;
        };
        return LoadLevelScreen;
    })(AbstractScreen);
    ;

    
    return LoadLevelScreen;
});
