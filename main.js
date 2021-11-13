// import './style.css';

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

//set up
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const render = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

render.setPixelRatio(window.devicePixelRatio);
//full size
render.setSize(window.innerWidth, window.innerHeight);

//camera postion
camera.position.setZ(30);

render.render(scene, camera);

//geometry
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);

//wrapping paper
const material = new THREE.MeshStandardMaterial({
  color: 0xFF6347
});

//mesh
const torus = new THREE.Mesh(geometry, material);
//add torus to scene
scene.add(torus);

// const geometry = new THREE.TorusKnotGeometry( 10, 3, 16 );
// const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
// const torusKnot = new THREE.Mesh( geometry, material );
// scene.add( torusKnot );

//lighting
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(7, 7, 7);
//ambient light
const ambientLight = new THREE.AmbientLight(0xffffff);

//add pointlight to scene
scene.add(pointLight, ambientLight);

//lighting helpper, shows direction and position of light source
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

//Orbit Control, listen to mouse and update
const controls = new OrbitControls(camera, render.domElement);

//outter space
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( {color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);
  //random xyz
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}
//200 random position stars
Array(200).fill().forEach(addStar);


//avatar
const jojoTexture = new THREE.TextureLoader().load('jojo.jpeg');

const jojo = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3), 
  new THREE.MeshBasicMaterial({map: jojoTexture})

);

scene.add(jojo);

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;


const moonTexture = new THREE.TextureLoader().load('moon.jpg');
//adding texture to moon
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
);

scene.add(moon);

//changing moon position
moon.position.z = 30;
moon.position.setX(-10);



function moveCamera() {
  //where user is rn
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  jojo.rotation.y += 0.01;
  jojo.rotation.z += 0.01;
//top value always negetive so multiply by negetive
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;


//recursive function
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  // torusKnot.rotation.x += 0.01;
  // torusKnot.rotation.y += 0.005;
  // torusKnot.rotation.z += 0.01;

  controls.update;

  render.render(scene, camera);
}

animate()