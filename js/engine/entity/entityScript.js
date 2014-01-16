define(["require", "exports", "engine/entity/entity"], function(require, exports, Entity) {
    var EntityScript = (function () {
        function EntityScript() {
            this._data = {};
        }
        EntityScript.prototype.construtor = function (file, entity, data) {
            if (typeof data === "undefined") { data = {}; }
            this._file = file;
            this._entity = entity;
            this._data = data;
        };

        EntityScript.prototype.getEntity = function () {
            return this._entity;
        };

        EntityScript.prototype.getScriptData = function () {
            return this._data;
        };

        EntityScript.prototype.getStaticScriptData = function () {
            if (EntityScript._staticData[this._file] === undefined) {
                EntityScript._staticData[this._file] = {};
            }
            return EntityScript._staticData[this._file];
        };

        EntityScript.prototype.setScriptData = function (data) {
            this._data = data;
        };
        EntityScript._staticData = [];
        return EntityScript;
    })();
    ;

    
    return EntityScript;
});
//# sourceMappingURL=entityScript.js.map
