
import Q = require('q');


class AbstractMapLoader {
    private _mapFile: String;
    
    public constructor(mapFile: String) {
        this._mapFile = mapFile;
    }
    
    public getMapFile (): String {
        return this._mapFile;
    }
    
    public getProgressInPercent(): number {
        return 0;
    }
    
    public getProgressAsText(): String {
        return "initializing";
    }
    
    
    public loadMap() {
        return Q("not yet implemented");
    }
};

export = AbstractMapLoader;