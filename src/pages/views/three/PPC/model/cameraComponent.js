// CameraWrapper.js

import * as THREE from 'three';
// 相机组件类
class CameraComponent {
  camera;
  constructor() {
   
  }

  addToScene(scene) {
    scene.add(this.camera);
    this.camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

  }
  setOrthographicCamera(fov, aspect, near, far){
    this.camera = new THREE.OrthographicCamera(fov, aspect, near, far);
    this.camera.position.set(200, 200, 200); //设置相机位置
    return this.camera
  }
  setPerspectiveCamera(fov, aspect, near, far){
    // const fov = 20
    // const near = 0.1
    // const far = 2000
    this.camera=new THREE.PerspectiveCamera(fov, aspect, near, far)
    this.camera.position.set(200, 200, 200); //设置相机位置
    this.camera.position.set(2,10, 0);
    this.camera.lookAt(1000, 10, 0);
    return this.camera
  }
}

export default CameraComponent;
