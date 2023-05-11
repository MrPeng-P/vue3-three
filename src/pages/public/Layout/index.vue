<script lang="ts">
import { defineComponent } from 'vue';
import asideBgImage from '../../../assets/images/aside/aside-bg.jpg'
export default defineComponent({
    setup() {
       
        let modeType = ref(false) //导航栏显示位置
        let modeList = ['aside', 'header', 'main', 'footer']
        let asiderData = reactive({//导航栏信息
            activeTextColor: '#ffd04b',
            bgColor: "rgba(0,0,0,0.2)",
            textColor: '#FFF',
            bgImage: asideBgImage
        })

        return {
            modeList,
            modeType,
            asiderData,
        }
    }
})

</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-header v-if="modeType" class="aside-box">
                <el-menu mode="horizontal" :router="true" active-text-color="#ffd04b" background-color="rgba(0,0,0,0)"
                    class="el-menu-vertical-demo" default-active="2" text-color="#fff">
                    <el-sub-menu index="index">
                        <template #title>
                            <el-icon>
                                <location />
                            </el-icon>
                            <span>Navigator One</span>
                        </template>
                        <el-menu-item-group title="Group One">
                            <el-menu-item index="home">home</el-menu-item>
                            <el-menu-item index="test">test</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                </el-menu>
            </el-header>
            <el-aside width="200px" v-if="!modeType" class="aside-box">
                <el-menu :router="true" :active-text-color="asiderData.activeTextColor"
                    :background-color="asiderData.bgColor" class="el-menu-vertical-demo" default-active="2" :text-color="asiderData.textColor">
                    <el-sub-menu index="index">
                        <template #title>
                            <el-icon>
                                <location />
                            </el-icon>
                            <span>Navigator One</span>
                        </template>
                        <el-menu-item-group title="Group One">
                            <el-menu-item index="home">home</el-menu-item>
                            <el-menu-item index="test">test</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header>Header</el-header>
                <el-main>
                    <router-view v-slot="{ Component }">
                        <keep-alive>
                            <transition name="fade">
                                <component :is="Component" />
                            </transition>
                        </keep-alive>
                    </router-view>
                </el-main>
                <el-footer>Footer</el-footer>
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
    background: $default;
    background: v-bind("'url('+asiderData.bgImage+')'");
    background-position: center;
    color: #000;
}
</style>