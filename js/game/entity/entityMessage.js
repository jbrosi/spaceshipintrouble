define(["require", "exports"], function(require, exports) {
    

    var EntityMessage = (function () {
        function EntityMessage() {
            this._identifier = "undefined";
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
