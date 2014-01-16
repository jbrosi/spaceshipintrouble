
import AbstractScreen = require('engine/screens/abstractScreen');
import VirtualJoystick = require('engine/helper/virtualJoystick');
import KeyboardHelper = require('engine/helper/keyboardHelper');
import EntityManager = require('engine/entity/entityManager');
import EntityMessage = require('engine/entity/entityMessage');
import Box2D = require('engine/helper/box2DHelper');
import MapLayer = require('engine/map/mapLayer');
import TileSet = require('engine/map/tileSet');
import Map = require('../map/tiledMap');


class PlayLevelScreen extends AbstractScreen {

    private _scene: any;
    private _physicWorld: any;
    private _entityManager: EntityManager;
    private _joystick: VirtualJoystick;
    private _keyboard: KeyboardHelper;
    private _camera: any;
    
    
    private _layers: MapLayer[];
    private _tileSets: TileSet[];
    
    public constructor(renderer) {
        super(renderer);
    }
    public startMap(map: Map) {
        console.log("start playing map", map);
        return "played";
    }

    public preRender(timeStep) {
        //overwrite to do own stuff here
    }
    public postRender(timeStep) {
        //overwrite to do own stuff here
    }
    public prePhysics(timeStep) {
        //overwrite to do own stuff here
    }    
    public preEntitySteps(timeStep) {
        //overwrite to do own stuff here
    }
    
    /**
     * Gets called by the screenManager when this LevelScreen should render itself.
     * This also calculates the physics and entity movements like so:
     * 
     * - *prePhysics
     * - calculatePhysics
     * - *preEntitySteps
     * - calculate entity steps
     * - *preRender
     * - actually call three js render
     * - *postRender
     * 
     * the *-methods do nothing and can be overwritten to do own stuff in your level
     */ 
    public render(timeStep: number) {
        this.prePhysics(timeStep);
        this.calculatePhysics();
        
        this.preEntitySteps(timeStep);
        this.getEntityManager().doStep(timeStep);
        
        this.preRender(timeStep);
        this.getRenderer().render(this._scene, this._camera);
        
        this.postRender(timeStep);
    }
    
    /**
     * Initializes the physics world. Should be called before using #calculatePhysics()
     * The gravity param should be a b2Vec. If you don't set this param there will be
     * no gravity in this world.
     * 
     * This also returns the physicsObject. You'll find a b2World in the world property
     * of the physicsObject returned.
     */
    public initPhysics(gravity: any = new Box2D.b2Vec2(0,0)) {
        this._physicWorld = {
            world: new Box2D.b2World(
                gravity,  //gravity
                true                    //allow sleep
            )
        };
        return this.getPhysics();
    }
    
    /**
     * Does the physic calculations for the given frameRate at the given precision (higher numbers mean higher precision).
     * Should be called once per frame.
     * Warning: You may or may not adjust the frameRate for the physic calculations. This may lead to extremely weird
     * results if the number gets too high or too low. By now 16 seems the best value. Also a iteration value of 10 
     * seems to lead to a stable result.
     */ 
    public calculatePhysics(frameRate: number = 16, velocityIterations: number = 10, positionIterations: number = 10) {
        this._physicWorld.world.Step(
            frameRate,
            velocityIterations,
            positionIterations
        );
        this._physicWorld.world.ClearForces();  //not quite sure if we need this
    }
    
    
    /**
     * Sets up a collision listener for the physic world. This will send messages to all
     * entities that collide with each other or collide with walls/other stuff. You need to
     * set the property "entity" in the userData of the b2Body to allow the entities
     * to receive the messages.
     */
    private _setupPhysicCollisionListener () {
        
        var colDetector = Box2D.Dynamics.b2ContactListener;
        
        colDetector.BeginContact = function(contact) {
            var objectA = contact.GetFixtureA().GetBody().GetUserData();
            var objectB = contact.GetFixtureB().GetBody().GetUserData();
            
            if (objectA.type == 'entity' && objectA.entity !== undefined) {
                
                //both are entity?
                if (objectB.type == 'entity' && objectB.entity !== undefined) {
                    objectA.entity.sendMessage(new EntityMessage('collision:entity', {entity: objectB.entity}));
                    objectB.entity.sendMessage(new EntityMessage('collision:entity', {entity: objectA.entity}));
                } else {
                    //it's some other type of collision... maybe add more specific messages here later on
                    objectA.entity.sendMessage(new EntityMessage('collision:other', {object: objectB}));
                }
            } else if (objectB.type == 'entity' && objectB.entity !== undefined) {
                //it's some other type of collision... maybe add more specific messages here later on
                objectB.entity.sendMessage(new EntityMessage('collision:other', {object: objectA}));
            }
        };
        colDetector.EndContact = function(contact) {
            
        };
        
        colDetector.PostSolve = function (contact, impulse) {
            
        };
        
        colDetector.PreSolve = function (contact, oldManifold) {
            
        };
        
        this.getPhysics().world.SetContactListener(colDetector);

    }

    
    /**
     * Returns the physics object to do calculations with. The object contains a property "world" which is a b2World
     * object and may be used for the box2d physics. You may add other properties for use in other scripts...
     */
    public getPhysics() {
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

export = PlayLevelScreen;

