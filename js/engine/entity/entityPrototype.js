define(["require", "exports"], function(require, exports) {
    /**
    * Prototype for creating new entities. This is like a blue print for an entity
    * and conains all the scripts and data needed for creating a new entity of this
    * type.
    */
    var EntityPrototype = (function () {
        function EntityPrototype() {
            /**
            * The name describing this (proto-)type may get referenced to create new
            * entities of this type. This also may be null when it's a
            * anonymous type (for example created on the fly by a script)
            */
            this._name = null;
            /**
            * Counts how many entities of this type have been created. For debug
            * purposes only.
            */
            this._entityCreationCount = 0;
        }
        EntityPrototype.prototype.construct = function () {
            //TODO: construct this prototype
            // -> for example load from json or tiled map
        };

        /**
        * Increments the counter for the entities which have been created using
        * this prototype. This should get invoked whenever a entity of this type
        * is being created.
        * @returns the amount of entities created with this prototype
        */
        EntityPrototype.prototype.incrementEntityCreationCount = function () {
            return ++this._entityCreationCount;
        };

        /**
        * @returns the amount of entities created with this prototype
        */
        EntityPrototype.prototype.getEntityCreationCount = function () {
            return this._entityCreationCount;
        };

        /**
        * @returns the name of this type or null if the type is anonymous
        */
        EntityPrototype.prototype.getName = function () {
            return this._name;
        };

        /**
        * @returns the predefined data for entities of this type
        */
        EntityPrototype.prototype.getData = function () {
            return this._data;
        };

        /**
        * @returns all the scripts that should be attached to entities of this type
        */
        EntityPrototype.prototype.getScripts = function () {
            return this._scripts;
        };
        return EntityPrototype;
    })();
    ;

    
    return EntityPrototype;
});
//# sourceMappingURL=entityPrototype.js.map
