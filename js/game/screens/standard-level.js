var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "three", "lodash", "engine/helper/box2DHelper", "engine/abstractLevel"], function(require, exports, THREE, _, Box2D, AbstractLevel) {
    var StandardLevelScreen = (function (_super) {
        __extends(StandardLevelScreen, _super);
        function StandardLevelScreen(renderer) {
            _super.call(this, renderer);
            _.bindAll(this);
        }
        StandardLevelScreen.prototype.show = function () {
            this._setupScene();
        };

        StandardLevelScreen.prototype._setupScene = function () {
            console.log("setting up level scene");

            var that = this;

            this._setupCameraAndLighting();
            this._createShip();
            this._setupPhysics();
            this._setupCollisionListener();
            this._setupLevel();

            console.log("registering keyboard and virtual joystick");
            this.getKeyboard().register();
            this.getJoystick().register(this);
        };

        StandardLevelScreen.prototype._setupCollisionListener = function () {
            var colDetector = Box2D.Dynamics.b2ContactListener;

            colDetector.BeginContact = function (contact) {
                var objectA = contact.GetFixtureA().GetBody().GetUserData();
                var objectB = contact.GetFixtureB().GetBody().GetUserData();
                if (objectA.type == 'projectile' && objectB.type == 'wall') {
                    objectA.isKilled = true;
                } else if (objectB.type == 'projectile' && objectA.type == 'wall') {
                    objectB.isKilled = true;
                }
            };
            colDetector.EndContact = function (contact) {
            };

            colDetector.PostSolve = function (contact, impulse) {
            };

            colDetector.PreSolve = function (contact, oldManifold) {
            };

            this._physics.world.SetContactListener(colDetector);
        };

        StandardLevelScreen.prototype._setupPhysics = function () {
            this._physics = {
                world: new Box2D.b2World(new Box2D.b2Vec2(0, 0), true)
            };

            this._physScale = 3;

            //wall
            var fixDef = new Box2D.b2FixtureDef();
            fixDef.density = 1000.0;
            fixDef.friction = 1.0;
            fixDef.restitution = 0.2;
            fixDef.shape = new Box2D.b2PolygonShape;
            fixDef.shape.SetAsBox(5 / this._physScale, 5 / this._physScale);

            this._physics.defaultWallFixture = fixDef;
            this._physics.defaultWallDefinition = new Box2D.b2BodyDef();
            this._physics.defaultWallDefinition.type = Box2D.b2Body.b2_staticBody;
            this._physics.defaultWallDefinition.position.x = 0;
            this._physics.defaultWallDefinition.position.y = 0;

            //ship
            var shipFix = new Box2D.b2FixtureDef();
            shipFix.density = 100.0;
            shipFix.friction = 0;
            shipFix.restitution = 0.1;
            shipFix.shape = new Box2D.b2CircleShape(3 / this._physScale);

            var shipBodyDef = new Box2D.b2BodyDef();
            shipBodyDef.type = Box2D.b2Body.b2_dynamicBody;

            this._physics.ship = this._physics.world.CreateBody(shipBodyDef);
            this._physics.ship.CreateFixture(shipFix);
            this._physics.ship.SetLinearDamping(0.002);
            this._physics.ship.SetUserData({ type: 'ship' });

            //projectile
            var projectileFix = new Box2D.b2FixtureDef();
            projectileFix.density = 0.001;
            projectileFix.friction = 0;
            projectileFix.restitution = 1;
            projectileFix.isSensor = true;
            projectileFix.isBullet = true;
            projectileFix.shape = new Box2D.b2CircleShape(1 / this._physScale);

            var projectileBodyDef = new Box2D.b2BodyDef();
            projectileBodyDef.type = Box2D.b2Body.b2_dynamicBody;

            this._physics.projectileFix = projectileFix;
            this._physics.projectileBodyDef = projectileBodyDef;
        };

        StandardLevelScreen.prototype.render = function (time) {
            this._moveShip(time);
            this._moveEnemies(time);

            this.getRenderer().render(this.getScene(), this.getCamera());

            this._physics.world.Step(16, 10, 10);

            //this._physics.world.DrawDebugData();
            this._physics.world.ClearForces();
        };

        StandardLevelScreen.prototype._moveEnemies = function (time) {
        };

        StandardLevelScreen.prototype._moveShip = function (time) {
            if (!time || !this._shipMesh) {
                return;
            }

            var factor = 0.20284;

            var isAngleSet = false;

            var facingDirection = new Box2D.b2Vec2();
            facingDirection.x = Math.cos(this._physics.ship.GetAngle() - (Math.PI / 2));
            facingDirection.y = Math.sin(this._physics.ship.GetAngle() - (Math.PI / 2));
            facingDirection.Multiply(factor);

            var backwardsDirection = new Box2D.b2Vec2();
            backwardsDirection.x = Math.cos(this._physics.ship.GetAngle() + (Math.PI / 2));
            backwardsDirection.y = Math.sin(this._physics.ship.GetAngle() + (Math.PI / 2));
            backwardsDirection.Multiply(factor);

            if (this.getKeyboard().isLeftPressed()) {
                this._physics.ship.SetAngle(this._physics.ship.GetAngle() + 0.1);
                isAngleSet = true;
            }
            if (this.getKeyboard().isRightPressed()) {
                this._physics.ship.SetAngle(this._physics.ship.GetAngle() - 0.1);
                isAngleSet = true;
            }
            if (this.getKeyboard().isUpPressed()) {
                this._physics.ship.ApplyForce(facingDirection, this._physics.ship.GetWorldCenter());
            }
            if (this.getKeyboard().isDownPressed()) {
                this._physics.ship.ApplyForce(backwardsDirection, this._physics.ship.GetWorldCenter());
            }

            //check the joystick:
            if (this.getJoystick().getSpeed() > 0) {
                //try to get direction:
                var joystickDirection = new Box2D.b2Vec2();
                joystickDirection.x = Math.cos(this.getJoystick().getAngle());
                joystickDirection.y = Math.sin(this.getJoystick().getAngle());
                joystickDirection.Multiply(factor * this.getJoystick().getSpeed());
                this._physics.ship.ApplyForce(joystickDirection, this._physics.ship.GetWorldCenter());
                this._physics.ship.SetAngle(this.getJoystick().getAngle() + (Math.PI / 2));
                isAngleSet = true;
            }
            if (!isAngleSet) {
                this._physics.ship.SetAngle(this._physics.ship.GetAngle());
            }

            this._shipMesh.position.x = this._physics.ship.GetPosition().x * this._physScale;
            this._shipMesh.position.y = this._physics.ship.GetPosition().y * this._physScale;
            this.getCamera().position.x = this._physics.ship.GetPosition().x * this._physScale;
            this.getCamera().position.y = this._physics.ship.GetPosition().y * this._physScale;
            this._shipMesh.rotation.y = this._physics.ship.GetAngle();

            this._physics.ship.SetLinearDamping(0.1 * this._physics.ship.GetLinearVelocity().Length());

            //shoot?
            if (this.getKeyboard().isSpacePressed() || this.getJoystick().isFireButtonPressed()) {
                var currentTime = new Date().getTime();
                if (currentTime - this._lastShot > 150) {
                    this._lastShot = currentTime;
                    // var shotMesh = new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.MeshLambertMaterial({color: 0x00ff00}));
                    // shotMesh.position.set(this._physics.ship.GetPosition().x * this._physScale, this._physics.ship.GetPosition().y * this._physScale, 0);
                    // this._scene.add(shotMesh)
                    // this._physics.projectileBodyDef.position.Set(this._physics.ship.GetPosition().x + (facingDirection.x / factor), this._physics.ship.GetPosition().y + (facingDirection.y / factor));
                    // var projectile = this._physics.world.CreateBody(this._physics.projectileBodyDef);
                    // facingDirection.Multiply(5);
                    // projectile.SetLinearVelocity(facingDirection);
                    // projectile.CreateFixture(this._physics.projectileFix);
                    // projectile.SetUserData({type: "projectile"});
                    // this._projectiles.push({mesh: shotMesh, physic: projectile, time: currentTime});
                }
            }
        };

        StandardLevelScreen.prototype._setupLevel = function () {
            //todo: load from levelfile
            var cubeGeo = new THREE.CubeGeometry(10, 10, 10);

            var geo = new THREE.Geometry();
            var mesh = new THREE.Mesh(cubeGeo);

            var wall = this._physics.world.CreateBody(this._physics.defaultWallDefinition);
            wall.SetUserData({ type: 'wall' });

            var isBoxToCreate = 0;
            for (var x = 0; x < 100; x++) {
                for (var y = 0; y < 100; y++) {
                    if (x == 0 || x == 99 || y == 0 || y == 99) {
                        isBoxToCreate = true;
                    } else {
                        isBoxToCreate = Math.random() * 10 < 1;
                    }

                    if ((x > 45 && x < 55) && (y > 45 && y < 55)) {
                        isBoxToCreate = false;
                    }

                    if (isBoxToCreate) {
                        var posx = (x - 50) * 10;
                        var posy = (y - 50) * 10;
                        mesh.position.x = posx;
                        mesh.position.y = posy;

                        THREE.GeometryUtils.merge(geo, mesh);

                        this._physics.defaultWallFixture.shape.SetAsOrientedBox(5 / this._physScale, 5 / this._physScale, new Box2D.b2Vec2(posx / this._physScale, posy / this._physScale), 0);
                        wall.CreateFixture(this._physics.defaultWallFixture);
                    }
                }
            }

            var group = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ color: 0xffff00 }));
            group.matrixAutoUpdate = false;
            group.updateMatrix();

            this._scene.add(group);
        };

        StandardLevelScreen.prototype._setupCameraAndLighting = function () {
            this.setScene(new THREE.Scene());

            //soft white ambient light (change to blueish color?)
            var light = new THREE.AmbientLight(0x404040);
            this.getScene().add(light);

            //directional light for soft shadows
            var directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
            directionalLight.position.set(1, 1, 1);
            this.getScene().add(directionalLight);

            //perspective camera with default values / angle
            this.setCamera(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000));
            this.getCamera().position.set(0, 0, 50);

            this.getRenderer().setClearColor(0xffffff, 1);
        };

        StandardLevelScreen.prototype._createShip = function () {
            var that = this;

            //Load and add ship
            var loader = new THREE.JSONLoader();
            loader.load("assets/models/fighter.js", function (shipGeo, shipMaterials) {
                console.log("ship loaded");

                var shipMaterial = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('assets/textures/fighter.png') });
                that._shipMesh = new THREE.Mesh(shipGeo, shipMaterial);
                that._shipMesh.scale.set(1.5, 1.5, 1.5);
                that._shipMesh.rotation.set(Math.PI / 2, 0, 0);
                that.getScene().add(that._shipMesh);
            }, "assets/textures/");
        };
        return StandardLevelScreen;
    })(AbstractLevel);

    
    return StandardLevelScreen;
});
