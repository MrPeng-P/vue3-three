<script lang="ts" setup>
import * as THREE from "three";
import ppcThree from "./PPC/model/ppcThree";
import GLTFLoaderWrapper from "./PPC/model/GLTFLoaderWrapper";
import pCamera from "./PPC/model/cameraComponent";
import pLight from "./PPC/model/lightComponent";
import { useGUI } from "./hooks/useGui";
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
let wrapperThree: any = undefined;
let guiThree: any = undefined;
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

  const offsetX = rect.left - bodyRect.left;
  const offsetY = rect.top - bodyRect.top;

  return { offsetX, offsetY };
}

async function useThree() {
  // 创建 ppcThree 实例
  const wrapper = new ppcThree();
  wrapper.init(threeConfig);
  wrapper.renderer?.setClearColor(0x000000, 1);
  // 使用示例
  const box = document.getElementById("three"); // 替换 'box' 为您的盒子元素的 ID
  const offset = getElementOffset(box);
  //相机
  const _s = 150;
  const _k = threeConfig.width / threeConfig.height;
  const camera = await new pCamera();
  camera.setOrthographicCamera(-_s * _k, _s * _k, _s, -_s);

  // const camera = await new pCamera(50, _k, 0.1, 2000);
  // camera.addToScene(wrapper.scene);
  //灯光
  const light = new pLight(0xffffff, 1);
  light.light.intensity = 20;
  light.addToScene(wrapper.scene);

  const gltf3 = new GLTFLoaderWrapper(THREE);
  const model3 = await gltf3.loadModel("./glb/car/car.gltf", "darc");
  model3.scene.scale.set(5, 5, 5);
  wrapper.sceneAdd(model3.scene);
  model3.scene.position.set(6, 6, 6);
  gltf3.setTraverse(model3);

  // 点击事件
  function onEquipmentClick(modelBox: any) {
    const equipmentList: any = [];
    let cheyiList: any = [];
    modelBox?.traverse((mesh: any) => {
      if (!(mesh instanceof THREE.Mesh)) return undefined;
      const { material } = mesh;
      mesh.material = material.clone();
      equipmentList.push(mesh);

      if (mesh.name.split("_")[1] >= "46" && mesh.name.split("_")[1] <= "52") {
        cheyiList.push(mesh);
      }
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

      if (
        equipment.name.split("_")[1] >= 46 &&
        equipment.name.split("_")[1] <= 52
      ) {
        cheyiList.forEach((child: any) => {
          child.currentHex =
            child.currentHex ?? child.material.emissive.getHex();
          child.material.emissive.setHex(0x00ff00);
        });
      } else {
        equipment.currentHex =
          equipment.currentHex ?? equipment.material.emissive.getHex();
        equipment.material.emissive.setHex(0x00ff00);
      }

      return undefined;
    };
    document.addEventListener("click", handler);
    return {
      handler,
    };
  }

  // 使用封装的功能
  // wrapper.createCube();
  // 渲染场景
  wrapper.render(camera.camera);
  const { handler } = onEquipmentClick(model3.scene);

  const { gui }: { gui: any } = useGUI(
    wrapper.scene,
    camera.camera,
    wrapper.renderer
  );
  guiThree = gui.value;
  const folder = gui.value.addFolder("Custom Controls");

  // 创建一个自定义控制项
  const statsController = { stats: 1, id: "usePc" };
  const folderBox = folder.add(statsController, "stats").name("性能面板");
  folderBox.domElement.setAttribute("id", statsController.id);
  folderBox.domElement.children[0].style.display = "none";
  folderBox.domElement.parentElement.parentElement.style.height = "60px";
  // 将 stats.js 的 DOM 元素添加到控制项的 domElement 属性中
  // folder.add(statsController, 'stats').name('性能面板');
  wrapper.stats.dom.style = "position:relative";
  document.getElementById("usePc")?.appendChild(wrapper.stats.dom);

  function remove() {
    document.removeEventListener("click", handler);
    wrapper.disposeThree();
  }
  return {
    onEquipmentClick,
    remove,
    wrapper,
  };
}

onMounted(async () => {
  threeConfig.width = container.value.clientWidth;
  threeConfig.height = container.value.clientHeight;
  const { remove }: any = await useThree();
  wrapperThree = remove;
  // useMethods();
});
onBeforeUnmount(() => {
  wrapperThree();
  guiThree.destroy();
});
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
