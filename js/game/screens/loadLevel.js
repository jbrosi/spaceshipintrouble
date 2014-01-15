var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'engine/screens/loadLevelScreen'], function(require, exports, DefaultLoadLevelScreen) {
    var LoadLevelScreen = (function (_super) {
        __extends(LoadLevelScreen, _super);
        function LoadLevelScreen() {
            _super.apply(this, arguments);
        }
        return LoadLevelScreen;
    })(DefaultLoadLevelScreen);
    ;

    
    return LoadLevelScreen;
});
