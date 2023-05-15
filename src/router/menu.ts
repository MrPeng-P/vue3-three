

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
    const menuArr=parse(json).menuData.menuList.children
  console.log('%c ..........json.........','color:#31ef0e',menuArr)

    arrRes=menuArr.map((v0:any)=>{
      let children:any=[]
      if(v0.children){
        children=v0.children.map((v1:any)=>{
          return { title:v1['meta']['title']|v0['title'], icon: v1['meta']['icon'], key: `/${v1['path']}`, meta:{ keepAlive:true, rank: '' }}
        }) 
      }
      return{ children, title: v0['title'], icon: v0['meta']['icon'], meta:{ keepAlive:true, rank: '' }, key: v0['id']}
    })
    arrRes.unshift(...fixedMenu)
  }
  return arrRes
}
let menu:any=dealMenu()

export default menu

