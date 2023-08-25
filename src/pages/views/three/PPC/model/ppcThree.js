import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { OutlinePass } from "three/addons/postprocessing/OutlinePass.js";
import Stats from "stats.js";
import { ResourceTracker } from "./ResourceTracker";
import TWEEN from '@tweenjs/tween.js';
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';
class ppcThree {
  renderer;
  composer;
  camera;
  previousTime = 0;
  controls;
  animationFrameId;
  cssRenderer;
  css2Renderer;
  objectPosition = 0; // 示例中以对象的位置作为动画的变化示例
  constructor() {
    this.resTracker = new ResourceTracker();
    this.track = this.resTracker.track.bind(this.resTracker);
    this._scene = new THREE.Scene();
    // this._axisHelper = new THREE.AxesHelper(250); //AxesHelper 新版名
    // this._scene.add(this._axisHelper);

    // ...
  }
  init(threeConfig) {
    this.threeConfig = threeConfig;
    // 初始化 Three.js

    this.renderer = this.track(
      new THREE.WebGLRenderer({
        antialias: true, // 禁用抗锯齿
        precision: "highp", // 设置渲染精度为高精度
        alpha: true, // 启用透明背景
        depth: true, // 启用深度缓冲
        preserveDrawingBuffer:true, //想把canvas画布上内容下载到本地，需要设置为true
      })
    );
    this.renderer.setSize(threeConfig.width, threeConfig.height);
    this.stats = this.track(new Stats({ autoPlace: false }));
    this.stats.showPanel(0); // 0 表示显示性能面板，1 表示显示内存面板，2 表示显示渲染面板

    this.optimization();
    this.renderer.setClearColor(0xcccccc, 1); //设置背景颜色
    document
      .getElementById(threeConfig.id)
      ?.appendChild(this.renderer.domElement);
  }
  async cssHtmlInit() {
    this.cssRenderer = await this.track(new CSS3DRenderer(), "CSS3DRenderer");
    this.cssRenderer.setSize(this.threeConfig.width, this.threeConfig.height);
    this.cssRenderer.domElement.style.position = "absolute";
    this.cssRenderer.domElement.style.top = "0px";
    //设置.pointerEvents=none，解决HTML元素标签对threejs canvas画布鼠标事件的遮挡
    this.cssRenderer.domElement.style.pointerEvents = "none";
    document
      .getElementById(this.threeConfig.id)
      .appendChild(this.cssRenderer.domElement);

    // window.onresize = function () {

    //   this.cssRenderer.setSize(this.threeConfig.width, this.threeConfig.height);
    // };
  }
  async css2HtmlInit(){
    this.css2Renderer = await this.track(new CSS2DRenderer(), "CSS2DRenderer");
    this.css2Renderer.setSize(this.threeConfig.width, this.threeConfig.height);
    this.css2Renderer.domElement.style.position = "absolute";
    this.css2Renderer.domElement.style.top = "0px";
    //设置.pointerEvents=none，解决HTML元素标签对threejs canvas画布鼠标事件的遮挡
    this.css2Renderer.domElement.style.pointerEvents = "none";
    document
      .getElementById(this.threeConfig.id)
      .appendChild(this.css2Renderer.domElement);

  }
  
  // 优化
  optimization() {
    // antialias 抗锯齿
    //可以提高渲染的精度和质量 setPixelRatio
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }
  get controls() {
    return this.controls;
  }
  get scene() {
    return this._scene;
  }
  get renderer() {
    return this.renderer;
  }
  createCube() {
    const geometry = this.track(new THREE.BoxGeometry(1, 1, 1));
    const material = this.track(
      new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    );
    const cube = this.track(new THREE.Mesh(geometry, material));
    this._scene.add(cube);
  }
  sceneAdd(val) {
    this._scene.add(val);
  }
  renderAll(camera, event) {
    this.stats.begin(); // 开始统计性能
    TWEEN.update();
    this.animationFrameId && cancelAnimationFrame(this.animationFrameId);
    this.cssRenderer && this.cssRenderer.render(this._scene, camera);
    this.css2Renderer && this.css2Renderer.render(this._scene, camera);
    
    this.renderer.render(this._scene, camera);
    this.animationFrameId = requestAnimationFrame(
      this.renderAll.bind(this, camera)
    );

    this.stats.end(); // 结束统计性能
  }
  render(camera) {
    this.camera = camera;

    this.controls = this.track(
      new OrbitControls(camera, this.renderer.domElement)
    ); //创建控件对象

    this.useComposer();
    this.renderAll(camera, false);
  }
  useComposer() {
    this.composer = this.track(new EffectComposer(this.renderer));
    this.composer.setSize(this.threeConfig.width, this.threeConfig.height);
    const renderPass = this.track(new RenderPass(this._scene, this.camera));
    this.composer.addPass(renderPass);
  }
  useEffectComposer() {
    const outlinePass = this.track(
      new OutlinePass(
        new THREE.Vector2(this.threeConfig.width, this.threeConfig.height),
        this._scene,
        this.camera
      )
    );
    outlinePass.edgeStrength = 2;
    outlinePass.edgeGlow = 1;
    outlinePass.visibleEdgeColor.set(0xffffff);
    outlinePass.hiddenEdgeColor.set(0xffffff);

    this.composer.addPass(outlinePass);
  }
  getAllTextures() {
    const textures = [];

    this._scene.traverse((object) => {
      if (object.isMesh && object.material && object.material.map) {
        // 检查对象的材质是否使用了纹理
        textures.push(object.material.map);
      }
    });

    return textures;
  }

  disposeThree() {
    this.resTracker.dispose();
    this.controls.removeEventListener(
      "change",
      this.renderAll.bind(this, this.camera, true)
    );

    cancelAnimationFrame(this.animationFrameId);
    //  // 清空场景
    console.log("%c ..........this._scene.........", "color:red", this._scene);
    while (this._scene.children.length > 0) {
      this._scene.remove(this._scene.children[0]);
    }
    this._scene.traverse((object) => {
      if (object.isMesh) {
        object.geometry.dispose();
        object.material.dispose();
        object.material = null;
        object.geometry.dispose();
        object.geometry = null;

        if (object.material?.map) {
          object.material.map.dispose();
          object.material.map = null;
        }
      }
    });
    this.resTracker = null;
    this.track = null;
    this.cssRenderer = null;
    this.renderer = null;
    this._scene = null;
    this.composer = null;
    this.camera = null;
    this.stats = null;
    this.threeConfig = {};
    this.animationFrameId = null;
    this.controls = null;
  }
}

export default ppcThree;
