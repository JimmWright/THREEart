import './style.css';

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { AlphaFormat } from 'three';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const loader = new THREE.TextureLoader();

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(5);

renderer.render(scene,camera);

const geometry = new THREE.TorusGeometry(10,3,16,10)
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const material2 = new THREE.MeshStandardMaterial({color: 0x6a33ff});
const material3 = new THREE.MeshStandardMaterial({color: 0xffe433});
const material4 = new THREE.MeshStandardMaterial({color: 0x3aff33});
const torus = new THREE.Mesh(geometry,material);
// const torus2 = new THREE.Mesh(geometry,material2);
// const torus3 = new THREE.Mesh(geometry,material3);
// const torus4 = new THREE.Mesh(geometry,material4);


// const steveJobsTexture1 = new THREE.TextureLoader().load('layer 1 SJ.png');
// const squareShape = new THREE.Shape(
//   new THREE.BoxGeometry(3,3,3),
//   new THREE.MeshBasicMaterial({ map: steveJobsTexture1})
// );


const spaceTexture = new THREE.TextureLoader().load('space.jpg');

const personTexture = new THREE.TextureLoader().load('People.jpg');
const person = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({ map: personTexture})
);


const SJTexture = new THREE.TextureLoader().load('layer 4 SJ.png');
const person2 = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({ map: SJTexture})
);

var SJ4 = "layer 4 SJ.png";
var SJ3 = "layer 3 SJ.png";
var SJ2 = "layer 2 SJ.png";
var SJ1 = "layer 1 SJ.png";
  // NOTE: create three double-sided planes using PNG's with transparency
	var planes = [];
	var planeImages = [SJ4,SJ2,SJ3,SJ1];
	var x = 10;
	for(var i = 0; i < planeImages.length; i++) {
		var planeMaterial = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(planeImages[i]), transparent: true, side: THREE.DoubleSide }); // NOTE: specify "transparent: true"
		var planeGeometry = new THREE.PlaneGeometry(10*x, 10*x);
    planes[i] = new THREE.Mesh(planeGeometry, planeMaterial);
		planes[i].position.z = i*20;
		scene.add(planes[i]);
    x--; 
	}
// const square = new THREE.Shape();
// square.moveTo(10, 10);
// square.lineTo(1, -1);
// square.lineTo(-1, -1);
// square.lineTo(-1, 1);




const moonTexture = new THREE.TextureLoader().load('moonNormalMap.jpg');
const normalTexture = new THREE.TextureLoader().load('moonNormalMap.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(5,32,32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
);

const color5 = new THREE.Color( 'skyblue' );
scene.background = color5;
// scene.background = spaceTexture;
//scene.add(moon);
//scene.add(person);
//scene.add(person2);
//scene.add(torus);
// scene.add(torus2);
// scene.add(torus3);
// scene.add(torus4);
// scene.add(squareShape);

person2.position.setZ(-10);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,18,5);

const ambientLight = new THREE.AmbientLight(0xffffff);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(2000,50);

// scene.add(lightHelper, gridHelper);

scene.add(pointLight, ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);
//controls.autoRotate = true;
//controls.minDistance = 15;
//controls.maxDistance = 15;

function animate(){
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.002;
  torus.rotation.z += 0.03;

  // torus2.rotation.x += 0.08;
  // torus2.rotation.y += 0.008;
  // torus2.rotation.z += 0.02;

  // torus3.rotation.x += 0.03;
  // torus3.rotation.y += 0.001;
  // torus3.rotation.z += 0.07;

  // torus4.rotation.x += 0.013;
  // torus4.rotation.y += 0.004;
  // torus4.rotation.z += 0.09;

  controls.update();

  renderer.render(scene, camera)
}

function addStar(){
  //const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff});
  const star = new THREE.Mesh(geometry,material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  // scene.add(star)
}


moon.position.setZ(30);
moon.position.setX(-10);

function moveCamera(){

  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  person.rotation.x += 0.01;
  person.rotation.y += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;

}

document.body.onscroll = moveCamera


Array(200).fill().forEach(addStar);

animate();
