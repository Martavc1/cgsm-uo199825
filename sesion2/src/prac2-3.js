import * as THREE from 'three';
import WEBGL from 'three/examples/jsm/capabilities/WebGL.js';

if ( !WEBGL.isWebGL2Available() ) {
    const nuevoDiv = document.createElement('div');
    
    nuevoDiv.textContent = WEBGL.getWebGL2ErrorMessage().textContent;
    document.body.appendChild(nuevoDiv);
}


var scene = new THREE.Scene;
const renderer = new THREE.WebGLRenderer( {antialias: true} );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

//Create a PointLight and turn on shadows for the light
const light = new THREE.PointLight( 0xffffff, 1, 100 );
light.position.set( 0, 10, 4 );
light.castShadow = true; // default false
scene.add( light );

//Set up shadow properties for the light
light.shadow.mapSize.width = 512; // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.5; // default
light.shadow.camera.far = 500; // default

const mapUrl = "../textures/moon.gif";   // The file used as texture
const textureLoader = new THREE.TextureLoader( );  // The object used to load textures
const map = textureLoader.load( mapUrl );
const materialEsfera = new THREE.MeshPhongMaterial( { map: map } );

//Create a sphere that cast shadows (but does not receive them)
const sphereGeometry = new THREE.SphereGeometry( 5, 32, 32 );
const sphereMaterial = new THREE.MeshPhongMaterial( { map: map } );
const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
sphere.castShadow = true; //default is false
sphere.receiveShadow = false; //default
scene.add( sphere );

//Create a plane that receives shadows (but does not cast them)
const planeGeometry = new THREE.PlaneGeometry( 20, 20, 32, 32 );
const planeMaterial = new THREE.MeshPhongMaterial( { map: map } );
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.receiveShadow = true;
scene.add( plane );

//Create a helper for the shadow camera (optional)
const helper = new THREE.CameraHelper( light.shadow.camera );
scene.add( helper );

const camara = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 10, 400 );
camara.position.set( 0, 0, 400 );
scene.add(camara);

function renderizar(){
	renderer.render(scene, camara);
	requestAnimationFrame(renderizar);
}
renderizar();

