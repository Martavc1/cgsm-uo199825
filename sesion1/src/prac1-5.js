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


var geometriaCubo = new THREE.BoxGeometry(70,50,100);
var geometriaCono = new THREE.ConeGeometry(40,40,80); 
 
const materialCubo = new THREE.MeshBasicMaterial({ color: 0xff0000});
const materialCono = new THREE.MeshBasicMaterial({ color: 0xff0000});
 

var cubo = new THREE.Mesh(geometriaCubo, materialCubo);
var cono = new THREE.Mesh(geometriaCono, materialCono); 


escena.add(cubo);
escena.add(cono); 

const camara = new THREE.PerspectiveCamera ( 55, window.innerWidth / window.innerHeight, 10, 400 );
camara.position.set( 0, 0, 400 );


cubo.position.x = 0;
cubo.position.y = 0;
cubo.position.z = 0;
cono.position.x = 0;
cono.position.y = 48;
cono.position.z = 0; 
escena.add(camara);



function renderizar(){
    renderer.render(escena, camara);
    requestAnimationFrame(renderizar);
}
renderizar();

