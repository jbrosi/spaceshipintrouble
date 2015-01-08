/**
 * Spaceship in trouble - a Game & GameEngine in TypeScript
 *
 * Copyright (c) 2014 - 2015 Johannes Brosi <me@brosi.me>
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


        private _scene : THREE.Scene;

        private _physic : Box2D.Dynamics.b2World;

        /**
         * Creates a new EntityManager ready for managing entities.
         *
         */
        constructor(scene : THREE.Scene, physic: Box2D.Dynamics.b2World) {
            this._scene = scene;
            this._physic = physic;
            this.resetEntityPools();
        }

        public getPhysic() {
            return this._physic;
        }

        public getScene() {
            return this._scene;
        }

        /**
         * Notifies all entities about their deletion and resets the entity pools afterwards.
         *
         */
        public deleteEntities() {
            //TODO: notify all entities of their deletion
            //TODO: remove entity object3ds from scene
            this.resetEntityPools();
        }

        /**
         * Cleans up all the entity pools and resets them to their default size.
         * Warning: this does not call the entities' cleanup methods. Use #deleteEntities()
         *          if you want a clean reset.
         *
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


        public registerEntity(entity : SpaceshipInTrouble.Engine.EntitySystem.Entity) {
            this._entities.push(entity);
        }


        /**
         * Sends `message` to all active entities (if you set the `alsoSendToInactives` parameter to true it also gets send to inactive ones)
         *
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
