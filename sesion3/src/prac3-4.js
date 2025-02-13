import * as THREE from 'three';
import WEBGL from 'three/examples/jsm/capabilities/WebGL.js';
import { GUI } from 'dat.gui';
 
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';


if ( !WEBGL.isWebGL2Available() ) {
    const nuevoDiv = document.createElement('div');
    nuevoDiv.textContent = WEBGL.getWebGL2ErrorMessage().textContent;
    document.body.appendChild(nuevoDiv);
}

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 1.1, 4000);
 
const renderer = new THREE.WebGLRenderer( {antialias: true} );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const textureLoader = new THREE.TextureLoader( );  
 
const helper = new THREE.GridHelper( 800, 40, 0x444444, 0x444444 );
helper.position.y = 0.1;
scene.add(helper); 
 
const mapUrltexturaBasica = "../textures/texturaBasica.png";   // The file used as texture 
const maptexturaBasica = textureLoader.load( mapUrltexturaBasica ); 
const specialFaceMaterial = new THREE.MeshPhongMaterial( { map: maptexturaBasica } );

const mapUrlBrick = "../textures/brick.jpg";   // The file used as texture 
const mapBrick = textureLoader.load( mapUrlBrick ); 
const regularFaceMaterial = new THREE.MeshPhongMaterial( { map: mapBrick } );

const materialsBox1 = [
    specialFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
];

const mapUrltexturaMapa = "../textures/mapaTopo.png";   // The file used as texture 
const maptexturaMapa = textureLoader.load( mapUrltexturaMapa ); 
const specialFaceMaterialMapa = new THREE.MeshPhongMaterial( { map: maptexturaMapa } );

const mapUrlBrickMap = "../textures/brick-map.jpg";   // The file used as texture 
const mapBrickMap = textureLoader.load( mapUrlBrickMap ); 
const regularFaceMaterialMap = new THREE.MeshPhongMaterial( { map: mapBrickMap } );

const materialsBox2 = [
    regularFaceMaterial,
    specialFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
];
const geometry = new THREE.BoxGeometry( 10, 10, 10 );
    
const box1 = new THREE.Mesh( geometry, materialsBox1 );
box1.position.x = -140;
  //box1.position.set( -50, 10, 50 );
scene.add(box1);

//var box2 = createMesh(geometry, mapBrick, materialsBox2);
const box2 = new THREE.Mesh( geometry, materialsBox2 );
box2.position.x = 140;
scene.add(box2); 

camera.position.x = 0;
camera.position.y = 15;
camera.position.z = 28;
//camera.lookAt(new THREE.Vector3(0, 0, 0));


const light = new THREE.PointLight( 0xffffff, 3, 1000,0 );
light.position.set( 0, 100, 50 );
scene.add(light);

const controls2 = new FirstPersonControls( camera, renderer.domElement );
controls2.movementSpeed = 70;
controls2.lookSpeed = 0.05;
controls2.noFly = false;
controls2.lookVertical = false;

var controls = new function () {
    this.bumpScale = 0.5;
    
    this.updateBump = function (e) {          
        box2.material.bumpScale = e; 
    
    }
};

var gui = new GUI( );
gui.add(controls, "bumpScale", -4, 4).onChange(controls.updateBump); 


function createMesh(geom, mapBrick, materialsBox2) { 

    //var texturem = "../textures/brick.jpg";
    //const texture = textureLoader.load( mapUrlBrick ); 

        var mat = new THREE.MeshPhongMaterial({ map: mapBrick });
        //mat.map = mapBrick;
    
        var texturem = "../textures/brick-map.jpg";           
        const bump = textureLoader.load( texturem );
        mat.bumpMap = bump;
        //mat.bumpScale = 0.2; 
            
        var mesh = new THREE.Mesh(geom, mat);

        //var mesh = new THREE.Mesh( geometry, materialsBox2 );
        return mesh;
}
 
const clock = new THREE.Clock( );

render();

function render() { 
        
    requestAnimationFrame(render);
    renderer.render(scene, camera);

    const delta = clock.getDelta();
    controls2.update( delta );
}
