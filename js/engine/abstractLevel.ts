
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

    public constructor(renderer, scene, physicWorld) {
        this._renderer = renderer;
        this._scene = scene;
        this._physicWorld = physicWorld;
        
        this._joystick = new VirtualJoystick();
        this._keyboard = new KeyboardHelper();
        
        this._entityManager = new EntityManager(this);
        
    }

};

export = AbstractLevel;

