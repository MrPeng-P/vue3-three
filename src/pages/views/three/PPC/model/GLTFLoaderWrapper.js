import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

class GLTFLoaderWrapper {
  three;
  animationFrameId;
  constructor(THREE) {
    this.loader = new GLTFLoader();
    this.THREE = THREE;
    this.mixer = null;
    this.clock = new THREE.Clock();
    this.animationActions = [];
  }
  /**
   * @desc 加载模型
   * @param {url} 文件地址
   * @return
   * @author ppc
   * @date 2023-06-27 15:29:24
   */
  loadModel(url) {
    return new Promise((resolve, reject) => {
      this.loader.load(
        url,
        (gltf) => {
          this.setAnimate(gltf);

          gltf.scene.traverse((object) => {
            if (object.isSkinnedMesh) {
              // 获取骨骼对象
              const skeleton = object.skeleton;
              // 显示骨骼
              showSkeleton(skeleton);
            }
          });
          // 加载成功，将 gltf 对象传递给 resolve
          resolve(gltf);
        },
        undefined,
        function (error) {
          // 加载出错，将错误对象传递给 reject
          reject(error);
        }
      );
    });
  }

  showSkeleton(skeleton) {
    const boneLines = new THREE.Group();
  
    // 遍历骨骼的骨头
    skeleton.bones.forEach((bone) => {
      // 获取骨骼的父骨头
      const parentBone = bone.parent;
      console.log('%c ..........parentBone.........','color:#31ef0e',parentBone)
  
      if (parentBone) {
        // 创建线条的几何体
        const boneGeometry = new THREE.Geometry();
        boneGeometry.vertices.push(bone.position);
        boneGeometry.vertices.push(parentBone.position);
  
        // 创建线条的材质
        const boneMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
  
        // 创建线条对象
        const boneLine = new THREE.LineSegments(boneGeometry, boneMaterial);
        boneLines.add(boneLine);
      }
    });
  
    // 将骨骼线条对象添加到场景中
    scene.add(boneLines);
  }

  
  /**
   * @desc 初始化动画
   * @param {gltf}模型
   * @return 
   * @author ppc
   * @date 2023-06-27 15:31:48
  */
  setAnimate(gltf) {
    const animations = gltf.animations;
    this.mixer = new this.THREE.AnimationMixer(gltf.scene);
    for (let i = 0; i < animations.length; i++) {
      const animation = animations[i];
      const action = this.mixer.clipAction(animation);
      action.play();
      this.animationActions.push(action);
      this.animate();
    }
  }
  /**
   * @desc 加载动画
   * @param
   * @return
   * @author ppc
   * @date 2023-06-27 15:29:51
   */
  animate() {
    this.animationFrameId && cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
    const deltaTime = this.clock.getDelta();
    this.mixer.update(deltaTime);
  }
}

export default GLTFLoaderWrapper;
