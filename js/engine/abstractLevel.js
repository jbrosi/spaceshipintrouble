define(["require", "exports", 'engine/helper/virtualJoystick', 'engine/helper/keyboardHelper', 'engine/entity/entityManager'], function(require, exports, VirtualJoystick, KeyboardHelper, EntityManager) {
    /**
    * Gets inherited by all the levels and holds together the common objects like entities,
    * physics, graphics and so on.
    */
    var AbstractLevel = (function () {
        function AbstractLevel(renderer, scene, physicWorld) {
            this._renderer = renderer;
            this._scene = scene;
            this._physicWorld = physicWorld;

            this._joystick = new VirtualJoystick();
            this._keyboard = new KeyboardHelper();

            this._entityManager = new EntityManager(this);
        }
        return AbstractLevel;
    })();
    ;

    
    return AbstractLevel;
});
