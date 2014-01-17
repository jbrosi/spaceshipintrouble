
import MapLayer = require('engine/map/mapLayer');
import TileSet = require('engine/map/tileSet');
import TileLayer = require('engine/map/tileLayer');
import ObjectLayer = require('engine/map/objectLayer');
import _ = require('lodash');

/**
 * Represents a `Map` loaded via Tiled Mapeditor
 *
 *
 * TODO: I don't want tiled to be in here. Let this be a normal map and convert
 *       tiled maps to this one
 *
 * @namespace engine.map
 * @class TiledMap
 */
class TiledMap {
    
    private _layers: MapLayer[] = [];
    private _tileSets: TileSet[] = [];
    private _properties: any;
    
    private _width: number;
    private _height: number;
    private _tileWidth: number;
    private _tileHeight: number;
    private _version: string;

    /**
     * Creates a new `TiledMap` with the given `width`, `height`, `tileWidth`, `tileHeight`, `properties` and `version`
     *
     * @method __constructor
     * @param width {number} width of map in pixel
     * @param height {number} height of map in pixel
     * @param tileWidth {number} width of default tiles in pixel
     * @param tileHeight {number} height of default tiles in pixel
     * @param properties {*} various properties for this map
     * @param version {number} the version number of this map
     */
    public constructor(width: number, height: number, tileWidth: number, tileHeight: number, properties: any, version: string) {
        this._width = width;
        this._height = height;
        this._tileWidth = tileWidth;
        this._tileHeight = tileHeight;
        this._properties = properties;
        this._version = version;
        
        _.bindAll(this);
    }

    /**
     * Adds a `MapLayer` to the map
     *
     * @method addLayer
     * @param layer {engine.map.MapLayer} the layer to be added
     */
    public addLayer(layer: MapLayer) {
        this._layers.push(layer);
    }

    /**
     * Adds a `TileSet` to the map
     *
     * @method addTileSet
     * @param tileSet {engine.map.TileSet}
     */
    public addTileSet(tileSet: TileSet) {
        this._tileSets.push(tileSet);
    }

    /**
     * Sets the `properties` for this map. Previously set `properties` will be overwritten
     *
     * @method setProperties
     * @param properties {*} the properties to set
     */
    public setProperties(properties) {
        this._properties = properties;
    }
};

export = TiledMap;