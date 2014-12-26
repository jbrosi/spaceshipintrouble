/**
 * Spaceship in trouble - a Game & GameEngine in TypeScript
 *
 * Copyright (c) 2014 Johannes Brosi <me@brosi.me>
 *
 * Released under the MIT license
 * https://github.com/jbrosi/spaceshipintrouble/blob/master/LICENSE
 */

module SpaceshipInTrouble.Engine.EntitySystem {

    /**
     * Every `Entity` may hold various `EntityComponent`s which define the behavior
     * and visual representation of the Entity. EntityComponents may be scripts,
     * Sprites, ...
     *
     */
    export class EntityComponent {

        private _data = {};

        private static _staticData:any = {};

        private _name:string;

        /**
         */
        private _entity: SpaceshipInTrouble.Engine.EntitySystem.Entity;

        /**
         * Creates a new `EntityComponent` for the given `entity` with the given `name` and the given `data`
         *
         * @param name {string} the name of this component
         * @param entity {engine.entity.Entity} reference to the entity this component is attached to
         * @param data {any} the data for this component
         */
        public constructor(name: string, entity: SpaceshipInTrouble.Engine.EntitySystem.Entity, data: any = {}) {
            this._name = name;
            this._entity = entity;
            this._data = data;
        }

        /**
         *
         * @returns {engine.entity.Entity} the reference to the entity holding this component
         */
        public getEntity(): SpaceshipInTrouble.Engine.EntitySystem.Entity {
            return this._entity;
        }

        /**
         *
         * @returns {*} the data hold by this component
         */
        public getData() {
            return this._data;
        }

        /**
         *
         * @returns {*} the static data hold by components with the same `name` as this component
         */
        public getStaticData() {
            if (EntityComponent._staticData[this._name] === undefined) {
                EntityComponent._staticData[this._name] = {};
            }
            return EntityComponent._staticData[this._name];
        }

        /**
         * Sets the `data` for this component (overriding previously set `data`)
         *
         * @param data {*} the data to be set
         */
        public setData(data:any) {
            this._data = data;
        }

    }
}
