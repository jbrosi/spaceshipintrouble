/**
 * Spaceship in trouble - a Game & GameEngine in TypeScript
 *
 * Copyright (c) 2014 - 2015 Johannes Brosi <me@brosi.me>
 *
 * Released under the MIT license
 * https://github.com/jbrosi/spaceshipintrouble/blob/master/LICENSE
 */

///ts:ref=include_all.ts
/// <reference path="../../engine/include_all.ts"/> ///ts:ref:generated
module SpaceshipInTrouble.Game.Screens {

    export class PlayLevelScreen extends SpaceshipInTrouble.Engine.ScreenSystem.PlayLevelScreen {

        private _lastShot:number  = 0;
        private _shipEntity: SpaceshipInTrouble.Engine.EntitySystem.Entity;

        private _droneMesh : THREE.Mesh;

        private _physScale:any;
        private _groundMirror : any;

        private _projectiles: any[] = [];

        public constructor(renderer) {
            super(renderer);
            _.bindAll(this);
        }


        public preRender(timeStep: number) {
            super.preRender(timeStep);
            this.getScene().updateMatrixWorld(true);
            this._groundMirror.render();
        }

        public show() : Q.Promise <any> {
            console.log("Showing");
            return this._setupScene();
        }

        private _setupScene() : Q.Promise <any> {
            console.log("setting up level scene");

            var that = this;


            return this._setupCameraAndLighting()
                .then(this._setupPhysics)
                .then(this._createShip)
                .then(this._createDrone)
                .then(this._setupLevel)
                .then(this.getKeyboard().register)
                .then(function() {that.getJoystick().register(that);});

        }

        private _setupPhysics() {
            var physics = this.initPhysics();
            this._physScale = 3;

            //wall
            var fixDef = new Box2D.Dynamics.b2FixtureDef();
            fixDef.density = 1000.0;
            fixDef.friction = 1.0;
            fixDef.restitution = 0.2;

            var shape = new Box2D.Collision.Shapes.b2PolygonShape();
            shape.SetAsBox(5 / this._physScale, 5 / this._physScale);

            fixDef.shape = shape;


            physics.defaultWallFixture = fixDef;
            physics.defaultWallDefinition = new Box2D.Dynamics.b2BodyDef();
            physics.defaultWallDefinition.type = Box2D.Dynamics.b2Body.b2_staticBody;
            physics.defaultWallDefinition.position.x = 0;
            physics.defaultWallDefinition.position.y = 0;


            //ship
            var shipFix = new Box2D.Dynamics.b2FixtureDef();
            shipFix.density = 100.0;
            shipFix.friction = 0;
            shipFix.restitution = 0.1;
            shipFix.shape = new Box2D.Collision.Shapes.b2CircleShape(3 / this._physScale);


            var shipBodyDef = new Box2D.Dynamics.b2BodyDef();
            shipBodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;

            physics.ship = physics.world.CreateBody(shipBodyDef);
            physics.ship.CreateFixture(shipFix);
            physics.ship.SetLinearDamping(0.002);
            physics.ship.SetUserData({type: 'ship'});



            //enemy
            var enemyFix = new Box2D.Dynamics.b2FixtureDef();
            enemyFix.density = 50.0;
            enemyFix.friction = 0.11;
            enemyFix.restitution = 0;

            enemyFix.shape = new Box2D.Collision.Shapes.b2CircleShape(3 / this._physScale);

            physics.enemyFix = enemyFix;

            var enemyBodyDef = new Box2D.Dynamics.b2BodyDef();
            enemyBodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;

            physics.enemyBodyDef = enemyBodyDef;

            physics.enemy = physics.world.CreateBody(enemyBodyDef);
            physics.enemy.CreateFixture(enemyFix);
            physics.enemy.SetLinearDamping(0);
            physics.enemy.SetUserData({type: 'enemy'});


            //projectile
            var projectileFix = new Box2D.Dynamics.b2FixtureDef();
            projectileFix.density = 0.001;
            projectileFix.friction = 0;
            projectileFix.restitution = 1;
            projectileFix.isSensor = true;
            projectileFix["isBullet"] = true;
            projectileFix.shape = new Box2D.Collision.Shapes.b2CircleShape(1 / this._physScale);

            var projectileBodyDef = new Box2D.Dynamics.b2BodyDef();
            projectileBodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;

            physics.projectileFix = projectileFix;
            physics.projectileBodyDef = projectileBodyDef;
        }

