/**
 * Spaceship in trouble - a Game & GameEngine in TypeScript
 *
 * Copyright (c) 2014 Johannes Brosi <me@brosi.me>
 *
 * Released under the MIT license
 * https://github.com/jbrosi/spaceshipintrouble/blob/master/LICENSE
 */


window.requestAnimationFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

require(['engine/gameInitializer', 'Engine/screens/ScreenManager', 'Engine/map/TiledMapLoader', 'promise'], function(GameInitializer, ScreenManager, TiledMapLoader, Promise) {
    
    //disable for release!!
    Promise.longStackSupport = true;
    
    //run the game init
    var gi = new GameInitializer();
    gi.init();
    
    var renderer = gi.getRenderer();
    
    //initialize the screenManager
    var sm = new ScreenManager();
    sm.init(renderer);
    
    //create load level screen
    sm.createScreen('loadLevel').then(function(loadLevelScreen) {
        
        console.log("screen created: "+loadLevelScreen);
        
        //show load level screen
        sm.showScreen(loadLevelScreen);
        
        //create map loader
        var mapLoader = new TiledMapLoader('assets/game/maps/example.json');
        //attach map loader to loadLevelScreen
        loadLevelScreen.setMapLoader(mapLoader);
        
        //start loading level
        mapLoader.loadMap().then(function(map) {
            //when level is loaded: Create new PlayLevel-Screen
            sm.createScreen('playLevel').then(function(playLevelScreen) {
                
                //remove the loadLevelScreen
                sm.dropScreen(loadLevelScreen);
                
                //show the playLevelScreen
                sm.showScreen(playLevelScreen);
                //let the playLevelScreen show the previously loaded level
                playLevelScreen.startMap(map);
            });
        });
    });
    
});