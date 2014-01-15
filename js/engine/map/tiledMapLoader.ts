
import Q = require('q');
import AbstractMapLoader = require('engine/map/abstractMapLoader');
import ResourceLoader = require('engine/util/resourceLoader');

import MapLayer = require('engine/map/mapLayer');
import TileSet = require('engine/map/tileSet');
import TileLayer = require('engine/map/tileLayer');
import ObjectLayer = require('engine/map/objectLayer');

import Map = require('engine/map/map');


class TiledJSONMapLoader extends AbstractMapLoader{

    private _progress = 0;
    private _status = "initializing map loader";

    public getProgressInPercent(): number {
        return this._progress;
    }
    
    public getProgressAsText(): string {
        return this._status;
    }
    
    
    public loadMap() {
        console.log("loading level "+ this.getMapFile());

        var rl = ResourceLoader.getInstance();
        
        return rl.loadJSONFile(this.getMapFile()).then(this._parseMap);
    }
    
    private _parseMap(data) {
        var a: number;
    
        var mandatoryFields= [
            'width', 'height', 'tilewidth', 'tileheight', 'properties', 'version'
        ];
        console.log("parsing map");
        for(a = 0; a < mandatoryFields.length; a++) {
            if (data[mandatoryFields[a]] === undefined) {
                throw new Error("Invalid Map file! Missing mandatory field '"+mandatoryFields[a]+"'.");
            }
        }
        
        var map = new Map(data.width, data.height, data.tilewidth, data.tileheight, data.properties, data.version);
        
        var promises = [];
        
        //parse, create and add the layers
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
        
        
        //parse, create and add tilesets
        for (var a = 0; a < data.tilesets.length; a++) {
            promises.push(Q.fcall(TileSet.createFromJSON, data.tilesets[a]).then(map.addTileSet));
        }
        
        return Q.allSettled(promises).then(function(states) {
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