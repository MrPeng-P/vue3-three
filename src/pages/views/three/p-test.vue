<script lang="ts" setup>
import * as THREE from "three";
import ppcThree from "./PPC/model/ppcThree";
import GLTFLoaderWrapper from "./PPC/model/GLTFLoaderWrapper";
import pCamera from "./PPC/model/cameraComponent";
import pLight from "./PPC/model/lightComponent";
import { useGUI } from "./hooks/useGui";
import TWEEN from "@tweenjs/tween.js";

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
function useDom() {
  // 创建场景、相机等，省略部分代码...

  // 创建一个模型内的物体
  const boxGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

  // 设置物体在模型内的初始位置
  boxMesh.position.set(-3, 1.6,6);

  // 监听键盘按键事件
  document.addEventListener("keydown", (event) => {
    // 获取按下的按键
    const key = event.key.toLowerCase();

    // 根据按键更新物体的位置
    switch (key) {
      case "arrowup":
        boxMesh.position.y += 0.1; // 向上移动物体
        break;
      case "arrowdown":
        boxMesh.position.y -= 0.1; // 向下移动物体
        break;
      case "arrowleft":
        boxMesh.position.x -= 0.1; // 向左移动物体
        break;
      case "arrowright":
        boxMesh.position.x += 0.1; // 向右移动物体
        break;
    }
  });
  return {
    boxMesh,
  };
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
  let wrapper: any = new ppcThree();
  wrapper.init(threeConfig);
  wrapper.renderer?.setClearColor(0x000000, 1);
  // 使用示例
  let box = document.getElementById("three");
  let offset: any = getElementOffset(box);
  //相机
  let _s: any = 100;
  let _k: any = threeConfig.width / threeConfig.height;
  let camera: any = await new pCamera();
  let PerspectiveCamera = camera.setPerspectiveCamera(100, _k, 0.1, 1000);
  PerspectiveCamera.position.set(-26, 7, 0);
  PerspectiveCamera.lookAt(-3, 1.6,6);

  //灯光
  let light: any = new pLight(0xffffff, 1);
  light.light.intensity = 20;
  light.addToScene(wrapper.scene);
  //----end---基本设置
  const {boxMesh}=useDom()
  /**
   * @desc 模型加载
   * @param
   * @return
   * @author ppc
   * @date 2023-07-27 17:24:28
   */
  async function loadModel() {
    let gltf3: any = new GLTFLoaderWrapper();

    let model3: any = await gltf3.loadModel(
      "./glb/fang/fang.gltf",
      "darc",
      function (xhr: any) {
        process.xhr = xhr.total
          ? (xhr.loaded / xhr.total) * 100
          : (xhr.loaded / 9465724) * 100;
        process.xhr = parseFloat(process.xhr.toFixed(2));
        process.name = xhr.url;
      }
    );
    model3.scene.scale.set(5, 5, 5);
    wrapper.sceneAdd(model3.scene);
    model3.scene.position.set(0, 0, 0);
    model3.scene.add(boxMesh)
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

  /**
   * @desc 控制面板
   * @param
   * @return
   * @author ppc
   * @date 2023-07-27 17:22:56
   */
  function setGui() {
    let { gui }: { gui: any } = useGUI(
      wrapper.scene,
      camera.camera,
      wrapper.renderer,
      light
    );

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
    document.getElementById("usePc")?.appendChild(wrapper.stats.dom);
    return {
      gui,
    };
  }

  // 释放 GLTF 模型
  function releaseModel(gltf: any) {
    if (model3) {
      // 移除模型对象
      wrapper.scene.remove(model3.scene);

      // 清理模型的几何体和材质资源
      model3.scene.traverse((child: any) => {
        if (child.isMesh) {
          child.geometry.dispose();
          child.material.dispose();
          child.material = null;
          child.geometry = null;

          if (child.material?.map) {
            child.material.map.dispose();
            child.material.map = null;
          }
        }
        if (child.isGroup || child.isObject3D) {
          clearObject3D(child);
        }
      });

      // 清空场景列表
      model3.scenes.length = 0;
      model3.parser.cache.removeAll();
      // 将模型对象置为 null，帮助垃圾回收
      model3 = null;
    }
  }

  function clearObject3D(object: any) {
    const childrenToRemove: any = [];

    // Mark all the children to be removed
    object.children.forEach((child: any) => {
      if (child.isGroup || child.isObject3D) {
        clearObject3D(child);
        childrenToRemove.push(child);
      } else if (child.isMesh) {
        child.geometry.dispose();
        child.material.dispose();
        if (child.material.map) {
          child.material.map.dispose();
        }
      }
    });

    // Remove the marked children from the parent object
    childrenToRemove.forEach((child: any) => {
      object.remove(child);
    });
  }
  /**
   * @desc 清除three
   * @param
   * @return
   * @author ppc
   * @date 2023-07-27 17:20:22
   */
  function remove() {
    document.removeEventListener("click", handler);
    releaseModel(model3);
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
});
onUnmounted(() => {});
</script>

<template>
  <div ref="container" id="three"></div>

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
.progress {
  position: absolute;
  z-index: 10;
  left: 30%;
  width: 50%;
  top: 50%;
}
</style>
