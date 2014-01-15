var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'engine/screens/abstractScreen', 'engine/helper/virtualJoystick', 'engine/helper/keyboardHelper', 'engine/entity/entityManager', 'engine/entity/entityMessage', 'engine/helper/box2DHelper', 'engine/map/mapLayer', 'engine/map/tileSet'], function(require, exports, AbstractScreen, VirtualJoystick, KeyboardHelper, EntityManager, EntityMessage, Box2D, MapLayer, TileSet) {
    var PlayLevelScreen = (function (_super) {
        __extends(PlayLevelScreen, _super);
        function PlayLevelScreen(renderer) {
            _super.call(this, renderer);
        }
        PlayLevelScreen.prototype.showLevel = function (level) {
            console.log("showing level");
            return "played";
        };

        PlayLevelScreen.prototype.preRender = function (timeStep) {
            //overwrite to do own stuff here
        };
        PlayLevelScreen.prototype.postRender = function (timeStep) {
            //overwrite to do own stuff here
        };
        PlayLevelScreen.prototype.prePhysics = function (timeStep) {
            //overwrite to do own stuff here
        };
        PlayLevelScreen.prototype.preEntitySteps = function (timeStep) {
            //overwrite to do own stuff here
        };

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
        PlayLevelScreen.prototype.render = function (timeStep) {
            this.prePhysics(timeStep);
            this.calculatePhysics();

            this.preEntitySteps(timeStep);
            this.getEntityManager().doStep(timeStep);

            this.preRender(timeStep);
            this.getRenderer().render(this._scene, this._camera);

            this.postRender(timeStep);
        };

        /**
        * Initializes the physics world. Should be called before using #calculatePhysics()
        * The gravity param should be a b2Vec. If you don't set this param there will be
        * no gravity in this world.
        *
        * This also returns the physicsObject. You'll find a b2World in the world property
        * of the physicsObject returned.
        */
        PlayLevelScreen.prototype.initPhysics = function (gravity) {
            if (typeof gravity === "undefined") { gravity = new Box2D.b2Vec2(0, 0); }
            this._physicWorld = {
                world: new Box2D.b2World(gravity, true)
            };
            return this.getPhysics();
        };

        /**
        * Does the physic calculations for the given frameRate at the given precision (higher numbers mean higher precision).
        * Should be called once per frame.
        * Warning: You may or may not adjust the frameRate for the physic calculations. This may lead to extremely weird
        * results if the number gets too high or too low. By now 16 seems the best value. Also a iteration value of 10
        * seems to lead to a stable result.
        */
        PlayLevelScreen.prototype.calculatePhysics = function (frameRate, velocityIterations, positionIterations) {
            if (typeof frameRate === "undefined") { frameRate = 16; }
            if (typeof velocityIterations === "undefined") { velocityIterations = 10; }
            if (typeof positionIterations === "undefined") { positionIterations = 10; }
            this._physicWorld.world.Step(frameRate, velocityIterations, positionIterations);
            this._physicWorld.world.ClearForces(); //not quite sure if we need this
        };

        /**
        * Sets up a collision listener for the physic world. This will send messages to all
        * entities that collide with each other or collide with walls/other stuff. You need to
        * set the property "entity" in the userData of the b2Body to allow the entities
        * to receive the messages.
        */
        PlayLevelScreen.prototype._setupPhysicCollisionListener = function () {
            var colDetector = Box2D.Dynamics.b2ContactListener;

            colDetector.BeginContact = function (contact) {
                var objectA = contact.GetFixtureA().GetBody().GetUserData();
                var objectB = contact.GetFixtureB().GetBody().GetUserData();

                if (objectA.type == 'entity' && objectA.entity !== undefined) {
                    //both are entity?
                    if (objectB.type == 'entity' && objectB.entity !== undefined) {
                        objectA.entity.sendMessage(new EntityMessage('collision:entity', { entity: objectB.entity }));
                        objectB.entity.sendMessage(new EntityMessage('collision:entity', { entity: objectA.entity }));
                    } else {
                        //it's some other type of collision... maybe add more specific messages here later on
                        objectA.entity.sendMessage(new EntityMessage('collision:other', { object: objectB }));
                    }
                } else if (objectB.type == 'entity' && objectB.entity !== undefined) {
                    //it's some other type of collision... maybe add more specific messages here later on
                    objectB.entity.sendMessage(new EntityMessage('collision:other', { object: objectA }));
                }
            };
            colDetector.EndContact = function (contact) {
            };

            colDetector.PostSolve = function (contact, impulse) {
            };

            colDetector.PreSolve = function (contact, oldManifold) {
            };

            this.getPhysics().world.SetContactListener(colDetector);
        };

        /**
        * Returns the physics object to do calculations with. The object contains a property "world" which is a b2World
        * object and may be used for the box2d physics. You may add other properties for use in other scripts...
        */
        PlayLevelScreen.prototype.getPhysics = function () {
            return this._physicWorld;
        };

        PlayLevelScreen.prototype.setCamera = function (camera) {
            this._camera = camera;
        };

        PlayLevelScreen.prototype.getCamera = function () {
            return this._camera;
        };
        PlayLevelScreen.prototype.setScene = function (scene) {
            this._scene = scene;
        };

        PlayLevelScreen.prototype.getScene = function () {
            return this._scene;
        };

        PlayLevelScreen.prototype.show = function () {
            console.log("show not implemented");
        };

        PlayLevelScreen.prototype.getEntityManager = function () {
            if (this._entityManager == null) {
                this._entityManager = new EntityManager(this);
            }
            return this._entityManager;
        };

        PlayLevelScreen.prototype.getJoystick = function () {
            if (this._joystick == null) {
                this._joystick = new VirtualJoystick();
            }
            return this._joystick;
        };

        PlayLevelScreen.prototype.getKeyboard = function () {
            if (this._keyboard == null) {
                this._keyboard = new KeyboardHelper();
            }
            return this._keyboard;
        };
        return PlayLevelScreen;
    })(AbstractScreen);
    ;

    
    return PlayLevelScreen;
});
