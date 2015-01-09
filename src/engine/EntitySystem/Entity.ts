/**
 * Spaceship in trouble - a Game & GameEngine in TypeScript
 *
 * Copyright (c) 2014 - 2015 Johannes Brosi <me@brosi.me>
 *
 * Released under the MIT license
 * https://github.com/jbrosi/spaceshipintrouble/blob/master/LICENSE
 */

///ts:ref=include_all.ts
/// <reference path="../include_all.ts"/> ///ts:ref:generated


module SpaceshipInTrouble.Engine.EntitySystem {
    /**
     * This class defines the base type for all "gameobjects" or as we call them here: Entites.
     * Almost everything in the game is an entity. Entities may be nested and may have several
     * components attached to them.
     * Please see Readme.md in the same folder for a further explanation.
     *
     */
    export class Entity {

        /**
         * Holds all the components attached to this entity.
         */
        private _components: SpaceshipInTrouble.Engine.EntitySystem.EntityComponent[] = [];

        /**
         * Holds all callbacks who registered for listening on receiving messages on this entity.
         */
        private _listeners: any = {};

        /**
         * Holds all data private to this entity. This may be used for the various components
         * to share their states (though it's not really recommended. Use messaging for communication!)
         */
        private _data = {};

        /**
         * Holds all entities attached to this entity.
         */
        private _childEntities: Entity[] = [];

        /**
         * Holds all generic event listeners
         *
         * @type {Array}
         * @private
         */
        private _genericEventListeners : any[] = [];

        /**
         * Holds the parent entity of this entity. May be null if the entity is on the root
         * and does not have any parents.
         */
        private _parentEntity: Entity;

        /**
         * The position, rotation and scale of this entity. This might be either world-coordinates or local coordinates.
         */
        private _position: THREE.Object3D;

        /**
         * Reference to the entityManager holding this entity
         */
        private _manager : SpaceshipInTrouble.Engine.EntitySystem.EntityManager;

        /**
         * This message is a template for all the "steps" sent to the scripts. It's reinitialized and reused many times
         * please don't use this for any other purpose
         */
        private _stepMessage = new SpaceshipInTrouble.Engine.EntitySystem.EntityMessage("entity:step", {timeStep: 0}, this, false);

        /**
         * Don't use this to directly create entities. Use EntityFactory instead!
         *
         */
        constructor() {

            this._position = new THREE.Object3D();
        }

        /**
         * Clones the current entity and returns the result. Cloning means the new entity
         * will have the same data attributes, and the same scripts.
         *
         * @returns {engine.entity.Entity} a copy of this entity
         */
        cloneEntity(): Entity {
            //clones the current entity and returns a new instance of this entity
            //with same data and prototype data set.

            //TODO: implement
            return this;
        }

        /**
         * Returns a reference to the `EntityManager` holding this entity
         *
         * @returns {engine.entity.EntityManager} the manager used to create this entity and responsible for managing this entitty
         */
        public getManager() : SpaceshipInTrouble.Engine.EntitySystem.EntityManager {
            return this._manager;
        }

        /**
         *
         * @returns {*} the shared data hold by this entity.
         */
        public getData() {
            return this._data;
        }

        /**
         *
         * @returns {engine.entity.Entity} the parent of this entity. Might be null if there is no parent (meaning this entity is root)
         */
        public getParent() : Entity {
            return this._parentEntity;
        }

        /**
         * @returns {boolean} true if there is a parent to this entity, false if there isn't
         */
        public hasParent() : boolean {
            return this._parentEntity != null;
        }


        /**
         * Adds the given component to this entity and also registers to this entity as genericEventListener.
         *
         * @param component
         */
        public addComponent(component : SpaceshipInTrouble.Engine.EntitySystem.EntityComponent) {
            this._components.push(component);
            this.addGenericEventListener(component);
        }


        public removeComponent(component : SpaceshipInTrouble.Engine.EntitySystem.EntityComponent) {
            for (var i = 0; i < this._components.length; i++) {
                if (this._components[i] === component) {
                    this._components.splice(i,1);
                    return true;
                }
            }
            return false;
        }

