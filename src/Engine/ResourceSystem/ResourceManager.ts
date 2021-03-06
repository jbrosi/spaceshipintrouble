/**
 * Spaceship in trouble - a Game & GameEngine in TypeScript
 *
 * Copyright (c) 2014 - 2015 Johannes Brosi <me@brosi.me>
 *
 * Released under the MIT license
 * https://github.com/jbrosi/spaceshipintrouble/blob/master/LICENSE
 */


module SpaceshipInTrouble.Engine.ResourceSystem {

//six seconds? maybe a little bit too much?
//this is the timeout for loading the resources
    var DEFAULT_TIMEOUT = 6000;

    /**
     * The ResourceLoader helps you loading various resources with promises.
     *
     * Warning: SINGLETON! Use `getInstance()` instead of `new`
     *
     */
    export class ResourceManager {

        private static _instance;

        /**
         * Warning: SINGLETON. Don't use this constructor, use `getInstance()` instead
         *
         * @method __constructor
         */
        constructor() {
            if (ResourceManager._instance) {
                throw new Error("Error: Instantiation failed: Use ResourceLoader.getInstance() instead of new.");
            }
            ResourceManager._instance = this;
        }

        /**
         * Singleton method for getting the instance for this `ResourceLoader`
         *
         * @method getInstance
         * @static
         * @returns {engine.util.ResourceLoader} the singleton instance of this `ResourceLoader`
         */
        public static getInstance(): ResourceManager {
            if (ResourceManager._instance == null) {
                ResourceManager._instance = new ResourceManager();
            }
            return ResourceManager._instance;
        }

        /**
         * Loads and parses a json file and returns a promise to it
         *
         * @param jsonFile the file to load
         * @returns {Promise(*)} promise for the parsed JSON Data
         */
        public loadJSONFile(jsonFile:string) {
            var deferred = Q.defer();
            $.ajax({
                type: 'GET',
                url: jsonFile,
                dataType: 'json',
                timeout: DEFAULT_TIMEOUT,
                context: this,
                success: deferred.resolve,
                error: function (xhr, type) {
                    deferred.reject(new Error("Failed to load File!"));
                }
            });
            return deferred.promise;
        }

    }

}
