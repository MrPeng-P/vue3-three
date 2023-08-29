<script lang="tsx" name="AppUser">
import { Router, useRouter } from "vue-router";
import allStore from "@/store";
import tkIcon from "@/components/tk-icon/tk-icon";
import { metaItem } from "@/types/meta";

const AppMeta = defineComponent({
  components: {
    tkIcon,
  },
  props: {
    user: {},
  },
  setup(props) {
    const router: Router = useRouter();
    const { meta } = allStore();
    const { deleteMeta, metaData, changeActiveMeta } = meta;

    const deleteMenthod = (e: any, item: metaItem, index: number) => {
      e.stopPropagation();
      if (
        metaData.metaList.length > 1 &&
        metaData.metaList.length != index + 1
      ) {
        deleteMeta(item, index);
        changeMeta(metaData.metaList[index]);
      } else if (
        metaData.metaList.length > 1 &&
        metaData.metaList.length == index + 1
      ) {
        deleteMeta(item, index);

        changeMeta(metaData.metaList[index - 1]);
      } else {
        if (item.fullPath != "/home") {
          deleteMeta(item, index);
          router.push("/home");
        }
      }
    };
    const changeMeta = (val: metaItem) => {
      router.push(val.fullPath);
    };
    const menuEle = (metaList: metaItem[]) => {
      return metaList.map((item: metaItem, index: number) => {
        return (
          <div
            class={
              "meta-item " +
              (metaData.activeMeta == item.fullPath ? "active-meta" : "")
            }
            onClick={(e) => changeMeta(item)}
          >
            <el-icon class={"logo"}>
              <tk-icon showIcon={item.meta.icon} type="show"></tk-icon>
            </el-icon>{" "}
            {item.meta.title}{" "}
            <el-icon
              onClick={(e: any) => {
                deleteMenthod(e, item, index);
              }}
              class={"close"}
            >
              <tk-icon showIcon={"Close"} type="show"></tk-icon>
            </el-icon>{" "}
          </div>
        );
      });
    };
    return () => (
      <div class={"meta-box"}>
        <div class={"meta-box-set"}> {menuEle(metaData.metaList)}</div>
      </div>
    );
  },
});
export default AppMeta;
</script>

<style lang="scss" scoped>
.meta-box {
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  height: 40px;
  border-bottom: 1px solid $p-border-color;
  cursor: pointer;

  .meta-box-set {
    display: flex;
    overflow-x: auto;
    padding: 0 10px;

    .meta-item {
      display: flex;
      align-items: center;
      flex-grow: 0;
      flex-shrink: 0;
      flex-basis: auto;

      margin-right: 10px;
      padding: 5px 5px;
      font-size: 12px;
      border: 1px solid $p-border-color;
      border-radius: 10%;

      .logo {
        font-size: 10px;
        margin-right: 5px;
      }

      .close {
        margin-left: 5px;
      }
    }

    .active-meta {
      background-color: var(--el-color-primary);
      color: var(--el-color-white);
    }
  }
}
</style>
