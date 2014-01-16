
import THREE = require('three');
import helvetikerFont = require('helvetiker-font');

if (helvetikerFont) {
    //we need to have helvetikerFont somewhere in the code or typescript will kick it!
}

class TextHelper {
    private static _defaultTextHelper: TextHelper;
    private _height = 3;
    private _size = 12;
    private _hover = 3;
    private _curveSegments = 4;
    private _bevelThickness = 0.2;
    private _bevelSize = 0.2;
    private _bevelSegments = 3;
    private _bevelEnabled = true;
    private _font = "helvetiker";
    private _weight = "normal";
    private _style = "normal";

    public constructor () {
    }
    
    public createTextGeometry (text, options) {
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
    }
    
    public static getDefaultTextHelper = function() {
        if (!TextHelper._defaultTextHelper) {
            TextHelper._defaultTextHelper = new TextHelper();
        }
        return TextHelper._defaultTextHelper;
    }

};
export = TextHelper;