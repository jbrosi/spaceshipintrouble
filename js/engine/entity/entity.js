define(["require", "exports", "engine/entity/entityMessage"], function(require, exports, __EntityMessage__) {
    var EntityMessage = __EntityMessage__;
    
    

    var Entity = (function () {
        /**
        * Creates a new entity from the given entityprototype. The entity will copy
        * all necessary data from the prototype and does not rely any further on
        * the prototype. So if you change the prototype after creating this entity
        * you won't have any impact on this entity.
        *
        */
        function Entity(prototype) {
            this._listeners = [];
            this._data = {};
            this._stepMessage = new EntityMessage("entity:step", { timeStep: 0 }, this);
            //todo: initialize entity, load scripts defined in Prototype,
            //      initialize scripts, ...
        }
        /**
        * Clones the current entity and returns the result. Cloning means the new entity
        * will have the same data attributes, and the same scripts.
        *
        */
        Entity.prototype.cloneEntity = function () {
            //clones the current entity and returns a new instance of this entity
            //with same data and prototype data set.
            //TODO: implement
            return this;
        };

        Entity.prototype.getData = function () {
            return this._data;
        };

        /**
        * Registers the given callback for messages with the given identifier
        * The callback will be called whenever this entity receives a message
        * with the iven identifier.
        *
        */
        Entity.prototype.on = function (identifier, callback) {
            //trim it
            identifier = identifier.trim();

            if (identifier.length === 0) {
                //we expect the identifier to have at least one symbol
                //TODO: warn?
                return;
            }

            if (identifier.indexOf(" ") > -1) {
                var identifiers = identifier.split(" ");
                var a;
                for (a = 0; a < identifiers.length; a++) {
                    this.on(identifiers[a], callback);
                }
                return;
            }

            if (this._listeners[identifier] === undefined) {
                this._listeners[identifier] = [];
            }

            this._listeners[identifier].push(callback);
        };

        /**
        * Removes the given listener from the given callback
        *
        * note: this will only remove one instance of this callback. If you added
        * the callback multiple times you need to call this multiple times, too.
        *
        * @returns true if a callback was removed false otherwise (if it's not found or
        * has already been removed)
        */
        Entity.prototype.removeListener = function (identifier, callback) {
            if (this._listeners[identifier] === undefined || this._listeners[identifier].length == 0) {
                //nothin to do
                return false;
            }

            if (this._listeners[identifier].length == 1) {
                if (this._listeners[identifier][0] === callback) {
                    delete this._listeners[identifier];
                } else {
                    return false;
                }
            }

            var a = 0;

            for (a = 0; a < this._listeners[identifier].length; a++) {
                if (callback === this._listeners[identifier][a]) {
                    this._listeners[identifier].splice(a, 1);
                    return true;
                }
            }
            return false;
        };

        Entity.prototype.doStep = function (timeStep) {
            //fake step message for scripts:
            this._stepMessage.getMessage().timeStep = timeStep;
        };

        /**
        * Call this to send a message to this entity. Forwards the message
        * to all listeners which registered on this entity for that event. You may
        * use this method to directly deliver a message to this entity.
        */
        Entity.prototype.sendMessage = function (msg) {
            //notify our registered callbacks:
            var id = msg.getIdentifier();
            if (this._listeners[id] === undefined) {
                return;
            }

            var a = 0;
            for (a = 0; a < this._listeners[id].length; a++) {
                this._listeners[msg.getIdentifier()][a](msg);
            }
        };
        return Entity;
    })();
    ;

    
    return Entity;
});
