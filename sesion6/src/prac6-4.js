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

const camera = new THREE.PerspectiveCamera ( 65, window.innerWidth / window.innerHeight, 1, 4000 );
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
wall.position.set( 0, 0, 0 );
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


  
const constraints = {
  audio: false,
  video: { width: { exact: 640 }, height: { exact: 480 } }
};

navigator.mediaDevices.getUserMedia( constraints )
  // Called when we get the requested streams
  .then( ( stream ) => {

      // Video tracks (usually only one)
      const videoTracks = stream.getVideoTracks( );
      console.log( 'Stream characteristics: ', constraints );
      console.log( 'Using device: ' + videoTracks[0].label );

      // End of stream handler
      stream.onended = () => {

          console.log( 'End of stream' );
      };

      // Bind the stream to the html video element
      video.srcObject = stream;
})
  // Called in case of error
  .catch( ( error ) => {

      if ( error.name === 'ConstraintNotSatisfiedError' ) {

          console.error( 'The resolution ' + constraints.video.width.exact + 'x' +
                        constraints.video.width.exact + ' px is not supported by the camera.' );
      } else if ( error.name === 'PermissionDeniedError' ) {

          console.error( 'The user has not allowed the access to the camera and the microphone.' );
      }
      console.error( ' Error in getUserMedia: ' + error.name, error );
});

let streaming = false;
const width = 320;
let height = 0;  // Computed based on the width

video.addEventListener( 'canplay', ( event ) => {

  if ( !streaming ) {  // To prevent re-entry

      height = video.videoHeight / ( video.videoWidth / width );
      video.width = width;
      video.height = height;
      canvas.width = width;
      canvas.height = height;
      streaming = true;
  }
}, false );

const canvas = document.querySelector( 'canvas' );          // Select by element type

