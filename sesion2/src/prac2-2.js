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


const mapUrl = "../textures/moon.gif";   // The file used as texture
const textureLoader = new THREE.TextureLoader( );  // The object used to load textures
const map = textureLoader.load( mapUrl );
const materialEsfera = new THREE.MeshPhongMaterial( { map: map } );


var esfera = new THREE.Mesh(geometriaEsfera, materialEsfera);
escena.add(esfera);

const camara = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 10, 400 );
camara.position.set( 0, 0, 400 );
escena.add(camara);

const light = new THREE.PointLight( 0xffffff, 10, 1000,0 );
light.position.set( 700, 5, 50 );

escena.add( light );





function renderizar(){
	renderer.render(escena, camara);
	requestAnimationFrame(renderizar);
}
renderizar();

