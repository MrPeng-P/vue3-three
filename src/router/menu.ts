let fixedMenu=[//固定菜单 不随用户角色改变
  {
    name: '首页',
    path: 'home',
    meta: { title: '首页', icon: '', affix: true, transition: 'slide-left' }
  }
]

/**
 * @desc 添加新的菜单
 * @param 
 * @return 
 * @author ppc
 * @date 2023-05-12 17:26:23
*/
export function dealMenu(  routes:any,newList: any) {
    let arrRes=[]
      arrRes=routes.map((v0:any)=>{
        if(v0.children){
           return [...v0.children,...newList]
        }
      })
    
    return arrRes[0]
}


