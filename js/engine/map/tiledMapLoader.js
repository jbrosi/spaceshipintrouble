var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'engine/map/abstractMapLoader'], function(require, exports, AbstractMapLoader) {
    var TiledJSONMapLoader = (function (_super) {
        __extends(TiledJSONMapLoader, _super);
        function TiledJSONMapLoader() {
            _super.apply(this, arguments);
        }
        return TiledJSONMapLoader;
    })(AbstractMapLoader);
    ;

    
    return TiledJSONMapLoader;
});
