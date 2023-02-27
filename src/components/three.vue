<script setup lang="ts">
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { pThree } from './Three'
const three = new pThree()

const allMethods = {
    async loadFeiJi() {
        let loaderModel: any = await three.loader('src/assets/glb/feiji.glb',{key:'feiji'})
        loaderModel.scene.position.set(120, 120, 120)
    },
    async loadFeiJi2() {
        let loaderModel: any = await three.loader('src/assets/glb/feiji.glb',{key:'feiji2'})
        loaderModel.scene.scale.set(6, 6, 6);
    }
}
allMethods.loadFeiJi()
allMethods.loadFeiJi2()
</script>

<template></template>


<style scoped>
.read-the-docs {
    color: #888;
}
</style>