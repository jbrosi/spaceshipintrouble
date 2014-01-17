/**
 * Spaceship in trouble - a Game & GameEngine in TypeScript
 *
 * Copyright (c) 2014 Johannes Brosi <me@brosi.me>
 *
 * Released under the MIT license
 * https://github.com/jbrosi/spaceshipintrouble/blob/master/LICENSE
 */


import Entity = require("engine/entity/entity");

/**
 * Basic EntityMessage which gets send between entities and scripts
 * 
 * Note: Instances of this type *should* be immutable in most cases.
 *       Do not reuse messages - create new messages instead!
 * 
 * Properties
 * ----------
 * Identifier: The "Messagetype" you may listen to. For example: "collision:entity"
 * Message: Object containing various msg data. Structure depends on message type
 * Sender: The entity which send this message (may be null if there
 *         was no entity sending this message).
 *
 * @namespace engine.entity
 * @class EntityMessage
 *
 */
class EntityMessage {
    
    /**
     * Identifies the type of this message. You may register for these identifiers to
     * receive messages of a certain type. An example might be: "collision:entity". You
     * may use ":" in order to namespace the identifiers. Don't ever use whitespaces
     * in your Identifier as you may register to multiple identifiers by separating 
     * them trough whitespace!
     */ 
    private _identifier: string = "undefined";
    
    /**
     * The data of this message. Normally this would be a simple Object containing
     * various properties with the message details 
     */
    private _message: any;
    
    /**
     * The entity which sent this message. This might be null if the sender wasn't
     * an entity.
     * @type {engine.entity.Entity}
     */ 
    private _sender: Entity;


    /**
     * This is telling whether a message has been consumed or not. If a message gets
     * consumed it doesn't get sent any further. It's like "stopPropagation" on JS events
     */
    private _isConsumed: boolean = false;

    /**
     * If set to true (default) this message may get consumed by invoking #consume
     * if it's set to false this message can't be consumed at all.
     */
    private _isConsumable: boolean = true;

    /**
     * Creates a new message ready to be sent to entities. The message *should*
     * contain an identifier, the message param and the entity param are optional.
     * @method __constructor
     * @param identifier {string} the type/identifier of this message. This is what the listeners should register for
     * @param message {*} (optional) the message itsself - may contain any data
     * @param sender {engine.entity.Entity} (optional) the entity sending this message. Might be null
     * @param isConsumable {boolean} (optional, default: true). Set to false if you don't want this message to be consumable
     */
    constructor(identifier: string = "undefined", message: any = {}, sender: Entity = null, isConsumable: boolean = true) {
        this._identifier = identifier;
        this._message = message;
        this._sender = sender;
        this._isConsumable = isConsumable;
    }
    
    /**
     * @method getIdentifier
     * @returns {string} the identifier of this message
     */
    public getIdentifier() : string {
        return this._identifier;
    }
    
    /**
     * @method getMessage
     * @returns {*} the message data
     */
    public getMessage(): any {
        return this._message;
    }
    
    /**
     * @method getSender
     * @returns {engine.entity.Entity} the sending entity (might be null)
     */
    public getSender() : Entity{
        return this._sender;
    }
    
    /**
     *
     * @method hasSender
     * @eturns {boolean} true if this message was sent by an entity.
     */
    public hasSender(): boolean {
        return this._sender != null;
    }

    /**
     * By invoking this u may stop a message from being sent any further
     * this is usefull when you want to delete a message and stop propagation.
     *
     * @method consume
     */
    public consume() : void{
        if (this._isConsumable)
            this._isConsumed = true;
    }

    /**
     * This is telling whether a message has been consumed or not. If a message gets
     * consumed it doesn't get sent any further. It's like "stopPropagation" on JS events
     *
     * @method isConsumed
     * @returns {boolean} true if the message has been consumed already
     */
    public isConsumed(): boolean {
        return this._isConsumed;
    }

};
    

export = EntityMessage;