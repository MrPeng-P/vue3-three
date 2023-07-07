import * as THREE from 'three';

// 灯光组件类
class LightComponent {
  light;
  constructor(color, intensity) {
    this.color = color;
    this.intensity = intensity;
    this.light = new THREE.DirectionalLight(this.color, this.intensity);
    this.light.intensity=1
  }
  get light(){
    return this.light
  }
  addToScene(scene) {
    scene.add(this.light);
  }
}
export default LightComponent;
