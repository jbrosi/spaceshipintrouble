
import MapLayer = require('engine/map/mapLayer');
import TileSet = require('engine/map/tileSet');
import TileLayer = require('engine/map/tileLayer');
import ObjectLayer = require('engine/map/objectLayer');


class Map {
    
    private _layers: MapLayer[] = [];
    private _tileSets: TileSet[] = [];
    private _properties: any;
    
    private _width: number;
    private _height: number;
    private _tileWidth: number;
    private _tileHeight: number;
    private _version: String;
    
    public constructor(width: number, height: number, tileWidth: number, tileHeight: number, properties: any, version: String) {
        this._width = width;
        this._height = height;
        this._tileWidth = tileWidth;
        this._tileHeight = tileHeight;
        this._properties = properties;
        this._version = version;
    }
    
    public addLayer(layer: MapLayer) {
        this._layers.push(layer);
    }
    
    public addTileSet(tileSet: TileSet) {
        this._tileSets.push(tileSet);
    }
    
    public setProperties(properties) {
        this._properties = properties;
    }
};

export = Map;