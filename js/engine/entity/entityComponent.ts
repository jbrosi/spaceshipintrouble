import Entity = require('engine/entity/entity');

class EntityComponent {

    private _data = {};

    private static _staticData : any = {};

    private _name: String;
    private _entity: Entity;


    public constructor(name: String, entity: Entity, data: any = {}) {
        this._name = name;
        this._entity = entity;
        this._data = data;
    }

    public getEntity() {
        return this._entity;
    }

    public getData() {
        return this._data;
    }

    public getStaticData() {
        if (EntityComponent._staticData[this._name] === undefined) {
            EntityComponent._staticData[this._name] = {};
        }
        return EntityComponent._staticData[this._name];
    }

    public setData(data: any) {
        this._data = data;
    }

}

export = EntityComponent;