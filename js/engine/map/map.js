define(["require", "exports", 'engine/map/mapLayer', 'engine/map/tileSet', 'engine/map/tileLayer', 'engine/map/objectLayer', 'lodash'], function(require, exports, MapLayer, TileSet, TileLayer, ObjectLayer, _) {
    var Map = (function () {
        function Map(width, height, tileWidth, tileHeight, properties, version) {
            this._layers = [];
            this._tileSets = [];
            this._width = width;
            this._height = height;
            this._tileWidth = tileWidth;
            this._tileHeight = tileHeight;
            this._properties = properties;
            this._version = version;

            _.bindAll(this);
        }
        Map.prototype.addLayer = function (layer) {
            this._layers.push(layer);
        };

        Map.prototype.addTileSet = function (tileSet) {
            this._tileSets.push(tileSet);
        };

        Map.prototype.setProperties = function (properties) {
            this._properties = properties;
        };
        return Map;
    })();
    ;

    
    return Map;
});
