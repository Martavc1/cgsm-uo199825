
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



var geometriaAtmosfera = new THREE.SphereGeometry(120,120,150);

const mapUrlAtmosfera = "../textures/nube.gif";   // The file used as texture
const textureLoaderAtmosfera = new THREE.TextureLoader( );  // The object used to load textures
const atmosphereMap = textureLoaderAtmosfera.load( mapUrlAtmosfera );

var materialAtmosfera = new THREE.MeshLambertMaterial( { color: 0xFFFFFF, map: atmosphereMap, transparent: true } );

var atmostera = new THREE.Mesh(geometriaAtmosfera, materialAtmosfera);
escena.add(atmostera);

// Tierra
var geometriaTierra = new THREE.SphereGeometry(50,50,100);
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
var geometriaMoon = new THREE.SphereGeometry(10,10,10);
var moon = new THREE.Mesh(geometriaMoon, materialMoon);

moon.position.set( 100, 0, -10 );
escena.add(moon);

const moonTierraGroup = new THREE.Object3D( );
moonTierraGroup.add(tierra);
moonTierraGroup.add(moon);
escena.add(moonTierraGroup);
moonTierraGroup.rotation.y += 0.0089;   
const clock = new THREE.Clock( );
const delta = clock.getDelta( ); // Elapsed time in seconds

// UPDATE THE SCENE ACCORDING TO THE ELAPSED TIME

const rotation = ( delta * Math.PI * 2 ) / 24;
tierra.rotation.y += rotation* 4.95;;
atmostera.rotation.y += rotation * 4.95;



// Move the Moon away from the coordinate origin (the Earth)
// NOT TO SCALE. Real value: Math.sqrt( distance * distance / 2 )
//moon.position.set( Math.sqrt( distance / 2 ), 0, -Math.sqrt( distance / 2 ) );

// Rotate the Moon to face visible side to the Earth (tidal locking)


// Moon should rotate around the Earth: an Object3D is needed
/*const moonGroup = new THREE.Object3D( );


// The Moon orbit is a bit tilted
moonGroup.rotation.x = 0.089;


moonGroup.add(moon);
escena.add(moonGroup);*/

const light = new THREE.PointLight( 0xffffff, 10, 1000,0 );
light.position.set( 20, 100, 500 );

escena.add( light );


animate( );



function render(time) {
 
    //moonGroup.rotation.x += 0.089;  
    moonTierraGroup.rotation.y += 0.0089;  
 
    renderer.render(escena, camara);
	animate( );

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  
  function animate( ) {

	const clock = new THREE.Clock( );
    const delta = clock.getDelta( ); // Elapsed time in seconds

    // UPDATE THE SCENE ACCORDING TO THE ELAPSED TIME

	const rotation = ( delta * Math.PI * 2 ) / 24;
    tierra.rotation.y += rotation * 4.95;
    atmostera.rotation.y += rotation * 4.95;

    // Render the scene
    renderer.render( escena, camara );

    // Request the browser to execute the animation-rendering loop
    requestAnimationFrame( animate );
};