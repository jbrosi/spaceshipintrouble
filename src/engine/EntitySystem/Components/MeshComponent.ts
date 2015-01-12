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


    export class MeshComponent extends SpaceshipInTrouble.Engine.EntitySystem.EntityComponent {


        private _mesh : THREE.Mesh;

        public constructor(entity: SpaceshipInTrouble.Engine.EntitySystem.Entity, mesh : THREE.Mesh) {
            super("MeshComponent", entity);
            entity.getObject3D().add(mesh);
            this._mesh = mesh;
        }
    }
}