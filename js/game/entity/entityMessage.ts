

import Entity = require("game/entity/entity");

class EntityMessage {
    
    private _identifier: string = "undefined";
    private _message: any;
    private _sender: Entity;
    
    public getIdentifier() {
        return this._identifier;
    }
    
    public getMessage() {
        return this._message;
    }
    
    public getSender() {
        return this._sender;
    }
    
};
    

export = EntityMessage;