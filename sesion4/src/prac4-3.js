import * as THREE from 'three';
import WEBGL from 'three/examples/jsm/capabilities/WebGL.js'; 
import { GUI } from 'dat.gui';
import Stats from 'three/examples/jsm/libs/stats.module';

if ( !WEBGL.isWebGL2Available() ) {
    const nuevoDiv = document.createElement('div');
    
    nuevoDiv.textContent = WEBGL.getWebGL2ErrorMessage().textContent;
    document.body.appendChild(nuevoDiv);
}

const textureLoader = new THREE.TextureLoader( );  
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1.1, 4000);


const stats = new Stats( );
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';
document.body.appendChild( stats.domElement );
    
const renderer = new THREE.WebGLRenderer( {antialias: true} );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const mapUrlBrick = "../textures/brick.jpg";   // The file used as texture 
const mapBrick = textureLoader.load( mapUrlBrick );
const materialBrick = new THREE.MeshPhongMaterial( { map: mapBrick } );

const geometry = new THREE.BoxGeometry( 10, 10, 10 );
    
const box1 = new THREE.Mesh( geometry, materialBrick );
box1.rotation.y = 0.5;
box1.position.x = -12;
box1.position.y = -4;
//box1.position.set( -50, 10, 50 );
scene.add(box1);

var box2 = createMesh(geometry, mapBrick);
box2.rotation.y = 0.5;
box2.position.x = 12;
box2.position.y = -4;
scene.add(box2);  

camera.position.x = 0;
camera.position.y = 15;
camera.position.z = 28;
camera.lookAt(new THREE.Vector3(0, 0, 0));

const light = new THREE.PointLight( 0xffffff, 3, 1000,0 );
light.position.set( 0, 100, 50 );
scene.add(light);

var controls = new function () {
    this.bumpScale = 0.5;

    this.updateBump = function (e) {              
        box2.material.bumpScale = e; 
    }
};

var gui = new GUI( );
gui.add(controls, "bumpScale", -4, 4).onChange(controls.updateBump); 
 
render();

function createMesh(geom, mapBrick) { 

    //var texturem = "../textures/brick.jpg";
    //const texture = textureLoader.load( mapUrlBrick );
    
    var mat = new THREE.MeshPhongMaterial();
    mat.map = mapBrick;

    var texturem = "../textures/brick-map.jpg";           
    const bump = textureLoader.load( texturem );
    mat.bumpMap = bump;
        
    var mesh = new THREE.Mesh(geom, mat);
    return mesh;
}

function render() { 
    box1.rotation.y += 0.001;
    box2.rotation.y -= 0.001;
	stats.update( );
        
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
