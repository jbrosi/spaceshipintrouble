/**
 * Spaceship in trouble - a Game & GameEngine in TypeScript
 *
 * Copyright (c) 2014 Johannes Brosi <me@brosi.me>
 *
 * Released under the MIT license
 * https://github.com/jbrosi/spaceshipintrouble/blob/master/LICENSE
 */


/**
 * Prototype for creating new entities. This is like a blue print for an entity
 * and conains all the scripts and data needed for creating a new entity of this
 * type.
 *
 * @namespace engine.entity
 * @class EntityPrototype
 */
class EntityPrototype {
    
    /**
     * The name describing this (proto-)type may get referenced to create new
     * entities of this type. This also may be null when it's a
     * anonymous type (for example created on the fly by a script)
     */
    private _name: string = null;
    
    /**
     * Contains all the names of the components that belong to this type
     * and should get loaded when the entity gets created
     */ 
    private _components: string[];
    
    /**
     * Holds predefined data for the entity construction. The scripts may
     * use them in order to read their settings and change their behavior
     */
    private _data: any;
    
    /**
     * Counts how many entities of this type have been created. For debug
     * purposes only.
     */
    private _entityCreationCount = 0;

    /**
     * @method __constructor
     */
    public constructor() {
        //TODO: construct this prototype
        // -> for example load from json or tiled map
    }
    
    /**
     * Increments the counter for the entities which have been created using
     * this prototype. This should get invoked whenever a entity of this type
     * is being created.
     *
     * @method incrementEntityCreationCount
     * @returns {number} the amount of entities created with this prototype
     */
    public incrementEntityCreationCount(): number {
        return ++this._entityCreationCount;
    }
    
    /**
     * @method getEntityCreationCount
     * @returns {number} the amount of entities created with this prototype
     */
    public getEntityCreationCount(): number {
        return this._entityCreationCount;
    }
    
    /**
     * @method getName
     * @returns {string} the name of this type or null if the type is anonymous
     */
    public getName(): string {
        return this._name;
    }
    
    /**
     * @method getData
     * @returns {*} the predefined data for entities of this type
     */
    public getData(): any {
        return this._data;
    }

    /**
     * @method getComponents
     * @returns {string[]} all the components that should be attached to entities of this type
     */
    public getComponents(): string[] {
        return this._components;
    }
    
};
    

export = EntityPrototype;