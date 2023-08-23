<script lang="ts" setup>
import * as THREE from "three";
import ppcThree from "./PPC/model/ppcThree";
import GLTFLoaderWrapper from "./PPC/model/GLTFLoaderWrapper";
import pCamera from "./PPC/model/cameraComponent";
import pLight from "./PPC/model/lightComponent";
import {ResourceTracker} from "./PPC/model/ResourceTracker";
import { useGUI } from "./hooks/useGui";
import TWEEN from "@tweenjs/tween.js";
// 引入CSS2渲染器CSS2DRenderer和CSS2模型对象CSS3DObject
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";
const resTracker = new ResourceTracker();
const track = resTracker.track.bind(resTracker)
const container = ref();
function setTweens(obj: any, newObj: any, duration = 1500) {
  var ro = new TWEEN.Tween(obj); //创建tween动画实例
  ro.to(newObj, duration); //变化后的对象以及动画持续时间
  ro.easing(TWEEN.Easing.Sinusoidal.InOut); //动画缓动函数
  ro.onUpdate(function () {}); //执行回调
  ro.start();
}
//移除three
let removeThree: any = undefined;
//移除gui
let removeGui: any = undefined;
/**
 * @desc 设置加载进度
 * @param
 * @return
 * @author ppc
 * @date 2023-07-27 17:16:12
 */
let process = reactive({
  xhr: 0,
  name: "",
});

/**
 * @desc 设置点击偏移
 * @param
 * @return
 * @author ppc
 * @date 2023-07-27 17:16:06
 */
function getElementOffset(element: any) {
  const rect = element.getBoundingClientRect();
  const bodyRect = document.body.getBoundingClientRect();

  const offsetX = rect.left - bodyRect.left;
  const offsetY = rect.top - bodyRect.top;

  return { offsetX, offsetY };
}

