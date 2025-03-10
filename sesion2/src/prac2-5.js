
import * as THREE from 'three';
import WEBGL from 'three/examples/jsm/capabilities/WebGL.js';

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
var geometriaTierra = new THREE.SphereGeometry (30,30,60);
const mapUrl = "../textures/moon.gif";   // The file used as texture
const textureLoader = new THREE.TextureLoader( );  // The object used to load textures
const map = textureLoader.load( mapUrl );
const materialTierra = new THREE.MeshPhongMaterial( { map: map } );
var tierra = new THREE.Mesh(geometriaTierra, materialTierra);
escena.add(tierra);

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

function render(time) {
    //moonGroup.rotation.x += 0.089;  
    moonTierraGroup.rotation.y += 0.0089;  
    renderer.render(escena, camara);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);