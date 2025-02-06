import * as THREE from 'three';
import WEBGL from 'three/examples/jsm/capabilities/WebGL.js'; 

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

const geometry = new THREE.BoxGeometry( 60, 60, 60 );
 
// The file used as texture
const textureLoader = new THREE.TextureLoader( );  // The object used to load textures
/*const mapUrlBrick = ".../textures/brick.jpg"; 
const mapUrlBrickMap = ".../textures/brick-map.jpg"; 
const material = new THREE.MeshPhongMaterial(
  {
      map: textureLoader.load( "../textures/brick.jpg" ),
      bumpMap: textureLoader.load( "../textures/brick-map.jpg" )
  } );*/

/*
 
const mapBrick = textureLoader.load( mapUrlBrick );
const mapBrickMap = textureLoader.load( mapUrlBrickMap );
const materialBrickMap = new THREE.MeshPhongMaterial( { map: mapBrickMap } );
const materialBrick = new THREE.MeshPhongMaterial( { map: mapBrick } );


const light = new THREE.PointLight( 0xffffff, 10, 1000,0 );
light.position.set( 20, 100, 500 );

scene.add( light );

const material = new THREE.MeshPhongMaterial(
  {
      map: textureLoader.load( "../textures/brick.jpg" ),
      bumpMap: textureLoader.load( "../textures/brick-map.jpg" )
  } );*/

/*
  
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
*/
const mapUrlBrick = "../textures/brick.jpg";   // The file used as texture 
const mapBrick = textureLoader.load( mapUrlBrick );
const materialBrick = new THREE.MeshPhongMaterial( { map: mapBrick } );

const mapUrlBrickMap = "../textures/brick-map.jpg";   // The file used as texture 
const mapBrickMap = textureLoader.load( mapUrlBrickMap );
const materialBrickMap = new THREE.MeshPhongMaterial( { map: mapBrickMap } );

const box1 = new THREE.Mesh( geometry, materialBrick );
const box2 = new THREE.Mesh( geometry, materialBrickMap );

box1.rotation.set( Math.PI / 5, Math.PI / 5, 0 );
box1.position.set( -50, 10, 50 );
scene.add( box1 );

box2.rotation.set( Math.PI / 5, Math.PI / 5, 0 );
box2.position.set( 50, 10, 50 );
scene.add( box2 );
const light = new THREE.PointLight( 0xffffff, 10, 1000,0 );
light.position.set( 20, 100, 500 );
scene.add( light );

renderer.render( scene, camera );

  function render(time) {
    box1.rotation.y -= Math.PI * 0.5 / 180; 
    box2.rotation.y += Math.PI * 0.5 / 180; 
    
    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
