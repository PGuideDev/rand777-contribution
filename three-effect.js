// 初始化 three.js 基本场景
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('threejs-container').appendChild(renderer.domElement);

// 添加环境光和平行光
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 3, 5);
scene.add(directionalLight);

// 创建中心星球（太阳）
const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
const sunMaterial = new THREE.MeshPhongMaterial({ color: 0xff6600, emissive: 0xff4400 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// 创建中心星球（太阳）后，添加轨道
const orbits = [];
const createOrbit = (radius) => {
    const orbitGeometry = new THREE.RingGeometry(radius, radius + 0.02, 64);
    const orbitMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        opacity: 0.3,
        transparent: true,
        side: THREE.DoubleSide
    });
    const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
    orbit.rotation.x = Math.PI / 2;
    scene.add(orbit);
    orbits.push(orbit);
};

// 更新行星数组和颜色
const planets = [];
const planetColors = [
    0xFF4C4C, // 红色
    0xFF8E3C, // 橙色
    0xFFEB3B, // 黄色
    0x4CAF50, // 绿色
    0x2196F3, // 蓝色
    0x3F51B5, // 靛蓝
    0x9C27B0, // 紫色
    0xFF69B4  // 粉色
];

// 创建8颗行星
for (let i = 0; i < 8; i++) {
    const radius = 0.3 + i * 0.05; // 行星大小随距离略微增加
    const distance = 4 + i * 1.5;   // 轨道间距
    const baseSpeed = 0.005;        // 基础速度
    const speed = baseSpeed * (8 / (i + 1)); // 速度与距离成反比

    createOrbit(distance); // 创建轨道

    const planetGeometry = new THREE.SphereGeometry(radius, 24, 24);
    const planetMaterial = new THREE.MeshPhongMaterial({
        color: planetColors[i],
        shininess: 25
    });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);

    planet.position.x = distance;
    planet.userData = { distance, speed, angle: Math.random() * Math.PI * 2 };
    planets.push(planet);
    scene.add(planet);
}

// 调整相机位置更近
camera.position.set(0, 12, 15);
camera.lookAt(scene.position);

// 动画循环
function animate() {
    requestAnimationFrame(animate);

    // 太阳自转
    sun.rotation.y += 0.005;

    // 行星公转
    planets.forEach(planet => {
        planet.userData.angle += planet.userData.speed;
        planet.position.x = Math.cos(planet.userData.angle) * planet.userData.distance;
        planet.position.z = Math.sin(planet.userData.angle) * planet.userData.distance;
        planet.rotation.y += 0.02;
    });

    renderer.render(scene, camera);
}
animate();

// 处理窗口尺寸调整
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
