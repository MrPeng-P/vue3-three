<script lang="tsx" name="AppAside">
import { useRoute, useRouter } from "vue-router";
import asideBgImage from "../../../../assets/images/aside/aside-bg.jpg";
import { HomeFilled } from "@element-plus/icons-vue";
import tkIcon from "@/components/tk-icon/tk-icon";
const AppAside = defineComponent({
  components: {
    HomeFilled,
    tkIcon,
  },
  props: {
    //菜单数据获取
    menuList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, content) {
    const { attrs } = content;
    const route = useRoute();
    const router = useRouter();

    const activeIndex = computed(() => route.path.split("/").slice(-1)[0]);

    let asiderData = reactive({
      //导航栏信息
      activeTextColor: "#ffd04b",
      bgColor: "rgba(0,0,0,0.2)",
      textColor: "#FFF",
      bgImage: asideBgImage,
    });
    //菜单生成
    const getMenu = (menuList: any) => {
      return menuList.map((item: any) => {
        if (item.children && item.children.length > 0 && !item.meta.hidden) {
          const slots = {
            title: () => (
              <div class={"subitem"}>
                {item.meta.icon ? (
                  <el-icon>
                    <tk-icon showIcon={item.meta.icon} type="show"></tk-icon>
                  </el-icon>
                ) : (
                  ""
                )}
                <span class="title">{item.meta.title}</span>
              </div>
            ),
          };
          return (
            <el-sub-menu index={item.path} v-slots={slots}>
              {getMenu(item.children)}
            </el-sub-menu>
          );
        } else if (!item.meta.hidden) {
          return (
            <el-menu-item index={item.path}>
              {item.meta.icon ? (
                <el-icon>
                  <tk-icon showIcon={item.meta.icon} type="show"></tk-icon>
                </el-icon>
              ) : (
                ""
              )}
              <span class="title">{item.meta.title}</span>
            </el-menu-item>
          );
        }
      });
    };

    //路由跳转
    const handleSelect = (
      key: string,
      keyPath: string[],
      item: any,
      routeResult: any
    ) => {
      const path = key;
      if (path.includes("-t-")) {
        // console.log('%c ..........window.location.........','color:#31ef0e',window.location)
        window.open('/#'+path)
      } else {
        router.push({
          path,
        });
      }
    };

    return () => (
      <el-menu
        {...attrs}
        default-active={activeIndex.value}
        active-text-color={asiderData.activeTextColor}
        background-color={asiderData.bgColor}
        class="el-menu-vertical-demo"
        collapse={props.isCollapse}
        text-color={asiderData.textColor}
        onSelect={handleSelect}
      >
        {getMenu(props.menuList)}
      </el-menu>
    );
  },
});

export default AppAside;
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  // width: 180px;
  min-height: 400px;
}

.title {
  margin-left: 10px;
}

.el-tooltip__trigger {
  .subitem {
    span {
      display: none;
    }
  }
}
</style>
