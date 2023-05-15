

import { defineComponent, reactive, ref,computed,createVNode } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './tk-icon.scss'
const icons:any=ElementPlusIconsVue
export default defineComponent({
  emits:['update:icon','blur', 'change'],
  props:{
    type:{
      type:String,
      default:"show" //show 单个显示  select 选择图标
    },
    size:{
      type:Number
    },
    showIcon:{//显示的图标
      type:String,
      default:""
    },
    icon: { // v-model绑定
      type: String
    },
    id:{},//ui框架自带属性  不写会出现警告
    class:{},//ui框架自带属性  不写会出现警告
    color:{
      type:String
    },
  },
  setup(props:any,content) {
    const haveIcon:Array<string>=[
      'HomeFilled','House','Search','Plus',
     'Minus','Loading ','Link','Setting',
      'Close','User',"EditPen","Edit",
      "QuestionFilled","Menu","Avatar","DeleteFilled",
      "Histogram","MessageBox","OfficeBuilding","Coin","Stamp","Monitor"
      
    ]

    const showItem=(k='')=>{
      // let key=k?k:(props.showIcon.replace(/[<|/>]/g,'')).trim()
      let key=k?(k.replace(/[<|/>]/g,'')).trim():(props.showIcon.replace(/[<|/>]/g,'')).trim()

      let ic:any=icons[key]
      return <ic style={props.size?{fontSize:props.size+'px',color: props.color}:{color: props.color}}></ic>
    }

    let currentSelect=ref(props.icon)
    const clickIcon=(e:any)=>{
      currentSelect.value=e
      showAlert.value=false
      content.emit('update:icon', currentSelect.value)
    }

    let showAlert=ref<boolean>()
    const open=()=>{
      showAlert.value=!showAlert.value
    }


    const showAll=()=>{
      let iconArr=[]
      for(let key in icons){
        if(haveIcon.includes(key)){
          iconArr.push({
            key,
            fn:icons[key]
          })
        }

      }
      let html=iconArr.map(v=>{
        let ic=v.fn
        return <div 
                  class="icon-item" 
                  onClick={()=>{clickIcon(v.key)}}>
                    <ic style={{fontSize:"30px"}}></ic>
                </div>
      })
      return html
    }
    return () => (
      <>
          {props.type==='show'?
            showItem():
            <div class="select-main">
              <div class="title" onClick={open}>{props.icon? showItem(props.icon):<span class="tip">图标选择</span>}</div>
              {showAlert.value?<div class="all-icon">
                {showAll()}
              </div>:''}
            </div>  
           }
      </>
    )
  }
})

