

window.requestAnimationFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

require(['engine/gameInitializer', 'engine/screens/screenManager', 'engine/map/tiledMapLoader', 'q'], function(GameInitializer, ScreenManager, TiledMapLoader, Q) {
    
    //disable for release!!
    Q.longStackSupport = true;
    
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