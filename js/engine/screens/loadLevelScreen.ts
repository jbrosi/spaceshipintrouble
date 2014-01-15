
import AbstractScreen = require('engine/screens/abstractScreen');
import AbstractMapLoader = require('engine/map/abstractMapLoader');

class LoadLevelScreen extends AbstractScreen {
    private _mapLoader: AbstractMapLoader;
    
    public setMapLoader(mapLoader: AbstractMapLoader) {
        this._mapLoader = mapLoader;
    }
};

export = LoadLevelScreen;