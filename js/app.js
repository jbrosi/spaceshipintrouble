

window.requestAnimationFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

require(['game/init', 'game/screenManager'], function(GameInitializer, ScreenManager) {
    
    
    
    
    //run the game init
    GameInitializer.init();
    
    var renderer = GameInitializer.getRenderer();
    
    
    //run first scene:
    ScreenManager.init(renderer);
    ScreenManager.showScreen('standard-level');
    ScreenManager.startRendering();
});