        public prePhysics(time) {
            this._moveShip(time);
        }

        private _moveEnemies(time) {

        }

        public postPhysics(time) {

        }

        private _moveShip(time) {
            if (!time || !this._shipEntity) {
                return;
            }
            var physics = this.getPhysics();

            var factor = 0.20284;

            var isAngleSet = false;
            var facingDirection = new Box2D.Common.Math.b2Vec2();
            facingDirection.x = Math.cos(physics.ship.GetAngle() - (Math.PI / 2));
            facingDirection.y = Math.sin(physics.ship.GetAngle() - (Math.PI / 2));
            facingDirection.Multiply(factor);

            var backwardsDirection = new Box2D.Common.Math.b2Vec2();
            backwardsDirection.x = Math.cos(physics.ship.GetAngle() + (Math.PI / 2));
            backwardsDirection.y = Math.sin(physics.ship.GetAngle() + (Math.PI / 2));
            backwardsDirection.Multiply(factor);

            if (this.getKeyboard().isLeftPressed()) {
                physics.ship.SetAngle(physics.ship.GetAngle() + 0.1);
                isAngleSet = true;
            }
            if (this.getKeyboard().isRightPressed()) {
                physics.ship.SetAngle(physics.ship.GetAngle() - 0.1);
                isAngleSet = true;
            }
            if (this.getKeyboard().isUpPressed()) {
                physics.ship.ApplyForce(facingDirection, physics.ship.GetWorldCenter());
            }
            if (this.getKeyboard().isDownPressed()) {
                physics.ship.ApplyForce(backwardsDirection, physics.ship.GetWorldCenter());
            }


            //check the joystick:
            if (this.getJoystick().getSpeed() > 0) {
                //try to get direction:
                var joystickDirection = new Box2D.Common.Math.b2Vec2();
                joystickDirection.x = Math.cos(this.getJoystick().getAngle());
                joystickDirection.y = Math.sin(this.getJoystick().getAngle());
                joystickDirection.Multiply(factor * this.getJoystick().getSpeed());
                physics.ship.ApplyForce(joystickDirection, physics.ship.GetWorldCenter());
                physics.ship.SetAngle(this.getJoystick().getAngle() + (Math.PI / 2));
                isAngleSet = true;
            }
            if (!isAngleSet) {
                physics.ship.SetAngle(physics.ship.GetAngle());
            }

            this._shipEntity.getObject3D().position.x = physics.ship.GetPosition().x * this._physScale;
            this._shipEntity.getObject3D().position.y = physics.ship.GetPosition().y * this._physScale;
            this.getCamera().position.x = physics.ship.GetPosition().x * this._physScale;
            this.getCamera().position.y = physics.ship.GetPosition().y * this._physScale;
            this._shipEntity.getObject3D().rotation.y = physics.ship.GetAngle();


            physics.ship.SetLinearDamping(0.1 * physics.ship.GetLinearVelocity().Length());

            //shoot?
            if (this.getKeyboard().isSpacePressed() || this.getJoystick().isFireButtonPressed()) {

                var currentTime = new Date().getTime();
                if (currentTime - this._lastShot > 150) {
                    this._lastShot = currentTime;



                    var projectileEntity = SpaceshipInTrouble.Engine.EntitySystem.EntityFactory.createEntity(this.getEntityManager());
                    projectileEntity.getObject3D().rotation.set(Math.PI / 2, 0, 0);

                    var shotMesh = new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.MeshLambertMaterial({color: 0x00ff00}));
                    projectileEntity.getObject3D().position.set(physics.ship.GetPosition().x * this._physScale, physics.ship.GetPosition().y * this._physScale, 0);

                    var projectileMeshComponent = new SpaceshipInTrouble.Engine.EntitySystem.Components.MeshComponent(projectileEntity, shotMesh);

                    //physics.projectileBodyDef.position.Set(physics.ship.GetPosition().x + (facingDirection.x / factor), physics.ship.GetPosition().y + (facingDirection.y / factor));
                    var projectile :any = physics.world.CreateBody(physics.projectileBodyDef);

                    facingDirection.Multiply(0.1);

                    projectile.SetLinearVelocity(facingDirection);

                    projectile.CreateFixture(physics.projectileFix);
                    var pos = new Box2D.Common.Math.b2Vec2(physics.ship.GetPosition().x + (facingDirection.x / factor), physics.ship.GetPosition().y + (facingDirection.y / factor));
                    projectile.SetPosition(pos);


                    projectile.SetUserData({type: "projectile"});

                    var projectilePhysicComponent = new SpaceshipInTrouble.Engine.EntitySystem.Components.PhysicComponent(projectileEntity, projectile, this._physScale);

                    var projectileLimitedLifeComponent = new SpaceshipInTrouble.Engine.EntitySystem.Components.LimitedLifeComponent(projectileEntity, 1500);

                    this.getScene().add(projectileEntity.getObject3D());

                }

            }

        }

