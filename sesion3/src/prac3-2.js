import * as THREE from 'three';
import WEBGL from 'three/examples/jsm/capabilities/WebGL.js';

if ( !WEBGL.isWebGL2Available() ) {
    const nuevoDiv = document.createElement('div');
    
    nuevoDiv.textContent = WEBGL.getWebGL2ErrorMessage().textContent;
    document.body.appendChild(nuevoDiv);
}


const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer( {antialias: true} );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 4000 );
camera.position.set( 0, 0, 300 );

const video = document.getElementById( 'video' );

const image = document.createElement( 'canvas' );
image.width = 480;  // Video width
image.height = 204; // Video height
const imageContext = image.getContext( '2d' );

 
imageContext.fillStyle = '#000000';
imageContext.fillRect( 0, 0, image.width - 1, image.height - 1 );
const texture = new THREE.Texture( image );


const material = new THREE.MeshBasicMaterial( { map: texture } );
const wall = new THREE.Mesh( new THREE.PlaneGeometry( image.width, image.height, 4, 4 ), material );
wall.position.set( -50, 10, 50 );
imageContext.drawImage( video, 0, 0 );



const light = new THREE.PointLight( 0xffffff, 100, 1000,0 );
light.position.set( 20, 100, 500 );

scene.add( light );
scene.add(wall); 

const light2 = new THREE.PointLight( 0xffffff, 20, 50,0 );
const geometry = new THREE.BoxGeometry( 60, 60, 60 );
light2.position.set( 10, 10, 40 );


renderer.render( scene, camera );

  function render() {
 
    
    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  
  requestAnimationFrame(render);

  function animate() {
    //requestAnimationFrame(animate)

    if ( video.readyState === video.HAVE_ENOUGH_DATA ) {
 
		imageContext.drawImage( video, 0, 0 );
		if ( texture ) 
			texture.needsUpdate = true;
	}

    render()

}

animate()