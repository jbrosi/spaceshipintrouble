

class TileSet {
    private imagePath: String;
    
    private imageWidth: number;
    private imageHeight: number;
    private tileWidth: number;
    private tileHeight: number;
    private firstGid: number;
    private name: String;
    private properties: any;
    private spacing: number;
    private tileProperties: any;
    private margin: number;
    private tileOffsetX: number;
    private tileOffsetY: number;
    
    
    public static createFromJSON(jsonData: any): TileSet {
        return new TileSet();
    }
};

export = TileSet;