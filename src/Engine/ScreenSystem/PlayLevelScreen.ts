/**
 * Spaceship in trouble - a Game & GameEngine in TypeScript
 *
 * Copyright (c) 2014 - 2015 Johannes Brosi <me@brosi.me>
 *
 * Released under the MIT license
 * https://github.com/jbrosi/spaceshipintrouble/blob/master/LICENSE
 */

///ts:ref=include_all.ts
/// <reference path="../include_all.ts"/> ///ts:ref:generated
module SpaceshipInTrouble.Engine.ScreenSystem {

    /**
     * Default implementation of a play level screen. Use this as a base for your own
     * PlayLevelScreen or implement a new one by yourself.
     *
     */
    export class PlayLevelScreen extends AbstractScreen {

        private _scene: THREE.Scene;
        private _hudScene: THREE.Scene;
        private _physicWorld: any;
        private _entityManager: SpaceshipInTrouble.Engine.EntitySystem.EntityManager;
        private _joystick: SpaceshipInTrouble.Engine.Helpers.Input.VirtualJoystick;
        private _keyboard: SpaceshipInTrouble.Engine.Helpers.Input.KeyboardHelper;
        private _camera: THREE.Camera;
        private _hudCamera: THREE.Camera;
        private _effectComposer;
        private _glitchPass;


        private _layers: SpaceshipInTrouble.Engine.MapSystem.MapLayer[];
        private _tileSets: SpaceshipInTrouble.Engine.MapSystem.TileSet[];

        /**
         * Creates a new `PlayLevelScreen`
         *
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
        public startMap(map: SpaceshipInTrouble.Engine.MapSystem.TiledMap) {
            console.log("start playing map", map);
        }

        /**
         * Gets called before we render anything.
         * Does nothing - override for your own usage
         *
         * @param timeStep {number} time since last render step
         */
        public preRender(timeStep) {
            //overwrite to do own stuff here
        }

        /**
         * Gets called after we rendered everything.
         * Does nothing - override for your own usage
         *
         * @param timeStep {number} time since last render step
         */
        public postRender(timeStep) {
            //overwrite to do own stuff here
        }

        /**
         * Gets called before we calculate the physics.
         * Does nothing - override for your own usage
         *
         * @param timeStep {number} time since last render step
         */
        public prePhysics(timeStep) {
            //overwrite to do own stuff here
        }


        /**
         * Gets called after we calculated the physics.
         * Does nothing - override for your own usage
         *
         * @param timeStep {number} time since last render step
         */
        public postPhysics(timeStep) {
            //overwrite to do own stuff here
        }

        /**
         * Gets called before we do the entity steps.
         * Does nothing - override for your own usage
         *
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
         * @param timeStep {number} time since last render step
         */
        public render(timeStep:number) {
            this.prePhysics(timeStep);
            this.calculatePhysics();
            this.postPhysics(timeStep);

            this.preEntitySteps(timeStep);
            this.getEntityManager().doStep(timeStep);

            this.preRender(timeStep);


            var composer = this.getEffectComposer();

            composer.render();

            //this.getRenderer().render(this._scene, this._camera);
            this.getRenderer().render(this._hudScene, this._hudCamera);

            this.postRender(timeStep);
        }


        public getEffectComposer() {
            if (this._composer == null) {
                // postprocessing
                this._composer = new THREE.EffectComposer( this.getRenderer() );
                this._composer.addPass( new THREE.RenderPass( this._scene, this._camera) );

                //this._glitchPass = new THREE.GlitchPass();
                //this._composer.addPass(this._glitchPass);

                var copyPass = new THREE.ShaderPass( THREE.CopyShader );
                copyPass.renderToScreen = true;
                this._composer.addPass( copyPass );
            }

            return this._composer;
        }




        /**
         * Initializes the physics world. Should be called before using #calculatePhysics()
         * The gravity param should be a b2Vec. If you don't set this param there will be
         * no gravity in this world.
         *
         * This also returns the physicsObject. You'll find a b2World in the world property
         * of the physicsObject returned.
         *
         * @param gravity {Box2D.b2Vec2}(optional, defaults 0) the gravity to apply to the world
         * @returns {*} the physics defined
         */
        public initPhysics(gravity:any = new Box2D.Common.Math.b2Vec2(0, 0)) {

            this._physicWorld = {
                world: new Box2D.Dynamics.b2World(
                    gravity,  //gravity
                    true                    //allow sleep
                )
            };
            this._setupPhysicCollisionListener();
            return this.getPhysics();
        }

