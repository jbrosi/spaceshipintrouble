
module SpaceshipInTrouble.Engine.Helpers {

    declare class performance {
        static now: any;
        static mozNow: any;
        static msNow: any;
        static oNow: any;
        static webkitNow: any;
    }

    /**
     * Provides a high PerformanceTimer (if available)
     *
     * SOURCE: http://gent.ilcore.com/2012/06/better-timer-for-javascript.html
     *
     *
     * @namespace engine.helper
     * @class PerformanceTimer
     */
    var perfFunction = (function() {
        return performance.now    ||
        performance.mozNow    ||
        performance.msNow     ||
        performance.oNow      ||
        performance.webkitNow ||
        function() {
            return new Date().getTime();
        };
    })();

    if (performance) {
        //correct bindings to performance (if exists)
        perfFunction = perfFunction.bind(performance);
    }

    export function performanceTimer() {
        return perfFunction();
    }

}