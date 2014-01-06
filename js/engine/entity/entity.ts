
import EntityMessage = require("engine/entity/entityMessage");
import EntityPrototype = require("engine/entity/entityPrototype");
import EntityScript = require("engine/entity/entityScript");

class Entity {
    
    private _scripts: EntityScript[];
    
    private _listeners = [];
    
    private _data = {};
    
    private _stepMessage = new EntityMessage("entity:step", {timeStep: 0}, this);
    
    /**
     * Creates a new entity from the given entityprototype. The entity will copy
     * all necessary data from the prototype and does not rely any further on
     * the prototype. So if you change the prototype after creating this entity
     * you won't have any impact on this entity.
     * 
     */ 
    constructor(prototype: EntityPrototype) {
        //todo: initialize entity, load scripts defined in Prototype,
        //      initialize scripts, ...
    }

    /**
     * Clones the current entity and returns the result. Cloning means the new entity
     * will have the same data attributes, and the same scripts.
     * 
     */ 
    cloneEntity(): Entity {
        //clones the current entity and returns a new instance of this entity
        //with same data and prototype data set.
        
        //TODO: implement
        return this;
    }
    
    public getData() {
        return this._data;
    }
    
    
    
    /**
     * Registers the given callback for messages with the given identifier
     * The callback will be called whenever this entity receives a message
     * with the iven identifier.
     * 
     */
    on(identifier: string, callback: (EntityMessage) => void) {
        //trim it
        identifier = identifier.trim();
        
        if (identifier.length === 0) {
            //we expect the identifier to have at least one symbol
            //TODO: warn?
            return;
        }
        
        if (identifier.indexOf(" ") > -1) {
            var identifiers = identifier.split(" ");
            var a: number;
            for (a = 0; a < identifiers.length; a++) {
                this.on(identifiers[a], callback);
            }
            return;
        }
        
        if (this._listeners[identifier] === undefined) {
            this._listeners[identifier] = [];
        }
        
        this._listeners[identifier].push(callback);
    }
    
    /**
     * Removes the given listener from the given callback
     * 
     * note: this will only remove one instance of this callback. If you added
     * the callback multiple times you need to call this multiple times, too.
     * 
     * @returns true if a callback was removed false otherwise (if it's not found or
     * has already been removed)
     */
    public removeListener(identifier: string, callback: (EntityMessage) => void): boolean {
        if (this._listeners[identifier] === undefined || this._listeners[identifier].length == 0) {
            //nothin to do
            return false;
        }
        
        if (this._listeners[identifier].length == 1) {
            //nothin to do
            if (this._listeners[identifier][0] === callback) {
                delete this._listeners[identifier];
            } else {
                return false;
            }
        }
        
        var a = 0;
        
        for (a = 0; a < this._listeners[identifier].length; a++) {
            if (callback === this._listeners[identifier][a]) {
                this._listeners[identifier].splice(a,1);
                return true;
            }
        }
        return false;
    }
    
    public doStep (timeStep: number): void {
        //fake step message for scripts:
        
        this._stepMessage.getMessage().timeStep = timeStep;
    }
    
    /**
     * Call this to send a message to this entity. Forwards the message
     * to all listeners which registered on this entity for that event. You may
     * use this method to directly deliver a message to this entity.
     */ 
    public sendMessage (msg: EntityMessage): void {
        //notify our registered callbacks:
        var id = msg.getIdentifier();
        if (this._listeners[id] === undefined) {
            return;
        }
        
        var a = 0;
        for (a = 0; a < this._listeners[id].length; a++) {
            this._listeners[msg.getIdentifier()][a](msg);
        }
    }
};
    

export = Entity;