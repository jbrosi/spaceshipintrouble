

import Entity = require("game/entity/entity");        
import EntityMessage = require("game/entity/entityMessage");
import EntityPrototype = require("game/entity/entityPrototype");

var DEFAULT_ENTITY_POOL_SIZE = 10000;

class EntityManager {
    
    
    private _objectIdsUsed = 0;
    
    private _entities: Entity[];
    private _entityCount = 0;
    
    private _activeEntities: Entity[];
    private _activeEntityCount = 0;
    
    private _inactiveEntities: Entity[];
    private _inactiveEntityCount = 0;
    
    private _alwaysActiveEntities: Entity[];
    private _alwaysActiveEntityCount = 0;
    
    constructor() {
        this.resetEntityPools();
    }
    
    /**
     * Notifies all entities about their deletion and resets the entity pools afterwards.
     */
    public deleteEntities() {
        //todo: notify all entities of their deletion
        this.resetEntityPools();
    }
    
    /**
     * Cleans up all the entity pools and resets them to their default size.
     * Warning: this does not call the entities' cleanup methods. Use #deleteEntities()
     *          if you want a clean reset.
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
     */
    public createEntity (prototype: EntityPrototype) {
        this._entities[this._entityCount++] = new Entity(prototype);
        
        //todo: perform active/inactive check and sort into corresponding pool
    }
    
    
    public sendMessage(message: EntityMessage, alsoSendToInactives: boolean = false) {
        // sends message to all active entities (if you set the second parameter to true it also gets send to inactive ones)
        
        //todo: loop through entities and pass the message so they may call their listener scripts
    }
    
};

export = EntityManager;
