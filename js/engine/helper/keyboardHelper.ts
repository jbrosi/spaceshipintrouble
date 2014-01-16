import _ = require('lodash');

class KeyboardHelper {
    private _keysDown = {
        right: false,
        up: false,
        left: false,
        down: false,
        space: false,
        floatLeft: false,
        floatRight: false
    }
        

    public constructor() {
        _.bindAll(this);
    }

    public getKeys () {
        return this._keysDown;
    }
    
    
    public register(): void {
        document.body.onkeydown = this._onKeyDown;
        document.body.onkeyup = this._onKeyUp;
    }
    
    public unregister(): void {
        delete document.body.onkeydown;
        delete document.body.onkeyup;
    }

    
    private _onKeyUp (event) {
        this._onKeyDown(event, false);
    }
    
    
    public isLeftPressed () : boolean {
        return this._keysDown.left;
    }
    
    public isUpPressed () : boolean {
        return this._keysDown.up;
    }
    
    public isDownPressed () : boolean {
        return this._keysDown.down;
    }
    
    public isRightPressed () {
        return this._keysDown.right;
    }
    
    public isSpacePressed () {
        return this._keysDown.space;
    }
    
    private _onKeyDown (event, upDown : boolean = true) {

        switch (event.keyCode) {
            case 40: case 83:
                this._keysDown.down = upDown;
                break;
            case 39: case 68:
                this._keysDown.right = upDown;
                break;
            case 38: case 87:
                this._keysDown.up = upDown;
                break;
            case 37: case 65:
                this._keysDown.left = upDown;
                break;
            case 32:
                this._keysDown.space = upDown;
                break;
            case 81:
                this._keysDown.floatLeft = upDown;
                break;
            case 69:
                this._keysDown.floatRight = upDown;
                break;
                
        }
    }
   
}
export = KeyboardHelper;