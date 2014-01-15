
import Q = require('q');


class AbstractMapLoader {
    private _levelFile: String;
    
    public constructor(levelFile: String) {
        this._levelFile = levelFile;
    }
    
    public getLevelFile (): String {
        return this._levelFile;
    }
    
    public getProgressInPercent(): number {
        return 0;
    }
    
    public getProgressAsText(): String {
        return "initializing";
    }
    
    
    public loadLevel() {
        return Q("not yet implemented");
    }
};

export = AbstractMapLoader;