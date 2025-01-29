import * as THREE from 'three';
import WEBGL from 'three/examples/jsm/capabilities/WebGL.js';

/*if ( WEBGL.isWebGL2Available() ) {
	const nuevoDiv = document.createElement('div');
	
	nuevoDiv.textContent = WEBGL.getWebGL2ErrorMessage().textContent;
	document.body.appendChild(nuevoDiv);
}*/

var escena = new THREE.Scene;
const renderer = new THREE.WebGLRenderer( {antialias: true} );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


var geometriaCubo = new THREE.BoxGeometry(50,50,100);
var geometriaCilindro = new THREE.CylinderGeometry(40,40,60);
var geometriaEsfera = new THREE.SphereGeometry(50,50,100);

const materialEsfera = new THREE.MeshBasicMaterial({ color: 0x179740} );
const materialCubo = new THREE.MeshBasicMaterial({ color: 0xff0000});
const materialCilindro = new THREE.MeshBasicMaterial({ color: 0x0000ff});
 

var cubo = new THREE.Mesh(geometriaCubo, materialCubo);
var cilindro = new THREE.Mesh(geometriaCilindro, materialCilindro);
var esfera = new THREE.Mesh(geometriaEsfera, materialEsfera);


escena.add(cubo);
escena.add(cilindro);
escena.add(esfera);

const camara = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 10, 400 );
camara.position.set( 0, 0, 400 );


cubo.position.x = -200;
cubo.position.y = 0;
cubo.position.z = 0;
cilindro.position.x = 0;
cilindro.position.y = -0;
cilindro.position.z = 0;
esfera.position.x = 200;
escena.add(camara);



function renderizar(){


	
	renderer.render(escena, camara);
	requestAnimationFrame(renderizar);
}
renderizar();

