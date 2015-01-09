/**
 * Spaceship in trouble - a Game & GameEngine in TypeScript
 *
 * Copyright (c) 2014 - 2015 Johannes Brosi <me@brosi.me>
 *
 * Released under the MIT license
 * https://github.com/jbrosi/spaceshipintrouble/blob/master/LICENSE
 */

///ts:ref=include_all.ts
/// <reference path="../../include_all.ts"/> ///ts:ref:generated

module SpaceshipInTrouble.Engine.EntitySystem.Components {


    export class PhysicComponent extends SpaceshipInTrouble.Engine.EntitySystem.EntityComponent {


        private _physicBody : Box2D.Dynamics.b2Body;
        private _physScale : number;

        public constructor(entity: SpaceshipInTrouble.Engine.EntitySystem.Entity, physicBody : Box2D.Dynamics.b2Body, physScale: number = 1) {
            super("PhysicComponent", entity);
            this._physScale = physScale;
            this._physicBody = physicBody;
        }

        public "onEvent:entity:step" () {
            this.getEntity().getObject3D().position.set(this._physicBody.GetPosition().x * this._physScale, this._physicBody.GetPosition().y * this._physScale, 0);
            this.getEntity().getObject3D().updateMatrix();
        }
    }
}