/**
 * Spaceship in trouble - a Game & GameEngine in TypeScript
 *
 * Copyright (c) 2014 Johannes Brosi <me@brosi.me>
 *
 * Released under the MIT license
 * https://github.com/jbrosi/spaceshipintrouble/blob/master/LICENSE
 */


try {
    JL("DebugLoader").info("Start loading debug sources...");

    $.ajax({
        url:    'build/reference.ts?bust=" + new Date().getTime()',
        success: function(result) {

            var sources = result.match(/(?:path=")([^"]*)(?:")/ig);
            for (var j =0; j < sources.length; j++) {
                var sourceString = sources[j].replace("../src/", "").replace(".ts", ".js");
                if (sourceString.indexOf(".d.js") !== -1 ) {
                    continue;
                }

                var scriptPath = "build/src/" + sourceString.replace("path=\"", "").replace("\"", "") + "?bust=" + new Date().getTime();
                var script = "<scr" + "ipt src=\"" + scriptPath + "\"></sc"+"ript>";
                JL("ModuleLoader").info(" - loading " + scriptPath);
                document.write(script);
            }
        },
        error: function () {
            JL("DebugLoader").error("Could not load debug sources! Please ensure build/reference.ts is build and accessible! (Did you forget to run grunt?)");
        },
        async: false
    });
} catch(e) {
    JL("DebugLoader").error("Exception caught while trying to load debug resources...");
    console.error(e);
}