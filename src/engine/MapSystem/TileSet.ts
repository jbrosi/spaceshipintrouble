/**
 * Spaceship in trouble - a Game & GameEngine in TypeScript
 *
 * Copyright (c) 2014 Johannes Brosi <me@brosi.me>
 *
 * Released under the MIT license
 * https://github.com/jbrosi/spaceshipintrouble/blob/master/LICENSE
 */

module SpaceshipInTrouble.Engine.MapSystem {

    /**
     * A `TileSet` holds information about how to draw tiles with certain tileIds.
     *
     */
    export class TileSet {
        private imagePath:string;

        private imageWidth:number;
        private imageHeight:number;
        private tileWidth:number;
        private tileHeight:number;
        private firstGid:number;
        private name:string;
        private properties:any;
        private spacing:number;
        private tileProperties:any;
        private margin:number;
        private tileOffsetX:number;
        private tileOffsetY:number;


        /**
         * Creates a new `TileSet` from the given JSONData
         *
         * @param jsonData {*} the data to create this `TileSet` from
         * @returns {TileSet} the newly created `TileSet`
         */
        public static createFromJSON(jsonData:any):TileSet {
            return new TileSet();
        }
    }
}