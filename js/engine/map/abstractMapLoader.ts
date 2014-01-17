/**
 * Spaceship in trouble - a Game & GameEngine in TypeScript
 *
 * Copyright (c) 2014 Johannes Brosi <me@brosi.me>
 *
 * Released under the MIT license
 * https://github.com/jbrosi/spaceshipintrouble/blob/master/LICENSE
 */

import Q = require('q');

/**
 * Abstract class that might be overloaded by various map loaders.
 * MapLoaders are responsible for loading a map file and initializing it.
 *
 * @namespace engine.map
 * @class AbstractMapLoader
 */
class AbstractMapLoader {
    private _mapFile: string;

    /**
     * Creates a new MapLoader for the given `mapFile`
     *
     * @method __constructor
     * @param mapFile {string} the file to be loaded
     */
    public constructor(mapFile: string) {
        this._mapFile = mapFile;
    }

    /**
     * Returns the path to the mapFile this mapLoader is about to load
     *
     * @method getMapFile
     * @returns {string} the path to the mapFile this loader is about to load
     */
    public getMapFile (): string {
        return this._mapFile;
    }

    /**
     * Returns the percentage of the progress loading this level. You may call this
     * multiple times while the level loads to display the progress
     *
     * @returns {number} the percentage of progress loading this level
     */
    public getProgressInPercent(): number {
        return 0;
    }

    /**
     * Reutrns the current progress status text message
     *
     * @returns {string} progress status text message
     */
    public getProgressAsText(): string {
        return "initializing";
    }

    /**
     * Starts loading the map. Abstract method - should be overwriten!
     *
     * @abstract
     * @returns {engine.map.Map} (Promise!)
     */
    public loadMap() {
        return Q("not yet implemented");
    }
};

export = AbstractMapLoader;