const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const loader = new THREE.TextureLoader();
const texture = loader.load('https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg', () => {
    renderer.render(scene, camera);
}); 

const geometry = new THREE.SphereGeometry(2, 32, 32); // Adjust radius and segments as needed
const material = new THREE.MeshPhongMaterial({ map: texture });
const earth = new THREE.Mesh(geometry, material);
scene.add(earth);

const countryMarkers = [
  { name: "Netherlands", latitude: 52.1326, longitude: 5.2913 },
  { name: "Belgium", latitude: 50.5039, longitude: 4.4699 },
  { name: "Germany", latitude: 51.1657, longitude: 10.4515 },
  { name: "Austria", latitude: 47.5162, longitude: 14.5501 },
  { name: "Sweden", latitude: 60.1282, longitude: 18.6435 },
  { name: "Finland", latitude: 61.9241, longitude: 25.7482 },
  { name: "Norway", latitude: 60.472, longitude: 8.4689 },
  { name: "Denmark", latitude: 56.2639, longitude: 9.5018 },
  { name: "UK", latitude: 55.3781, longitude: -3.436 },
];

function latLongToVector3(latitude, longitude) {
  const phi = (latitude * Math.PI) / 180;
  const theta = ((longitude - 180) * Math.PI) / 180;
  const radius = 2; 
  const x = -(radius * Math.cos(phi) * Math.cos(theta));
  const y = radius * Math.sin(phi);
  const z = radius * Math.cos(phi) * Math.sin(theta);
  return new THREE.Vector3(x, y, z);
}

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 3, 5);
scene.add(directionalLight);

const markerGeometry = new THREE.SphereGeometry(0.05, 16, 16);
const markerMaterial = new THREE.MeshBasicMaterial({ color: WebGL2RenderingContext });
countryMarkers.forEach(country => {
  const marker = new THREE.Mesh(markerGeometry, markerMaterial);
  const markerPosition = latLongToVector3(country.latitude, country.longitude);
  marker.position.copy(markerPosition);
  earth.add(marker); 
});

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);

function animate() {
  requestAnimationFrame(animate);

  
  earth.rotation.y += 0.01; 
  earth.rotation.x = 1;
  renderer.render(scene, camera);
}
animate();
