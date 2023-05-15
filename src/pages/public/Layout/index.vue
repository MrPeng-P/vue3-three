<script lang="ts">
import { defineComponent } from 'vue';
import AppAside from './asider/aisder.vue';
import AppHeader from './header/header.vue'
import asideBgImage from '../../../assets/images/aside/aside-bg.jpg'
import { useRoute, useRouter } from 'vue-router';
import allStore from '@/store'

import { storeToRefs } from 'pinia';
export default defineComponent({
    components: {
        AppAside,
        AppHeader
    },
    setup() {
        const router = useRouter()
        const route = useRoute()
        
        console.log('%c ..........route,router.........','color:#31ef0e',route,router)
        const { menu } = allStore()
        const { menuData } = storeToRefs(menu)
        menu.$subscribe((mutation, state) => {
           console.log('%c ...........菜单变动啦........','color:#31ef0e',)
        })
        let menuList = menuData.value.menuList.children

        let modeType = ref(false) //导航栏显示位置
        let asiderData = reactive({//导航栏信息
            activeTextColor: '#ffd04b',
            bgColor: "rgba(0,0,0,0.2)",
            textColor: '#FFF',
            bgImage: asideBgImage
        })
        let headFrom = reactive({ //头部布局
            layoutList: [2,16, 6]
        })


        return {
            modeType,
            asiderData,
            menuList,
            headFrom
        }
    }
})

</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-aside  v-if="!modeType" class="aside-box">
                <AppAside :menuList="menuList"></AppAside>
            </el-aside>
            <el-container>
                <el-header class="hearder-box">
                    <AppHeader :headFrom="headFrom"></AppHeader>
                </el-header>
                <el-main>
                    <router-view v-slot="{ Component }">
                        <keep-alive>
                            <transition name="fade">
                                <component :is="Component" />
                            </transition>
                        </keep-alive>
                    </router-view>
                </el-main>
            </el-container>

        </el-container>

    </div>
</template>
<style scoped lang="scss">
.common-layout {
    width: 100%;
    height: 100%;
}

.aside-box {
    width: auto;
    background: $default;
    background: v-bind("'url(' + asiderData.bgImage + ')'");
    background-position: center;
    color: #000;
}

.hearder-box {
    background-color: black;
}
</style>