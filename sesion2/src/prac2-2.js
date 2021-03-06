import * as THREE from 'three';

import { WEBGL } from 'three/examples/jsm/WebGL.js';

const scene = new THREE.Scene();

const renderer = WEBGL.isWebGLAvailable() ? new THREE.WebGLRenderer( {antialias: true} ) : new THREE.CanvasRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 4000 );
camera.position.set( 0, 0, 30 );

const mapUrl = "../textures/tex2-2.gif";   // The file used as texture
const textureLoader = new THREE.TextureLoader( );  // The object used to load textures
const map = textureLoader.load( mapUrl,( loaded ) => { renderer.render( scene, camera ); } );
const material = new THREE.MeshPhongMaterial( { map: map } );


const geometry = new THREE.SphereGeometry( 5, 32, 32 );
const sphere = new THREE.Mesh( geometry, material );

scene.add( sphere );

const light = new THREE.PointLight();
light.position.set( 30, 0, 30 );
scene.add( light );

renderer.render( scene, camera );


window.addEventListener( 'resize', ( ) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix( );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.render( scene, camera );
}, false );