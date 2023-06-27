// CameraWrapper.js

import * as THREE from 'three';
// 相机组件类
class CameraComponent {
  constructor(fov, aspect, near, far) {
    this.fov = fov;
    this.aspect = aspect;
    this.near = near;
    this.far = far;
    this.camera = new THREE.OrthographicCamera(this.fov, this.aspect, this.near, this.far);
    this.camera.position.set(200, 300, 200); //设置相机位置
  }

  addToScene(scene) {
    scene.add(this.camera);
    this.camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

  }
}

export default CameraComponent;
