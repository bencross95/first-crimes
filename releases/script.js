var camera, controls, scene, renderer;
var sky, sunSphere, water;
var video;

init();
animate();



function clickBody() {
  controls.lock();
}

var canvasVar = document.getElementsByTagName('canvas')

canvasVar[0].style.filter = "saturate(1.4)";


initSound();



if (window.innerWidth < 768) {
  console.log("should be mobile");
  document.getElementById("logo-top").style.display = 'none';
} else {
  document.body.addEventListener('click', function() {
    //lock mouse on screen
    controls.lock();
  }, false);
}




function initSky() {
  // Add Sky
  sky = new THREE.Sky();
  sky.scale.setScalar(450000);
  scene.add(sky);
  // Add Sun Helper
  sunSphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(20000, 16, 8),
    new THREE.MeshBasicMaterial({
      color: 0xffffff
    })
  );
  sunSphere.position.y = -700000;
  sunSphere.visible = false;
  scene.add(sunSphere);
  /// GUI
  var effectController = {
    turbidity: 6,
    rayleigh: 2,
    mieCoefficient: 0.018,
    mieDirectionalG: 0.15,
    luminance: 0.9,
    inclination: 0.47,
    azimuth: 0.4,
    sun: !true
  };



  var distance = 400000;

  var uniforms = sky.material.uniforms;
  uniforms["turbidity"].value = effectController.turbidity;
  uniforms["rayleigh"].value = effectController.rayleigh;
  uniforms["luminance"].value = effectController.luminance;
  uniforms["mieCoefficient"].value = effectController.mieCoefficient;
  uniforms["mieDirectionalG"].value = effectController.mieDirectionalG;
  var theta = Math.PI * (effectController.inclination - 0.5);
  var phi = 2 * Math.PI * (effectController.azimuth - 0.5);
  sunSphere.position.x = distance * Math.cos(phi);
  sunSphere.position.y = distance * Math.sin(phi) * Math.sin(theta);
  sunSphere.position.z = distance * Math.sin(phi) * Math.cos(theta);
  sunSphere.visible = effectController.sun;
  uniforms["sunPosition"].value.copy(sunSphere.position);
  renderer.render(scene, camera);

}

function initWater() {

  var waterGeometry = new THREE.PlaneBufferGeometry(10000, 10000);


  water = new THREE.Water(
    waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load('textures/waternormals.jpg', function(texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      }),
      alpha: 1.0,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 5,
      fog: scene.fog !== undefined
    }
  );


  water.rotation.x = -Math.PI / 2;

  // So image can load in time to render the sea - Clem coded this beasts <3
  setTimeout(function() {
    scene.add(water);
    render();
  }, 133);

}



