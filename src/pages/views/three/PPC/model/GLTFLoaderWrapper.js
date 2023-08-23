import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import * as THREE from "three";

class GLTFLoaderWrapper {
  three;
  animationFrameId;
  gltf;
  constructor() {
    this.loader = new GLTFLoader();
    this.darcloader = new DRACOLoader();
    //进度加载工具
    this.manager = new THREE.LoadingManager();
    //draco文件加载
    this.darcloader.setDecoderPath("./glb/draco/");
    this.darcloader.setDecoderConfig({ type: "js" });
    this.darcloader.preload();
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
  loadModel(url, type, progressCallback) {
    if (type) {
      this.loader.setDRACOLoader(this.darcloader);
    }

    return new Promise((resolve, reject) => {
      this.manager.onProgress = (url, itemsLoaded, itemsTotal) => {
        const progress = itemsLoaded / itemsTotal;
        console.log(`Loading progress: ${progress * 100}%` + url);

        progressCallback &&
          progressCallback({
            loaded: itemsLoaded,
            total: itemsTotal,
            url: url,
          });
      };
      this.manager.onLoad = () => {
        console.log("Loading completed.");
      };
      this.manager.onError = (url) => {
        console.error(`Error loading GLTF: ${url}`);
        reject();
      };
      this.loader.manager = this.manager;
      this.loader.load(
        url,
        (gltf) => {
          this.gltf=gltf
          this.initAnimate(gltf);
          // this.setWireframeMode(gltf.scene)
          // // this.simplifyModel(gltf.scene);
          // gltf.scene.traverse((object) => {
          //   if (object.isSkinnedMesh) {
          //     // 获取骨骼对象
          //     const skeleton = object.skeleton;
          //     // 显示骨骼
          //     this.showSkeleton(skeleton);
          //   }
          // });
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
  /**
   * @desc 开启线条模式
   * @param
   * @return
   * @author ppc
   * @date 2023-07-27 15:37:48
   */
  setWireframeMode(model,wireframe=true) {
    model.traverse((child) => {
      if (child.isMesh) {
        const material = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: wireframe,
        });
        child.material = material;
      }
    });
  }

  showSkeleton(skeleton) {
    const boneLines = new THREE.Group();

    // 遍历骨骼的骨头
    skeleton.bones.forEach((bone) => {
      // 获取骨骼的父骨头
      const parentBone = bone.parent;
      console.log(
        "%c ..........parentBone.........",
        "color:#31ef0e",
        parentBone
      );

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
  setTraverse(model) {
    //疑问点 可能造成内存泄漏
    model.scene.traverse((child) => {
      if (child.isMesh) {
        const material = child.material;
        // 检查材质类型，例如MeshStandardMaterial或MeshBasicMaterial
        if (material) {
          // 增加自发光亮度
          material.emissiveIntensity = 2.0; // 调整亮度的值根据需求进行适当的增加
        }
      }
    });
  }
  setAnimate() {}

  /**
   * @desc 初始化动画
   * @param {gltf}模型
   * @return
   * @author ppc
   * @date 2023-06-27 15:31:48
   */
  initAnimate(gltf) {
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
  
  remove() {
    if (this.mixer) {
      // 遍历所有动画片段，并依次移除
      this.gltf.animations.forEach((clip) => {
        this.mixer.uncacheClip(clip);
      });
      this.mixer = null;
    }
  
    cancelAnimationFrame(this.animationFrameId)
    this.gltf=null
    this.loader = null;
    this.darcloader = null;
    this.animationFrameId=null
    this.THREE = null;
    this.clock = null;
    this.animationActions = [];
  }
}

export default GLTFLoaderWrapper;
