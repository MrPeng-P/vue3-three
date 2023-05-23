

import { parse, stringify } from 'zipson'


let fixedMenu=[//固定菜单 不随用户角色改变
  {
    title: '首页',
    icon: 'DesktopOutlined',
    meta:{ keepAlive:true, rank: '' },
    key: '/index-p-index'
  }
]

// 处理菜单
function dealMenu(){
  let arrRes=[]
  const json=localStorage.getItem('menu')
  if(json){
    const menuArr=parse(json).menuData.menuList
    arrRes=menuArr.map((v0:any)=>{
      let children:any=[]
      if(v0.children){
        children=v0.children.map((v1:any)=>{
          return { name:v1['meta']['name']|v0['title'],  path: `/${v1['path']}`, meta:v1['meta']}
        }) 
      }
      return{ children, name: v0['name'],  meta:v0['meta'], path: v0['path']}
    })
    arrRes.unshift(...fixedMenu)
  }
  return arrRes
}
let menu:any=dealMenu()
export default menu

