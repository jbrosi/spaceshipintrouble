/**
 * Spaceship in trouble - a Game & GameEngine in TypeScript
 *
 * Copyright (c) 2014 - 2015 Johannes Brosi <me@brosi.me>
 *
 * Released under the MIT license
 * https://github.com/jbrosi/spaceshipintrouble/blob/master/LICENSE
 */

///ts:ref=include_all.ts
/// <reference path="../../../Engine/include_all.ts"/> ///ts:ref:generated

module SpaceshipInTrouble.Game.Components.Enemies {


    export class BasicEnemyBehavior extends SpaceshipInTrouble.Engine.EntitySystem.EntityComponent {


        private _physicBody : Box2D.Dynamics.b2Body

        private _target : THREE.Object3D;

        private _physScale : number;

        private _isActive: boolean;

        private _projectileMesh: THREE.Sprite;

        private _screen: SpaceshipInTrouble.Engine.ScreenSystem.PlayLevelScreen;

        private _lastShot = 0;
        public constructor(entity: SpaceshipInTrouble.Engine.EntitySystem.Entity, physicBody : Box2D.Dynamics.b2Body, physScale: number, target : THREE.Object3D, projectileMesh: THREE.Sprite, screen: SpaceshipInTrouble.Engine.ScreenSystem.PlayLevelScreen) {
            super("BasicEnemyBehavior", entity);
            this._physicBody = physicBody;
            this._physScale = physScale;
            this._target = target;
            this._isActive = false;
            this._screen = screen;
            this._projectileMesh = projectileMesh;


        }

        public "onEvent:entity:step" () {


            //try to see target
            var pos = new THREE.Vector2(this._physicBody.GetPosition().x * this._physScale, this._physicBody.GetPosition().y * this._physScale);
            var worldPos = new THREE.Vector3().setFromMatrixPosition(this._target.matrixWorld);
            var posTarget = new THREE.Vector2(worldPos.x, worldPos.y);

            var direction = posTarget.sub(pos);
            var distance = direction.length();
            if (distance < 100 && distance > 20) {
                this._isActive = true;
            } else {
                this._isActive = false;
            }

            if (this._isActive) {
                var force = direction.normalize().multiplyScalar(0.005);

                //it's completely strange -> we need to set the force point to a value where no enemy is o_O if we use the
                //enemies coordinates it moves slowly and crushes through walls... Maybe I don't have yet understood the
                //real meaning of this point... well but it seems to work when setting to somewhat wide outside the level o_O
                this._physicBody.ApplyForce(new Box2D.Common.Math.b2Vec2(force.x, force.y), new Box2D.Common.Math.b2Vec2(99999, 99999));

            }

            if (distance < 60) {
                //look the player in the eyes!
                this.getEntity().getObject3D().setRotationFromAxisAngle(new THREE.Vector3(0,0,1), Math.PI/2 + Math.atan2(direction.x, -direction.y));

                var currentTime = new Date().getTime();
                if (currentTime - this._lastShot > 450) {
                    this._lastShot = currentTime;
                    var physics = this._screen.getPhysics();


                    var projectileEntity = SpaceshipInTrouble.Engine.EntitySystem.EntityFactory.createEntity(this.getEntity().getManager());
                    projectileEntity.getObject3D().rotation.set(Math.PI / 2, 0, 0);

                    var shotMesh = this._projectileMesh.clone();
                    shotMesh.material.color.setRGB(1,0,0);
                    projectileEntity.getObject3D().position.set(pos.x, pos.y, 0);

                    var projectileMeshComponent = new SpaceshipInTrouble.Engine.EntitySystem.Components.MeshComponent(projectileEntity, shotMesh);

                    //physics.projectileBodyDef.position.Set(physics.ship.GetPosition().x + (facingDirection.x / factor), physics.ship.GetPosition().y + (facingDirection.y / factor));
                    var projectile :any = physics.world.CreateBody(physics.projectileBodyDef);


                    var speed = direction.normalize().multiplyScalar(0.02);

                    projectile.SetLinearVelocity(new Box2D.Common.Math.b2Vec2(speed.x, speed.y));

                    projectile.CreateFixture(physics.projectileFix);
                    var projectilePos = new Box2D.Common.Math.b2Vec2(this._physicBody.GetPosition().x + (speed.x), this._physicBody.GetPosition().y + (speed.y));
                    projectile.SetPosition(projectilePos);


                    projectile.SetUserData({type: "projectile"});
                    projectile.SetBullet(true);
                    var projectilePhysicComponent = new SpaceshipInTrouble.Engine.EntitySystem.Components.PhysicComponent(projectileEntity, projectile, this._physScale);

                    var projectileLimitedLifeComponent = new SpaceshipInTrouble.Engine.EntitySystem.Components.LimitedLifeComponent(projectileEntity, 1500);

                    this.getEntity().getManager().getScene().add(projectileEntity.getObject3D());

                }

            }

        }
    }
}