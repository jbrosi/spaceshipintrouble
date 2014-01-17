
import MapLayer = require('engine/map/mapLayer');

/**
 * A `TileLayer` is a special type of `MapLayer` which consists of several tiles.
 *
 * @namespace engine.map
 * @class MapLayer
 */
class TileLayer extends MapLayer {

    /**
     * Creates a new `TileLayer`
     *
     * @method __constructor
     */
    public constructor() {
        super();
    }

    /**
     * Creates a new `TileLayer` from `jsonData`
     *
     * @param jsonData {*} the data to create the layer from
     * @returns {TileLayer} the created `TileLayer`
     */
    public static createFromJSON(jsonData: any) : TileLayer{
        return new TileLayer();
    }
};

export = TileLayer;