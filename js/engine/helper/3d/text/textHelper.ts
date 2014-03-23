/**
 * Spaceship in trouble - a Game & GameEngine in TypeScript
 *
 * Copyright (c) 2014 Johannes Brosi <me@brosi.me>
 *
 * Released under the MIT license
 * https://github.com/jbrosi/spaceshipintrouble/blob/master/LICENSE
 */

/// <reference path="../../../../lib.d/three.d.ts" />
/// <amd-dependency path="three" />
/// <amd-dependency path="helvetiker-font" />

declare var require:(moduleId:string) => any;
var THREE = require("three");
var helvetikerFont = require('helvetiker-font');

import TextGeometryOptions = require("engine/helper/3d/text/textGeometryOptions");

/**
 * Helps to create 3D Texts
 *
 * @namespace engine.helper
 * @class TextHelper
 */
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

    /**
     * Creates a new TextHelper
     *
     * @method __constructor
     */
    public constructor () {
    }




    /**
     * Creates and returns a new TextGeometry out of the given `text` and given `options`
     *
     * @method createTextGeometry
     * @param text {string} the text to be displayed
     * @param options {*} (optional) the options for creating this. Options might be empty.
     * @returns {THREE.TextGeometry} the geometry created
     */
    public createTextGeometry (text, options : TextGeometryOptions = new TextGeometryOptions()) {
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

    /**
     * Creates a default textHelper which might be reused to display texts in default font
     *
     * @method getDefaultTextHelper
     * @static
     */
    public static getDefaultTextHelper = function() {
        if (!TextHelper._defaultTextHelper) {
            TextHelper._defaultTextHelper = new TextHelper();
        }
        return TextHelper._defaultTextHelper;
    }

};
export = TextHelper;