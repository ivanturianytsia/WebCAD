var previewWidth = 200;
var previewHeight = 200;

var Preview = function(file) {
	var that = this;

	this.id = file.id;
	this.name = file.name;
	this.path = file.path;

	this.init = function() {

		// Renderer
		that.renderer = new THREE.WebGLRenderer({
			antialias: true
		});
		that.renderer.setSize(previewHeight, previewWidth);
		document.getElementById('model-' + that.id).appendChild(that.renderer.domElement);

		// Scene
		that.scene = new THREE.Scene();

		//camera
		that.camera = new THREE.PerspectiveCamera(50, previewHeight / previewWidth, 1, 10000);
		that.camera.position.set(0, 0, 100);
		that.scene.add(that.camera);

		// Lights
		that.light = new THREE.DirectionalLight(0xffffff);
		that.light.position.set(50, 100, 200);
		that.scene.add(that.light);

		// Loader
		var loader = new THREE.STLLoader();

		loader.load(that.path, function(bufferGeometry) {
			var material = new THREE.MeshPhongMaterial({
				color: 0xff5533,
				specular: 0x111111,
				shininess: 200
			});
			var geometry = new THREE.Geometry().fromBufferGeometry(bufferGeometry);
			that.mesh = new THREE.Mesh(geometry, material);

			that.scene.add(that.mesh);

			window.setInterval(that.render, 1000 / 60);
		});

	}

	that.render = function() {
		var time = Date.now();
		that.renderer.render(that.scene, that.camera);
		that.mesh.rotation.y = time * 0.0005;
	}
}

var files = [{
	id: "1",
	name: "Tie fighter",
	path: "/models/tie.stl"
}, {
	id: "2",
	name: "Balanced die",
	path: "/models/die.stl"
}]

files.forEach(function(file) {
	var grid = document.getElementById('grid')
	grid.innerHTML = grid.innerHTML + "<div class='item'><div id='model-" + file.id + "'></div></div>";
	var item = new Preview(file);

	item.init();
})
