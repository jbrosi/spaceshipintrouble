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
     * Represents a layer consisting of `MapObject`s. These objects will obviously converted to
     * entities.
     *
     */
    export class ObjectLayer extends SpaceshipInTrouble.Engine.MapSystem.MapLayer {

        private _objects:MapObject[] = [];

        private _name:string;
        private _width:number;
        private _height:number;
        private _x:number;
        private _y:number;

        /**
         * Creates a new `ObjectLayer` with given `name`, `width`, `height` and the position/offset (`x`, `y`)
         *
         * @param name {string} how this ObjectLayer should be called
         * @param width {number} width of this layer
         * @param height {number} height of this layer
         * @param x {number} x-offset
         * @param y {number} y-offset
         */
        public constructor(name:string = "undefined", width:number = -1, height:number = -1, x:number = 0, y:number = 0) {
            super();
            this._name = name;
            this._width = width;
            this._height = height;
            this._x = x;
            this._y = y;

        }

        /**
         * Adds the MapObject `obj` to this layer
         *
         * @param obj {engine.map.MapObject} the object to add
         */
        public addObject(obj:MapObject) {
            this._objects.push(obj);
        }

        /**
         * Creates a new `ObjectLayer` from the given `jsonData`
         *
         * TODO: don't create on the fly but return promise instead
         *
         * @param jsonData {*} the jsonData defining this layer
         */
        public static createFromJSON(jsonData:any) {
            //very naive for the beginning... TODO: check existence/validity of the fields

            var objectLayer = new ObjectLayer(jsonData.name, jsonData.width, jsonData.height, jsonData.x, jsonData.y);

            //parse objects:
            for (var a = 0; a < jsonData.objects.length; a++) {
                var obj = jsonData.objects[a];
                //create MapObject
                objectLayer.addObject(MapObject.createFromJSON(obj));
            }

            return objectLayer;
        }


    }


}