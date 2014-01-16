import AbstractScreen = require('engine/screens/abstractScreen');
import statsHelper = require('engine/helper/statsHelper');
import performanceTimer = require('engine/helper/performanceTimer');
import Q = require('q');
import _ = require('lodash');
class ScreenManager {

    private _screenStack = [];
    private _renderer;
    private _currentScreen: AbstractScreen;
    private _isRendering = false;
    
    public constructor() {
        _.bindAll(this);
    }
    
    public init(renderer) {
        this._renderer = renderer;
    }

    public startRendering () {
        if (this._currentScreen && ! this._isRendering) {
            this._isRendering = true;
            requestAnimationFrame(this._render);
        }
    }
    
    public stopRendering () {
        this._isRendering = false;
    }
    
    
    public createScreen(screenName: string) {
        console.log("trying to create screen");
        var deferred = Q.defer();
        var that = this;
        require(['game/screens/'+screenName], function(Screen) {
            console.log("Creating Screen "+screenName);
            deferred.resolve(new Screen(that._renderer));
        });
        return deferred.promise;
    }
    public dropScreen (screen) {
        if (screen === this._currentScreen) {
            this._screenStack.pop();
            
            if (this._screenStack.length > 0) {
                this._currentScreen = this._screenStack[this._screenStack.length - 1];
            } else {
                this._currentScreen = null;
            }
        }
    }
    
    public showScreen (screen: AbstractScreen) {
        console.log("showing screen...");
        this._currentScreen = screen;
        this._screenStack.push(this._currentScreen);
        this._currentScreen.show();
        this.startRendering();
    }
    public showScreenByName (screenName: String) {
        var that = this;

        var deferred = Q.defer();
        
        require(['game/screens/' + screen], function (Screen) {
            that.showScreen(new Screen(this._renderer));
            deferred.resolve(that);
        });
        
        return deferred.promise;
    }

    private _render () {
        
        if (!this._currentScreen) {
            console.log("no active screen - stopping rendering");
            this.stopRendering();
            return;
        }
        
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
    
};

export = ScreenManager;