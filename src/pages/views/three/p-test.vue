<script lang="ts" setup>
import * as THREE from "three";
import ppcThree from "./PPC/model/ppcThree";
import GLTFLoaderWrapper from "./PPC/model/GLTFLoaderWrapper";
import pCamera from "./PPC/model/cameraComponent";
import pLight from "./PPC/model/lightComponent";
let threeConfig = reactive({
  id: "three",
  width: 800,
  height: 600,
});
async function useThree() {
  // 创建 ppcThree 实例
  const wrapper = new ppcThree();
  wrapper.init(threeConfig);
  //相机
  const _s = 100;
  const _k = threeConfig.width / threeConfig.height;
  const camera = await new pCamera(-_s * _k, _s * _k, _s, -_s);
  // camera.addToScene(wrapper.scene);
  //灯光
  const light = new pLight(0xffffff, 1);
  light.addToScene(wrapper.scene);
  const gltf1 = new GLTFLoaderWrapper(THREE);
  const model = await gltf1.loadModel("./glb/feiji.glb");
  model.scene.scale.set(5, 5, 5);
  model.scene.position.set(6, 6, 6);
  wrapper.sceneAdd(model.scene);
  const gltf2 = new GLTFLoaderWrapper(THREE);
  const model2 = await gltf2.loadModel("./glb/feiji.glb");
  model2.scene.scale.set(5, 5, 5);
  model2.scene.position.set(120, 7, 7);
  wrapper.sceneAdd(model2.scene);
  // 使用封装的功能
  // wrapper.createCube();
  // 渲染场景
  wrapper.render(camera.camera);
}
onMounted(() => {
  useThree();
});
</script>

<template>
  <div id="three" :style="threeConfig"></div>
</template>
<style scoped></style>
