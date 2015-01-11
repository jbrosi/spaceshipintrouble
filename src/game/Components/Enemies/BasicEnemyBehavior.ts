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

        public constructor(entity: SpaceshipInTrouble.Engine.EntitySystem.Entity, physicBody : Box2D.Dynamics.b2Body, physScale: number, target : THREE.Object3D) {
            super("BasicEnemyBehavior", entity);
            this._physicBody = physicBody;
            this._physScale = physScale;
            this._target = target;
            this._isActive = false;
        }

        public "onEvent:entity:step" () {


            //try to see target
            var pos = new THREE.Vector2(this._physicBody.GetPosition().x * this._physScale, this._physicBody.GetPosition().y * this._physScale);
            var worldPos = new THREE.Vector3().setFromMatrixPosition(this._target.matrixWorld);
            var posTarget = new THREE.Vector2(worldPos.x, worldPos.y);

            var direction = posTarget.sub(pos);
            var distance = direction.length();
            if (distance < 60  && distance > 20) {
                this._isActive = true;
            } else {
                this._isActive = false;
            }

            if (this._isActive) {
                var force = direction.normalize().multiplyScalar(0.1);

                this._physicBody.ApplyForce(new Box2D.Common.Math.b2Vec2(force.x, force.y), this._physicBody.GetWorldCenter());
            }


        }


    }
}