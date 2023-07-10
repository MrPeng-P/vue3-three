import { ref, onMounted, onUnmounted } from "vue";
import * as dat from "dat.gui";
import * as THREE from "three";
export function useGUI(scene, camera, renderer) {
  const gui = ref(null);

  let guiInstance;

  const parameters = {
    rotationSpeed: 0.01,
    scale: 1,
    color: "#ff0000",
    toggleLight: true,
  };

  guiInstance = new dat.GUI();
  gui.value = guiInstance;

  // 添加控制项到 GUI
  const rotationSpeedController = guiInstance
    .add(parameters, "rotationSpeed", 0, 0.1)
    .name("旋转速度");
  const scaleController = guiInstance
    .add(parameters, "scale", 0.1, 2)
    .name("缩放比例");
  const colorController = guiInstance
    .addColor(parameters, "color")
    .name("颜色");
  const toggleLightController = guiInstance
    .add(parameters, "toggleLight")
    .name("开关灯光");

  // 监听控制项的值变化
  rotationSpeedController.onChange((value) => {
    // 当 rotationSpeed 值发生变化时执行的逻辑
    console.log("rotationSpeed changed:", value);
    scene.rotation.y += parameters.rotationSpeed;
    renderer.render(scene, camera);
  });

  scaleController.onChange((value) => {
    // 当 scale 值发生变化时执行的逻辑
    console.log("scale changed:", value);
    scene.scale.set(parameters.scale, parameters.scale, parameters.scale);
    renderer.render(scene, camera);
  });

  colorController.onChange((value) => {
    // 当 color 值发生变化时执行的逻辑
    console.log("color changed:", value);
    // 更新场景参数
    scene.traverse((child) => {
      if (
        child.name.indexOf("Object") !== -1 &&
        child.name.split("_")[1] >= 46 &&
        child.name.split("_")[1] <= 52
      ) {
        if (child.isMesh) {
          child.material.color.set(parameters.color);
          renderer.render(scene, camera);
        }
      }
    });
  });

  toggleLightController.onChange((value) => {
    // 当 toggleLight 值发生变化时执行的逻辑
    console.log("toggleLight changed:", value);
  });

  return { gui };
}
