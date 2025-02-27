import * as THREE from 'three';
import WEBGL from 'three/examples/jsm/capabilities/WebGL.js';
import dashjs  from './dash.all.min.js';

if ( !WEBGL.isWebGL2Available() ) {
    const nuevoDiv = document.createElement('div');
    nuevoDiv.textContent = WEBGL.getWebGL2ErrorMessage().textContent;
    document.body.appendChild(nuevoDiv);
}

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer( {antialias: true} );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera ( 65, window.innerWidth / window.innerHeight, 1, 4000 );
camera.position.set( 0, 0, 300 );

const video = document.getElementById( 'video' );


const url = "../counter.mpd";
const player = dashjs.MediaPlayer().create();
player.initialize(video, url, true); 

const image = document.createElement( 'canvas' );
image.width = 480;  // Video width
image.height = 204; // Video height
const imageContext = image.getContext( '2d' );
imageContext.fillStyle = '#000000';
imageContext.fillRect( 0, 0, image.width - 1, image.height - 1 );
const texture = new THREE.Texture( image );


const material = new THREE.MeshBasicMaterial( { map: texture } );
const wall = new THREE.Mesh( new THREE.PlaneGeometry( image.width, image.height, 4, 4 ), material );
wall.position.set( 10, 50, 0 );
wall.rotation.set( Math.PI / 5, Math.PI / 5, 0 );

//const light = new THREE.PointLight( 0xffffff, 10, 1000,0 );
//light.position.set( 20, 100, 500 );
//scene.add( light );

scene.add(wall); 


renderer.render( scene, camera );

  function render(time) {
    wall.rotation.y -= Math.PI * 0.5 / 180;   
    //wall.rotation.x -= Math.PI * 0.5 / 180;  
    renderer.render(scene, camera);

	if ( video.readyState === video.HAVE_ENOUGH_DATA ) {

		imageContext.drawImage( video, 0, 0 );
		if ( texture ) texture.needsUpdate = true;
	}

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

