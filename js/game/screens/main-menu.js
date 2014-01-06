

define(['three', 'engine/helper/3d/textHelper', 'lodash', 'engine/screenManager'], function(THREE, TextHelper, _, ScreenManager) {
    
    console.log(ScreenManager);
    

    var MainMenuScreen = function(renderer) {
        this._renderer = renderer;
        _.bindAll(this);
    };
    
    MainMenuScreen.prototype.show = function () {
        this._setupScene();
    };
    
    MainMenuScreen.prototype._setupScene = function () {
        console.log("setting up mainMenu scene");
        
        var that = this;
        
        this._setupCameraAndLighting();
        this._setupBackgroundStuff();
        this._registerMouseHandlers();
        this._showSkipIntroButton();

    };
    
    MainMenuScreen.prototype._setupMenuTexts = function () {
        
        
        var textHelper = TextHelper.getDefaultTextHelper();
        var defaultTextMaterial = new THREE.MeshPhongMaterial( { ambient: 0x777777, color: 0x3333ff, specular: 0x009900, shininess: 80, shading: THREE.FlatShading } );
        

        //new game
        var newGameGeo = textHelper.createTextGeometry('New Game', {size: 8});
        THREE.GeometryUtils.center(newGameGeo);
        this._newGameTextMesh = new THREE.Mesh(newGameGeo, defaultTextMaterial.clone()); 
        this._newGameTextMesh.position.y = 20;
        this._scene.add(this._newGameTextMesh);

        //load game
        var loadGameGeo = textHelper.createTextGeometry('Load Game', {size: 8});
        THREE.GeometryUtils.center(loadGameGeo);
        this._loadGameTextMesh = new THREE.Mesh(loadGameGeo, defaultTextMaterial.clone()); 
        this._loadGameTextMesh.position.y = 5;
        this._scene.add(this._loadGameTextMesh);


        //settings
        var settingsGeo = textHelper.createTextGeometry('Settings', {size: 8});
        THREE.GeometryUtils.center(settingsGeo);
        this._settingsTextMesh = new THREE.Mesh(settingsGeo, defaultTextMaterial.clone()); 
        this._settingsTextMesh.position.y = -10;
        this._scene.add(this._settingsTextMesh);


        //help
        var helpGeo = textHelper.createTextGeometry('Help', {size: 8});
        THREE.GeometryUtils.center(helpGeo);
        this._helpTextMesh = new THREE.Mesh(helpGeo, defaultTextMaterial.clone()); 
        this._helpTextMesh.position.y = -25;
        this._scene.add(this._helpTextMesh);
        
        
        //about
        var aboutGeo = textHelper.createTextGeometry('About', {size: 8});
        THREE.GeometryUtils.center(aboutGeo);
        this._aboutTextMesh  = new THREE.Mesh(aboutGeo, defaultTextMaterial.clone()); 
        this._aboutTextMesh.position.y = -40;
        this._scene.add(this._aboutTextMesh);


    };    

    MainMenuScreen.prototype._setupTitleTexts = function () {
        
        
        var textHelper = TextHelper.getDefaultTextHelper();
        var defaultTextMaterial = new THREE.MeshPhongMaterial( { ambient: 0x777777, color: 0xdddddd, specular: 0x009900, shininess: 80, shading: THREE.FlatShading } );
        var redTextMaterial = new THREE.MeshPhongMaterial( { ambient: 0x777777, color: 0xff1111, specular: 0x009900, shininess: 80, shading: THREE.FlatShading } );
        
        //SpaceShip
        var spaceshipGeo = textHelper.createTextGeometry('SpaceShip', {size: 12});
        THREE.GeometryUtils.center( spaceshipGeo );
        var spaceShipTextMesh = new THREE.Mesh(spaceshipGeo, defaultTextMaterial); 
        spaceShipTextMesh.position.y += 60;
        this._scene.add(spaceShipTextMesh);
        
        //in
        var inGeo = textHelper.createTextGeometry('in', {size: 4});
        THREE.GeometryUtils.center( inGeo );
        var inTextMesh = new THREE.Mesh(inGeo, defaultTextMaterial); 
        inTextMesh.position.y += 50;
        this._scene.add(inTextMesh);

        //trouble!
        var troubleGeo = textHelper.createTextGeometry('trouble!', {size: 7});
        THREE.GeometryUtils.center(troubleGeo);
        this._troubleTextMesh = new THREE.Mesh(troubleGeo, redTextMaterial); 
        this._troubleTextMesh.position.y += 40;
        this._scene.add(this._troubleTextMesh);
        
        this._troubleRota = {
            x: 0.003,
            y: 0.008,
            z: 0.001
        };

    }
    
    MainMenuScreen.prototype._registerMouseHandlers = function () {
        this._renderer.context.canvas.addEventListener('mousemove', this.onMouseMoved);
        this._renderer.context.canvas.addEventListener('click', this.onMouseClicked);
        this._renderer.context.canvas.addEventListener('touch', this.onMouseClicked);
    };
    
    MainMenuScreen.prototype.onMouseMoved = function(evt) {
        
        //check if we're hovered over something
        var pos = {
            x : (evt.x / window.innerWidth * 2) - 1,
            y: (evt.y / window.innerHeight * 2) - 1 
        };
        
        if (this._isMenuItemHovered) {
            //reset color
            this._newGameTextMesh.material.color.setHex(0x3333ff);
            this._loadGameTextMesh.material.color.setHex(0x3333ff);
            this._settingsTextMesh.material.color.setHex(0x3333ff);
            this._helpTextMesh.material.color.setHex(0x3333ff);
            this._aboutTextMesh.material.color.setHex(0x3333ff);
        }

        if (this._cameraPhase >= 5 && pos.x >-0.2 && pos.x < 0.2) {

            
            this._isMenuItemHovered = true;
            if (pos.y >= -0.34 && pos.y <= -0.16) {
                this._newGameTextMesh.material.color.setHex(0x33ffff);
            } else if (pos.y >= -0.16 && pos.y <= 0.03) {
                this._loadGameTextMesh.material.color.setHex(0x33ffff);
            } else if (pos.y >= 0.03 && pos.y <= 0.22) {
                this._settingsTextMesh.material.color.setHex(0x33ffff);
            } else if (pos.y >= 0.22 && pos.y <= 0.41) {
                this._helpTextMesh.material.color.setHex(0x33ffff);
            } else if (pos.y >= 0.41 && pos.y <= 0.62) {
                this._aboutTextMesh.material.color.setHex(0x33ffff);
            } else {
                this._isMenuItemHovered = false;
            }
        }
    };

    MainMenuScreen.prototype.onMouseClicked = function(evt) {
        if (this._cameraPhase < 5 && evt.x > window.innerWidth - 200 && evt.y > window.innerHeight - 40) {
            this._skipIntro();
        }
        
        if (this._cameraPhase == 5) {
            var pos = {
                x : (evt.x / window.innerWidth * 2) - 1,
                y: (evt.y / window.innerHeight * 2) - 1 
            };
        
            if (pos.y >= -0.34 && pos.y <= -0.16) {
                this._startNewGame();
            } else if (pos.y >= -0.16 && pos.y <= 0.03) {
                alert("load Game not yet implemented");
            } else if (pos.y >= 0.03 && pos.y <= 0.22) {
                alert("settings not yet implemented");
            } else if (pos.y >= 0.22 && pos.y <= 0.41) {
                alert("help not yet implemented");
            } else if (pos.y >= 0.41 && pos.y <= 0.62) {
                alert("about not yet implemented");
            } else {
                //nothin clicked
            }
    
        }
        
    };
    
    MainMenuScreen.prototype._startNewGame = function () {
        
        this._unregisterEvents();
        
        ScreenManager.showScreen('standard-level');
        ScreenManager.startRendering();
    }
    
    MainMenuScreen.prototype._unregisterEvents = function () {
        this._renderer.context.canvas.removeEventListener('mousemove', this.onMouseMoved);
        this._renderer.context.canvas.removeEventListener('click', this.onMouseClicked);
        this._renderer.context.canvas.removeEventListener('touch', this.onMouseClicked);

    };
    
    MainMenuScreen.prototype._skipIntro = function () {
        this._cameraPhase = 5;
        this._camera.rotation.x = 0;
        this._camera.rotation.y = 0;
        this._camera.rotation.z = 0;
        this._camera.position.set(0,0,100);

        this._setupTitleTexts();
        this._setupMenuTexts();
        this._hideSkipIntroButton();

    }
    
    MainMenuScreen.prototype._setupBackgroundStuff = function () {
        var that = this;
    
        //create planet on the lower right    
        var planetMaterial = new THREE.MeshPhongMaterial();
        planetMaterial.map = THREE.ImageUtils.loadTexture('assets/textures/planet_02.jpg');
        this._planet = new THREE.Mesh(new THREE.SphereGeometry(100, 100, 100), planetMaterial);
        this._planet.position.z = -70;
        this._planet.position.x = 100;
        this._planet.position.y = -100;
        this._planet.castShadow = false;
        this._planet.overdraw = true;
        this._scene.add(this._planet);


        //Load and add ship to the lower left
        var loader = new THREE.JSONLoader();
        loader.load( "assets/models/fighter.js", function( shipGeo, shipMaterials ) {
            console.log("ship loaded");
            
            var shipMaterial = new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture('assets/textures/fighter.png')});
            that._shipMesh = new THREE.Mesh( shipGeo, shipMaterial);
            that._shipMesh.scale.set( 10, 10, 10 );
            that._shipMesh.position.y = -30;
            that._shipMesh.position.x = -60;
            that._shipMesh.position.z = 0;
            that._scene.add( that._shipMesh );
        } , "assets/textures/");



        //Create the skysphere around everything (needs a little tweaking later)
        var skySphereTexture = THREE.ImageUtils.loadTexture('assets/textures/nebula_01.jpg');
        skySphereTexture.wrapS = skySphereTexture.wrapT = THREE.RepeatWrapping;
        skySphereTexture.repeat.set(3,3);
        var skySphereMaterial = new THREE.MeshPhongMaterial();
        skySphereMaterial.map = skySphereTexture;
        skySphereMaterial.depthWrite = false;
        skySphereMaterial.side = THREE.BackSide;
        this._skySphere = new THREE.Mesh(new THREE.SphereGeometry(1000, 100, 100), skySphereMaterial);
        this._skySphere.overdraw = true;
        this._skySphere.receiveShadow = false;
        this._skySphere.rotation.z = 2;
        this._scene.add(this._skySphere);
    }
    
    MainMenuScreen.prototype._showSkipIntroButton = function () {

        
        var texture = THREE.ImageUtils.loadTexture('assets/textures/skip_intro_button.png');
        var mat  = new THREE.SpriteMaterial({map: texture, useScreenCoordinates: true, depthTest: false, depthWrite: false});
        this._skipIntroButton = new THREE.Sprite(mat);
        this._skipIntroButton.position.set( window.innerWidth - 80, window.innerHeight - 20, 0 );
        this._skipIntroButton.scale.set( 128, 64, 1.0 ); // imageWidth, imageHeight
        this._scene.add(this._skipIntroButton);
    }
    
    MainMenuScreen.prototype._hideSkipIntroButton = function () {
        this._scene.remove(this._skipIntroButton);
    }
    
    
    MainMenuScreen.prototype._setupCameraAndLighting = function() {
        this._scene = new THREE.Scene();
        
        //soft white ambient light (change to blueish color?)
        var light = new THREE.AmbientLight( 0x404040 ); 
        this._scene.add( light );

        //directional light for soft shadows
        var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.9 );
        directionalLight.position.set( 1, 1, 1 );
        this._scene.add( directionalLight );

        //perspective camera with default values / angle
        this._camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
        this._camera.rotation.x = -1;
        this._camera.rotation.y = -2;
        this._camera.position.z = 500;
        
        this._cameraPhase = 0;
    };
    
    MainMenuScreen.prototype.render = function (time) {    
   
        if (this._cameraPhase < 5) {
            
            //slightly move into our center view
            if (this._cameraPhase == 0) {
                this._camera.rotation.x += 0.0005;
                this._camera.rotation.y += 0.001;
                if (this._camera.rotation.x > -0.4) {
                    this._camera.position.z -= 0.1;
                }
                if (this._camera.rotation.x > -0.3) {
                    this._camera.position.z -= 0.2;
                }
                if (this._camera.rotation.x > -0.2) {
                    this._camera.position.z -= 0.3;
                }
                if (this._camera.rotation.x > -0.1) {
                    this._camera.position.z -= 0.4;
                }
                if(this._camera.rotation.x >= 0) {
                    this._camera.rotation.x = 0;
                    this._camera.rotation.y = 0;
                    this._cameraPhase++;
                }                
            }
                
            //zoom and activate texts afterwards
            if (this._cameraPhase == 1) {
                this._camera.position.z -= 0.5;
                if (this._camera.position.z <= 100) {
                    this._camera.position.z = 100;
                    this._setupTitleTexts();
                    this._setupMenuTexts();
                    this._hideSkipIntroButton();
                    this._cameraPhase=5; 
                }
            }
        }
    
        if (this._shipMesh) {
            this._shipMesh.rotation.x -= 0.0001;
            this._shipMesh.rotation.y += 0.0003;
            this._shipMesh.rotation.z += 0.0008;
        }


        
        if (this._troubleTextMesh) {
            this._troubleTextMesh.rotation.x += this._troubleRota.x;
            this._troubleTextMesh.rotation.z += this._troubleRota.z;
            if (this._troubleTextMesh.rotation.x > 0.2 || this._troubleTextMesh.rotation.x < -0.2) this._troubleRota.x *= -1;
            if (this._troubleTextMesh.rotation.z > 0.2 || this._troubleTextMesh.rotation.z < -0.2) this._troubleRota.z *= -1;
        }
        this._planet.rotation.y += 0.0003;
        this._skySphere.rotation.y += 0.0001;
        this._skySphere.rotation.z += 0.00005;


        this._renderer.render(this._scene, this._camera); 
        
    };
    
    
    return MainMenuScreen;
    
});