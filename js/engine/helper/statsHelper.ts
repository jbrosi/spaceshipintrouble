
import Stats = require('stats');


class StatsHelper {
    private _stats: any;
    public constructor() {
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

        document.body.appendChild( this._stats.domElement );

    }


    public begin() {
        if (this._stats)
            this._stats.begin();
    }
    public end () {
        if (this._stats)
            this._stats.end();
    }

};
var stats = new StatsHelper();
export = stats;