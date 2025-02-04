import * as THREE from 'three';
import WEBGL from 'three/examples/jsm/capabilities/WebGL.js';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js';

if ( !WEBGL.isWebGL2Available() ) {
    const nuevoDiv = document.createElement('div');
    
    nuevoDiv.textContent = WEBGL.getWebGL2ErrorMessage().textContent;
    document.body.appendChild(nuevoDiv);
}


const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer( {antialias: true} );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 4000 );
camera.position.set( 0, 0, 300 );

const modelUrl = "../models/iss.dae";
let iss;

const geometry = new THREE.BoxGeometry( 100, 100, 100 );
 
const mapUrl = "../textures/crate.gif";   // The file used as texture
const textureLoader = new THREE.TextureLoader( );  // The object used to load textures
const map = textureLoader.load( mapUrl );
const material = new THREE.MeshBasicMaterial( { map: map } );

const box = new THREE.Mesh( geometry, material );
scene.add(box);


const loadingManager = new THREE.LoadingManager( ( ) => {

    scene.add( iss ); 
    console.log( 'Model loaded' );
} );


const loader = new ColladaLoader( loadingManager );
loader.load( modelUrl, ( collada ) => {
    iss = collada.scene;   
    box.scale.x = iss.scale.y = iss.scale.z = 0.3;
    iss.rotation.set( Math.PI / 5, Math.PI / 5, 0 );
    box.position.set(-100,-20,10); 
 
    iss.updateMatrix( );
    scene.add( iss ); 
} );


function render() {
  
    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

