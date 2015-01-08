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
     * MapObjects are objects contained in the `ObjectLayer`. They may get converted
     * to entities as the map loading progress goes on.
     *
     */
    export class MapObject {

        /**
         * Creates a `MapObject` from the given `jsonData`
         *
         * @param jsonData {*} the data to create the `MapObject` from
         * @returns {MapObject} a new `MapObject` created from the given `jsonData`
         */
        public static createFromJSON(jsonData:any):MapObject {
            return new MapObject();
        }

    }
}

