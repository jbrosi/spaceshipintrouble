var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'q', 'engine/map/abstractMapLoader', 'engine/util/resourceLoader', 'engine/map/mapLayer', 'engine/map/tileSet', 'engine/map/tileLayer', 'engine/map/objectLayer', 'engine/map/map'], function(require, exports, Q, AbstractMapLoader, ResourceLoader, MapLayer, TileSet, TileLayer, ObjectLayer, Map) {
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

        TiledJSONMapLoader.prototype.loadMap = function () {
            console.log("loading level " + this.getMapFile());

            var rl = ResourceLoader.getInstance();

            return rl.loadJSONFile(this.getMapFile()).then(this._parseMap);
        };

        TiledJSONMapLoader.prototype._parseMap = function (data) {
            var a;

            var mandatoryFields = [
                'width', 'height', 'tilewidth', 'tileheight', 'properties', 'version'
            ];
            console.log("parsing map");
            for (a = 0; a < mandatoryFields.length; a++) {
                if (data[mandatoryFields[a]] === undefined) {
                    throw new Error("Invalid Map file! Missing mandatory field '" + mandatoryFields[a] + "'.");
                }
            }

            var map = new Map(data.width, data.height, data.tilewidth, data.tileheight, data.properties, data.version);

            var promises = [];

            for (a = 0; a < data.layers.length; a++) {
                switch (data.layers[a].type) {
                    case 'tilelayer':
                        promises.push(Q.fcall(TileLayer.createFromJSON, data.layers[a]).then(map.addLayer));
                        break;
                    case 'objectgroup':
                        promises.push(Q.fcall(ObjectLayer.createFromJSON, data.layers[a]).then(map.addLayer));
                        break;
                    default:
                        console.log("Warning: invalid layer type found... ignoring layer");
                }
            }

            for (var a = 0; a < data.tilesets.length; a++) {
                promises.push(Q.fcall(TileSet.createFromJSON, data.tilesets[a]).then(map.addTileSet));
            }

            return Q.allSettled(promises).then(function (states) {
                for (a = 0; a < states.length; a++) {
                    if (states[a].state !== "fulfilled") {
                        console.log("one failed!", states[a].reason);
                    }
                }
                console.log("successfully parsed the map");
                return map;
            });
        };
        return TiledJSONMapLoader;
    })(AbstractMapLoader);
    ;

    
    return TiledJSONMapLoader;
});
