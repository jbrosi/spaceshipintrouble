

define(['three', 'helvetiker-font'], function(THREE) {
    
    var _defaultTextHelper;
    
    var TextHelper = function () {
        
        
        this._height = 3;
        this._size = 12;
        this._hover = 3;
        this._curveSegments = 4;
        this._bevelThickness = 0.2;
        this._bevelSize = 0.2;
        this._bevelSegments = 3;
        this._bevelEnabled = true;
        this._font = "helvetiker";
        this._weight = "normal";
        this._style = "normal";

    };
    
    TextHelper.prototype.createTextGeometry = function (text, options) {
        if (!options) {
            options = {};
        }
        var textGeometry = new THREE.TextGeometry( text, {
            size: options.size ? options.size : this._size,
            height: options.height ? options.height : this._height,
            curveSegments: options.curveSegments ? options.curveSegments : this._curveSegments,

            font: options.font ? options.font : this._font,
            weight: options.weight ? options.weight : this._weight,
            style: options.style ? options.style : this._style,

            bevelThickness: options.bevelThickness ? options.bevelThickness : this._bevelThickness,
            bevelSize: options.bevelSize ? options.bevelSize : this._bevelSize,
            bevelEnabled: options.bevelEnabled ? options.bevelEnabled : this._bevelEnabled
        });
        
        return textGeometry;
    };
    
    TextHelper.getDefaultTextHelper = function() {
        if (!_defaultTextHelper) {
            _defaultTextHelper = new TextHelper();
        }
        return _defaultTextHelper;
    };
    
    return TextHelper;
    
});