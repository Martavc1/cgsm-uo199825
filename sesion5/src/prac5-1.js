import * as THREE from 'three';
import WEBGL from 'three/examples/jsm/capabilities/WebGL.js'; 
import dashjs  from './dash.all.min.js';


if ( !WEBGL.isWebGL2Available() ) {
    const nuevoDiv = document.createElement('div');
    nuevoDiv.textContent = WEBGL.getWebGL2ErrorMessage().textContent;
    document.body.appendChild(nuevoDiv);
}
const url = "../counter.mpd";
const player = dashjs.MediaPlayer().create();
player.initialize(document.querySelector("#player"), url, true); 