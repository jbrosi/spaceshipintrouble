
import MapLayer = require('engine/map/mapLayer');
import MapObject = require('engine/map/mapObject');

class ObjectLayer extends MapLayer {
    
    private _objects: MapObject[] = [];
    
    private _name: String;
    private _width: number;
    private _height: number;
    private _x: number;
    private _y: number;
    
    public constructor(name: string = "undefined", width: number = -1, height: number = -1, x: number = 0, y: number = 0) {
        super();
        this._name = name;
        this._width = width;
        this._height = height;
        this._x = x;
        this._y = y;
        
    }
    
    public addObject(obj: MapObject) {
        this._objects.push(obj);
    }
    
    /**
     * TODO: don't create on the fly but return promise instead
     */
    public static createFromJSON(jsonData: any) {
        //very naive for the beginning... TODO: check existence/validity of the fields
        
        var objectLayer = new ObjectLayer(jsonData.name, jsonData.width, jsonData.height, jsonData.x, jsonData.y);
        
        //parse objects:
        for(var a = 0; a < jsonData.objects.length; a++) {
            var obj = jsonData.objects[a];
            //create MapObject
            objectLayer.addObject(MapObject.createFromJSON(obj));
        }
        
        return objectLayer;
    }
    
    
};

export = ObjectLayer;