function init() {

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xdddddd);

  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);
  // camera.rotation.y = 45/180*Math.PI;
  camera.position.x = 0;
  camera.position.y = 50;
  camera.position.z = 0;
  camera.rotateY(0.07);


  // sph.setFromVector3(dir);
  // var vector = new THREE.Vector3;
  // camera.getWorldDirection(vector);
  // console.log(vector);



  if (window.innerWidth < 768) {
    console.log("device orientation controls");
    // controls = new THREE.DeviceOrientationControls( camera, document.body );

    controls = new THREE.DeviceOrientationControls(camera, document.body)
    console.log(controls.object);

    // controls = new THREE.PointerLockControls( camera, document.body );

  } else {
    console.log("pointer lock controls");
    controls = new THREE.PointerLockControls(camera, document.body);
  }



  // Videos --------------------------------------------------

  // Video 1
  video1 = document.getElementById('videotexture1');
  var texture1 = new THREE.VideoTexture(video1);

  var videoParameters1 = {
    color: 0xffffff,
    map: texture1
  };
  var videoMaterial1 = new THREE.MeshBasicMaterial(videoParameters1);

  var videoGeometry1 = new THREE.PlaneGeometry(30, 30, 1);
  var videoPlane1 = new THREE.Mesh(videoGeometry1, videoMaterial1);
  videoPlane1.position.set(-81, 264, -750);
  scene.add(videoPlane1);


  // Video 2
  video2 = document.getElementById('videotexture2');
  var texture2 = new THREE.VideoTexture(video2);
  var videoParameters2 = {
    color: 0xffffff,
    map: texture2
  };
  var videoMaterial2 = new THREE.MeshBasicMaterial(videoParameters2);
  var videoGeometry2 = new THREE.PlaneGeometry(72, 30, 1);
  var videoPlane2 = new THREE.Mesh(videoGeometry2, videoMaterial2);
  videoPlane2.position.set(-14, 119, -750);
  scene.add(videoPlane2);


  // Video 3
  video3 = document.getElementById('videotexture3');
  var texture3 = new THREE.VideoTexture(video3);
  var videoParameters3 = {
    color: 0xffffff,
    map: texture3
  };
  var videoMaterial3 = new THREE.MeshBasicMaterial(videoParameters3);
  var videoGeometry3 = new THREE.PlaneGeometry(30, 30, 1);
  var videoPlane3 = new THREE.Mesh(videoGeometry3, videoMaterial3);
  videoPlane3.position.set(620, 180, -15);
  videoPlane3.rotateY(-1.6);
  scene.add(videoPlane3);


  // Video 4
  video4 = document.getElementById('videotexture4');
  var texture4 = new THREE.VideoTexture(video4);
  var videoParameters4 = {
    color: 0xffffff,
    map: texture4
  };
  var videoMaterial4 = new THREE.MeshBasicMaterial(videoParameters4);
  var videoGeometry4 = new THREE.PlaneGeometry(47, 30, 1);
  var videoPlane4 = new THREE.Mesh(videoGeometry4, videoMaterial4);
  videoPlane4.position.set(-19, 162, 710);
  videoPlane4.rotateY(-3.2);
  scene.add(videoPlane4);


  // Video 5
  video5 = document.getElementById('videotexture5');
  var texture5 = new THREE.VideoTexture(video5);
  var videoParameters5 = {
    color: 0xffffff,
    map: texture5
  };
  var videoMaterial5 = new THREE.MeshBasicMaterial(videoParameters5);
  var videoGeometry5 = new THREE.PlaneGeometry(72, 30, 1);
  var videoPlane5 = new THREE.Mesh(videoGeometry5, videoMaterial5);
  videoPlane5.position.set(-63, 122, 716);
  videoPlane5.rotateY(-3.2);
  scene.add(videoPlane5);


  // Video 6
  video6 = document.getElementById('videotexture6');
  var texture6 = new THREE.VideoTexture(video6);
  var videoParameters6 = {
    color: 0xffffff,
    map: texture6
  };
  var videoMaterial6 = new THREE.MeshBasicMaterial(videoParameters6);
  var videoGeometry6 = new THREE.PlaneGeometry(50, 50, 1);
  var videoPlane6 = new THREE.Mesh(videoGeometry6, videoMaterial6);
  videoPlane6.position.set(-763, 100, -65);
  videoPlane6.rotateY(-4.72);
  scene.add(videoPlane6);



  // Video 7
  video7 = document.getElementById('videotexture7');
  var texture7 = new THREE.VideoTexture(video7);
  var videoParameters7 = {
    color: 0xffffff,
    map: texture7
  };
  var videoMaterial7 = new THREE.MeshBasicMaterial(videoParameters7);
  var videoGeometry7 = new THREE.PlaneGeometry(50, 382, 1);
  var videoPlane7 = new THREE.Mesh(videoGeometry7, videoMaterial7);
  videoPlane7.position.set(-763, 265, 1);
  videoPlane7.rotateY(-4.72);
  scene.add(videoPlane7);

  //  --------------------------------------------------

  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // controls = new THREE.OrbitControls(camera, renderer.domElement);
  // controls.addEventListener('change', renderer);
  // controls.minDistance = 500;
  // controls.maxDistance = 1500;


  initSky();
  initWater();



  var hlight = new THREE.AmbientLight(0x3D88C2, 0.5); // soft white light
  scene.add(hlight);
  //
  directionalLight = new THREE.DirectionalLight(0x3D88C2, 0.4);
  directionalLight.position.set(4000, 200, 200);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
  //
  //
  // const targetObject = new THREE.Object3D();
  // targetObject.position.set(50, 200, 400);
  // scene.add(targetObject);
  //
  // directionalLight.target = targetObject;


  // light = new THREE.HemisphereLight(0xeeeeff, 0x3D88C2, 0.9);
  // light.position.set(0.5, 1, 0.9);
  // scene.add(light);


  var manager = new THREE.LoadingManager();

  // Initialize loading manager with URL callback.
  var objectURLs = [];
  manager.setURLModifier((url) => {

    url = URL.createObjectURL('models/screen3-1.gltf');

    objectURLs.push(url);

    return url;

  });



  let loader = new THREE.GLTFLoader();
  loader.load('models/screen3-1.gltf', function(gltf) {
    screen1 = gltf.scene.children[0];
    screen1.scale.set(1, 1, 1);
    scene.add(gltf.scene);

    objectURLs.forEach((url) => URL.revokeObjectURL(url));
    // animate();
  });

}


