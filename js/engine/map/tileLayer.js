var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'engine/map/mapLayer'], function(require, exports, MapLayer) {
    var TileLayer = (function (_super) {
        __extends(TileLayer, _super);
        function TileLayer() {
            _super.apply(this, arguments);
        }
        return TileLayer;
    })(MapLayer);
    ;

    
    return TileLayer;
});
