import EntityMessage    = require("engine/entity/entityMessage");
import EntityPrototype  = require("engine/entity/entityPrototype");
import EntityScript     = require("engine/entity/entityScript");
import EntityManager    = require("engine/entity/entityManager");
import EntityComponent  = require("engine/entity/entityComponent");
import Position         = require("engine/util/position");

/**
 * This class defines the base type for all "gameobjects" or as we call them here: Entites.
 * Almost everything in the game is an entity. Entities may be nested and may have several
 * components attached to them.
 * Please see Readme.md in the same folder for a further explanation.
 */
class Entity {

    /**
     * Holds all the components attached to this entity.
     */
    private _components: EntityComponent[];

    /**
     * Holds all callbacks who registered for listening on receiving messages on this entity.
     */
    private _listeners: any = {};

    /**
     * Holds all data private to this entity. This may be used for the various components
     * to share their states (though it's not really recommended. Use messaging for communication!)
     */
    private _data = {};

    /**
     * Holds all entities attached to this entity.
     */
    private _childEntities: Entity[] = [];

    /**
     * Holds the parent entity of this entity. May be null if the entity is on the root
     * and does not have any parents.
     */
    private _parentEntity: Entity;

    /**
     * The position, rotation and scale of this entity. This might be either world-coordinates or local coordinates.
     */
    private _position: Position;

    /**
     * Reference to the entityManager holding this entity
     */
    private _manager : EntityManager;

    /**
     * This message is a template for all the "steps" sent to the scripts. It's reinitialized and reused many times
     * please don't use this for any other purpose
     */
    private _stepMessage = new EntityMessage("entity:step", {timeStep: 0}, this, false);

    /**
     * Creates a new entity from the given entityprototype. The entity will copy
     * all necessary data from the prototype and does not rely any further on
     * the prototype. So if you change the prototype after creating this entity
     * you won't have any impact on this entity.
     */ 
    constructor(prototype: EntityPrototype, manager: EntityManager) {
        //todo: initialize entity, load scripts defined in Prototype,
        //      initialize scripts, ...

        this._manager = manager;

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

    /**
     * Returns a reference to the EntityManager holding this entity
     *
     * @returns {EntityManager}
     */
    public getManager() : EntityManager {
        return this._manager;
    }

    /**
     *
     * @returns {{}} the shared data hold by this entity.
     */
    public getData() {
        return this._data;
    }

    /**
     *
     * @returns {Entity} the parent of this entity. Might be null if there is no parent (meaning this entity is root)
     */
    public getParent() : Entity {
        return this._parentEntity;
    }

    /**
     *
     * @returns {boolean} true if there is a parent to this entity, false if there isn't
     */
    public hasParent() : boolean {
        return this._parentEntity != null;
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

    /**
     * Gets invoked whenever this entity should calculate its movements and changes. Forwards a "entity:step" message
     * so all components may react to this.
     *
     * @param timeStep
     */
    public doStep (timeStep: number): void {
        //fake step message for scripts:
        
        this._stepMessage.getMessage().timeStep = timeStep;
        this.sendMessage(this._stepMessage);

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
        for (a = 0; a < this._listeners[id].length && ! msg.isConsumed(); a++) {
            this._listeners[msg.getIdentifier()][a](msg);
        }
    }

    /**
     * Sends the given message to all (direct) children of this entity. If isDeep is set
     * also all the childrens of the childrens of the childrens... will receive this message
     * carefull on large nested constructs if you use this param :).
     *
     * @param msg the message to be sent
     * @param isDeep default: false. Set to true if you want all childs of all childs (of all childs...)
     *        to receive this message, too
     */
    public sendMessageToChildren (msg: EntityMessage, isDeep: boolean = false): void {
        var a: number;
        for (a = 0; a < this._childEntities.length && ! msg.isConsumed(); a++) {
            this._childEntities[a].sendMessage(msg);

            if (isDeep && ! msg.isConsumed()) {
                this._childEntities[a].sendMessageToChildren(msg, true);
            }
        }
    }

    /**
     *
     *
     * @returns {Position} the position/rotation/scale of this entity
     */
    public getPosition(): Position {
        return this._position;
    }

    /**
     *
     * @returns {EntityComponent[]} all the components hold by this entity
     */
    public getComponents(): EntityComponent[] {
        return this._components;
    }

    /**
     * Sends the given message to the parent of this entity. If you set isDeep this message will also be
     * sent to all other ascendants of this entity (meaning the parents of the parents of the ...)
     *
     * @param msg the message to be sent
     * @param isDeep defaults: false. If set to true all ascendants will be included to receive the message
     */
    public sendMessageToParent (msg: EntityMessage, isDeep: boolean = false): void {
        if (! this.hasParent() || msg.isConsumed()) {
            //no parent to send something to
            return;
        }

        this._parentEntity.sendMessage(msg);
        if (isDeep  && ! msg.isConsumed()) {
            this._parentEntity.sendMessageToParent(msg, true);
        }
    }
};
    

export = Entity;