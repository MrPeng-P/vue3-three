
import {watchEffect}  from "vue"
export function useFixScreenSize () {
    return watchEffect(() => {
      refresh()
      function refresh () {
        console.log('%c ..........window.........','color:#31ef0e',window)
        const wh = window.innerHeight
        const ww = window.innerWidth
  
        const designHeight = 922
        const designWidth = 1920
  
        console.log(ww, wh)
        console.log(designWidth, designHeight)
        console.log(ww / designWidth, wh / designHeight)
        const inner=wh/ww
        const design=designHeight/designWidth
        const scaleH = wh / designHeight
        const scaleW = ww / designWidth
  
        const scale = Math.min(scaleH, scaleW).toFixed(6)
        if(design<inner){
            document.getElementById('three-box').style.width=ww+'px'
            document.getElementById('three-box').style.height=designHeight*ww/designWidth+'px'
        }else{
            document.getElementById('three-box').style.width=wh*designWidth/designHeight+'px'
            document.getElementById('three-box').style.height=wh+'px'

        }
        // console.log('scale', scale)
        // document.getElementById('three-box').style.transform = `scale(${scale})`
        // document.getElementById('three-box').style.transformOrigin = `50% center`
      }
      window.addEventListener('resize', refresh)
      return () => {
        window.removeEventListener('resize', refresh)
      }
    }, [])
  }
