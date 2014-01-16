/** 
 * SOURCE: http://gent.ilcore.com/2012/06/better-timer-for-javascript.html
 * 
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
export = perfFunction;