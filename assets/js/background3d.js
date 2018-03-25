var mainDiv = document.getElementById("canvas-holder");
var width = mainDiv.offsetWidth,
    height = mainDiv.offsetHeight;
var scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xffffff, 200, 350);

var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.set(-80, -130, 105);
camera.lookAt(new THREE.Vector3(-80, 40, 105));

var mainCanvas = document.getElementById('main-canvas');
var renderer = new THREE.WebGLRenderer({ antialias: true, canvas: mainCanvas, alpha: true });
renderer.setClearColor(0x000000, 0);
renderer.setSize(width, height);
mainDiv.appendChild(renderer.domElement);

var pixelsData;
var image = new Image();

image.onload = function(){
    var canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    canvas.getContext("2d").drawImage(image, 0, 0);
    pixelsData = canvas.getContext("2d").getImageData(0, 0, image.width, image.height);

    var geometry = new THREE.PlaneBufferGeometry(400 * 5 / 3, 400 * 5 / 3, pixelsData.width - 1, pixelsData.height - 1);
    var vertices = geometry.attributes.position.array;

    for (var i = 0, j = 0, l = vertices.length; i < l; i++ , j += 3) {
        vertices[j + 2] = pixelsData.data[4 * i] * 0.55;
    }

    var material = new THREE.MeshBasicMaterial({
        color: 0xaaaaaa,
        wireframe: true,
        transparent: true,
        opacity: 0.9
    });
    var plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    var t = 0;
    render();
    function render() {
        
        t += 0.01;
        plane.rotation.z = Math.PI / 18.0 + Math.PI / 9.0 * Math.sin(t / 4.0);

        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

};

image.src = "./assets/img/background.png";

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = mainDiv.offsetWidth / mainDiv.offsetHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( mainDiv.offsetWidth, mainDiv.offsetHeight );

}

