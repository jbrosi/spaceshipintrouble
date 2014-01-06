

import Entity = require("engine/entity/entity");

class EntityMessage {
    
    private _identifier: string = "undefined";
    private _message: any;
    private _sender: Entity;
    
    constructor(identifier: string = "undefined", message: any = {}, sender: Entity = null) {
        this._identifier = identifier;
        this._message = message;
        this._sender = sender;
    }
    
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