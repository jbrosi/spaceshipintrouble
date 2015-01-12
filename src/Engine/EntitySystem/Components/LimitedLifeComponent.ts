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


    export class LimitedLifeComponent extends SpaceshipInTrouble.Engine.EntitySystem.EntityComponent {


        private _timeToLive : number;

        private _timeLived: number = 0;

        public constructor(entity: SpaceshipInTrouble.Engine.EntitySystem.Entity, timeToLive: number) {
            super("LimitedLifeComponent", entity);
            this._timeToLive = timeToLive;
        }

        public "onEvent:entity:step" (msg : SpaceshipInTrouble.Engine.EntitySystem.EntityMessage) {
            this._timeLived += msg.getMessage().timeStep;

            if (this._timeLived > this._timeToLive) {
                this.getEntity().dispose();
            }
        }
    }
}