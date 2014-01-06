define(["require", "exports"], function(require, exports) {
    var EntityPrototype = (function () {
        function EntityPrototype() {
        }
        EntityPrototype.prototype.getData = function () {
            return this._data;
        };
        EntityPrototype.prototype.setData = function (data) {
            this._data = data;
        };

        EntityPrototype.prototype.getScripts = function () {
            return this._scripts;
        };

        EntityPrototype.prototype.addScript = function (script) {
            this._scripts.push(script);
        };
        return EntityPrototype;
    })();
    ;

    
    return EntityPrototype;
});
