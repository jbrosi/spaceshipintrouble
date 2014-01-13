
import VirtualJoystick = require('engine/helper/virtualJoystick');
import KeyboardHelper = require('engine/helper/keyboardHelper');
import EntityManager = require('engine/entity/entityManager');

/**
 * Gets inherited by all the levels and holds together the common objects like entities,
 * physics, graphics and so on.
 */ 
class AbstractLevel {
    
    private _renderer: any;
    private _scene: any;
    private _physicWorld: any;
    private _entityManager: EntityManager;
    private _joystick: VirtualJoystick;
    private _keyboard: KeyboardHelper;
    private _camera: any;
    
    public constructor(renderer) {
        this._renderer = renderer;
    }
    public getRenderer() {
        return this._renderer;
    }
    
    public setPhysic(physicWorld) {
        this._physicWorld = physicWorld;
    }
    
    public getPhysic() {
        return this._physicWorld;
    }
    public setCamera(camera) {
        this._camera = camera;
    }
    
    public getCamera() {
        return this._camera;
    }
    public setScene(scene) {
        this._scene = scene;
    }
    
    public getScene() {
        return this._scene;
    }

    public show() {
        console.log("show not implemented");
    }
    
    public getEntityManager(): EntityManager {
        if (this._entityManager == null) {
            this._entityManager = new EntityManager(this);
        }
        return this._entityManager;
    }

    public getJoystick(): VirtualJoystick {
        if (this._joystick == null) {
            this._joystick = new VirtualJoystick();
        }
        return this._joystick;
    }
    
    
    public getKeyboard(): KeyboardHelper {
        if (this._keyboard == null) {
            this._keyboard = new KeyboardHelper();
        }
        return this._keyboard;
    }

};

export = AbstractLevel;

