
import AbstractScreen = require('engine/screens/abstractScreen');
import AbstractMapLoader = require('engine/map/abstractMapLoader');
import TextHelper = require('engine/helper/3d/textHelper');
import THREE = require('three');

class LoadLevelScreen extends AbstractScreen {
    private _mapLoader: AbstractMapLoader;
    private _scene: any;
    private _camera: any;
    
    public constructor(renderer) {
        super(renderer);
    }
    
    public setMapLoader(mapLoader: AbstractMapLoader) {
        this._mapLoader = mapLoader;
    }

    public show() {
        this._setupScene();
    }
    
    private _setupScene() {
        
        this._scene = new THREE.Scene();
        
        //soft white ambient light (change to blueish color?)
        var light = new THREE.AmbientLight( 0x404040 ); 
        this._scene.add(light);

        //directional light for soft shadows
        var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.9 );
        directionalLight.position.set( 1, 1, 1 );
        this._scene.add(directionalLight);

        //perspective camera with default values / angle
        this._camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
        this._camera.position.set(0,0,50);

        this.getRenderer().setClearColor( 0xffffff, 1 );

        
        var textHelper = TextHelper.getDefaultTextHelper();
        var defaultTextMaterial = new THREE.MeshPhongMaterial( { ambient: 0x777777, color: 0x3333ff, specular: 0x009900, shininess: 80, shading: THREE.FlatShading } );
        

        //loading
        var loadingGeo = textHelper.createTextGeometry('Loading...', {size: 8});
        THREE.GeometryUtils.center(loadingGeo);
        var loadingMesh = new THREE.Mesh(loadingGeo, defaultTextMaterial.clone()); 
        loadingMesh.position.y = 20;
        this._scene.add(loadingMesh);



    }
    
    public render(timeStep: number) {
        this.getRenderer().render(this._scene, this._camera);
    }
};

export = LoadLevelScreen;