import WEBGL from 'three/examples/jsm/capabilities/WebGL.js'; 
import adapter from 'webrtc-adapter';

if ( !WEBGL.isWebGL2Available() ) {
    const nuevoDiv = document.createElement('div');
    nuevoDiv.textContent = WEBGL.getWebGL2ErrorMessage().textContent;
    document.body.appendChild(nuevoDiv);
}


const constraints = {
    audio: false,
    video: { width: { exact: 640 }, height: { exact: 480 } }
};


let streaming = false;
const width = 320;
let height = 0;  

const canvas = document.querySelector( 'canvas' );          

let localStream,            
    localPeerConnection,    
    remotePeerConnection;  
const offerOptions = {       
    offerToReceiveAudio: true,
    offerToReceiveVideo: true
};

const localVideo = document.getElementById( 'localVideo' );
const remoteVideo = document.getElementById( 'remoteVideo' );
const startButton = document.getElementById( 'startButton' );
const callButton = document.getElementById( 'callButton' );
const hangupButton = document.getElementById( 'hangupButton' );

// Initial state of the buttons
startButton.disabled = false;
callButton.disabled = true;
hangupButton.disabled = true;

// Call handlers
startButton.onclick = start;
callButton.onclick = call;
hangupButton.onclick = hangup;


function start( ) {
    
navigator.mediaDevices.getUserMedia( constraints )
.then( ( stream ) => {

    const videoTracks = stream.getVideoTracks( );
    console.log( 'Stream characteristics: ', constraints );
    console.log( 'Using device: ' + videoTracks[0].label );

    stream.onended = () => {

        console.log( 'End of stream' );
    };

    localVideo.srcObject = stream;
})
.catch( ( error ) => {

    if ( error.name === 'ConstraintNotSatisfiedError' ) {

        console.error( 'The resolution ' + constraints.localVideo.width.exact + 'x' +
                      constraints.localVideo.width.exact + ' px is not supported by the camera.' );
    } else if ( error.name === 'PermissionDeniedError' ) {

        console.error( 'The user has not allowed the access to the camera and the microphone.' );
    }
    console.error( ' Error in getUserMedia: ' + error.name, error );
});

    localVideo.addEventListener( 'canplay', ( event ) => {

        if ( !streaming ) {  
    
            height = localVideo.videoHeight / ( localVideo.videoWidth / width );
            localVideo.width = width;
            localVideo.height = height;
            canvas.width = width;
            canvas.height = height;
            streaming = true;
        }
    }, false );

    startButton.disabled = true;
    callButton.disabled = false;




    navigator.mediaDevices.getUserMedia( constraints )
    .then( ( stream ) => {

        const videoTracks = stream.getVideoTracks( );
        console.log( 'Stream characteristics: ', constraints );
        console.log( 'Using device: ' + videoTracks[0].label );

        stream.onended = () => {

            console.log( 'End of stream' );
        };

        localVideo.srcObject = stream;
        localStream = stream;
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

  }

  function call( ) {

    const servers = null;

    localPeerConnection = new RTCPeerConnection( servers );
    localPeerConnection.onicecandidate = gotLocalIceCandidate;

    remotePeerConnection = new RTCPeerConnection( servers );
    remotePeerConnection.onicecandidate = gotRemoteIceCandidate;
    remotePeerConnection.ontrack = gotRemoteTrack;

    localStream.getTracks().forEach( track => localPeerConnection.addTrack( track, localStream ) );

    localPeerConnection.createOffer( offerOptions ).then( gotLocalDescription );

    hangupButton.disabled = false;
    callButton.disabled = true;
  }

  function gotLocalIceCandidate( event ){

    if (event.candidate) {
        remotePeerConnection.addIceCandidate( new RTCIceCandidate( event.candidate ) );
    }
}

function gotLocalDescription( description ){

    localPeerConnection.setLocalDescription( description );
    remotePeerConnection.setRemoteDescription( description );
    remotePeerConnection.createAnswer( ).then( gotRemoteDescription );
}

function gotRemoteDescription( description ){
    remotePeerConnection.setLocalDescription( description );
    localPeerConnection.setRemoteDescription( description );
}

function gotRemoteIceCandidate( event ){

    if (event.candidate) {
        localPeerConnection.addIceCandidate( new RTCIceCandidate( event.candidate ) );
    }
}

  function gotRemoteTrack( event ){

    remoteVideo.srcObject = event.streams[0];
}
  
  function hangup( ) {
   
    remotePeerConnection.createOffer( offerOptions ).then( gotLocalDescription );
    remotePeerConnection.close(); 

    startButton.disabled = true;
    callButton.disabled = false;
    hangupButton.disabled = true;
  }
  