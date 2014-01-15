
import $ = require('zepto');
import Q = require('q');

//six seconds? maybe a little bit too much?
//this is the timeout for loading the resources
var DEFAULT_TIMEOUT = 6000;

class ResourceLoader {
    
    private static _instance;
    
    constructor() {
      if (ResourceLoader._instance){
            throw new Error("Error: Instantiation failed: Use ResourceLoader.getInstance() instead of new.");
        }
        ResourceLoader._instance = this;    
    }
    
    public static getInstance(): ResourceLoader {
        if (ResourceLoader._instance == null) {
            ResourceLoader._instance = new ResourceLoader();
        }
        return ResourceLoader._instance;
    }
    
    
    public loadJSONFile(jsonFile: String) {
        var deferred = Q.defer();
        $.ajax({
            type: 'GET',
            url: jsonFile,
            dataType: 'json',
            timeout: DEFAULT_TIMEOUT,
            context: this,
            success: deferred.resolve,
            error: function(xhr, type){
                deferred.reject(new Error("Failed to load File!"));
            }
        });
        return deferred.promise;
    }
    
    
    public loadTextFile(textFile: String) {
    }
};


export = ResourceLoader;