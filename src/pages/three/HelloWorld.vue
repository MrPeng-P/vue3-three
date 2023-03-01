<script setup lang="ts">
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { GUI } from "dat.gui";
import { ref } from 'vue'
import { ThreeGui } from './gui'

/**
   * @desc 基础形状 球 方形
   * @param 
   * @return 
   * @author ppc
   * @date 2022-09-16 22:24:52
   */
/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene();
// 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
var axisHelper = new THREE.AxesHelper(250); //AxesHelper 新版名
scene.add(axisHelper);
/**
 * 创建网格模型
 */
// //长方体 参数：长，宽，高
// var geometry = new THREE.BoxGeometry(100, 100, 100);
// // 球体 参数：半径60  经纬度细分数40,40
// var geometry = new THREE.SphereGeometry(60, 40, 40);
// // 圆柱  参数：圆柱面顶部、底部直径50,50   高度100  圆周分段数
// var geometry = new THREE.CylinderGeometry(50, 50, 100, 25);
// // 正八面体
// var geometry = new THREE.OctahedronGeometry(50);
// // 正十二面体
// var geometry = new THREE.DodecahedronGeometry(50);
// // 正二十面体
// var geometry = new THREE.IcosahedronGeometry(50);


// 平行光 太阳光
var directiona = new THREE.DirectionalLight(0xffffff)
scene.add(directiona);


/**
 * 相机设置
 */
var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
var k = width / height; //窗口宽高比
var s = 100; //三维场景显示范围控制系数，系数越大，显示的范围越大
//创建相机对象
var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200, 300, 200); //设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
/**
 * 创建渲染器对象
 */
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height); //设置渲染区域尺寸
renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
//执行渲染操作   指定场景、相机作为参数 

/**
 * @desc  鼠标 键盘 操作
 * @param 
 * @return 
 * @author ppc
 * @date 2022-09-18 20:02:06
 */
var clock = new THREE.Clock()
const myGui = new ThreeGui()
function render() {
  renderer.render(scene, camera); //执行渲染操作

  if (myGui.mixerList.length > 0) {
  const  clockValue=clock.getDelta()
    myGui.mixerList.forEach((mixer: any,index:number) => {
      mixer.update(clockValue)
    });

  }
  requestAnimationFrame(render)
}

render();


myGui.defaultScene(scene, '场地')

// 加载
const loader = new GLTFLoader();
loader.load('src/assets/glb/feiji.glb', function (gltf: GLTF) {
  console.log('控制台查看加载gltf文件返回的对象结构', gltf);

  gltf.scene.scale.set(3, 3, 3);
  gltf.scene.position.set(100, 100, 20)
  myGui.resolveGltf(gltf)
  myGui.defaultScene(gltf.scene, 'feiji')
  // 返回的场景对象gltf.scene插入到threejs场景中
  scene.add(gltf.scene);
}, function (xhr) {
  if (xhr.loaded / xhr.total == 1) {
  }
}, function (error) {

  console.log('An error happened');

})

loader.load('src/assets/glb/feiji.glb', function (gltf: GLTF) {
  console.log('控制台查看加载gltf文件返回的对象结构', gltf);

  gltf.scene.scale.set(3, 3, 3);
  gltf.scene.position.set(20, 20, 20)
  myGui.resolveGltf(gltf)
  myGui.defaultScene(gltf.scene, 'feiji2')
  // 返回的场景对象gltf.scene插入到threejs场景中
  scene.add(gltf.scene);
}, function (xhr) {
  if (xhr.loaded / xhr.total == 1) {
  }
}, function (error) {

  console.log('An error happened');

})

var controls = new OrbitControls(camera, renderer.domElement); //创建控件对象
controls.addEventListener('change', render); //监听鼠标、键盘事件

</script>

<template></template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
