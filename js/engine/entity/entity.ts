
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
 *
 * @namespace engine.entity
 * @class Entity
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
     * Creates a new entity from the given `prototype`. The entity will copy
     * all necessary data from the `prototype` and does not rely any further on
     * it. So if you change the `prototype` after creating this entity
     * you won't have any impact on this entity.
     *
     * @param prototype {engine.entity.EntityPrototype} the prototype to create this entity from
     * @param manager {engine.entity.EntityManager} reference to the manager this entity was created with
     * @method __constructor
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
     * @method cloneEntity
     * @returns {engine.entity.Entity} a copy of this entity
     */ 
    cloneEntity(): Entity {
        //clones the current entity and returns a new instance of this entity
        //with same data and prototype data set.
        
        //TODO: implement
        return this;
    }

    /**
     * Returns a reference to the `EntityManager` holding this entity
     *
     * @method getManager
     * @returns {engine.entity.EntityManager} the manager used to create this entity and responsible for managing this entitty
     */
    public getManager() : EntityManager {
        return this._manager;
    }

    /**
     *
     * @method getData
     * @returns {*} the shared data hold by this entity.
     */
    public getData() {
        return this._data;
    }

    /**
     *
     * @method getParent
     * @returns {engine.entity.Entity} the parent of this entity. Might be null if there is no parent (meaning this entity is root)
     */
    public getParent() : Entity {
        return this._parentEntity;
    }

    /**
     * @method hasParent
     * @returns {boolean} true if there is a parent to this entity, false if there isn't
     */
    public hasParent() : boolean {
        return this._parentEntity != null;
    }
    
    
    /**
     * Registers the given `callback` for messages/events with the given `identifier`
     * The `callback` will be called whenever this entity receives a message
     * with the given `identifier`.
     *
     * @method on
     * @param identifier {string} the event-identifier to register for
     * @param callback {function} the function callback to register for this event
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
     * Removes the given listener (`callback`) from the given event/message (`identifier`)
     * 
     * note: this will only remove one instance of this `callback`. If you added
     * the callback multiple times you need to call this multiple times, too.
     *
     * note2: You can't deregister multiple `identifier`s at once (separating with whitespace) at the moment!
     *
     * @method removeListener
     * @param identifier {string} the event identifier to deregister from
     * @param callback {function} the function callback to deregister
     * @returns {boolean} true if a callback was removed false otherwise (if it's not found or
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
     * so all components may react to this. The message will contain the `timeStep` parameter with the time elapsed
     * since the last step.
     *
     * @method doStep
     * @param timeStep the time elapsed since the last step
     */
    public doStep (timeStep: number): void {
        //fake step message for scripts:
        
        this._stepMessage.getMessage().timeStep = timeStep;
        this.sendMessage(this._stepMessage);

    }
    
    /**
     * Call this to send a `message` to this entity. Forwards the `message`
     * to all listeners which registered on this entity for that event. You may
     * use this method to directly deliver a `message` to this entity.
     *
     * @method sendMessage
     * @param message {engine.entity.EntityMessage} the message to send
     */ 
    public sendMessage (message: EntityMessage): void {
        //notify our registered callbacks:
        var id = message.getIdentifier();
        if (this._listeners[id] === undefined) {
            return;
        }
        
        var a = 0;
        for (a = 0; a < this._listeners[id].length && ! message.isConsumed(); a++) {
            this._listeners[message.getIdentifier()][a](message);
        }
    }

    /**
     * Sends the given `message` to all (direct) children of this entity. If `isDeep` is set to true
     * also all the childrens of the childrens of the childrens... will receive this message
     * carefull on large nested constructs if you use this param :).
     *
     * @method sendMessageToChildren
     * @param message {engine.entity.EntityMessage} the message to be sent
     * @param isDeep {boolean} (optional, default: false). Set to true if you want all childs of all childs (of all childs...)
     *        to receive this message, too
     */
    public sendMessageToChildren (message: EntityMessage, isDeep: boolean = false): void {
        var a: number;
        for (a = 0; a < this._childEntities.length && ! message.isConsumed(); a++) {
            this._childEntities[a].sendMessage(message);

            if (isDeep && ! message.isConsumed()) {
                this._childEntities[a].sendMessageToChildren(message, true);
            }
        }
    }

    /**
     *
     * @method getPosition
     * @returns {Position} the position/rotation/scale of this entity
     */
    public getPosition(): Position {
        return this._position;
    }

    /**
     * @method getComponents
     * @returns {engine.entity.EntityComponent[]} all the components hold by this entity
     */
    public getComponents(): EntityComponent[] {
        return this._components;
    }

    /**
     * Sends the given `message` to the parent of this entity. If you set `isDeep` to true this `message` will also be
     * sent to all other ascendants of this entity (meaning the parents of the parents of the ...)
     *
     * @method sendMessageToParent
     * @param message {engine.entity.EntityMessage} the message to be sent
     * @param isDeep {boolean} (optional, defaults: false). If set to true all ascendants will be included to receive the message
     */
    public sendMessageToParent (message: EntityMessage, isDeep: boolean = false): void {
        if (! this.hasParent() || message.isConsumed()) {
            //no parent to send something to
            return;
        }

        this._parentEntity.sendMessage(message);
        if (isDeep  && ! message.isConsumed()) {
            this._parentEntity.sendMessageToParent(message, true);
        }
    }
};
    

export = Entity;