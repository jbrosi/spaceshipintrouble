

define(['three', 'lodash', 'helper/performanceTimer', 'helper/statsHelper'], function(THREE, _, performanceTimer, statsHelper) {
    
    var ScreenManager = function() {
        this._screenStack = [];
        _.bindAll(this);
    };
    
    ScreenManager.prototype.init = function (renderer) {
        this._renderer = renderer;
        
        
    }

    ScreenManager.prototype.startRendering = function () {
        if (this._currentScreen && ! this._isRendering) {
            this._isRendering = true;
            requestAnimationFrame(this._render);
        }
    }
    
    ScreenManager.prototype.stopRendering = function () {
        this._isRendering = false;
    }
    
    ScreenManager.prototype.showScreen = function (screen) {
        var that = this;


        require(['game/screens/' + screen], function (Screen) {
            that._currentScreen = new Screen(that._renderer);
            that._screenStack.push(that._currentScreen);
            
            that._currentScreen.show();
            that.startRendering();
        });
    }

    ScreenManager.prototype._render = function () {
        statsHelper.begin();
        //render current screen
        this._currentTime = performanceTimer();
        this._timeDiff = this._currentTime - this._lastTime;
        this._lastTime = this._currentTime;

        if (this._timeDiff > 60) {
            this._timeDiff = 60;    //max
        }

        this._currentScreen.render(this._timeDiff);
        
        if (this._isRendering) {
            requestAnimationFrame(this._render);
        }
        statsHelper.end();
    }
    
    
    return new ScreenManager();
    
});