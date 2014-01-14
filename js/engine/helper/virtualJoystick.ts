
import THREE = require("three");
import _ = require("lodash");
import Hammer = require("hammer");
import AbstractLevel = require("engine/abstractLevel");

class VirtualJoystick {
        
    private _speed = 0;
    private _angle = 0;
    private _isFireButtonPressed = false;
    
    private _joystickMesh;
    private _fireButtonMesh;
    
    
    private _radius;
    private _screenWidth;
    private _screenHeight;
    private _center;
    private _hammer;
    private _renderer;
    private _scene;
    
    public constructor() {
        _.bindAll(this);
    }
    
    public _createMeshes () {
        if (this._joystickMesh) {
            //already created
            return;
        }
        var joystickTexture = THREE.ImageUtils.loadTexture('assets/textures/joystick_move.png');
        var joystickMat  = new THREE.SpriteMaterial({map: joystickTexture, useScreenCoordinates: true, depthTest: false, depthWrite: false});
        this._joystickMesh = new THREE.Sprite(joystickMat);
        

        var fireButtonTexture = THREE.ImageUtils.loadTexture('assets/textures/joystick_fire.png');
        var fireButtonMat  = new THREE.SpriteMaterial({map: fireButtonTexture, useScreenCoordinates: true, depthTest: false, depthWrite: false});
        this._fireButtonMesh = new THREE.Sprite(fireButtonMat);

    }
    
    public register (level: AbstractLevel) {
        
        if (!this._joystickMesh) {
            this._createMeshes();
        }
        
        this._scene = level.getScene();
        this._renderer = level.getRenderer();
        
        this._screenHeight = window.innerHeight;
        this._screenWidth = window.innerWidth;
        
        var size = Math.floor(this._screenHeight / 3);
        
        this._joystickMesh.scale.set(size, size, 1.0 ); // imageWidth, imageHeight
        this._joystickMesh.position.set(size / 2, this._screenHeight - (size / 2), 0 );


        this._fireButtonMesh.scale.set(size, size, 1.0 ); // imageWidth, imageHeight
        this._fireButtonMesh.position.set(this._screenWidth - (size / 2), this._screenHeight - (size / 2), 0 );

        
        this._center = {x: size/2, y: this._screenHeight - (size / 2)};
        this._radius = size / 2;
        
        this._scene.add(this._joystickMesh);
        this._scene.add(this._fireButtonMesh);


        this._hammer = new Hammer(this._renderer.context.canvas, {
            drag: true,
            transform: false,
            swipe: false,
            drag_max_touches: 10
        });        
        
        this._hammer.on('touch drag', this._onTouchMove);
        this._hammer.on('release', this._onTouchEnd);
        
    }
    
    private _onTouchMove (evt) {
        
        //false by default
        this._isFireButtonPressed = false;
        
        
        for (var a = 0; a < evt.gesture.touches.length; a++) {
            
            var touch = evt.gesture.touches[a];
    
            var x = touch.pageX;
            var y = touch.pageY;
    
            if ( x < this._radius * 2 && y > this._screenHeight - (this._radius * 2)) {
                //touched the joystick
    
                var diffX = x - this._center.x;
                var diffY = this._center.y - y;
                var length = Math.sqrt((diffX*diffX) + (diffY*diffY));
                
                this._speed = Math.max(-1, Math.min(1, length / this._radius));
                
                this._angle = Math.atan2(diffY, diffX);
            } else if (x > this._screenWidth - (this._radius * 2) && y > this._screenHeight - (this._radius * 2) ) {
                //firebutton
                this._isFireButtonPressed = true;
            }
            
        }        
    }
    
    private _onTouchEnd (evt) {
        this._speed = 0;
        this._isFireButtonPressed = false;
    }
    
    public getSpeed () {
        return this._speed;
    }
    
    public getAngle () {
        return this._angle;
    }
    
    public isFireButtonPressed () {
        return this._isFireButtonPressed;
    }
    
    public removeFromScene = function () {
        this._scene.remove(this._mesh);
    }
    
    
};
export = VirtualJoystick;