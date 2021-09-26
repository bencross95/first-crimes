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



// If mobile
// show a plain colour and a startButton
// click button to enable device orientation controls and remove button & load UI


function requestOrientationPermission() {
  controls.connect()
  document.getElementById("load-div-mobile").style.display = 'none';
  document.getElementById("soundcloud-frame").style.display = 'inline';
}






if (window.innerWidth < 768) {
  console.log("should be mobile");
  document.getElementById("logo-top").style.display = 'none';


  document.getElementById("load-div-mobile").style.display = 'inline-block';




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
    luminance: 1.1,
    inclination: 0.47,
    azimuth: 1.4,
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
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);


  scene.background = new THREE.Color(0xdddddd);

  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);
  // camera.rotation.y = 45/180*Math.PI;
  camera.position.x = 0;
  camera.position.y = 50;
  camera.position.z = 0;
  // camera.rotateY(4.2);


  // debug tool
  camera.rotateY(4.75);
  camera.rotateX(0.4);





  // sph.setFromVector3(dir);
  // var vector = new THREE.Vector3;
  // camera.getWorldDirection(vector);
  // console.log(vector);


  // press on body


  if (window.innerWidth < 768) {
    console.log("device orientation controls");


    controls = new THREE.DeviceOrientationControls(camera, document.body)
    controls.disconnect()

    console.log(controls.object);

    // controls = new THREE.PointerLockControls( camera, document.body );

  } else {
    console.log("pointer lock controls");
    controls = new THREE.PointerLockControls(camera, document.body);
  }



  // Videos --------------------------------------------------


  // ADD THE VIDEO FILES IN FALSE-MEMORIES.HTML

  // Video 1
  video1 = document.getElementById('videotexture1');
  var texture1 = new THREE.VideoTexture(video1);

  var videoParameters1 = {
    color: 0xffffff,
    map: texture1
  };
  var videoMaterial1 = new THREE.MeshBasicMaterial(videoParameters1);

  var videoGeometry1 = new THREE.PlaneGeometry(33, 30, 1);
  var videoPlane1 = new THREE.Mesh(videoGeometry1, videoMaterial1);
  videoPlane1.position.set(-360, 291, -750);
  scene.add(videoPlane1);


  // Video 2
  video2 = document.getElementById('videotexture2');
  var texture2 = new THREE.VideoTexture(video2);
  var videoParameters2 = {
    color: 0xffffff,
    map: texture2
  };
  var videoMaterial2 = new THREE.MeshBasicMaterial(videoParameters2);
  var videoGeometry2 = new THREE.PlaneGeometry(70, 70, 1);
  var videoPlane2 = new THREE.Mesh(videoGeometry2, videoMaterial2);
  videoPlane2.position.set(-148, 397, -750);
  scene.add(videoPlane2);


  // Video 3
  video3 = document.getElementById('videotexture3');
  var texture3 = new THREE.VideoTexture(video3);
  var videoParameters3 = {
    color: 0xffffff,
    map: texture3
  };
  var videoMaterial3 = new THREE.MeshBasicMaterial(videoParameters3);
  var videoGeometry3 = new THREE.PlaneGeometry(154, 112, 1);
  var videoPlane3 = new THREE.Mesh(videoGeometry3, videoMaterial3);
  videoPlane3.position.set(94, 143, -750);
  scene.add(videoPlane3);





  // Video 4
  video4 = document.getElementById('videotexture4');
  var texture4 = new THREE.VideoTexture(video4);
  var videoParameters4 = {
    color: 0xffffff,
    map: texture4
  };
  var videoMaterial4 = new THREE.MeshBasicMaterial(videoParameters4);
  var videoGeometry4 = new THREE.PlaneGeometry(200, 200, 1);
  var videoPlane4 = new THREE.Mesh(videoGeometry4, videoMaterial4);
  videoPlane4.position.set(773, 396, 0);
  videoPlane4.rotateY(-1.55);
  scene.add(videoPlane4);


  // Video 5
  video5 = document.getElementById('videotexture5');
  var texture5 = new THREE.VideoTexture(video5);
  var videoParameters5 = {
    color: 0xffffff,
    map: texture5
  };
  var videoMaterial5 = new THREE.MeshBasicMaterial(videoParameters5);
  var videoGeometry5 = new THREE.PlaneGeometry(58, 110, 1);
  var videoPlane5 = new THREE.Mesh(videoGeometry5, videoMaterial5);
  videoPlane5.position.set(775, 537, -340);
  videoPlane5.rotateY(-1.55);
  scene.add(videoPlane5);


  // Video 6
  video6 = document.getElementById('videotexture6');
  var texture6 = new THREE.VideoTexture(video6);
  var videoParameters6 = {
    color: 0xffffff,
    map: texture6
  };
  var videoMaterial6 = new THREE.MeshBasicMaterial(videoParameters6);
  var videoGeometry6 = new THREE.PlaneGeometry(198, 40, 1);
  var videoPlane6 = new THREE.Mesh(videoGeometry6, videoMaterial6);
  videoPlane6.position.set(776, 442, 263);
  videoPlane6.rotateY(-1.57);
  scene.add(videoPlane6);



  // Video 7
  video7 = document.getElementById('videotexture7');
  var texture7 = new THREE.VideoTexture(video7);
  var videoParameters7 = {
    color: 0xffffff,
    map: texture7
  };
  var videoMaterial7 = new THREE.MeshBasicMaterial(videoParameters7);
  var videoGeometry7 = new THREE.PlaneGeometry(240, 144, 1);
  var videoPlane7 = new THREE.Mesh(videoGeometry7, videoMaterial7);
  videoPlane7.position.set(171.5, 292, 630);
  videoPlane7.rotateY(-3.15);
  scene.add(videoPlane7);



  // Video 8
  video8 = document.getElementById('videotexture8');
  var texture8 = new THREE.VideoTexture(video8);
  var videoParameters8 = {
    color: 0xffffff,
    map: texture8
  };
  var videoMaterial8 = new THREE.MeshBasicMaterial(videoParameters8);
  var videoGeometry8 = new THREE.PlaneGeometry(297, 82, 1);
  var videoPlane8 = new THREE.Mesh(videoGeometry8, videoMaterial8);
  videoPlane8.position.set(-158.5, 163.5, 630);
  videoPlane8.rotateY(-3.15);
  scene.add(videoPlane8);



  // Video 9
  video9 = document.getElementById('videotexture9');
  var texture9 = new THREE.VideoTexture(video9);
  var videoParameters9 = {
    color: 0xffffff,
    map: texture9
  };
  var videoMaterial9 = new THREE.MeshBasicMaterial(videoParameters9);
  var videoGeometry9 = new THREE.PlaneGeometry(80, 80, 1);
  var videoPlane9 = new THREE.Mesh(videoGeometry9, videoMaterial9);
  videoPlane9.position.set(-454, 322, 630);
  videoPlane9.rotateY(-3.15);
  scene.add(videoPlane9);




  // Video 10
  video10 = document.getElementById('videotexture10');
  var texture10 = new THREE.VideoTexture(video10);
  var videoParameters10 = {
    color: 0xffffff,
    map: texture10
  };
  var videoMaterial10 = new THREE.MeshBasicMaterial(videoParameters10);
  var videoGeometry10 = new THREE.PlaneGeometry(180, 543, 1);
  var videoPlane10 = new THREE.Mesh(videoGeometry10, videoMaterial10);
  videoPlane10.position.set(-749, 347, -1);
  videoPlane10.rotateY(-4.71);
  scene.add(videoPlane10);



  // Video 11
  video11 = document.getElementById('videotexture11');
  var texture11 = new THREE.VideoTexture(video11);
  var videoParameters11 = {
    color: 0xffffff,
    map: texture11
  };
  var videoMaterial11 = new THREE.MeshBasicMaterial(videoParameters11);
  var videoGeometry11 = new THREE.PlaneGeometry(100, 206, 1);
  var videoPlane11 = new THREE.Mesh(videoGeometry11, videoMaterial11);
  videoPlane11.position.set(-749, 175, -183);
  videoPlane11.rotateY(-4.71);
  scene.add(videoPlane11);



  // Video 12
  video12 = document.getElementById('videotexture12');
  var texture12 = new THREE.VideoTexture(video12);
  var videoParameters12 = {
    color: 0xffffff,
    map: texture12
  };
  var videoMaterial12 = new THREE.MeshBasicMaterial(videoParameters12);
  var videoGeometry12 = new THREE.PlaneGeometry(78, 78, 1);
  var videoPlane12 = new THREE.Mesh(videoGeometry12, videoMaterial12);
  videoPlane12.position.set(-270, 244, 630);
  videoPlane12.rotateY(-3.15);
  scene.add(videoPlane12);





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




  THREE.DefaultLoadingManager.onProgress = function(url, itemsLoaded, itemsTotal) {

    //
    // const progressBarFull = document.getElementById('progressBarFull');
    //
    // progressBarFull.style.width = `${(itemsLoaded / itemsTotal) * 100}%`;

    // console.log(itemsLoaded / itemsTotal * 100);


    // var loadAnimationSpeed = itemsLoaded / itemsTotal * 100
    //
    // loadAnimationSpeed2 = 8 / loadAnimationSpeed + 's'

    // console.log(loadAnimationSpeed2);

    // document.getElementById("bottomText").style.animationDuration = loadAnimationSpeed2;




    // if (progressBarFull.style.width == "100%") {
    //   document.getElementById("loading-objects-start").style.display = 'inline-block';
    // }

    // console.log(progressBarFull.style.width);

    // var loadingClip = 0;

    var loadingClip = itemsLoaded;

    // 0 is minimum, 150 is maximum


  };





  THREE.DefaultLoadingManager.onLoad = function() {

    console.log('Loading Complete!');

    document.getElementById("load-div").style.display = 'none';
    document.getElementById("bottomText").style.animation = 'none';
    document.getElementById("loading-dots").style.display = 'none';
    document.getElementById("button-hide").style.display = 'block';

// loadAnimationSpeed2 = 8 / loadAnimationSpeed + 's'



    document.getElementById("mobile-flash").style.animationDuration = 1.5 + 's';


    if (window.innerWidth < 768) {} else {
      document.getElementById("soundcloud-frame").style.display = 'inline';
    }



  };







  let loader = new THREE.GLTFLoader();
  loader.load('models/screen3-1.gltf', function(gltf) {
    screen1 = gltf.scene.children[0];
    screen1.scale.set(1, 1, 1);
    scene.add(gltf.scene);

    objectURLs.forEach((url) => URL.revokeObjectURL(url));
    // animate();
  });

}


// function initSound() {
//   // create an AudioListener and add it to the camera
//   var listener = new THREE.AudioListener();
//   camera.add(listener);
//
//   // create a global audio source
//   var sound = new THREE.Audio(listener);
//
//   // load a sound and set it as the Audio object's buffer
//   var audioLoader = new THREE.AudioLoader();
//   audioLoader.load('audio/RP1-intro.mp3', function(buffer) {
//     sound.setBuffer(buffer);
//     sound.setLoop(true);
//     sound.setVolume(0.5);
//     sound.play();
//   });
// }



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

  window.addEventListener('resize', onWindowResize);

}


function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

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