function initSound() {
  // create an AudioListener and add it to the camera
  var listener = new THREE.AudioListener();
  camera.add(listener);

  // create a global audio source
  var sound = new THREE.Audio(listener);

  // load a sound and set it as the Audio object's buffer
  var audioLoader = new THREE.AudioLoader();
  audioLoader.load('audio/RP1-intro.mp3', function(buffer) {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(0.5);
    sound.play();
  });
}



var compassDirection = 0;


function compassFunction() {

  // north
  if (compassDirection > -45 || compassDirection <= -315) {
    document.getElementById("compassNorth").style.opacity = 1;
    // document.getElementById("bottomText").innerHTML = "<p>Explore with your heart</p>";

  } else {
    document.getElementById("compassNorth").style.opacity = 0.1;
  };

  // south
  if (compassDirection > -225 && compassDirection <= -135) {
    document.getElementById("compassSouth").style.opacity = 1;
    // document.getElementById("bottomText").innerHTML = "<p>There is no south</p>";

  } else {
    document.getElementById("compassSouth").style.opacity = 0.1;
  };



  // east
  if (compassDirection > -315 && compassDirection <= -225) {
    document.getElementById("compassEast").style.opacity = 1;
    // document.getElementById("bottomText").innerHTML = "<p>Let the tree be your core, <br>the trunk be your roots</p>";

  } else {
    document.getElementById("compassEast").style.opacity = 0.1;
  };



  // west
  if (compassDirection > -135 && compassDirection <= -45) {
    document.getElementById("compassWest").style.opacity = 1;
    // document.getElementById("bottomText").innerHTML = "<p>Trust the compass</p>";
  } else {
    document.getElementById("compassWest").style.opacity = 0.1;
  };



}


// if compass direction changes, run the compass UI conditionals


function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  var dir = new THREE.Vector3();
  var sph = new THREE.Spherical();

  camera.getWorldDirection(dir);
  sph.setFromVector3(dir);

  compassFunction();

  compassDirection = -THREE.Math.radToDeg(sph.theta) - 180



  document.getElementById("compassCenter").style.transform = `rotate(${compassDirection}deg)`;

  if (window.innerWidth < 768) {
    controls.update();
  } else {}

  render();

  // console.log(controls.screenOrientation);
}


function render() {

  var time = performance.now() * 0.001;
  water.material.uniforms['time'].value += 1.0 / 60.0;
  renderer.render(scene, camera);


}
