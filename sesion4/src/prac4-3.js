import * as THREE from 'three';
import WEBGL from 'three/examples/jsm/capabilities/WebGL.js';
import { GUI } from 'dat.gui';
 
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';


if ( !WEBGL.isWebGL2Available() ) {
    const nuevoDiv = document.createElement('div');
    nuevoDiv.textContent = WEBGL.getWebGL2ErrorMessage().textContent;
    document.body.appendChild(nuevoDiv);
}

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 1.1, 4000);
 
const renderer = new THREE.WebGLRenderer( {antialias: true} );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const textureLoader = new THREE.TextureLoader( );  
 
const helper = new THREE.GridHelper( 800, 40, 0x444444, 0x444444 );
helper.position.y = 0.1;
scene.add(helper); 
 
const mapUrltexturaBasica = "../textures/texturaBasica.png";   // The file used as texture 
const maptexturaBasica = textureLoader.load( mapUrltexturaBasica ); 
const specialFaceMaterial = new THREE.MeshPhongMaterial( { map: maptexturaBasica } );

const mapUrlBrick = "../textures/brick.jpg";   // The file used as texture 
const mapBrick = textureLoader.load( mapUrlBrick ); 
const regularFaceMaterial = new THREE.MeshPhongMaterial( { map: mapBrick } );

const mapUrlPlay = "../textures/sonidoActivado.png";   // The file used as texture 
const mapPlay = textureLoader.load( mapUrlPlay ); 
const playFaceMaterial = new THREE.MeshPhongMaterial( { map: mapPlay } );

const materialsBox1 = [
    playFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
];

const geometry = new THREE.BoxGeometry( 10, 10, 10 );
    
const box1 = new THREE.Mesh( geometry, materialsBox1 );
box1.position.x = -140;
box1.name = "box1";

const listener = new THREE.AudioListener();
camera.add( listener );

const audioLoader = new THREE.AudioLoader();
const sound = new THREE.PositionalAudio( listener );
audioLoader.load( '../audio/BadCatMaste.ogg', ( buffer ) => {
    sound.setBuffer( buffer );
    sound.setRefDistance( 20 );
    sound.setLoop( true );
    sound.setRolloffFactor( 1 );
    sound.play(); // Modern browsers do not allow sound to start without user interaction
});
box1.add( sound );
  //box1.position.set( -50, 10, 50 );
scene.add(box1);

/*const mapUrltexturaMapa = "../textures/mapaTopo.png";  
const maptexturaMapa = textureLoader.load( mapUrltexturaMapa );  

const mapUrlBrickMap = "../textures/brick-map.jpg";    
const mapBrickMap = textureLoader.load( mapUrlBrickMap ); */

var box2 = createMeshBox2( mapBrick, maptexturaBasica);
box2.name = 'box2';
//const box2 = new THREE.Mesh( geometry, materialsBox2 );
box2.position.x = 140;

const listenerDog = new THREE.AudioListener();
camera.add( listenerDog );

const audioLoaderDog = new THREE.AudioLoader();
const soundDog = new THREE.PositionalAudio( listenerDog );

 
audioLoaderDog.load( '../audio/dog.ogg', ( buffer ) => {
    soundDog.setBuffer( buffer );
    soundDog.setRefDistance( 20 );
    soundDog.setLoop( true );
    soundDog.setRolloffFactor( 1 );
    soundDog.play(); // Modern browsers do not allow sound to start without user interaction
});
box2.add( soundDog );
scene.add(box2); 

camera.position.x = 0;
camera.position.y = 15;
camera.position.z = 28;
//camera.lookAt(new THREE.Vector3(0, 0, 0));


const light = new THREE.PointLight( 0xffffff, 3.5, 1000,0 );
light.position.set( 0, 500, 0 );
scene.add(light);

/*
const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xf0f0f0,1);
hemiLight.position.set( 0, 500, 0 );
scene.add( hemiLight );*/

const controls2 = new FirstPersonControls( camera, renderer.domElement );
controls2.movementSpeed = 70;
controls2.lookSpeed = 0.05;
controls2.noFly = false;
controls2.lookVertical = false;

