define(["require", "exports", 'engine/screens/abstractScreen', 'engine/helper/statsHelper', 'engine/helper/performanceTimer', 'q', 'lodash'], function(require, exports, AbstractScreen, statsHelper, performanceTimer, Q, _) {
    var ScreenManager = (function () {
        function ScreenManager() {
            this._screenStack = [];
            this._isRendering = false;
            _.bindAll(this);
        }
        ScreenManager.prototype.init = function (renderer) {
            this._renderer = renderer;
        };

        ScreenManager.prototype.startRendering = function () {
            if (this._currentScreen && !this._isRendering) {
                this._isRendering = true;
                requestAnimationFrame(this._render);
            }
        };

        ScreenManager.prototype.stopRendering = function () {
            this._isRendering = false;
        };

        ScreenManager.prototype.createScreen = function (screenName) {
            console.log("trying to create screen");
            var deferred = Q.defer();
            var that = this;
            require(['game/screens/' + screenName], function (Screen) {
                console.log("Creating Screen " + screenName);
                deferred.resolve(new Screen(that._renderer));
            });
            return deferred.promise;
        };
        ScreenManager.prototype.dropScreen = function (screen) {
            if (screen === this._currentScreen) {
                this._screenStack.pop();

                if (this._screenStack.length > 0) {
                    this._currentScreen = this._screenStack[this._screenStack.length - 1];
                } else {
                    this._currentScreen = null;
                }
            }
        };

        ScreenManager.prototype.showScreen = function (screen) {
            console.log("showing screen...");
            this._currentScreen = screen;
            this._screenStack.push(this._currentScreen);
            this._currentScreen.show();
            this.startRendering();
        };
        ScreenManager.prototype.showScreenByName = function (screenName) {
            var that = this;

            var deferred = Q.defer();

            require(['game/screens/' + screen], function (Screen) {
                that.showScreen(new Screen(this._renderer));
                deferred.resolve(that);
            });

            return deferred.promise;
        };

        ScreenManager.prototype._render = function () {
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
                this._timeDiff = 60; //max
            }

            this._currentScreen.render(this._timeDiff);

            if (this._isRendering) {
                requestAnimationFrame(this._render);
            }
            statsHelper.end();
        };
        return ScreenManager;
    })();
    ;

    
    return ScreenManager;
});