async function useThree() {
  //----start---基本设置
  let threeConfig = reactive({
    id: "three",
    width: 800,
    height: 600,
  });
  threeConfig.width = container.value.clientWidth;
  threeConfig.height = container.value.clientHeight;
  // 创建 ppcThree 实例
  let wrapper: any = track(new ppcThree());
  wrapper.init(threeConfig);
  wrapper.renderer?.setClearColor(0x000000, 1);
  // 使用示例
  let box = track(document.getElementById("three"));
  let offset: any = getElementOffset(box);
  //相机
  let _s: any = 150;
  let _k: any = threeConfig.width / threeConfig.height;
  let camera: any = await track(new pCamera());
  camera.setOrthographicCamera(-_s * _k, _s * _k, _s, -_s);

  //灯光
  let light: any = track(new pLight(0xffffff, 1));
  light.light.intensity = 20;
  light.addToScene(wrapper.scene);
  //----end---基本设置

  /**
   * @desc 模型加载
   * @param
   * @return
   * @author ppc
   * @date 2023-07-27 17:24:28
   */
  async function loadModel() {
    let gltf3: any = track(new GLTFLoaderWrapper(),'GLTFLoaderWrapper');

    let model3: any = await track(gltf3.loadModel(
      "./glb/YCK_Map_6.glb",
      "darc",
      function (xhr: any) {
        process.xhr = xhr.total
          ? (xhr.loaded / xhr.total) * 100
          : (xhr.loaded / 9465724) * 100;
        process.xhr = parseFloat(process.xhr.toFixed(2));
        process.name = xhr.url;
      }
    ));
    model3.scene.scale.set(5, 5, 5);
    wrapper.sceneAdd(model3.scene);
    model3.scene.position.set(0, 0, 0);
    const nameList = ["Car2_MESH", "Car3_MESH"];
    wrapper.cssHtmlInit()
    model3.scene?.traverse((mesh: any) => {
      if (!(mesh instanceof THREE.Mesh)) return undefined;
      if (!nameList.includes(mesh.name)) return undefined;
      // 创建一个HTML元素
      const htmlElement =track(document.createElement("div"));
      htmlElement.textContent = mesh.name;
      htmlElement.classList.add("dialog-mesh"); // 添加自定义的类名
      htmlElement.style.zIndex = '1'; // 设置z-index为较小值，让模型位于上层
   

      // 创建CSS3DObject，并将HTML元素嵌入到其中
      const cssObject = track(new CSS3DObject(htmlElement),'CSS3DObject');
      cssObject.position.set(0, 0, 0); // 设置在3D场景中的位置
      cssObject.scale.set(0.1, 0.1, 1); // 设置在3D场景中的位置
      
      mesh.add(cssObject);

      return undefined;
    });
  
    return {
      model3,
      
    };
  }
  let { model3 } = await loadModel();

  /**
   * @desc 点击事件
   * @param
   * @return
   * @author ppc
   * @date 2023-07-27 17:24:17
   */
  function onEquipmentClick(modelBox: any) {
    const equipmentList: any = [];
    let cheyiList: any = [];
    modelBox?.traverse((mesh: any) => {
      // if(mesh instanceof THREE.Group){
      //     mesh.position.y=-50
      // }
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

      if (!equipment.currentHex) {
        equipment.currentHex = equipment.material.color.getHex();
        equipment.material.color.setHex(0x00ff00);
      } else {
        equipment.material.color.setHex(equipment.currentHex);
        equipment.currentHex = undefined;
      }

      return undefined;
    };
    document.addEventListener("click", handler);
    return {
      handler,
    };
  }

  /**
   * @desc 控制面板
   * @param
   * @return
   * @author ppc
   * @date 2023-07-27 17:22:56
   */
  function setGui() {
    let { gui }: { gui: any } = track(useGUI(
      wrapper.scene,
      camera.camera,
      wrapper.renderer,
      light
    ));

    let folder = gui.value.addFolder("Custom Controls");

    // 创建一个自定义控制项
    const statsController = { stats: 1, id: "usePc" };
    const folderBox = folder.add(statsController, "stats").name("性能面板");
    folderBox.domElement.setAttribute("id", statsController.id);
    folderBox.domElement.children[0].style.display = "none";
    folderBox.domElement.parentElement.parentElement.style.height = "60px";
    // 将 stats.js 的 DOM 元素添加到控制项的 domElement 属性中
    // folder.add(statsController, 'stats').name('性能面板');
    wrapper.stats.dom.style = "position:relative";
    const usePc=track(document.getElementById("usePc"))
    usePc?.appendChild(wrapper.stats.dom);
    return {
      gui,
    };
  }

  // 释放 GLTF 模型
 

 
  /**
   * @desc 清除three
   * @param
   * @return
   * @author ppc
   * @date 2023-07-27 17:20:22
   */
  function remove() {
    document.removeEventListener("click", handler);
    wrapper.disposeThree();
    document.getElementById("usePc")?.remove();
    document.getElementById("three")?.remove();
  }

  // 使用封装的功能
  // wrapper.createCube();
  // 渲染场景
  wrapper.render(camera.camera);
  //注册事件
  const { handler } = onEquipmentClick(model3.scene);
  const { gui } = setGui();

  return {
    onEquipmentClick,
    remove,
    wrapper,
    gui,
  };
}

onMounted(async () => {
  const { remove, gui }: any = await useThree();
  removeThree = remove;
  removeGui = gui.value;
  // useMethods();
});
onBeforeUnmount(() => {
  removeThree();
  removeGui.destroy();
  container.value = "";
  removeThree = null;
  removeGui = null;
  resTracker.dispose()
});
onUnmounted(() => {});
</script>

<template>
  <div ref="container" id="three"></div>
  <!-- <div id="tag">标签内容</div> -->

  <div v-if="process.xhr < 100" class="progress" id="progress">
    <el-progress
      :text-inside="true"
      :stroke-width="26"
      :percentage="process.xhr"
    />

    <div>{{ process.name }}加载完成</div>
  </div>
</template>
<style scoped>
#three {
  width: 100vw;
  height: 100vh;
}
#tag {
  width: 20vw;
  height: 20vh;
  background-color: red;
}
.progress {
  position: absolute;
  z-index: 10;
  left: 30%;
  width: 50%;
  top: 50%;
}
</style>
<style>
.dialog-mesh {
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  color: #000;
  padding: 10px 20px;
  backface-visibility: hidden;
  font-size: 12px;
}
</style>
