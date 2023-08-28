import { routerConfig, routes, menuModel, noPath } from "./router";
import allStore from "@/store";
import ppcThree from "@/pages/views/three/PPC/model/ppcThree";

class intercept {
  constructor() {}
  // before拦截
  static setRouterBefore() {
    routerConfig.beforeEach(async (to, from, next) => {
      const { menu } = allStore();
      const { changeMenu } = menu;
      if (menu.menuData.menuList.length == 0) {
        changeMenu(menuModel);
      }
      if ((to.path = "/login")) {
      }
      next();
    });
  }
  //   resolve 拦截
  static setRouterResolve() {
    routerConfig.beforeResolve(async (to) => {
      return Promise.resolve();
    });
  }

  // after触发
  static setRouterAfter() {
    routerConfig.afterEach(async (to, from, next) => {
      const noList = noPath.filter((item) => {
        return item.name == to.name;
      });
      if (to.fullPath !== from.fullPath && noList.length == 0) {
        const store = allStore();
        const { meta } = store;
        const { addMeta, changeActiveMeta } = meta;
        changeActiveMeta(to.fullPath);

        addMeta({
          meta: to.meta,
          fullPath: to.fullPath,
        });
      }
    });
  }
}

intercept.setRouterBefore();
// intercept.setRouterResolve()
intercept.setRouterAfter();

export default routerConfig;
