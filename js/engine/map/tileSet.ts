/**
 * A `TileSet` holds information about how to draw tiles with certain tileIds.
 *
 * @namespace engine.map
 * @class TileSet
 */
class TileSet {
    private imagePath: string;
    
    private imageWidth: number;
    private imageHeight: number;
    private tileWidth: number;
    private tileHeight: number;
    private firstGid: number;
    private name: string;
    private properties: any;
    private spacing: number;
    private tileProperties: any;
    private margin: number;
    private tileOffsetX: number;
    private tileOffsetY: number;


    /**
     * Creates a new `TileSet` from the given JSONData
     *
     * @param jsonData {*} the data to create this `TileSet` from
     * @returns {TileSet} the newly created `TileSet`
     */
    public static createFromJSON(jsonData: any): TileSet {
        return new TileSet();
    }
};

export = TileSet;