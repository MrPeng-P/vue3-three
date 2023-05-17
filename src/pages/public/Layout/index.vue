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
export default defineComponent({
    components: {
        AppAside,
        AppHeader,
        configuration,
        AppMeta
    },
    setup() {
        const router = useRouter()
        const route = useRoute()

        const { menu } = allStore()
        const { menuData } = storeToRefs(menu)
     
        let menuList = menuData.value.menuList.children

        let modeType = ref(false) //导航栏显示位置
        let asiderData = reactive({//导航栏信息
            activeTextColor: '#ffd04b',
            bgColor: "rgba(0,0,0,0.2)",
            textColor: '#FFF',
            bgImage: asideBgImage
        })
        let headFrom = reactive({ //头部布局
            layoutList: [{span:2,name:'collapse'},{span:0,name:'breadcrumb'},{span:16,name:'any'},{span:6,name:'appUser'}],
        })
        let isCollapse = ref(false)
        let openSelect = ref(false)
        const allMethods = {
            changeCollapse: (item?: any) => {
                isCollapse.value = !isCollapse.value
            },
            // 开启/关闭 设置
            changeSet:()=>{
                openSelect.value=!openSelect.value
            }
        }
        return {
            modeType,
            asiderData,
            menuList,
            isCollapse,
            headFrom,
            openSelect,
            ...allMethods
        }
    }
})

</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-aside v-if="!modeType" class="aside-box">
                <div class="logo"> 后台管理</div>
                <AppAside class="app-aside" :menuList="menuList" :isCollapse="isCollapse"></AppAside>
            </el-aside>
            <el-container>
                <el-header class="hearder-box">
                    <AppHeader :headFrom="headFrom" :isCollapse="isCollapse" @changeCollapse="changeCollapse"></AppHeader>
                </el-header>
                <AppMeta></AppMeta>

                <el-main>
                    <router-view v-slot="{ Component }">
                        <keep-alive>
                                <component :is="Component" />
                        </keep-alive>
                    </router-view>
                    <div class="select-btn" @click="changeSet"><Setting style="width: 1em; height: 1em; " /></div>
                        <configuration  :openSelect="openSelect" @changeSet="changeSet"></configuration>
                      
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
    // background-color: $header-bg;
    border-bottom: 2px solid $p-border-color;
}

.select-btn{
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 50%;
    right:5px;
    width: 36px;
    height: 36px;
    border-radius: 10px;
    font-size: 18px;
    background-color: var(--el-color-primary);
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
}
</style>