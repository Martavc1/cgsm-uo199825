
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


var geometriaTierra = new THREE.SphereGeometry(30,30,60);

const mapUrl = "../textures/moon.gif";   // The file used as texture
const textureLoader = new THREE.TextureLoader( );  // The object used to load textures
const map = textureLoader.load( mapUrl );
const materialTierra = new THREE.MeshPhongMaterial( { map: map } );


var tierra = new THREE.Mesh(geometriaTierra, materialTierra);
escena.add(tierra);


var geometriaAtmosfera = new THREE.SphereGeometry(150,150,150);

const mapUrlAtmosfera = "../textures/nube.gif";   // The file used as texture
const textureLoaderAtmosfera = new THREE.TextureLoader( );  // The object used to load textures
const atmosphereMap = textureLoaderAtmosfera.load( mapUrlAtmosfera );

var materialAtmosfera = new THREE.MeshLambertMaterial( { color: 0xFFFFFF, map: atmosphereMap, transparent: true } );

var atmostera = new THREE.Mesh(geometriaAtmosfera, materialAtmosfera);
escena.add(atmostera);


const camara = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 10, 400 );
camara.position.set( 10, 0, 400 );
escena.add(camara);

const light = new THREE.PointLight( 0xffffff, 10, 1000,0 );
light.position.set( 20, 100, 500 );

escena.add( light );


function renderizar(){
	renderer.render(escena, camara);
	requestAnimationFrame(renderizar);
}
renderizar();

