define(["require", "exports", 'stats'], function(require, exports, Stats) {
    var StatsHelper = (function () {
        function StatsHelper() {
            if (navigator.isCocoonJS) {
                //skip all as we don't want the fps counter in cocoon
                return;
            }

            this._stats = new Stats();
            this._stats.setMode(0); // 0: fps, 1: ms

            // Align top-left
            this._stats.domElement.style.position = 'absolute';
            this._stats.domElement.style.left = '0px';
            this._stats.domElement.style.top = '0px';

            document.body.appendChild(this._stats.domElement);
        }
        StatsHelper.prototype.begin = function () {
            if (this._stats)
                this._stats.begin();
        };
        StatsHelper.prototype.end = function () {
            if (this._stats)
                this._stats.end();
        };
        return StatsHelper;
    })();
    ;
    var stats = new StatsHelper();
    
    return stats;
});
//# sourceMappingURL=statsHelper.js.map
