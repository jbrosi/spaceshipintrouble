
import Q = require('q');


class AbstractMapLoader {
    public getProgressInPercent(): number {
        return 0;
    }
    
    public getProgressAsText(): string {
        return "initializing";
    }
    
    
    public loadLevel(levelFile: String) {
        return Q("not yet implemented");
    }
};

export = AbstractMapLoader;