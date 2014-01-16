/**
* SOURCE: http://gent.ilcore.com/2012/06/better-timer-for-javascript.html
*
*/
define(["require", "exports"], function(require, exports) {
    var perfFunction = (function () {
        return performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function () {
            return new Date().getTime();
        };
    })();
    if (performance) {
        //correct bindings to performance (if exists)
        perfFunction = perfFunction.bind(performance);
    }
    
    return perfFunction;
});
//# sourceMappingURL=performanceTimer.js.map
