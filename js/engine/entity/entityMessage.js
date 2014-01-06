define(["require", "exports"], function(require, exports) {
    var EntityMessage = (function () {
        function EntityMessage(identifier, message, sender) {
            if (typeof identifier === "undefined") { identifier = "undefined"; }
            if (typeof message === "undefined") { message = {}; }
            if (typeof sender === "undefined") { sender = null; }
            this._identifier = "undefined";
            this._identifier = identifier;
            this._message = message;
            this._sender = sender;
        }
        EntityMessage.prototype.getIdentifier = function () {
            return this._identifier;
        };

        EntityMessage.prototype.getMessage = function () {
            return this._message;
        };

        EntityMessage.prototype.getSender = function () {
            return this._sender;
        };
        return EntityMessage;
    })();
    ;

    
    return EntityMessage;
});
