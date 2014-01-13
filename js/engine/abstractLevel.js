define(["require", "exports", 'engine/helper/virtualJoystick', 'engine/helper/keyboardHelper', 'engine/entity/entityManager'], function(require, exports, VirtualJoystick, KeyboardHelper, EntityManager) {
    /**
    * Gets inherited by all the levels and holds together the common objects like entities,
    * physics, graphics and so on.
    */
    var AbstractLevel = (function () {
        function AbstractLevel(renderer) {
            this._renderer = renderer;
        }
        AbstractLevel.prototype.getRenderer = function () {
            return this._renderer;
        };

        AbstractLevel.prototype.setPhysic = function (physicWorld) {
            this._physicWorld = physicWorld;
        };

        AbstractLevel.prototype.getPhysic = function () {
            return this._physicWorld;
        };
        AbstractLevel.prototype.setCamera = function (camera) {
            this._camera = camera;
        };

        AbstractLevel.prototype.getCamera = function () {
            return this._camera;
        };
        AbstractLevel.prototype.setScene = function (scene) {
            this._scene = scene;
        };

        AbstractLevel.prototype.getScene = function () {
            return this._scene;
        };

        AbstractLevel.prototype.show = function () {
            console.log("show not implemented");
        };

        AbstractLevel.prototype.getEntityManager = function () {
            if (this._entityManager == null) {
                this._entityManager = new EntityManager(this);
            }
            return this._entityManager;
        };

        AbstractLevel.prototype.getJoystick = function () {
            if (this._joystick == null) {
                this._joystick = new VirtualJoystick();
            }
            return this._joystick;
        };

        AbstractLevel.prototype.getKeyboard = function () {
            if (this._keyboard == null) {
                this._keyboard = new KeyboardHelper();
            }
            return this._keyboard;
        };
        return AbstractLevel;
    })();
    ;

    
    return AbstractLevel;
});
