import * as THREE from 'three'
import { GUI } from 'dat.gui';
import Stats from 'three/examples/jsm/libs/stats.module';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';

    const textureLoader = new THREE.TextureLoader( );  

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1.1, 4000);

    const helper = new THREE.GridHelper( 800, 40, 0x444444, 0x444444 );
    helper.position.y = 0.1;
    scene.add(helper);
	const stats = new Stats( );
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    document.body.appendChild( stats.domElement );
    
    const renderer = new THREE.WebGLRenderer( {antialias: true} );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

  const mapUrltexturaBasica = "../textures/texturaBasica.png";   // The file used as texture 
  const maptexturaBasica = textureLoader.load( mapUrltexturaBasica ); 
  const specialFaceMaterial = new THREE.MeshPhongMaterial( { map: maptexturaBasica } );


  const mapUrlBrick = "../textures/brick.jpg";   // The file used as texture 
  const mapBrick = textureLoader.load( mapUrlBrick ); 
  const regularFaceMaterial = new THREE.MeshPhongMaterial( { map: mapBrick } );

  const materials = [
    regularFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
    specialFaceMaterial,
    regularFaceMaterial,
];
  const geometry = new THREE.BoxGeometry( 10, 10, 10 );
    
  const cubo1 = new THREE.Mesh( geometry, materials );
  cubo1.rotation.y = 0.5;
  cubo1.position.x = -12;
  //cubo1.position.set( -50, 10, 50 );
  scene.add(cubo1);

    var cubo2 = createMesh(new THREE.BoxGeometry(10, 10, 10), "brick.jpg", "brick-map.jpg");
    cubo2.position.x = 12;
    scene.add(cubo2); 

    // position and point the camera to the center of the scene
    camera.position.x = 0;
    camera.position.y = 15;
    camera.position.z = 28;
    camera.lookAt(new THREE.Vector3(0, 0, 0));


    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xf0f0f0, 0.6 );
    hemiLight.position.set( 0, 500, 0 );
    scene.add( hemiLight );



    const controls2 = new FirstPersonControls( camera, renderer.domElement );
    controls2.movementSpeed = 70;
    controls2.lookSpeed = 0.05;
    controls2.noFly = false;
    controls2.lookVertical = false;
 

    var controls = new function () {
        this.bumpScale = 0.5;

        this.updateBump = function (e) {              
            cubo2.material.bumpScale = e; 
        }
    };

    const clock = new THREE.Clock( );


    var gui = new GUI( );
    gui.add(controls, "bumpScale", -4, 4).onChange(controls.updateBump); 
 
    render();

    function createMesh(geom, imageFile, bump) { 

        var texturem = "../textures/brick.jpg";
        const texture = textureLoader.load( texturem );
    
        var mat = new THREE.MeshPhongMaterial();
        mat.map = texture;

        if (bump) { 
 
                  var texturem = "../textures/" + bump;           
        const bump2 = textureLoader.load( texturem );

       
            mat.bumpMap = bump2;
            mat.bumpScale = 0.2; 
        }

        var mesh = new THREE.Mesh(geom, mat);
        return mesh;
    }

    function render() { 

		stats.update( );
        
        requestAnimationFrame(render);
        renderer.render(scene, camera);

        const delta = clock.getDelta();
        controls2.update( delta );
    }
    window.addEventListener( 'resize', ( ) => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix( );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.render( scene, camera );
    }, false );