define(["require", "exports", "engine/entity/entity", "engine/entity/entityMessage", "engine/entity/entityPrototype"], function(require, exports, Entity, EntityMessage, EntityPrototype) {
    var DEFAULT_ENTITY_POOL_SIZE = 10000;

    var EntityManager = (function () {
        function EntityManager(level) {
            this._objectIdsUsed = 0;
            this._entityCount = 0;
            this._activeEntityCount = 0;
            this._inactiveEntityCount = 0;
            this._alwaysActiveEntityCount = 0;
            this._level = level;

            this.resetEntityPools();
        }
        EntityManager.prototype.getLevel = function () {
            return this._level;
        };

        /**
        * Notifies all entities about their deletion and resets the entity pools afterwards.
        */
        EntityManager.prototype.deleteEntities = function () {
            //todo: notify all entities of their deletion
            this.resetEntityPools();
        };

        /**
        * Cleans up all the entity pools and resets them to their default size.
        * Warning: this does not call the entities' cleanup methods. Use #deleteEntities()
        *          if you want a clean reset.
        */
        EntityManager.prototype.resetEntityPools = function () {
            this._entities = new Array(DEFAULT_ENTITY_POOL_SIZE);
            this._activeEntities = new Array(DEFAULT_ENTITY_POOL_SIZE);
            this._inactiveEntities = new Array(DEFAULT_ENTITY_POOL_SIZE);
            this._alwaysActiveEntities = new Array(DEFAULT_ENTITY_POOL_SIZE);

            this._entityCount = 0;
            this._activeEntityCount = 0;
            this._inactiveEntityCount = 0;
            this._alwaysActiveEntityCount = 0;
        };

        /**
        * Creates a new entity and adds it to the pool
        *
        * @returns the entity created (be carefull, the entity may not have been fully initialized yet!)
        */
        EntityManager.prototype.createEntityFromPrototype = function (prototype) {
            var entity = new Entity(prototype, this);
            this._entities[this._entityCount++] = entity;

            //todo: perform active/inactive check and sort into corresponding pool
            return entity;
        };

        /**
        * Creates a new entity by typename and adds it to the pool
        *
        * @returns the entity created or null if the type isn't defined (be carefull, the entity may not have been fully initialized yet!)
        */
        EntityManager.prototype.createEntityByName = function (type) {
            if (this._registeredPrototypes[type] === undefined) {
                //TODO: warn: Type not found! return null...
                return null;
            }
            return this.createEntityFromPrototype(this._registeredPrototypes[type]);
        };

        /**
        * sends message to all active entities (if you set the second parameter to true it also gets send to inactive ones)
        */
        EntityManager.prototype.sendMessage = function (message, alsoSendToInactives) {
            if (typeof alsoSendToInactives === "undefined") { alsoSendToInactives = false; }
            var a;

            for (a = 0; a < this._alwaysActiveEntityCount; a++) {
                this._alwaysActiveEntities[a].sendMessage(message);
            }

            for (a = 0; a < this._activeEntityCount; a++) {
                this._activeEntities[a].sendMessage(message);
            }

            if (alsoSendToInactives) {
                for (a = 0; a < this._inactiveEntityCount; a++) {
                    this._inactiveEntities[a].sendMessage(message);
                }
            }
        };

        EntityManager.prototype.doStep = function (timeStep) {
            //lets all the (active) entities do their stuff
            var a;

            for (a = 0; a < this._alwaysActiveEntityCount; a++) {
                this._alwaysActiveEntities[a].doStep(timeStep);
            }

            for (a = 0; a < this._activeEntityCount; a++) {
                this._activeEntities[a].doStep(timeStep);
            }
        };
        return EntityManager;
    })();
    ;

    
    return EntityManager;
});
