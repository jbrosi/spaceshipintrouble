var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'engine/map/mapLayer', 'engine/map/mapObject'], function(require, exports, MapLayer, MapObject) {
    var ObjectLayer = (function (_super) {
        __extends(ObjectLayer, _super);
        function ObjectLayer(name, width, height, x, y) {
            if (typeof name === "undefined") { name = "undefined"; }
            if (typeof width === "undefined") { width = -1; }
            if (typeof height === "undefined") { height = -1; }
            if (typeof x === "undefined") { x = 0; }
            if (typeof y === "undefined") { y = 0; }
            _super.call(this);
            this._objects = [];
            this._name = name;
            this._width = width;
            this._height = height;
            this._x = x;
            this._y = y;
        }
        ObjectLayer.prototype.addObject = function (obj) {
            this._objects.push(obj);
        };

        /**
        * TODO: don't create on the fly but return promise instead
        */
        ObjectLayer.createFromJSON = function (jsonData) {
            //very naive for the beginning... TODO: check existence/validity of the fields
            var objectLayer = new ObjectLayer(jsonData.name, jsonData.width, jsonData.height, jsonData.x, jsonData.y);

            for (var a = 0; a < jsonData.objects.length; a++) {
                var obj = jsonData.objects[a];

                //create MapObject
                objectLayer.addObject(MapObject.createFromJSON(obj));
            }

            return objectLayer;
        };
        return ObjectLayer;
    })(MapLayer);
    ;

    
    return ObjectLayer;
});
