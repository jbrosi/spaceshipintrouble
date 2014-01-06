define(["require", "exports", "game/entity/entity", "game/entity/entityMessage", "game/entity/entityPrototype"], function(require, exports, Entity, EntityMessage, EntityPrototype) {
    var DEFAULT_ENTITY_POOL_SIZE = 10000;

    var EntityManager = (function () {
        function EntityManager() {
            this._objectIdsUsed = 0;
            this._entityCount = 0;
            this._activeEntityCount = 0;
            this._inactiveEntityCount = 0;
            this._alwaysActiveEntityCount = 0;
            this.resetEntityPools();
        }
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
        */
        EntityManager.prototype.createEntity = function (prototype) {
            this._entities[this._entityCount++] = new Entity(prototype);
            //todo: perform active/inactive check and sort into corresponding pool
        };

        EntityManager.prototype.sendMessage = function (message, alsoSendToInactives) {
            if (typeof alsoSendToInactives === "undefined") { alsoSendToInactives = false; }
            // sends message to all active entities (if you set the second parameter to true it also gets send to inactive ones)
            //todo: loop through entities and pass the message so they may call their listener scripts
        };
        return EntityManager;
    })();
    ;

    
    return EntityManager;
});
