/**
 * Spaceship in trouble - a Game & GameEngine in TypeScript
 *
 * Copyright (c) 2014 Johannes Brosi <me@brosi.me>
 *
 * Released under the MIT license
 * https://github.com/jbrosi/spaceshipintrouble/blob/master/LICENSE
 */

module SpaceshipInTrouble.Engine.EntitySystem {

    var DEFAULT_ENTITY_POOL_SIZE = 10000;

    /**
     * The EntityManager is responsible for managing the lifecycle of the entities. It creates, initializes,
     * saves, activates, deactivates and destroys them.
     *
     *
     * @namespace engine.entity
     * @class EntityManager
     */
    export class EntityManager {


        private _objectIdsUsed = 0;

        private _registeredPrototypes: SpaceshipInTrouble.Engine.EntitySystem.EntityPrototype[];

        private _entities: SpaceshipInTrouble.Engine.EntitySystem.Entity[];
        private _entityCount = 0;

        private _activeEntities: SpaceshipInTrouble.Engine.EntitySystem.Entity[];
        private _activeEntityCount = 0;

        private _inactiveEntities: SpaceshipInTrouble.Engine.EntitySystem.Entity[];
        private _inactiveEntityCount = 0;

        private _alwaysActiveEntities: SpaceshipInTrouble.Engine.EntitySystem.Entity[];
        private _alwaysActiveEntityCount = 0;


        /**
         * Creates a new EntityManager ready for managing entities.
         *
         * @method __constructor
         */
        constructor() {

            this.resetEntityPools();
        }


        /**
         * Notifies all entities about their deletion and resets the entity pools afterwards.
         *
         * @method deleteEntities
         */
        public deleteEntities() {
            //todo: notify all entities of their deletion
            this.resetEntityPools();
        }

        /**
         * Cleans up all the entity pools and resets them to their default size.
         * Warning: this does not call the entities' cleanup methods. Use #deleteEntities()
         *          if you want a clean reset.
         *
         * @method resetEntityPools
         */
        public resetEntityPools() {
            this._entities = new Array(DEFAULT_ENTITY_POOL_SIZE);
            this._activeEntities = new Array(DEFAULT_ENTITY_POOL_SIZE);
            this._inactiveEntities = new Array(DEFAULT_ENTITY_POOL_SIZE);
            this._alwaysActiveEntities = new Array(DEFAULT_ENTITY_POOL_SIZE);

            this._entityCount = 0;
            this._activeEntityCount = 0;
            this._inactiveEntityCount = 0;
            this._alwaysActiveEntityCount = 0;
        }


        /**
         * Creates a new entity and adds it to the pool
         *
         * @method createEntityFromPrototype
         * @param prototype {engine.entity.EntityPrototype} the prototype to create the entity from
         * @returns {engine.entity.Entity} the entity created (be carefull, the entity may not have been fully initialized yet!)
         */
        public createEntityFromPrototype(prototype: SpaceshipInTrouble.Engine.EntitySystem.EntityPrototype): SpaceshipInTrouble.Engine.EntitySystem.Entity {
            var entity = new SpaceshipInTrouble.Engine.EntitySystem.Entity(prototype, this);
            this._entities[this._entityCount++] = entity;

            //todo: perform active/inactive check and sort into corresponding pool

            return entity;
        }

        /**
         * Creates a new entity by typename and adds it to the pool
         * @param type {string} the name of the type to create this entity from
         * @method createEntityByName
         * @returns {engine.entity.Entity} the entity created or null if the type isn't defined (be carefull, the entity may not have been fully initialized yet!)
         */
        public createEntityByName(type:string):Entity {
            if (this._registeredPrototypes[type] === undefined) {
                //TODO: warn: Type not found! return null...
                return null;
            }
            return this.createEntityFromPrototype(this._registeredPrototypes[type]);
        }


        /**
         * Sends `message` to all active entities (if you set the `alsoSendToInactives` parameter to true it also gets send to inactive ones)
         *
         * @method sendMessage
         * @param message {engine.entity.EntityMessage} the message to be sent
         * @param alsoSendToInactives {boolean} false (default): don't send message to inactive entities.
         *        True: send to *all* (actives and inactives)
         */
        public sendMessage(message: SpaceshipInTrouble.Engine.EntitySystem.EntityMessage, alsoSendToInactives:boolean = false) {

            var a:number;

            for (a = 0; a < this._alwaysActiveEntityCount && !message.isConsumed(); a++) {
                this._alwaysActiveEntities[a].sendMessage(message);
            }

            for (a = 0; a < this._activeEntityCount && !message.isConsumed(); a++) {
                this._activeEntities[a].sendMessage(message);
            }

            if (alsoSendToInactives) {
                for (a = 0; a < this._inactiveEntityCount && !message.isConsumed(); a++) {
                    this._inactiveEntities[a].sendMessage(message);
                }
            }

        }


        /**
         * Invokes `doStep` on all active entities and tells them the time elapsed since the last step (`timeStep`)
         *
         * @method doStep
         * @param timeStep {number} the time elapsed since the last step
         */
        public doStep(timeStep:number) {

            //lets all the (active) entities do their stuff
            var a:number;

            for (a = 0; a < this._alwaysActiveEntityCount; a++) {
                this._alwaysActiveEntities[a].doStep(timeStep);
            }

            for (a = 0; a < this._activeEntityCount; a++) {
                this._activeEntities[a].doStep(timeStep);
            }


        }

    }
}
