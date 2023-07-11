import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { OutlinePass } from "three/addons/postprocessing/OutlinePass.js";
import Stats from "stats.js";
import { useGUI } from "../../hooks/useGui";

import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
class ppcThree {
  renderer;
  composer;
  camera;
  previousTime = 0;
  animationFrameId;
  objectPosition = 0; // 示例中以对象的位置作为动画的变化示例
  constructor() {
    this._scene = new THREE.Scene();
    // this._axisHelper = new THREE.AxesHelper(250); //AxesHelper 新版名
    // this._scene.add(this._axisHelper);

    // ...
  }
  init(threeConfig) {
    this.threeConfig = threeConfig;
    // 初始化 Three.js
    this.renderer = new THREE.WebGLRenderer({
      antialias: true, // 禁用抗锯齿
      precision: "highp", // 设置渲染精度为高精度
      alpha: true, // 启用透明背景
      depth: true, // 启用深度缓冲
    });
    this.renderer.setSize(threeConfig.width, threeConfig.height);
    this.stats = new Stats({ autoPlace: false });
    this.stats.showPanel(0); // 0 表示显示性能面板，1 表示显示内存面板，2 表示显示渲染面板

    this.optimization();
    this.renderer.setClearColor(0xcccccc, 1); //设置背景颜色
    document
      .getElementById(threeConfig.id)
      ?.appendChild(this.renderer.domElement);
  }
  // 优化
  optimization() {
    // antialias 抗锯齿
    //可以提高渲染的精度和质量 setPixelRatio
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }
  get scene() {
    return this._scene;
  }
  get renderer() {
    return this.renderer;
  }
  createCube() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    this._scene.add(cube);
  }
  sceneAdd(val) {
    this._scene.add(val);
  }
  renderAll(camera, event) {
    this.stats.begin(); // 开始统计性能

    this.animationFrameId && cancelAnimationFrame(this.animationFrameId);

    this.renderer.render(this._scene, camera);
    this.animationFrameId = requestAnimationFrame(
      this.renderAll.bind(this, camera)
    );
    this.stats.end(); // 结束统计性能
  }
  render(camera) {
    this.camera = camera;
    // const { gui } = useGUI(this.scene, camera.camera, this.renderer);
    // const folder = gui.value.addFolder("Custom Controls");

    // // 创建一个自定义控制项
    // const statsController = { stats: 1, id: "usePc" };
    // const folderBox = folder.add(statsController, "stats").name("性能面板");
    // folderBox.domElement.setAttribute("id", statsController.id);
    // folderBox.domElement.children[0].style.display = "none";
    // folderBox.domElement.parentElement.parentElement.style.height = "60px";
    // // 将 stats.js 的 DOM 元素添加到控制项的 domElement 属性中
    // // folder.add(statsController, 'stats').name('性能面板');
    // this.stats.dom.style = "position:relative";
    // document.getElementById("usePc").appendChild(this.stats.dom);
    const controls = new OrbitControls(camera, this.renderer.domElement); //创建控件对象
    controls.addEventListener("change", () => {
      this.renderAll.bind(this, camera, true)();
    }); //监听鼠标、键盘事件
    this.useComposer();
    this.renderAll(camera, false);
  }
  useComposer() {
    this.composer = new EffectComposer(this.renderer);
    this.composer.setSize(this.threeConfig.width, this.threeConfig.height);
    const renderPass = new RenderPass(this._scene, this.camera);
    this.composer.addPass(renderPass);

    // const fxaaPass = new ShaderPass(THREE.FXAAShader);
    // fxaaPass.material.uniforms["resolution"].value.set(
    //   1 / this.threeConfig.width,
    //   1 / this.threeConfig.height
    // );
    // composer.addPass(fxaaPass);
    // this.useEffectComposer()
  }
  useEffectComposer() {
    const outlinePass = new OutlinePass(
      new THREE.Vector2(this.threeConfig.width, this.threeConfig.height),
      this._scene,
      this.camera
    );
    outlinePass.edgeStrength = 2;
    outlinePass.edgeGlow = 1;
    outlinePass.visibleEdgeColor.set(0xffffff);
    outlinePass.hiddenEdgeColor.set(0xffffff);
    // outlinePass.edgeStrength = 3;
    // outlinePass.edgeGlow = 0.5;
    // outlinePass.edgeThickness = 1;
    // outlinePass.pulsePeriod = 0;
    this.composer.addPass(outlinePass);
  }

  disposeThree() {
    cancelAnimationFrame(this.animationFrameId);
     // 清空场景
     while (this._scene.children.length > 0) {
      this._scene.remove(this._scene.children[0]);
    }

    this.renderer.dispose();
    this.renderer=null
    this._scene = null;
   
  }
}

export default ppcThree;
