<script lang="ts">
import { defineComponent } from 'vue';
import AppAside from './asider/aisder.vue';
import AppHeader from './header/header.vue'
import AppMeta from './header/appMeta.vue'
import asideBgImage from '../../../assets/images/aside/aside-bg.jpg'
import { useRoute, useRouter } from 'vue-router';
import allStore from '@/store'
import configuration from './components/configuration.vue'
import { storeToRefs } from 'pinia';
import { routerConfig, routes } from '@/router/router';
export default defineComponent({
    components: {
        AppAside,
        AppHeader,
        configuration,
        AppMeta
    },
    setup() {
        const routeList: any = routes[0].children
        const router = useRouter()
        const route = useRoute()
        // 不许缓存 暂定 操作
        let excludeList: any = reactive(['p-car','p-showings','p-test','p-city','t-test'])
        routeList.map((item: any) => {
            if (item.path.includes('operate')) {
                excludeList.push(item.path.split('p-')[1])
            }
            
            return
        })
        const { menu ,setting} = allStore()
        const { sizeData } = setting

        const { menuData } = storeToRefs(menu)

        let menuList = menuData.value.menuList
        let modeType = ref(false) //导航栏显示位置
        let asiderData = reactive({//导航栏信息
            activeTextColor: '#ffd04b',
            bgColor: "rgba(0,0,0,0.2)",
            textColor: '#FFF',
            bgImage: asideBgImage
        })
        let headFrom = reactive({ //头部布局
            layoutList: [{ span: 2, name: 'collapse' }, { span: 0, name: 'breadcrumb' }, { span: 16, name: 'any' }, { span: 6, name: 'appUser' }],
        })
        let isCollapse = ref(false)
        let openSelect = ref(false)

        const allMethods = {
            changeCollapse: (item?: any) => {
                isCollapse.value = !isCollapse.value
            },
            // 开启/关闭 设置
            changeSet: () => {
                openSelect.value = !openSelect.value
            },
            /**
             * @desc 手机
             * @param 
             * @return 
             * @author ppc
             * @date 2023-05-31 12:05:02
            */
            _isMobile: () => {
                let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
                return flag
            }
        }
        onMounted(() => {
            isCollapse.value = !allMethods._isMobile() ? isCollapse.value : !isCollapse.value
            console.log('%c ..........allMethods._isMobile().........', 'color:#31ef0e', isCollapse.value)
        })
        return {
            modeType,
            asiderData,
            menuList,
            isCollapse,
            headFrom,
            excludeList,
            openSelect,
            sizeData,
            ...allMethods
        }
    }
})

</script>

<template>
    <el-config-provider :size="sizeData.size">


        <div class="common-layout">

            <el-container>
                <el-aside v-if="!modeType" class="aside-box">
                    <div class="logo"> 后台管理</div>
                    <AppAside class="app-aside" :ellipsis="true" :menuList="menuList" :isCollapse="isCollapse"></AppAside>
                </el-aside>
                <el-container>
                    <el-header class="hearder-box">
                        <AppHeader :headFrom="headFrom" :isCollapse="isCollapse" @changeCollapse="changeCollapse">
                        </AppHeader>
                    </el-header>
                    <AppMeta></AppMeta>

                    <el-main>
                        <router-view v-slot="{ Component }">
                            <keep-alive :exclude="excludeList">
                                <Suspense>

                                    <component  :is="Component" />
                                </Suspense>
                                
                            </keep-alive>
                        </router-view>
                        <div class="select-btn" @click="changeSet">
                            <Setting style="width: 1em; height: 1em; " />
                        </div>
                        <configuration :openSelect="openSelect" @changeSet="changeSet"></configuration>

                    </el-main>
                </el-container>

            </el-container>

        </div>
    </el-config-provider>
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
    // background-color: $header-bg;
    border-bottom: 2px solid $p-border-color;
}

.select-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 50%;
    right: 5px;
    width: 36px;
    height: 36px;
    border-radius: 10px;
    font-size: 18px;
    background-color: var(--el-color-primary);
    z-index: 1000;
}

.logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: $header-height;
    background-color: $header-bg;
    color: #fff;
    font-weight: 600;
}

*::-webkit-scrollbar {
    display: none;
    width: 8px;
    height: 8px;
    background-color: lighten($default, 12);

}

*::-webkit-scrollbar-track {
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
}

*::-webkit-scrollbar-thumb {
    background-color: darken($default, 12);

    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
}

.aside-box {
    overflow: hidden;

    .app-aside {
        height: 100%;
        overflow-y: auto;
    }
}</style>