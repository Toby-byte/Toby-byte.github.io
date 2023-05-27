let scene, camera, renderer;
let cubeGeometry, sphereGeometry, tetraGeometry, material, cube, sphere, tetra;

init();
animate();

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.z = 6;

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 1); // Set background color to white
    document.body.appendChild(renderer.domElement);

    // Cube
    cubeGeometry = new THREE.BoxGeometry(1, 1, 1);  
    material = new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true, wireframeLinewidth: 2});
    cube = new THREE.Mesh(cubeGeometry, material);
    cube.position.x = 0;  // Position it to the left
    cube.position.y = 2;
    scene.add(cube);

    // Sphere
    sphereGeometry = new THREE.SphereGeometry(0.75, 15, 15);  // radius, width segments, height segments
    sphere = new THREE.Mesh(sphereGeometry, material);
    // Sphere is in the middle, so no need to set position
    scene.add(sphere);

    // Tetrahedron
    tetraGeometry = new THREE.TetrahedronGeometry(1);  
    tetra = new THREE.Mesh(tetraGeometry, material);
    tetra.position.x = 0;  // Position it to the right
    tetra.position.y = -2;
    scene.add(tetra);
}

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    tetra.rotation.x += 0.01;
    tetra.rotation.y += 0.01;
    renderer.render(scene, camera);
}