
import * as THREE from 'three';
import WEBGL from 'three/examples/jsm/capabilities/WebGL.js';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js';


if ( !WEBGL.isWebGL2Available() ) {
    const nuevoDiv = document.createElement('div');
    
    nuevoDiv.textContent = WEBGL.getWebGL2ErrorMessage().textContent;
    document.body.appendChild(nuevoDiv);
}

var escena = new THREE.Scene;
const renderer = new THREE.WebGLRenderer( {antialias: true} );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camara = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 10, 400 );
camara.position.set( 10, 0, 400 );
escena.add(camara);



var geometriaAtmosfera = new THREE.SphereGeometry(50,50,80);

const mapUrlAtmosfera = "../textures/nube.gif";   // The file used as texture
const textureLoaderAtmosfera = new THREE.TextureLoader( );  // The object used to load textures
const atmosphereMap = textureLoaderAtmosfera.load( mapUrlAtmosfera );

var materialAtmosfera = new THREE.MeshLambertMaterial( { color: 0xFFFFFF, map: atmosphereMap, transparent: true } );

var atmostera = new THREE.Mesh(geometriaAtmosfera, materialAtmosfera);
escena.add(atmostera);

// Tierra
var geometriaTierra = new THREE.SphereGeometry(30,30,60);
const mapUrl = "../textures/moon.gif";   // The file used as texture
const textureLoader = new THREE.TextureLoader( );  // The object used to load textures
const map = textureLoader.load( mapUrl );
const materialTierra = new THREE.MeshPhongMaterial( { map: map } );
var tierra = new THREE.Mesh(geometriaTierra, materialTierra);
escena.add(tierra);


// Sol

var geometriaSol = new THREE.SphereGeometry(60,80,100);

// Shaders

const NOISEMAP = '../textures/cloud.png';
const SUNMAP = '../textures/lavatile.jpg';
const uniforms = {
    "fogDensity": { value: 0 },
    "fogColor": { value: new THREE.Vector3( 0, 0, 0 ) },
    "time": { value: 1.0 },
    "uvScale": { value: new THREE.Vector2( 3.0, 1.0 ) },
    "texture1": { value: textureLoader.load( NOISEMAP ) },
    "texture2": { value: textureLoader.load( SUNMAP ) }
};

uniforms[ "texture1" ].value.wrapS = uniforms[ "texture1" ].value.wrapT = THREE.RepeatWrapping;
uniforms[ "texture2" ].value.wrapS = uniforms[ "texture2" ].value.wrapT = THREE.RepeatWrapping;
 

const vertexShader = require( '../shaders/vertex.glsl' );
const fragmentShader = require( '../shaders/fragment.glsl' );

const material = new THREE.ShaderMaterial( {
    uniforms,
    vertexShader,
    fragmentShader
} );
 

var sol = new THREE.Mesh(geometriaSol, material);
sol.position.set( 90, 100, 5 );
escena.add(sol);
 
// Moon
const moonMapUrlMoon = '../textures/moon_1024.jpg';
const moonMap = textureLoader.load( moonMapUrlMoon, ( loaded ) => { renderer.render( escena, camara ); } );
const materialMoon = new THREE.MeshLambertMaterial( { map: moonMap, color: 0x888888 } );

//... TODO: create the Moon and compute the distance to the Earth
var geometriaMoon = new THREE.SphereGeometry(8,8,8);
var moon = new THREE.Mesh(geometriaMoon, materialMoon);

moon.position.set( 100, 0, -10 );
escena.add(moon);

const moonTierraGroup = new THREE.Object3D( );
moonTierraGroup.add(tierra);
moonTierraGroup.add(moon);
escena.add(moonTierraGroup);
moonTierraGroup.rotation.y += 0.0089;   
 
const light = new THREE.PointLight( 0xffffff, 10, 1000,0 );
light.position.set( 20, 100, 500 );

escena.add( light );


const clock = new THREE.Clock( );
animate( );



const modelUrl = "../models/iss.dae";
let iss;


const loadingManager = new THREE.LoadingManager( ( ) => {

    escena.add( iss ); 
    console.log( 'Model loaded' );
} );


const loader = new ColladaLoader( loadingManager );
loader.load( modelUrl, ( collada ) => {
    iss = collada.scene;   
    iss.scale.x = iss.scale.y = iss.scale.z = 0.3;
    iss.rotation.set( Math.PI / 5, Math.PI / 5, 0 );
    iss.position.set(-50,40,10); 
 
    iss.updateMatrix( );
    escena.add( iss ); 
    render();
} );



const light2 = new THREE.PointLight( 0xffffff, 20, 50,0 );
light2.position.set( 10, 10, 40 );

escena.add( light );

function render() {
 
    //moonGroup.rotation.x += 0.089;  
    moonTierraGroup.rotation.y += 0.0089;  
 
    renderer.render(escena, camara);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

 
  function animate( ) {

    const delta = clock.getDelta( ); // Elapsed time in seconds

    uniforms["time"].value += 0.2 * delta;

    // UPDATE THE SCENE ACCORDING TO THE ELAPSED TIME
    const rotationAtmosfera = ( delta * Math.PI * 2 ) / 24;
	const rotationMoon = ( delta * Math.PI * 2 ) / 24;
    tierra.rotation.y += rotationAtmosfera;
    atmostera.rotation.y += rotationAtmosfera * 0.07;
	moon.rotation.y += rotationMoon * 0.07;

    // Render the scene
    renderer.render( escena, camara );

    // Request the browser to execute the animation-rendering loop
    requestAnimationFrame( animate );
};