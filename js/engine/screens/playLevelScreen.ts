/**
 * Spaceship in trouble - a Game & GameEngine in TypeScript
 *
 * Copyright (c) 2014 Johannes Brosi <me@brosi.me>
 *
 * Released under the MIT license
 * https://github.com/jbrosi/spaceshipintrouble/blob/master/LICENSE
 */


/// <reference path="../../lib.d/box2dweb.d.ts" />
/// <amd-dependency path="box2d" />
declare var require:(moduleId:string) => any;
var Box2D = require('box2d');

import AbstractScreen = require('engine/screens/abstractScreen');
import VirtualJoystick = require('engine/helper/virtualJoystick');
import KeyboardHelper = require('engine/helper/keyboardHelper');
import EntityManager = require('engine/entity/entityManager');
import EntityMessage = require('engine/entity/entityMessage');
import MapLayer = require('engine/map/mapLayer');
import TileSet = require('engine/map/tileSet');
import TiledMap = require('../map/tiledMap');


/**
 * Default implementation of a play level screen. Use this as a base for your own
 * PlayLevelScreen or implement a new one by yourself.
 *
 * @namespace engine.screens
 * @class PlayLevelScreen
 * @extends AbstractScreen
 */
class PlayLevelScreen extends AbstractScreen {

    private _scene: any;
    private _physicWorld: any;
    private _entityManager: EntityManager;
    private _joystick: VirtualJoystick;
    private _keyboard: KeyboardHelper;
    private _camera: any;
    
    
    private _layers: MapLayer[];
    private _tileSets: TileSet[];

    /**
     * Creates a new `PlayLevelScreen`
     *
     * @method __constructor
     * @param renderer {THREE.Renderer} the renderer to use
     */
    public constructor(renderer) {
        super(renderer);
    }

    /**
     * Starts to play the given `map`
     *
     * @param map {engine.map.TiledMap} the map to play
     *
     */
    public startMap(map: TiledMap) {
        console.log("start playing map", map);
    }

    /**
     * Gets called before we render anything.
     * Does nothing - override for your own usage
     *
     * @method preRender
     * @param timeStep {number} time since last render step
     */
    public preRender(timeStep) {
        //overwrite to do own stuff here
    }

    /**
     * Gets called after we rendered everything.
     * Does nothing - override for your own usage
     *
     * @method postRender
     * @param timeStep {number} time since last render step
     */
    public postRender(timeStep) {
        //overwrite to do own stuff here
    }

    /**
     * Gets called before we calculate the physics.
     * Does nothing - override for your own usage
     *
     * @method prePhysics
     * @param timeStep {number} time since last render step
     */
    public prePhysics(timeStep) {
        //overwrite to do own stuff here
    }

    /**
     * Gets called before we do the entity steps.
     * Does nothing - override for your own usage
     *
     * @method preEntitySteps
     * @param timeStep {number} time since last render step
     */
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
     *
     * @method render
     * @param timeStep {number} time since last render step
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
     *
     * @method initPhsics
     * @param gravity {Box2D.b2Vec2}(optional, defaults 0) the gravity to apply to the world
     * @returns {*} the physics defined
     */
    public initPhysics(gravity: any = new Box2D.Common.Math.b2Vec2(0,0)) {

        this._physicWorld = {
            world: new Box2D.Dynamics.b2World(
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
     *
     * @method calculatePhysics
     * @param frameRate {number} (optional, default: 16) the frameRate to use
     * @param velocityIterations {number} (optional, default: 10) the velocityIterations to make per physic step
     * @param positionIterations {number} (optional, default: 10) the positionIterations to make per physic step
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
     *
     * @private
     * @method _setupPhysicCollisionListener
     *
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
     *
     * @method getPhysics
     * @returns {*} the physics of this level
     */
    public getPhysics() {
        return this._physicWorld;
    }

    /**
     * Sets the camera for this level screen
     *
     * @method setCamera
     * @param camera {THREE.Camera|THREE.PerspectiveCamera} the camera to set
     */
    public setCamera(camera) {
        this._camera = camera;
    }

    /**
     * Returns the camera for this level screen
     *
     * @method getCamera
     * @returns {THREE.Camera} the camera of this level
     */
    public getCamera() {
        return this._camera;
    }

    /**
     * Sets the ThreeJS scene for this level
     *
     * @method setScene
     * @param scene {THREE.Scene} the scene to set
     */
    public setScene(scene) {
        this._scene = scene;
    }

    /**
     * Returns the ThreeJS scene for this level
     *
     * @method getScene
     * @returns {THREE.Scene}
     */
    public getScene() {
        return this._scene;
    }

    /**
     * Gets called when the level is about to be shown
     *
     * @method show
     * @overrides
     */
    public show() {
        console.log("show not implemented");
    }

    /**
     * Returns the EntityManger for this level (lazy loaded if it doesn't exist yet)
     *
     * @method getEntityManager
     * @returns {engine.entity.EntityManager} current `EntityManager` or lazily created one
     */
    public getEntityManager(): EntityManager {
        if (this._entityManager == null) {
            this._entityManager = new EntityManager();
        }
        return this._entityManager;
    }

    /**
     * Returns the joystick used in this level or creates one lazily
     *
     * @method getJoystick
     * @returns {engine.helper.VirtualJoystick} current joystick or lazily created one
     */
    public getJoystick(): VirtualJoystick {
        if (this._joystick == null) {
            this._joystick = new VirtualJoystick();
        }
        return this._joystick;
    }

    /**
     * Returns the current keyboard used in this level or creates one lazily
     *
     * @method getKeyboard
     * @returns {engine.helper.KeyboardHelper} current keyboard or lazily created one
     */
    public getKeyboard(): KeyboardHelper {
        if (this._keyboard == null) {
            this._keyboard = new KeyboardHelper();
        }
        return this._keyboard;
    }

};

export = PlayLevelScreen;