var controls = new function () {
    this.bumpScale = 0.5;
    
    this.updateBump = function (e) {       
        box2.material[0].bumpScale = e; 
        box2.material[1].bumpScale = e; 
        box2.material[2].bumpScale = e; 
        box2.material[3].bumpScale = e; 
        box2.material[4].bumpScale = e; 
        box2.material[5].bumpScale = e; 
    
    }
};

var gui = new GUI( );
gui.add(controls, "bumpScale", -4, 4).onChange(controls.updateBump); 



const rayCaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let intersectedObject = null;

document.body.addEventListener( 'mousemove', ( event ) => {
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}, false );


function createMeshBox2( mapBrick,  maptexturaBasica) { 

    const matCaraDiferente = new THREE.MeshPhongMaterial( { map: maptexturaBasica } );



    const mapUrlPlay = "../textures/sonidoActivado.png";   // The file used as texture 
const mapPlay = textureLoader.load( mapUrlPlay ); 
const playFaceMaterial = new THREE.MeshPhongMaterial( { map: mapPlay } );
    
    const mat = new THREE.MeshPhongMaterial( { map: mapBrick } );

    var texturem = "../textures/brick-map.jpg";           
    const bump = textureLoader.load( texturem );

    //mat.bumpScale = 0.2; 
    var texturem2 = "../textures/mapaTopo.png";           
    const bump2 = textureLoader.load( texturem2 );

    const materialsBox2 = [
        mat,
        playFaceMaterial,
        mat,
        mat,
        mat,
        mat,
    ];
            
    mat.bumpMap = bump;
    matCaraDiferente.bumpMap = bump2;

    var mesh = new THREE.Mesh( geometry, materialsBox2 );
    return mesh;
}
 
const clock = new THREE.Clock( );

render();

function render() { 
        
    requestAnimationFrame(render);
    renderer.render(scene, camera);

    const delta = clock.getDelta();
    controls2.update( delta );


    rayCaster.setFromCamera( mouse, camera );

// Look for all the intersected objects
const intersects = rayCaster.intersectObjects( scene.children );
if ( intersects.length > 0 ) {

    // Sorted by Z (close to the camera)
    if ( intersectedObject != intersects[ 0 ].object ) {

        intersectedObject = intersects[ 0 ].object;
        console.log( 'New intersected object: ' + intersectedObject.name );
    }
} else {

    intersectedObject = null;
}
}


document.body.addEventListener( 'keydown', ( event ) => {

    // Space key code
    const spaceKeyCode = 32;

    // Space pressed and intersected object
    if ( event.keyCode === spaceKeyCode && intersectedObject ) {

        // TODO:
        const mapUrlPlay = "../textures/sonidoActivado.png";   // The file used as texture 
        const mapPlay = textureLoader.load( mapUrlPlay ); 
        const playFaceMaterial = new THREE.MeshPhongMaterial( { map: mapPlay } ); 

        const mapUrlNoPlay = "../textures/sonidoDesactivado.png";   // The file used as texture 
        const mapNoPlay = textureLoader.load( mapUrlNoPlay ); 
        const noPlayFaceMaterial = new THREE.MeshPhongMaterial( { map: mapNoPlay } ); 

        if(intersectedObject.name === 'box1'){
            if ( sound.isPlaying === true ){
                sound.pause();
                box1.material[ 0 ] = noPlayFaceMaterial;
                box1.material.needsUpdate = true;
                }
            else{
                box1.material[ 0 ] = playFaceMaterial;
                box1.material.needsUpdate = true;
                sound.play();
            }
                
        }else if(intersectedObject.name === 'box2'){
            if ( soundDog.isPlaying === true ){
                soundDog.pause();
                box2.material[ 1 ] = noPlayFaceMaterial;
                box2.material.needsUpdate = true;
            }
            else{
                soundDog.play();
                box2.material[ 1 ] = playFaceMaterial;
                box2.material.needsUpdate = true;
            }
                
        }
   
    }
}, false );