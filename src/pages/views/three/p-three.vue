<script  lang="ts">
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { pThree } from './Three'
const PThree = defineComponent({
    setup() {
        let three: any = null
        let threeConfig = reactive({
            id:'three',
            width: 400,
            height: 300
        })
        onMounted(() => {
            three = new pThree(threeConfig)
            allMethods.loadFeiJi()
            allMethods.loadFeiJi2()
        })

        const allMethods = {
            async loadFeiJi() {
                let loaderModel: any = await three.loader('./glb/feiji.glb', { key: 'feiji' })
                loaderModel.scene.position.set(120, 120, 120)
            },
            async loadFeiJi2() {
                let loaderModel: any = await three.loader('./glb/feiji.glb', { key: 'feiji2' })
                loaderModel.scene.scale.set(6, 6, 6);
            }
        }

        return {
            threeConfig,
            ...allMethods
        }
    }
})
export default PThree
</script>

<template>
    <div id="three" :style="threeConfig"></div>
</template>


<style scoped>
.read-the-docs {
    color: #888;
}
</style>