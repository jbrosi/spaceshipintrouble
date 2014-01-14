
import THREE = require("three");
import _ = require("lodash");
import Box2D = require("engine/helper/box2DHelper");

import AbstractLevel = require("engine/abstractLevel");

class StandardLevelScreen extends AbstractLevel {
    public constructor(renderer) {
        super(renderer);
        _.bindAll(this);
    }
    
    public show () {
        this._setupScene();
    }
    
    private _setupScene () {
        console.log("setting up level scene");
        
        var that = this;
        
        this._setupCameraAndLighting();
        this._createShip();
        this._setupPhysics();
        this._setupLevel();
        
        console.log("registering keyboard and virtual joystick");
        this.getKeyboard().register();
        this.getJoystick().register(this);
        

    }
    
    private _setupPhysics () {
        var physics = this.initPhysics();
        this._physScale = 3;
        
        //wall
        var fixDef = new Box2D.b2FixtureDef();
        fixDef.density = 1000.0;
        fixDef.friction = 1.0;
        fixDef.restitution = 0.2;
        fixDef.shape = new Box2D.b2PolygonShape;
        fixDef.shape.SetAsBox(5 / this._physScale, 5 / this._physScale);
         
        physics.defaultWallFixture = fixDef;
        physics.defaultWallDefinition = new Box2D.b2BodyDef();
        physics.defaultWallDefinition.type = Box2D.b2Body.b2_staticBody;
        physics.defaultWallDefinition.position.x = 0;
        physics.defaultWallDefinition.position.y = 0;


        //ship
        var shipFix = new Box2D.b2FixtureDef();
        shipFix.density = 100.0;
        shipFix.friction = 0;
        shipFix.restitution = 0.1;
        shipFix.shape = new Box2D.b2CircleShape(3 / this._physScale);


        var shipBodyDef = new Box2D.b2BodyDef();
        shipBodyDef.type = Box2D.b2Body.b2_dynamicBody;
        
        physics.ship = physics.world.CreateBody(shipBodyDef);
        physics.ship.CreateFixture(shipFix);
        physics.ship.SetLinearDamping(0.002);
        physics.ship.SetUserData({type: 'ship'});


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
        
        physics.projectileFix = projectileFix;
        physics.projectileBodyDef = projectileBodyDef;
    }
    

    private _moveEnemies (time) {
        
    }
    

    private _moveShip (time) {
        if (!time || !this._shipMesh) {
            return;
        }
        var physics = this.getPhysics();
        
        var factor = 0.20284;
        
        var isAngleSet = false;        
        
        var facingDirection = new Box2D.b2Vec2();
        facingDirection.x = Math.cos( physics.ship.GetAngle() - (Math.PI/2));
        facingDirection.y = Math.sin( physics.ship.GetAngle() - (Math.PI/2));
        facingDirection.Multiply(factor);
        
        var backwardsDirection = new Box2D.b2Vec2();
        backwardsDirection.x = Math.cos(physics.ship.GetAngle() + (Math.PI/2));
        backwardsDirection.y = Math.sin(physics.ship.GetAngle() + (Math.PI/2));
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
            var joystickDirection = new Box2D.b2Vec2();
            joystickDirection.x = Math.cos(this.getJoystick().getAngle());
            joystickDirection.y = Math.sin(this.getJoystick().getAngle());
            joystickDirection.Multiply(factor * this.getJoystick().getSpeed());
            physics.ship.ApplyForce(joystickDirection, physics.ship.GetWorldCenter());
            physics.ship.SetAngle(this.getJoystick().getAngle() + (Math.PI / 2));
            isAngleSet = true;
        }
        if(!isAngleSet) {
            physics.ship.SetAngle(physics.ship.GetAngle());
        }

        this._shipMesh.position.x = physics.ship.GetPosition().x * this._physScale;
        this._shipMesh.position.y = physics.ship.GetPosition().y * this._physScale;
        this.getCamera().position.x = physics.ship.GetPosition().x * this._physScale;
        this.getCamera().position.y = physics.ship.GetPosition().y * this._physScale;
        this._shipMesh.rotation.y = physics.ship.GetAngle();
        
        
        physics.ship.SetLinearDamping(0.1 * physics.ship.GetLinearVelocity().Length());
        
        
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
        
    }
    
    private _setupLevel () {
        //todo: load from levelfile
        
        var cubeGeo = new THREE.CubeGeometry(10, 10, 10);

        var geo = new THREE.Geometry();
        var mesh = new THREE.Mesh(cubeGeo);

        var wall = this.getPhysics().world.CreateBody(this.getPhysics().defaultWallDefinition);
        wall.SetUserData({type: 'wall'});
        
        var isBoxToCreate = 0;
        for (var x = 0; x < 100; x++ ) {
            for (var y = 0; y < 100; y++) {
                
                if (x== 0 || x == 99 || y == 0 || y == 99) {
                    isBoxToCreate = true;
                } else {
                    isBoxToCreate = Math.random() * 10 < 1;
                }
                
                if ((x > 45 && x < 55 ) && (y > 45 && y < 55)) {
                    isBoxToCreate = false;
                }
                
                if (isBoxToCreate) {
                    var posx = (x - 50) * 10;
                    var posy = (y - 50) * 10;
                    mesh.position.x = posx;
                    mesh.position.y = posy;
                    
                    
                    THREE.GeometryUtils.merge(geo, mesh);
                    
                    this.getPhysics().defaultWallFixture.shape.SetAsOrientedBox(5 / this._physScale, 5 / this._physScale, new Box2D.b2Vec2(posx / this._physScale, posy / this._physScale), 0);
                    wall.CreateFixture(this.getPhysics().defaultWallFixture);
                    
                    
                }
            }
        }
        
        var group = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({color: 0xffff00}));
        group.matrixAutoUpdate = false;
        group.updateMatrix();
        
        this._scene.add(group);
    }
    
    private _setupCameraAndLighting () {
        this.setScene(new THREE.Scene());
        
        //soft white ambient light (change to blueish color?)
        var light = new THREE.AmbientLight( 0x404040 ); 
        this.getScene().add(light);

        //directional light for soft shadows
        var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.9 );
        directionalLight.position.set( 1, 1, 1 );
        this.getScene().add(directionalLight);

        //perspective camera with default values / angle
        this.setCamera(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000));
        this.getCamera().position.set(0,0,50);

        this.getRenderer().setClearColor( 0xffffff, 1 );

    }
    
    private _createShip () {
        var that = this;
        
        //Load and add ship
        var loader = new THREE.JSONLoader();
        loader.load( "assets/models/fighter.js", function( shipGeo, shipMaterials ) {
            console.log("ship loaded");
            
            var shipMaterial = new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture('assets/textures/fighter.png')});
            that._shipMesh = new THREE.Mesh( shipGeo, shipMaterial);
            that._shipMesh.scale.set( 1.5, 1.5, 1.5 );
            that._shipMesh.rotation.set(Math.PI/2,0,0);
            that.getScene().add( that._shipMesh );
        } , "assets/textures/");
    }
    
}

export = StandardLevelScreen;