        private _setupLevel() {
            //todo: load from levelfile


            var cubeGeo = new THREE.BoxGeometry(10, 10, 10);

            var geo = new THREE.Geometry();
            var mesh = new THREE.Mesh(cubeGeo);



            var lineGeo = new THREE.Geometry();
            var lineMat = new THREE.LineBasicMaterial( { color: 0x666666 } );




            var wall = this.getPhysics().world.CreateBody(this.getPhysics().defaultWallDefinition);
            wall.SetUserData({type: 'wall'});

            var isBoxToCreate = false;
            for (var x = 0; x < 100; x++) {
                for (var y = 0; y < 100; y++) {

                    var posx = (x - 50) * 10;
                    var posy = (y - 50) * 10;

                    if (x == 0 || x == 99 || y == 0 || y == 99) {
                        isBoxToCreate = true;
                    } else {
                        isBoxToCreate = Math.random() * 10 < 1;
                    }

                    if ((x > 45 && x < 55 ) && (y > 45 && y < 55)) {
                        isBoxToCreate = false;
                    }

                    if (isBoxToCreate) {

                        mesh.position.x = posx;
                        mesh.position.y = posy;
                        mesh.position.z = 5;
                        mesh.updateMatrix();
                        geo.merge(mesh.geometry, mesh.matrix, undefined);

                        this.getPhysics().defaultWallFixture.shape.SetAsOrientedBox(5 / this._physScale, 5 / this._physScale, new Box2D.Common.Math.b2Vec2(posx / this._physScale, posy / this._physScale), 0);
                        wall.CreateFixture(this.getPhysics().defaultWallFixture);
                    } else {

                        var isEnemyToCreate = Math.random() * 50 < 1;

                        if (isEnemyToCreate) {

                            var enemyBody : Box2D.Dynamics.b2Body = this.getPhysics().world.CreateBody(this.getPhysics().enemyBodyDef);
                            enemyBody.CreateFixture(this.getPhysics().enemyFix);
                            enemyBody.SetUserData({"type": "enemy"});
                            var enemyEntity = SpaceshipInTrouble.Engine.EntitySystem.EntityFactory.createEntity(this.getEntityManager());
                            var enemyMeshComponent = new SpaceshipInTrouble.Engine.EntitySystem.Components.MeshComponent(enemyEntity, this._droneMesh.clone());
                            var enemyPhysicComponent = new SpaceshipInTrouble.Engine.EntitySystem.Components.PhysicComponent(enemyEntity, enemyBody, this._physScale);

                            var enemyBehaviourComponent = new SpaceshipInTrouble.Game.Components.Enemies.BasicEnemyBehavior(enemyEntity, enemyBody, this._physScale, this._shipEntity.getObject3D());

                            enemyBody.SetPosition(new Box2D.Common.Math.b2Vec2(posx / this._physScale, posy / this._physScale));
                            enemyEntity.getObject3D().position.set(posx, posy, 0);

                            enemyBody.SetLinearDamping(0.0012);


                            this.getScene().add(enemyEntity.getObject3D());
                        }
                    }

                    lineGeo.vertices.push( new THREE.Vector3( (x -50) * 10 + 5, (y - 50 ) * 10 + 5, 0 ) );
                    lineGeo.vertices.push( new THREE.Vector3( (x -50) * 10 + 5, (y - 50 ) * 10 + 15, 0 ) );
                    lineGeo.vertices.push( new THREE.Vector3( (x -50) * 10 + 5, (y - 50 ) * 10 + 5, 0 ) );
                    lineGeo.vertices.push( new THREE.Vector3( (x -50) * 10 + 15, (y - 50 ) * 10 + 5, 0 ) );

                }

            }

            var lines = new THREE.Line( lineGeo, lineMat, THREE.LinePieces );
            this.getScene().add( lines );


            // MIRORR planes
            var planeGeo = new THREE.PlaneGeometry( 1000.1, 1000.1 );

            this._groundMirror = new THREE["Mirror"]( this.getRenderer(), this.getCamera(), { clipBias: 0.003, textureWidth: 512, textureHeight: 512, color: 0x777777 } );

            var mirrorMesh = new THREE.Mesh( planeGeo, this._groundMirror.material );
            mirrorMesh.add( this._groundMirror );
            this.getScene().add( mirrorMesh );


            var group = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({color: 0xffff00}));
            group.matrixAutoUpdate = false;
            group.updateMatrix();

