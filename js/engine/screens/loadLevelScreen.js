var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'engine/screens/abstractScreen', 'engine/map/abstractMapLoader', 'engine/helper/3d/textHelper', 'three'], function(require, exports, AbstractScreen, AbstractMapLoader, TextHelper, THREE) {
    var LoadLevelScreen = (function (_super) {
        __extends(LoadLevelScreen, _super);
        function LoadLevelScreen(renderer) {
            _super.call(this, renderer);
        }
        LoadLevelScreen.prototype.setMapLoader = function (mapLoader) {
            this._mapLoader = mapLoader;
        };

        LoadLevelScreen.prototype.show = function () {
            this._setupScene();
        };

        LoadLevelScreen.prototype._setupScene = function () {
            this._scene = new THREE.Scene();

            //soft white ambient light (change to blueish color?)
            var light = new THREE.AmbientLight(0x404040);
            this._scene.add(light);

            //directional light for soft shadows
            var directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
            directionalLight.position.set(1, 1, 1);
            this._scene.add(directionalLight);

            //perspective camera with default values / angle
            this._camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
            this._camera.position.set(0, 0, 50);

            this.getRenderer().setClearColor(0xffffff, 1);

            var textHelper = TextHelper.getDefaultTextHelper();
            var defaultTextMaterial = new THREE.MeshPhongMaterial({ ambient: 0x777777, color: 0x3333ff, specular: 0x009900, shininess: 80, shading: THREE.FlatShading });

            //loading
            var loadingGeo = textHelper.createTextGeometry('Loading...', { size: 8 });
            THREE.GeometryUtils.center(loadingGeo);
            var loadingMesh = new THREE.Mesh(loadingGeo, defaultTextMaterial.clone());
            loadingMesh.position.y = 20;
            this._scene.add(loadingMesh);
        };

        LoadLevelScreen.prototype.render = function (timeStep) {
            this.getRenderer().render(this._scene, this._camera);
        };
        return LoadLevelScreen;
    })(AbstractScreen);
    ;

    
    return LoadLevelScreen;
});
