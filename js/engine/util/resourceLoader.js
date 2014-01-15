define(["require", "exports", 'zepto', 'q'], function(require, exports, $, Q) {
    //six seconds? maybe a little bit too much?
    //this is the timeout for loading the resources
    var DEFAULT_TIMEOUT = 6000;

    var ResourceLoader = (function () {
        function ResourceLoader() {
            if (ResourceLoader._instance) {
                throw new Error("Error: Instantiation failed: Use ResourceLoader.getInstance() instead of new.");
            }
            ResourceLoader._instance = this;
        }
        ResourceLoader.getInstance = function () {
            if (ResourceLoader._instance == null) {
                ResourceLoader._instance = new ResourceLoader();
            }
            return ResourceLoader._instance;
        };

        ResourceLoader.prototype.loadJSONFile = function (jsonFile) {
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
        };

        ResourceLoader.prototype.loadTextFile = function (textFile) {
        };
        return ResourceLoader;
    })();
    ;

    
    return ResourceLoader;
});
