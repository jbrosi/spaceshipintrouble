
import Entity = require("game/entity/entity");

class EntityScript {
    private _data = {};
    private static _staticData = [];
    private _file: string;
    private _entity: Entity;
    
    public construtor(file: string, entity: Entity, data:any = {}) {
        this._file = file;
        this._entity = entity;
        this._data = data;
        
    }
    
    public getEntity() {
        return this._entity;
    }
    
    public getScriptData() {
        return this._data;
    }
    
    public getStaticScriptData() {
        if (EntityScript._staticData[this._file] === undefined) {
            EntityScript._staticData[this._file] = {};
        }
        return EntityScript._staticData[this._file];
    }
    
    public setScriptData(data: any) {
        this._data = data;
    }
    
    
};
    

export = EntityScript;