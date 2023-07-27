import { ref, onMounted, onUnmounted } from "vue";
import * as dat from "dat.gui";
import * as THREE from "three";
export function useGUI(scene, camera, renderer, light = null) {
  const gui = ref(null);

  let guiInstance;

  const parameters = {
    rotationSpeed: 0.01,
    scale: 1,
    color: "#ff0000",
    toggleLight: true,
    useWireframe: false,
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
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  const useWireframe = guiInstance
    .add(parameters, "useWireframe")
    .name("线条模式");

  useWireframe.onChange((value) => {
    // 更新场景参数
    scene.traverse((child) => {
      if (
        child.name.indexOf("car") !== -1 
      ) {
        if (child.isMesh) {
          child.material.wireframe = value;
          // child.material.color.set(parameters.color)
          // child.material.color=0xffffff
          // child.material=new THREE.MeshBasicMaterial({
          //   color: 0xffffff,
          //   wireframe: value,
          // });
        }
      }
    });
  });
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
        console.log('%c ..........child.........','color:#31ef0e',child)
      if (
        child.name.indexOf("car") !== -1 
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
    console.log("toggleLight changed:", light,value);
    //操作灯光
    if (light) {
      light.light.visible = value;
    }
  });

  return { gui };
}