        public addGenericEventListener(listener) {
            this._genericEventListeners.push(listener);
        }

        public removeGenericEventListener(listener) {
            for (var i = 0; i < this._genericEventListeners.length; i++) {
                if (this._genericEventListeners[i] === listener) {
                    this._genericEventListeners.splice(i,1);
                    return true;
                }
            }
            return false;
        }


        /**
         * Registers the given `callback` for messages/events with the given `identifier`
         * The `callback` will be called whenever this entity receives a message
         * with the given `identifier`.
         *
         * @param identifier {string} the event-identifier to register for
         * @param callback {function} the function callback to register for this event
         */
        on(identifier: string, callback: (EntityMessage) => void) {
            //trim it
            identifier = identifier.trim();

            if (identifier.length === 0) {
                //we expect the identifier to have at least one symbol
                //TODO: warn?
                return;
            }

            if (identifier.indexOf(" ") > -1) {
                var identifiers = identifier.split(" ");
                var a: number;
                for (a = 0; a < identifiers.length; a++) {
                    this.on(identifiers[a], callback);
                }
                return;
            }

            if (this._listeners[identifier] === undefined) {
                this._listeners[identifier] = [];
            }

            this._listeners[identifier].push(callback);
        }

        /**
         * Removes the given listener (`callback`) from the given event/message (`identifier`)
         *
         * note: this will only remove one instance of this `callback`. If you added
         * the callback multiple times you need to call this multiple times, too.
         *
         * note2: You can't deregister multiple `identifier`s at once (separating with whitespace) at the moment!
         *
         * @param identifier {string} the event identifier to deregister from
         * @param callback {function} the function callback to deregister
         * @returns {boolean} true if a callback was removed false otherwise (if it's not found or
         * has already been removed)
         */
        public removeListener(identifier: string, callback: (EntityMessage) => void): boolean {
            if (this._listeners[identifier] === undefined || this._listeners[identifier].length == 0) {
                //nothin to do
                return false;
            }

            //TODO: split by spaces and remove all given stuff

            if (this._listeners[identifier].length == 1) {
                //nothin to do
                if (this._listeners[identifier][0] === callback) {
                    delete this._listeners[identifier];
                } else {
                    return false;
                }
            }

            var a = 0;

            for (a = 0; a < this._listeners[identifier].length; a++) {
                if (callback === this._listeners[identifier][a]) {
                    this._listeners[identifier].splice(a,1);
                    return true;
                }
            }
            return false;
        }

        /**
         * Gets invoked whenever this entity should calculate its movements and changes. Forwards a "entity:step" message
         * so all components may react to this. The message will contain the `timeStep` parameter with the time elapsed
         * since the last step.
         *
         * @param timeStep the time elapsed since the last step
         */
        public doStep (timeStep: number): void {
            //fake step message for scripts:
            this._stepMessage.getMessage().timeStep = timeStep;
            this.sendMessage(this._stepMessage);

        }

        /**
         * Call this to send a `message` to this entity. Forwards the `message`
         * to all listeners which registered on this entity for that event. You may
         * use this method to directly deliver a `message` to this entity.
         *
         * @param message {SpaceshipInTrouble.Engine.EntitySystem.EntityMessage} the message to send
         */
        public sendMessage (message: SpaceshipInTrouble.Engine.EntitySystem.EntityMessage): void {

            var id = message.getIdentifier();

            //notify the general listeners
            for (var i = 0; i < this._genericEventListeners.length && ! message.isConsumed(); i++) {
                var eventMethod = "onEvent:" + id;
                if (this._genericEventListeners[i][eventMethod] === undefined) {
                    eventMethod = "onGenericEvent";
                }
                if (this._genericEventListeners[i][eventMethod] !== undefined) {
                    try {
                        this._genericEventListeners[i][eventMethod].apply(this._genericEventListeners[i], [message]);
                    } catch (e) {
                        JL("Entity").warn("Failed to dispatch message");
                        console.error(e);
                    }
                }
            }

            //notify our registered callbacks:
            if (this._listeners[id] === undefined) {
                return;
            }

            for (var a = 0; a < this._listeners[id].length && ! message.isConsumed(); a++) {
                this._listeners[message.getIdentifier()][a](message);
            }
        }

