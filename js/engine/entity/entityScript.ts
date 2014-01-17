/**
 * Spaceship in trouble - a Game & GameEngine in TypeScript
 *
 * Copyright (c) 2014 Johannes Brosi <me@brosi.me>
 *
 * Released under the MIT license
 * https://github.com/jbrosi/spaceshipintrouble/blob/master/LICENSE
 */

import Entity = require("engine/entity/entity");
import EntityComponent = require("engine/entity/entityComponent");

/**
 * This class represents a script as a type of `EntityComponent`. It gets attached to a `Entity`
 * and may influence the behavior of that `Entity`
 *
 * @namespace engine.entity
 * @class EntityScript
 * @extends engine.entity.EntityComponent
 */
class EntityScript extends EntityComponent{

    private _file: string;

    /**
     * Constructs a new EntityScript with the given `name` for the given `Entity` from the given script-`file`
     * with the given `data`
     *
     * @method __constructor
     * @param name {string} the name of this script
     * @param entity {engine.entity.Entity} reference to the entity this script is attached to
     * @param file {string} the scriptFile to use for loading/initializing this script
     * @param data {*} the data this script uses
     */
    public constructor(name: string, entity: Entity, file: string, data:any = {}) {
        super(name, entity, data);
        this._file = file;
    }
    


    
};
    

export = EntityScript;