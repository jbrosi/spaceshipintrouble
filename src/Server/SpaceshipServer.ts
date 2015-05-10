///ts:ref=node.d.ts
/// No file or directory matched name "node.d.ts" ///ts:ref:generated
///ts:ref=shelljs.d.ts
/// No file or directory matched name "shelljs.d.ts" ///ts:ref:generated
require("shelljs/global");

module SpaceshipInTrouble {



    var connect = require('connect');



    var loader = SpaceshipInTrouble.Server.Bootstrap.BootstrapLoader.getInstance();

    var app = connect();

    loader.initialize(app);


    //initialize server stuff:
    //...

}