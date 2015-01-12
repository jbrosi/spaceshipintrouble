/**
 * Spaceship in trouble - a Game & GameEngine in TypeScript
 *
 * Copyright (c) 2014 - 2015 Johannes Brosi <me@brosi.me>
 *
 * Released under the MIT license
 * https://github.com/jbrosi/spaceshipintrouble/blob/master/LICENSE
 */

module SpaceshipInTrouble.Engine.EntitySystem {

    export class EntityFactory {

        public static _registeredPrototypes : SpaceshipInTrouble.Engine.EntitySystem.EntityPrototype[] = [];

        public static createEntity(entityManager : SpaceshipInTrouble.Engine.EntitySystem.EntityManager) : SpaceshipInTrouble.Engine.EntitySystem.Entity{
            var entity = new SpaceshipInTrouble.Engine.EntitySystem.Entity(entityManager);
            entityManager.registerEntity(entity);
            return entity;
        }


        /**
         * Creates a new entity from a given prototype
         *
         * @param prototype {engine.entity.EntityPrototype} the prototype to create the entity from
         * @returns {engine.entity.Entity} the entity created (be carefull, the entity may not have been fully initialized yet!)
         */
        public static createEntityFromPrototype(prototype: SpaceshipInTrouble.Engine.EntitySystem.EntityPrototype, entityManager : SpaceshipInTrouble.Engine.EntitySystem.EntityManager): SpaceshipInTrouble.Engine.EntitySystem.Entity {
            var entity = new SpaceshipInTrouble.Engine.EntitySystem.Entity(entityManager);

            //TODO: add the prototype stuff

            entityManager.registerEntity(entity);
            return entity;
        }

        /**
         * Creates a new entity by typename
         * @param type {string} the name of the type to create this entity from
         * @returns {engine.entity.Entity} the entity created or null if the type isn't defined (be carefull, the entity may not have been fully initialized yet!)
         */
        public static createEntityByName(type:string, entityManager: SpaceshipInTrouble.Engine.EntitySystem.EntityManager): SpaceshipInTrouble.Engine.EntitySystem.Entity {
            if (EntityFactory._registeredPrototypes[type] === undefined) {
                //TODO: warn: Type not found! return null...
                return null;
            }
            return EntityFactory.createEntityFromPrototype(EntityFactory._registeredPrototypes[type], entityManager);
        }


    }
}