        /**
         * Sends the given `message` to all (direct) children of this entity as well as
         * to all the childrens of the childrens of the childrens...
         * Please be careful with large nested constructs
         *
         * @param message {SpaceshipInTrouble.Engine.EntitySystem.EntityMessage} the message to be sent
         */
        public sendMessageToChildren (message: SpaceshipInTrouble.Engine.EntitySystem.EntityMessage, isDeep: boolean = false): void {
            this.sendMessageToChild(message, true);
        }


        /**
         * Sends the given `message` to all (direct) children of this entity. If `isDeep` is set to true
         * also all the childrens of the childrens of the childrens... will receive this message
         * carefull on large nested constructs if you use this param :).
         *
         * @param message {engine.entity.EntityMessage} the message to be sent
         * @param isDeep {boolean} (optional, default: false). Set to true if you want all childs of all childs (of all childs...)
         *        to receive this message, too
         */
        public sendMessageToChild (message: SpaceshipInTrouble.Engine.EntitySystem.EntityMessage, isDeep: boolean = false): void {
            var a: number;
            for (a = 0; a < this._childEntities.length && ! message.isConsumed(); a++) {
                this._childEntities[a].sendMessage(message);

                if (isDeep && ! message.isConsumed()) {
                    this._childEntities[a].sendMessageToChildren(message, true);
                }
            }
        }


        /**
         *
         * @returns {Position} the position/rotation/scale of this entity
         */
        public getPosition(): THREE.Object3D {
            return this._position;
        }

        public getObject3D() : THREE.Object3D {
            return this._position;
        }

        /**
         * @returns {engine.entity.EntityComponent[]} all the components hold by this entity
         */
        public getComponents(): SpaceshipInTrouble.Engine.EntitySystem.EntityComponent[] {
            return this._components;
        }

        /**
         * Sends the given `message` to the parent of this entity. If you set `isDeep` to true this `message` will also be
         * sent to all other ascendants of this entity (meaning the parents of the parents of the ...)
         *
         * @param message {engine.entity.EntityMessage} the message to be sent
         * @param isDeep {boolean} (optional, defaults: false). If set to true all ascendants will be included to receive the message
         */
        public sendMessageToParent (message: SpaceshipInTrouble.Engine.EntitySystem.EntityMessage, isDeep: boolean = false): void {
            if (! this.hasParent() || message.isConsumed()) {
                //no parent to send something to
                return;
            }

            this._parentEntity.sendMessage(message);
            if (isDeep  && ! message.isConsumed()) {
                this._parentEntity.sendMessageToParent(message, true);
            }
        }


        /**
         * Sends the given `message` to all the parents of this entity
         *
         * @param message {engine.entity.EntityMessage} the message to be sent
         */
        public sendMessageToParents (message: SpaceshipInTrouble.Engine.EntitySystem.EntityMessage): void {
            this.sendMessageToParent(message, true);
        }


        public setParent(entity: Entity, preserveWorldCoordinates : boolean = false) {

            if (preserveWorldCoordinates) {
                JL("Entity").error("Not yet implemented 'preserverWorldCoordinates' parameter!");
                throw new Error("preserverWorldCoordinates not yet implemented!");
            }

            if (this.hasParent()) {
                if (preserveWorldCoordinates) {
                    //THREE.SceneUtils.detach(this.getPosition(), this.getParent().getPosition(), scene);
                } else {
                    this.getParent().getPosition().remove(this.getPosition());
                }

            }

            this._parentEntity = entity;
            if (preserveWorldCoordinates) {
                //THREE.SceneUtils.attach(this.getPosition(), scene, this.getParent().getPosition());
            } else {
                this.getParent().getPosition().add(this.getPosition());
            }
            this._parentEntity.getChildren().push(this);
        }

        public getChildren() {
            return this._childEntities;
        }

        /**
         *
         * @param entity
         */
        public addChildEntity(entity : Entity) {
            //also sets the position object3d stuff and registers as our child so we don't have to worry about that
            entity.setParent(this);
        }

    }


}



