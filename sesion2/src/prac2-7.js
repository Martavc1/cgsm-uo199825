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


var geometriaEsfera = new THREE.SphereGeometry(50,50,100);

const mapUrl = "../textures/nube.gif";   // The file used as texture
const textureLoader = new THREE.TextureLoader( );  // The object used to load textures
const atmosphereMap = textureLoader.load( mapUrl );

var materialEsfera = new THREE.MeshLambertMaterial( { color: 0xFFFFFF, map: atmosphereMap, transparent: true } );

var esfera = new THREE.Mesh(geometriaEsfera, materialEsfera);
escena.add(esfera);

const camara = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 10, 400 );
camara.position.set( 10, 0, 400 );
escena.add(camara);

const light = new THREE.PointLight( 0xffffff, 10, 1000,0 );
light.position.set( 700, 100, 500 );

escena.add( light );





function renderizar(){
	renderer.render(escena, camara);
	requestAnimationFrame(renderizar);
}
renderizar();

