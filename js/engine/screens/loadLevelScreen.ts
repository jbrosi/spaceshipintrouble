/**
 * Spaceship in trouble - a Game & GameEngine in TypeScript
 *
 * Copyright (c) 2014 Johannes Brosi <me@brosi.me>
 *
 * Released under the MIT license
 * https://github.com/jbrosi/spaceshipintrouble/blob/master/LICENSE
 */

import AbstractScreen = require('engine/screens/abstractScreen');
import AbstractMapLoader = require('engine/map/abstractMapLoader');
import TextGeometry = require('engine/helper/3d/text/textGeometry');

/// <reference path="../../lib.d/three.d.ts" />
/// <amd-dependency path="three" />
declare var require:(moduleId:string) => any;
var THREE = require('three');

/**
 * Default implementation of a screen for displaying the load level progress
 * Use this as base for your own loadLevelScreen, override it or build your own
 * loadLevelScreen as you wish.
 *
 * @namespace engine.screens
 * @class LoadLevelScreen
 * @extends AbstractScreen
 */
class LoadLevelScreen extends AbstractScreen {
    private _mapLoader: AbstractMapLoader;
    private _scene: any;
    private _camera: any;

    /**
     * Creates a new `LoadLevelScreen`
     *
     * @method __constructor
     * @param {THREE.Renderer} renderer the renderer to use for this screen
     */
    public constructor(renderer) {
        super(renderer);
    }

    /**
     * Sets the `MapLoader` to query for progess updates
     *
     * @method setMapLoader
     * @param mapLoader {engine.map.AbstractMapLoader} the map loader to ask for progress
     */
    public setMapLoader(mapLoader: AbstractMapLoader) {
        this._mapLoader = mapLoader;
    }

    /**
     * Gets called when this screen gets visible. Use it to setup the scene
     *
     * @method show
     * @overrides
     */
    public show() {
        this._setupScene();
    }

    /**
     * Initializes our load level scene
     *
     * @method _setupScene
     * @private
     */
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

        this.getRenderer().setClearColor( new THREE.Color(0xffffff), 1 );

        
        var defaultTextMaterial = new THREE.MeshPhongMaterial( { ambient: 0x777777, color: 0x3333ff, specular: 0x009900, shininess: 80, shading: THREE.FlatShading } );
        

        //loading
        var textGeometry = new TextGeometry();
        textGeometry.setSize(8);
        var loadingGeo = textGeometry.createTextGeometry('Loading...');
        THREE.GeometryUtils.center(loadingGeo);
        var loadingMesh = new THREE.Mesh(loadingGeo, defaultTextMaterial.clone()); 
        loadingMesh.position.y = 20;
        this._scene.add(loadingMesh);



    }

    /**
     * Renders the loadLevel scene
     *
     * @method render
     * @overrides
     * @param timeStep {number} the time that has passed since the last render step
     */
    public render(timeStep: number) {
        this.getRenderer().render(this._scene, this._camera);
    }
};

export = LoadLevelScreen;