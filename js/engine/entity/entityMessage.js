define(["require", "exports"], function(require, exports) {
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
    var EntityMessage = (function () {
        /**
        * Creates a new message ready to be sent to entities. The message *should*
        * contain an identifier, the message param and the entity param are optional.
        */
        function EntityMessage(identifier, message, sender) {
            if (typeof identifier === "undefined") { identifier = "undefined"; }
            if (typeof message === "undefined") { message = {}; }
            if (typeof sender === "undefined") { sender = null; }
            /**
            * Identifies the type of this message. You may register for these identifiers to
            * receive messages of a certain type. An example might be: "collision:entity". You
            * may use ":" in order to namespace the identifiers. Don't ever use whitespaces
            * in your Identifier as you may register to multiple identifiers by separating
            * them trough whitespace!
            */
            this._identifier = "undefined";
            this._identifier = identifier;
            this._message = message;
            this._sender = sender;
        }
        /**
        * Returns the identifier of this message
        */
        EntityMessage.prototype.getIdentifier = function () {
            return this._identifier;
        };

        /**
        * Returns the message data
        */
        EntityMessage.prototype.getMessage = function () {
            return this._message;
        };

        /**
        * Returns the sending entity (might be null)
        */
        EntityMessage.prototype.getSender = function () {
            return this._sender;
        };

        /**
        * Returns true if this message was sent by an entity.
        */
        EntityMessage.prototype.hasSender = function () {
            return this._sender != null;
        };
        return EntityMessage;
    })();
    ;

    
    return EntityMessage;
});
//# sourceMappingURL=entityMessage.js.map
