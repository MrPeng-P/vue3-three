<script lang="ts" setup>
import * as THREE from "three";
import ppcThree from "./PPC/model/ppcThree";
import GLTFLoaderWrapper from "./PPC/model/GLTFLoaderWrapper";
import pCamera from "./PPC/model/cameraComponent";
import pLight from "./PPC/model/lightComponent";

import TWEEN from "@tweenjs/tween.js";
import { config } from "process";

const container = ref();
function setTweens(obj: any, newObj: any, duration = 1500) {
  var ro = new TWEEN.Tween(obj); //创建tween动画实例
  ro.to(newObj, duration); //变化后的对象以及动画持续时间
  ro.easing(TWEEN.Easing.Sinusoidal.InOut); //动画缓动函数
  ro.onUpdate(function () {}); //执行回调
  ro.start();
}
let wrapperThree:any=undefined
let threeConfig = reactive({
  id: "three",
  width: 800,
  height: 600,
});
function useMethods() {
  // 创建一个对象来存储键盘按键的状态
  const keyboard: any = {};

  // 监听键盘按下事件
  document.addEventListener("keydown", (event) => {
    keyboard[event.code] = true;
  });

  // 监听键盘释放事件
  document.addEventListener("keyup", (event) => {
    keyboard[event.code] = false;
  });

  // 在每帧更新函数中检查键盘状态并控制模型动画
  function updateAnimation() {
    if (keyboard["KeyA"]) {
      // 按下A键，执行某个动画动作
      // 例如：modelAnimationAction.play();
    }
    if (keyboard["KeyB"]) {
      // 按下B键，执行另一个动画动作
      // 例如：otherAnimationAction.play();
    }
    // ... 可以根据需要添加更多按键控制逻辑
  }
}

function getElementOffset(element: any) {
  const rect = element.getBoundingClientRect();
  const bodyRect = document.body.getBoundingClientRect();
  console.log("%c ..........rect.........", "color:#31ef0e", rect, bodyRect);

  const offsetX = rect.left - bodyRect.left;
  const offsetY = rect.top - bodyRect.top;

  return { offsetX, offsetY };
}

async function useThree() {
  // 创建 ppcThree 实例
  const wrapper = new ppcThree();
  wrapper.init(threeConfig);
  // 使用示例
  const box = document.getElementById("three"); // 替换 'box' 为您的盒子元素的 ID
  const offset = getElementOffset(box);
  console.log("Offset:", offset);
  //相机
  const _s = 150;
  const _k = threeConfig.width / threeConfig.height;
  const camera = await new pCamera();
  camera.setOrthographicCamera(-_s * _k, _s * _k, _s, -_s);

  // const camera = await new pCamera(50, _k, 0.1, 2000);
  // camera.addToScene(wrapper.scene);
  //灯光
  const light = new pLight(0xffffff, 1);
  light.addToScene(wrapper.scene);


  // 导入模型
  const gltf1 = new GLTFLoaderWrapper();
  const model = await gltf1.loadModel("./glb/feiji.glb", "",null);
  model.scene.scale.set(5, 5, 5);
  model.scene.position.set(120, 120, 120);

  // model.scene.traverse((node:any) => {
  //   if (node.isMesh) {
  //     // 将材质的wireframe属性设置为true
  //     node.material.wireframe = true;
  //   }
  // });

  wrapper.sceneAdd(model.scene);

  // const gltf2 = new GLTFLoaderWrapper(THREE);
  // const model2 = await gltf2.loadModel("./glb/feiji.glb");
  // model2.scene.scale.set(5, 5, 5);
  // model2.scene.position.set(120, 7, 7);
  // wrapper.sceneAdd(model2.scene);

  const gltf3 = new GLTFLoaderWrapper();
  const model3 = await gltf3.loadModel("./glb/Island.glb", "darc",null);
  model3.scene.scale.set(10, 10, 10);
  wrapper.sceneAdd(model3.scene);
  model3.scene.position.set(6, 6, 6);
  gltf3.setTraverse(model3);

  // 点击事件
  function onEquipmentClick(modelBox: any) {
    const equipmentList: any = [];
    modelBox?.traverse((mesh: any) => {
      if (!(mesh instanceof THREE.Mesh)) return undefined;
      const { material } = mesh;
      mesh.material = material.clone();
      equipmentList.push(mesh);
      return undefined;
    });
    const handler = (event: MouseEvent) => {
      const el = container.value as HTMLElement;
      const mouse = new THREE.Vector2(
        ((event.clientX - offset.offsetX) / el.offsetWidth) * 2 - 1,
        -((event.clientY - offset.offsetY) / el.offsetHeight) * 2 + 1
      );
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera.camera);
      const intersects = raycaster.intersectObject(modelBox, true);

      if (intersects.length <= 0) return undefined;
      const equipment = <any>intersects[0].object;
      if (!equipment) return undefined;
      equipmentList.forEach((child: any) => {
        child.material.emissive.setHex(child.currentHex);
      });
      console.log('%c ..........equipment.........','color:#31ef0e',equipment)
      equipment.currentHex =
        equipment.currentHex ?? equipment.material.emissive.getHex();
      equipment.material.emissive.setHex(0x00ff00);
      return undefined;
    };
    document.addEventListener("click", handler);
    onUnmounted(() => document.removeEventListener("click", handler));
  }
  function disposeThree(){
    wrapper.disposeThree()
  }
  // 使用封装的功能
  // wrapper.createCube();
  // 渲染场景
  wrapper.render(camera.camera);
 
  onEquipmentClick(model.scene);
  onEquipmentClick(model3.scene);

  return {
    onEquipmentClick,
    wrapper
  };
}
onMounted(() => {
  threeConfig.width = container.value.clientWidth;
  threeConfig.height = container.value.clientHeight;
  const { wrapper }:any=useThree();
  wrapperThree=wrapper
  // useMethods();
});
onBeforeUnmount(()=>{
  wrapperThree.disposeThree()
})
</script>

<template>
  <div ref="container" id="three" :style="threeConfig"></div>
</template>
<style scoped>
#three {
  width: 100vw;
  height: 100vh;
}
</style>
