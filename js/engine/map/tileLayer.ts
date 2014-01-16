
import MapLayer = require('engine/map/mapLayer');

class TileLayer extends MapLayer {
    
    public constructor() {
        super();
    }
    
    public static createFromJSON(jsonData: any) : TileLayer{
        return new TileLayer();
    }
};

export = TileLayer;