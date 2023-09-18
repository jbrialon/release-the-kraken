import * as THREE from "three";
import Experience from "../Experience";

import vertexShader from "../../shaders/sea/vertex.glsl";
import fragmentShader from "../../shaders/sea/fragment.glsl";

export default class Sea {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    // Debug;
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Sea");
    }

    // Options
    this.options = {
      waterColor: new THREE.Color(0x00358f),
    };

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(100, 100, 20, 20);
    this.geometry.rotateX(-Math.PI / 2);
  }

  setMaterial() {
    this.resources.items.water.wrapS = this.resources.items.water.wrapT =
      THREE.RepeatWrapping;
    this.seaMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uMap: { value: this.resources.items.water },
        uTime: { value: 0 },
        uColor: { value: this.options.waterColor },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      side: THREE.DoubleSide,
    });

    if (this.debug.active) {
      this.debugFolder.addColor(this.options, "waterColor").onChange(() => {
        this.seaMaterial.uniforms.uColor.value = this.options.waterColor;
      });
    }
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.seaMaterial);
    this.mesh.position.y = 0.5;
    this.scene.add(this.mesh);
  }
  update() {
    this.seaMaterial.uniforms.uTime.value = this.time.elapsedTime;
  }
}
