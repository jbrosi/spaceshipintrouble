var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'engine/map/mapLayer'], function(require, exports, MapLayer) {
    var ObjectLayer = (function (_super) {
        __extends(ObjectLayer, _super);
        function ObjectLayer() {
            _super.apply(this, arguments);
        }
        return ObjectLayer;
    })(MapLayer);
    ;

    
    return ObjectLayer;
});
