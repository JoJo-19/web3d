import './style.css'

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

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

//recursive function
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update;

  render.render(scene, camera);
}

animate()