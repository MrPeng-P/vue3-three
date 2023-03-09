<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({

})
</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-container>
                <el-aside width="200px">
                    <el-menu :router="true" active-text-color="#ffd04b" background-color="#545c64"
                        class="el-menu-vertical-demo" default-active="2" text-color="#fff" @open="handleOpen"
                        @close="handleClose">
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

        </el-container>
    </div>
</template>
<style scoped></style>