

window.requestAnimationFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

require(['engine/gameInitializer', 'engine/screenManager'], function(GameInitializer, ScreenManager) {
    
    
    
    
    //run the game init
    var gi = new GameInitializer();
    gi.init();
    
    var renderer = gi.getRenderer();
    
    
    //run first scene:
    ScreenManager.init(renderer);
    ScreenManager.showScreen('standard-level');
    ScreenManager.startRendering();
});