        /**
         * Does the physic calculations for the given frameRate at the given precision (higher numbers mean higher precision).
         * Should be called once per frame.
         * Warning: You may or may not adjust the frameRate for the physic calculations. This may lead to extremely weird
         * results if the number gets too high or too low. By now 16 seems the best value. Also a iteration value of 10
         * seems to lead to a stable result.
         *
         * @param frameRate {number} (optional, default: 16) the frameRate to use
         * @param velocityIterations {number} (optional, default: 10) the velocityIterations to make per physic step
         * @param positionIterations {number} (optional, default: 10) the positionIterations to make per physic step
         */
        public calculatePhysics(frameRate:number = 16, velocityIterations:number = 10, positionIterations:number = 10) {
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
         *
         */
        private _setupPhysicCollisionListener() {

            var colDetector : any = Box2D.Dynamics.b2ContactListener;

            colDetector.BeginContact = function (contact) {

                var objectA = contact.GetFixtureA().GetBody().GetUserData();
                var objectB = contact.GetFixtureB().GetBody().GetUserData();

                if (objectA.type == 'entity' && objectA.entity !== undefined) {

                    //both are entity?
                    if (objectB.type == 'entity' && objectB.entity !== undefined) {
                        objectA.entity.sendMessage(new SpaceshipInTrouble.Engine.EntitySystem.EntityMessage('collision:entity', {entity: objectB.entity}));
                        objectB.entity.sendMessage(new SpaceshipInTrouble.Engine.EntitySystem.EntityMessage('collision:entity', {entity: objectA.entity}));
                    } else {
                        //it's some other type of collision... maybe add more specific messages here later on
                        objectA.entity.sendMessage(new SpaceshipInTrouble.Engine.EntitySystem.EntityMessage('collision:other', {object: objectB}));
                    }
                } else if (objectB.type == 'entity' && objectB.entity !== undefined) {
                    //it's some other type of collision... maybe add more specific messages here later on
                    objectB.entity.sendMessage(new SpaceshipInTrouble.Engine.EntitySystem.EntityMessage('collision:other', {object: objectA}));
                }
            };
            colDetector.EndContact = function (contact) {

            };

            colDetector.PostSolve = function (contact, impulse) {
                //console.log(impulse.normalImpulses[0]);

            };

            colDetector.PreSolve = function (contact, oldManifold) {
            };

            this.getPhysics().world.SetContactListener(colDetector);

        }


        /**
         * Returns the physics object to do calculations with. The object contains a property "world" which is a b2World
         * object and may be used for the box2d physics. You may add other properties for use in other scripts...
         *
         * @returns {*} the physics of this level
         */
        public getPhysics() {
            return this._physicWorld;
        }

        /**
         * Sets the camera for this level screen
         *
         * @param camera {THREE.Camera|THREE.PerspectiveCamera} the camera to set
         */
        public setCamera(camera: THREE.Camera) {
            this._camera = camera;
        }

        /**
         * Returns the camera for this level screen
         *
         * @returns {THREE.Camera} the camera of this level
         */
        public getCamera() : THREE.Camera{
            return this._camera;
        }


        /**
         * Sets the hud camera for this level screen
         *
         * @param camera {THREE.Camera|THREE.PerspectiveCamera} the camera to set
         */
        public setHUDCamera(camera: THREE.Camera) {
            this._hudCamera = camera;
        }

        /**
         * Returns the hud camera for this level screen
         *
         * @returns {THREE.Camera} the camera of this level
         */
        public getHUDCamera() : THREE.Camera{
            return this._hudCamera;
        }


        /**
         * Sets the ThreeJS scene for this level
         *
         * @param scene {THREE.Scene} the scene to set
         */
        public setScene(scene: THREE.Scene ) {
            this._scene = scene;
        }

        /**
         * Returns the ThreeJS scene for this level
         *
         * @returns {THREE.Scene}
         */
        public getScene() : THREE.Scene {
            return this._scene;
        }


        /**
         * Sets the ThreeJS scene for the hud of this level
         *
         * @param scene {THREE.Scene} the scene to set
         */
        public setHUDScene(scene: THREE.Scene ) {
            this._hudScene = scene;
        }

        /**
         * Returns the ThreeJS HUD scene for this level
         *
         * @returns {THREE.Scene}
         */
        public getHUDScene() : THREE.Scene {
            return this._hudScene;
        }


        /**
         * Gets called when the level is about to be shown
         *
         */
        public show() : Q.Promise<any> {
            console.log("show not implemented");
            return Q(true);
        }

        /**
         * Returns the EntityManger for this level (lazy loaded if it doesn't exist yet)
         *
         * @method getEntityManager
         * @returns {engine.entity.EntityManager} current `EntityManager` or lazily created one
         */
        public getEntityManager(): SpaceshipInTrouble.Engine.EntitySystem.EntityManager {
            if (this._entityManager == null) {
                this._entityManager = new SpaceshipInTrouble.Engine.EntitySystem.EntityManager(this._scene, this._physicWorld.world);
            }
            return this._entityManager;
        }

        /**
         * Returns the joystick used in this level or creates one lazily
         *
         * @returns {engine.helper.VirtualJoystick} current joystick or lazily created one
         */
        public getJoystick(): SpaceshipInTrouble.Engine.Helpers.Input.VirtualJoystick {
            if (this._joystick == null) {
                this._joystick = new SpaceshipInTrouble.Engine.Helpers.Input.VirtualJoystick();
            }
            return this._joystick;
        }

        /**
         * Returns the current keyboard used in this level or creates one lazily
         *
         * @returns {engine.helper.KeyboardHelper} current keyboard or lazily created one
         */
        public getKeyboard(): SpaceshipInTrouble.Engine.Helpers.Input.KeyboardHelper {
            if (this._keyboard == null) {
                this._keyboard = new SpaceshipInTrouble.Engine.Helpers.Input.KeyboardHelper();
            }
            return this._keyboard;
        }

    }


}
