
import Stats = require('stats');

/**
 * Provides a StatsHelper for recording and showing performance stats
 * Note: On cocoonJS the stats don't get shown as we already have a fps counter there
 *
 * Warning: This is a SINGLETON(!) it get's automatically instantiated
 *
 * @namespace engine.helper
 * @class StatsHelper
 */
class StatsHelper {
    private _stats: any;

    /**
     * @method __constructor
     */
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

    /**
     * Start counting for the frame (should be executed right after your requestAnimationFrame callback starts)
     */
    public begin() {
        if (this._stats)
            this._stats.begin();
    }

    /**
     * Ends counting for the frame (should be executed right before your requestAnimationFrame callback ends)
     */
    public end () {
        if (this._stats)
            this._stats.end();
    }

};
var stats = new StatsHelper();
export = stats;