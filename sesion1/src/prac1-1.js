import * as THREE from 'three';
import WEBGL from 'three/examples/jsm/capabilities/WebGL.js';

const nuevoDiv = document.createElement('div');

if ( !WEBGL.isWebGL2Available() ) {    
    nuevoDiv.textContent = WEBGL.getWebGL2ErrorMessage().textContent;
}else{
    nuevoDiv.textContent = "Your graphics card support WebGL 2";
}

document.body.appendChild(nuevoDiv);