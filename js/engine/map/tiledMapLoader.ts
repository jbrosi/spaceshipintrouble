
import Q = require('q');
import AbstractMapLoader = require('engine/map/abstractMapLoader');
import ResourceLoader = require('engine/util/resourceLoader');

class TiledJSONMapLoader extends AbstractMapLoader{

    private _progress = 0;
    private _status = "initializing map loader";

    public getProgressInPercent(): number {
        return this._progress;
    }
    
    public getProgressAsText(): string {
        return this._status;
    }
    
    
    public loadLevel() {
        console.log("trying to load level "+ this.getLevelFile());
        
        var rl = ResourceLoader.getInstance();
        rl.loadJSONFile(this.getLevelFile()).then(function(data) {
            console.log("Loaded the level: ", data);
        }, function(error) {
            console.log(error);
           console.log("failed to load file :("); 
        });
        return Q("not yet implemented");
    }

};

export = TiledJSONMapLoader;