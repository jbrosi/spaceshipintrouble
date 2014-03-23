/**
 * Spaceship in trouble - a Game & GameEngine in TypeScript
 *
 * Copyright (c) 2014 Johannes Brosi <me@brosi.me>
 *
 * Released under the MIT license
 * https://github.com/jbrosi/spaceshipintrouble/blob/master/LICENSE
 */

/// <reference path="../../lib.d/promise.d.ts" />
/// <amd-dependency path="promise" />
declare var require:(moduleId:string) => any;
var Promise = require('promise');

import AbstractMapLoader = require('engine/map/abstractMapLoader');
import ResourceLoader = require('engine/util/resourceLoader');
import MapLayer = require('engine/map/mapLayer');
import TileSet = require('engine/map/tileSet');
import TileLayer = require('engine/map/tileLayer');
import ObjectLayer = require('engine/map/objectLayer');
import TiledMap = require('engine/map/tiledMap');

/**
 * Responsible for loading Tiled Maps.
 *
 * @namespace engine.map
 * @class TiledJSONMapLoader
 * @extends engine.map.AbstractMapLoader
 */
class TiledJSONMapLoader extends AbstractMapLoader{

    private _progress = 0;
    private _status = "initializing map loader";

    /**
     * returns the current progress in percent
     *
     * @method getProgressInPercent
     * @overrides
     * @returns {number} current progress in percent
     */
    public getProgressInPercent(): number {
        return this._progress;
    }

    /**
     * Returns the current progress status text
     *
     * @method getProgressAsText
     * @overrides
     * @returns {string} current progress status
     */
    public getProgressAsText(): string {
        return this._status;
    }

    /**
     * Loads the map and returns promise to it
     *
     * @method loadMap
     * @overrides
     * @returns {Promise(engine.map.TiledMap)}
     */
    public loadMap() {
        console.log("loading level "+ this.getMapFile());

        var rl = ResourceLoader.getInstance();
        
        return rl.loadJSONFile(this.getMapFile()).then(this._parseMap);
    }

    /**
     * Internal method for parsing the map data
     *
     * @method _parseMap
     * @param data
     * @returns {*}
     * @private
     */
    private _parseMap(data) {
        var a: number;
    
        var mandatoryFields= [
            'width', 'height', 'tilewidth', 'tileheight', 'properties', 'version'
        ];
        console.log("parsing map");
        for(a = 0; a < mandatoryFields.length; a++) {
            if (data[mandatoryFields[a]] === undefined) {
                throw new Error("Invalid TiledMap file! Missing mandatory field '"+mandatoryFields[a]+"'.");
            }
        }
        
        var map = new TiledMap(data.width, data.height, data.tilewidth, data.tileheight, data.properties, data.version);
        
        var promises = [];
        
        //parse, create and add the layers
        for (a = 0; a < data.layers.length; a++) {
            switch (data.layers[a].type) {
                case 'tilelayer': 
                    promises.push(Promise.fcall(TileLayer.createFromJSON, data.layers[a]).then(map.addLayer));
                    break;
                case 'objectgroup':
                    promises.push(Promise.fcall(ObjectLayer.createFromJSON, data.layers[a]).then(map.addLayer));
                    break;
                default:
                    console.log("Warning: invalid layer type found... ignoring layer");
            }
        }
        
        
        //parse, create and add tilesets
        for (var a = 0; a < data.tilesets.length; a++) {
            promises.push(Promise.fcall(TileSet.createFromJSON, data.tilesets[a]).then(map.addTileSet));
        }
        
        return Promise.allSettled(promises).then(function(states) {
            for(a = 0; a < states.length; a++) {
                if (states[a].state !== "fulfilled") {
                    console.log("one failed!", states[a].reason);
                }
            }
            console.log("successfully parsed the map");
            return map;
        });
    }


};

export = TiledJSONMapLoader;