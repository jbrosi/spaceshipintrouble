
import Entity = require("engine/entity/entity");
import EntityComponent = require("engine/entity/entityComponent");

class EntityScript extends EntityComponent{

    private _file: string;

    public constructor(name: String, entity: Entity, file: string, data:any = {}) {
        super(name, entity, data);
        this._file = file;
    }
    


    
};
    

export = EntityScript;