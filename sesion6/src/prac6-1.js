import WEBGL from 'three/examples/jsm/capabilities/WebGL.js'; 
import adapter from 'webrtc-adapter';


if ( !WEBGL.isWebGL2Available() ) {
    const nuevoDiv = document.createElement('div');
    nuevoDiv.textContent = WEBGL.getWebGL2ErrorMessage().textContent;
    document.body.appendChild(nuevoDiv);
}

const video = document.querySelector( 'video' );
const constraints = {
    audio: false,
    video: { width: { exact: 640 }, height: { exact: 480 } }
};

navigator.mediaDevices.getUserMedia( constraints )
    .then( ( stream ) => {

        const videoTracks = stream.getVideoTracks( );
        console.log( 'Stream characteristics: ', constraints );
        console.log( 'Using device: ' + videoTracks[0].label );

        stream.onended = () => {

            console.log( 'End of stream' );
        };

        video.srcObject = stream;
})

    .catch( ( error ) => {

        if ( error.name === 'ConstraintNotSatisfiedError' ) {

            console.error( 'The resolution ' + constraints.video.width.exact + 'x' +
                          constraints.video.width.exact + ' px is not supported by the camera.' );
        } else if ( error.name === 'PermissionDeniedError' ) {

            console.error( 'The user has not allowed the access to the camera and the microphone.' );
        }
        console.error( ' Error in getUserMedia: ' + error.name, error );
});

 