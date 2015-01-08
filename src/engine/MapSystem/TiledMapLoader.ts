/**
 * Spaceship in trouble - a Game & GameEngine in TypeScript
 *
 * Copyright (c) 2014 - 2015 Johannes Brosi <me@brosi.me>
 *
 * Released under the MIT license
 * https://github.com/jbrosi/spaceshipintrouble/blob/master/LICENSE
 */


module SpaceshipInTrouble.Engine.MapSystem {

    /**
     * Responsible for loading Tiled Maps.
     *
     */
    export class TiledJSONMapLoader extends SpaceshipInTrouble.Engine.MapSystem.AbstractMapLoader {

        private _progress = 0;
        private _status = "initializing map loader";

        /**
         * returns the current progress in percent
         *
         * @returns {number} current progress in percent
         */
        public getProgressInPercent():number {
            return this._progress;
        }

        /**
         * Returns the current progress status text
         *
         * @returns {string} current progress status
         */
        public getProgressAsText():string {
            return this._status;
        }

        /**
         * Loads the map and returns promise to it
         *
         */
        public loadMap() : Q.Promise<any> {
            console.log("loading level " + this.getMapFile());

            var rm = SpaceshipInTrouble.Engine.ResourceSystem.ResourceManager.getInstance();

            return rm.loadJSONFile(this.getMapFile()).then(this._parseMap);
        }

        /**
         * Internal method for parsing the map data
         *
         * @param data
         * @returns {*}
         */
        private _parseMap(data) {
            var a:number;

            var mandatoryFields = [
                'width', 'height', 'tilewidth', 'tileheight', 'properties', 'version'
            ];
            console.log("parsing map");
            for (a = 0; a < mandatoryFields.length; a++) {
                if (data[mandatoryFields[a]] === undefined) {
                    throw new Error("Invalid TiledMap file! Missing mandatory field '" + mandatoryFields[a] + "'.");
                }
            }

            var map = new TiledMap(data.width, data.height, data.tilewidth, data.tileheight, data.properties, data.version);

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

            return Q.allSettled(promises).then(function (states) {
                for (a = 0; a < states.length; a++) {
                    if (states[a].state !== "fulfilled") {
                        console.log("one failed!", states[a].reason);
                    }
                }
                console.log("successfully parsed the map");
                return map;
            });
        }


    }
}
