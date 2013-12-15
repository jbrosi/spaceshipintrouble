

define(['three', 'lodash'], function(THREE, _) {
    var VirtualJoystick = function() {
        _.bindAll(this);
        this._speed = 0;
        this._angle = 0;
        this._isFireButtonPressed = false;
    };
    
    
    VirtualJoystick.prototype._createMeshes = function () {
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

    };
    
    VirtualJoystick.prototype.attachToScene = function (scene, renderer) {
        
        if (!this._joystickMesh) {
            this._createMeshes();
        }
        
        this._scene = scene;
        this._renderer = renderer;
        
        this._screenHeight = this._renderer.context.canvas.height;
        this._screenWidth = this._renderer.context.canvas.width;
        
        var size = Math.floor(this._screenHeight / 3);
        
        this._joystickMesh.scale.set(size, size, 1.0 ); // imageWidth, imageHeight
        this._joystickMesh.position.set(size / 2, this._screenHeight - (size / 2), 0 );


        this._fireButtonMesh.scale.set(size, size, 1.0 ); // imageWidth, imageHeight
        this._fireButtonMesh.position.set(this._screenWidth - (size / 2), this._screenHeight - (size / 2), 0 );

        
        this._center = {x: size/2, y: this._screenHeight - (size / 2)};
        this._radius = size / 2;
        
        this._scene.add(this._joystickMesh);
        this._scene.add(this._fireButtonMesh);
        
        
        this._renderer.context.canvas.addEventListener('touchstart', this._onTouchStart);
        this._renderer.context.canvas.addEventListener('touchmove', this._onTouchMove);
        this._renderer.context.canvas.addEventListener('mousemove', this._onTouchMove);
        this._renderer.context.canvas.addEventListener('mousedown', this._onMouseDown);
        this._renderer.context.canvas.addEventListener('mouseup', this._onMouseUp);
        this._renderer.context.canvas.addEventListener('touchend', this._onTouchEnd);
    };
    
    VirtualJoystick.prototype._onMouseUp = function (evt) {
        this._isMouseDown = false;
        this._onTouchEnd();
    };    
    VirtualJoystick.prototype._onMouseDown = function (evt) {
        this._isMouseDown = true;
        
        //redirect so we also get triggered on mouseclick
        this._onTouchMove(evt);
    };    
    VirtualJoystick.prototype._onTouchStart = function (evt) {
        //redirect so we also get triggered on touchstart
        this._onTouchMove(evt);
    };
    VirtualJoystick.prototype._onTouchMove = function (evt) {
        
        var touch = evt;
        var isTouch = false;
        if (evt.touches) {
            //when touchevent -> use first finger
            touch = evt.touches[0];
            isTouch = true;
        }
        
        var x = touch.clientX
        var y = touch.clientY;

        if ( x < this._radius * 2 && y > this._screenHeight - (this._radius * 2) && (isTouch || this._isMouseDown)) {
            //touched the joystick

            var diffX = x - this._center.x;
            var diffY = this._center.y - y;
            var length = Math.sqrt((diffX*diffX) + (diffY*diffY));
            
            this._speed = Math.max(-1, Math.min(1, length / this._radius));
            
            this._angle = Math.atan2(diffY, diffX);
        } else if (x > this._screenWidth - (this._radius * 2) && y > this._screenHeight - (this._radius * 2) &&  (isTouch || this._isMouseDown)) {
            //firebutton
            this._isFireButtonPressed = true;
        }
    };
    VirtualJoystick.prototype._onTouchEnd = function (evt) {
        this._speed = 0;
        this._isFireButtonPressed = false;
    };
    
    VirtualJoystick.prototype.getSpeed = function () {
        return this._speed;
    }
    
    VirtualJoystick.prototype.getAngle = function () {
        return this._angle;
    }
    
    VirtualJoystick.prototype.isFireButtonPressed = function () {
        return this._isFireButtonPressed;
    }
    
    VirtualJoystick.prototype.removeFromScene = function () {
        this._scene.remove(this._mesh);
    };
    
    
    return VirtualJoystick;
    
});