            this.getScene().add(group);
        }

        private _setupCameraAndLighting() : Q.Promise <any> {
            this.setScene(new THREE.Scene());
            this.setHUDScene(new THREE.Scene());

            //soft white ambient light (change to blueish color?)
            var light = new THREE.AmbientLight(0x404040);
            this.getScene().add(light);

            //this.getHUDScene().add(new THREE.AmbientLight(0xffffff));

            //directional light for soft shadows
            var directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
            directionalLight.position.set(1, 1, 1);
            this.getScene().add(directionalLight);

            //perspective camera with default values / angle
            this.setCamera(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000));

            this.setHUDCamera(new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -2000, 2000 ));
            this.getHUDCamera().position.set(0, 0, 50);
            this.getCamera().position.set(0, 0, 50);

            return Q(true);

        }


        private _createDrone() : Q.Promise<any> {
            var that = this;
            var deferred = Q.defer();

            //Load and add drone
            var loader = new THREE.JSONLoader();
            loader.load("assets/game/models/drone.js", function (droneGeo, droneMaterials) {

                var droneMaterial = new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture('assets/game/textures/fighter.png')});
                var droneMesh = new THREE.Mesh(droneGeo, droneMaterial);
                droneMesh.scale.set(1.5, 1.5, 1.5);
                droneMesh.rotation.set(Math.PI / 2, 0, 0);
                droneMesh.updateMatrix();

                that._droneMesh = droneMesh;
                deferred.resolve(true);

            }, "assets/game/textures/");

            return deferred.promise;
        }


        private _createShip() {
            var that = this;

            this._shipEntity = SpaceshipInTrouble.Engine.EntitySystem.EntityFactory.createEntity(this.getEntityManager());
            this._shipEntity.getObject3D().rotation.set(Math.PI / 2, 0, 0);



            //Load and add ship
            var loader = new THREE.JSONLoader();
            loader.load("assets/game/models/fighter.js", function (shipGeo, shipMaterials) {
                console.log("ship loaded", shipGeo, shipMaterials);

                var shipMaterial = new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture('assets/game/textures/fighter.png')});
                var shipMesh = new THREE.Mesh(shipGeo, shipMaterial);
                shipMesh.scale.set(1.5, 1.5, 1.5);
                shipMesh.updateMatrix();

                var shipMeshComponent = new SpaceshipInTrouble.Engine.EntitySystem.Components.MeshComponent(that._shipEntity, shipMesh);

                that.getScene().add(that._shipEntity.getObject3D());


            }, "assets/game/textures/");
        }

    }
}
