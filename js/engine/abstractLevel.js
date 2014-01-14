define(["require", "exports", 'engine/helper/virtualJoystick', 'engine/helper/keyboardHelper', 'engine/entity/entityManager', 'engine/entity/entityMessage', 'engine/helper/box2DHelper'], function(require, exports, VirtualJoystick, KeyboardHelper, EntityManager, EntityMessage, Box2D) {
    /**
    * Gets inherited by all the levels and holds together the common objects like entities,
    * physics, graphics and so on.
    */
    var AbstractLevel = (function () {
        function AbstractLevel(renderer) {
            this._renderer = renderer;
        }
        AbstractLevel.prototype.getRenderer = function () {
            return this._renderer;
        };

        AbstractLevel.prototype.render = function (timeStep) {
            this.calculatePhysics();
            this.getEntityManager().doStep(timeStep);
            this.getRenderer().render(this._scene, this._camera);
        };

        /**
        * Initializes the physics world. Should be called before using #calculatePhysics()
        * The gravity param should be a b2Vec. If you don't set this param there will be
        * no gravity in this world.
        *
        * This also returns the physicsObject. You'll find a b2World in the world property
        * of the physicsObject returned.
        */
        AbstractLevel.prototype.initPhysics = function (gravity) {
            if (gravity === undefined) {
                gravity = new Box2D.b2Vec2(0, 0);
            }
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
        AbstractLevel.prototype.calculatePhysics = function (frameRate, velocityIterations, positionIterations) {
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
        AbstractLevel.prototype._setupPhysicCollisionListener = function () {
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
        AbstractLevel.prototype.getPhysics = function () {
            return this._physicWorld;
        };

        AbstractLevel.prototype.setCamera = function (camera) {
            this._camera = camera;
        };

        AbstractLevel.prototype.getCamera = function () {
            return this._camera;
        };
        AbstractLevel.prototype.setScene = function (scene) {
            this._scene = scene;
        };

        AbstractLevel.prototype.getScene = function () {
            return this._scene;
        };

        AbstractLevel.prototype.show = function () {
            console.log("show not implemented");
        };

        AbstractLevel.prototype.getEntityManager = function () {
            if (this._entityManager == null) {
                this._entityManager = new EntityManager(this);
            }
            return this._entityManager;
        };

        AbstractLevel.prototype.getJoystick = function () {
            if (this._joystick == null) {
                this._joystick = new VirtualJoystick();
            }
            return this._joystick;
        };

        AbstractLevel.prototype.getKeyboard = function () {
            if (this._keyboard == null) {
                this._keyboard = new KeyboardHelper();
            }
            return this._keyboard;
        };
        return AbstractLevel;
    })();
    ;

    
    return AbstractLevel;
});
