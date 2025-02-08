import * as THREE from 'three'
import { GUI } from 'dat.gui'


    const textureLoader = new THREE.TextureLoader( );  

    // create a scene, that will hold all our elements such as objects, cameras and lights.
    var scene = new THREE.Scene();

    // create a camera, which defines where we're looking at.
    var camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1.1, 4000);

    
    const renderer = new THREE.WebGLRenderer( {antialias: true} );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

  const mapUrlBrick = "../textures/brick.jpg";   // The file used as texture 
  const mapBrick = textureLoader.load( mapUrlBrick );
  const materialBrick = new THREE.MeshPhongMaterial( { map: mapBrick } );

  const geometry = new THREE.BoxGeometry( 10, 10, 10 );
    
  const cubo1 = new THREE.Mesh( geometry, materialBrick );
  cubo1.rotation.y = 0.5;
  cubo1.position.x = -12;
  //cubo1.position.set( -50, 10, 50 );
  scene.add(cubo1);

    var cubo2 = createMesh(new THREE.BoxGeometry(10, 10, 10), "brick.jpg", "brick-map.jpg");
    cubo2.rotation.y = 0.5;
    cubo2.position.x = 12;
    scene.add(cubo2); 

    // position and point the camera to the center of the scene
    camera.position.x = 0;
    camera.position.y = 15;
    camera.position.z = 28;
    camera.lookAt(new THREE.Vector3(0, 0, 0));


    const light = new THREE.PointLight( 0xffffff, 0.9, 1000,0 );
    light.position.set( 20, 100, 50 );
    scene.add(light);


    var controls = new function () {
        this.bumpScale = 0.5;

        this.updateBump = function (e) {              
            cubo2.material.bumpScale = e; 
        }
    };


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
        cubo1.rotation.y += 0.001;
        cubo2.rotation.y -= 0.001;
        
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
