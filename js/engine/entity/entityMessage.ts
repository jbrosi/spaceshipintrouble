

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
     */ 
    private _sender: Entity;


    /**
     * This is telling whether a message has been consumed or not. If a message gets
     * consumed it doesn't get sent any further. It's like "stopPropagation" on JS events
     */
    private _isConsumed: boolean = false;

    /**
     * Creates a new message ready to be sent to entities. The message *should*
     * contain an identifier, the message param and the entity param are optional.
     */ 
    constructor(identifier: string = "undefined", message: any = {}, sender: Entity = null) {
        this._identifier = identifier;
        this._message = message;
        this._sender = sender;
    }
    
    /**
     * Returns the identifier of this message
     */
    public getIdentifier() {
        return this._identifier;
    }
    
    /**
     * Returns the message data
     */
    public getMessage() {
        return this._message;
    }
    
    /**
     * Returns the sending entity (might be null)
     */
    public getSender() {
        return this._sender;
    }
    
    /**
     * Returns true if this message was sent by an entity.
     */
    public hasSender(): boolean {
        return this._sender != null;
    }

    /**
     * By invoking this u may stop a message from being sent any further
     * this is usefull when you want to delete a message and stop propagation.
     */
    public consume() {
        this._isConsumed = true;
    }

    /**
     * This is telling whether a message has been consumed or not. If a message gets
     * consumed it doesn't get sent any further. It's like "stopPropagation" on JS events
     * @returns {boolean} true if the message has been consumed already
     */
    public isConsumed(): boolean {
        return this._isConsumed;
    }

};
    

export = EntityMessage;