
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { GUI } from "dat.gui";
interface loadFrom {
    key:String
}
interface threeConfig{
    id:string,
    width:number,
    height:number,
}
export class pThree {
    _scene;//创建场景对象Scene
    _axisHelper;// 辅助坐标系
    _directiona;// 平行光 太阳光
    _width;//窗口宽度
    _height;//窗口高度
    _camera;//相机对象
    _s;//三维场景显示范围控制系数，系数越大，显示的范围越大
    _k;//窗口宽高比
    _renderer;//渲染器对象
    _clock; //用于跟踪时间
    _controls;//创建控件对象
    _loader;
    _mixer:any;
    _mixerList=new Map();

    constructor(threeConfig:threeConfig) {
        console.log('%c ..........threeConfig.........','color:#31ef0e',threeConfig)
        this._scene = new THREE.Scene();
        this._axisHelper = new THREE.AxesHelper(250);//AxesHelper 新版名
        this._scene.add(this._axisHelper);
        this._directiona = new THREE.DirectionalLight(0xffffff)
        this._scene.add(this._directiona);
        /**
         * 相机设置
         */
        this._width = threeConfig.width//窗口宽度
        this._height = threeConfig.height//窗口高度
        this._k = this._width / this._height; //窗口宽高比
        this._s = 100
        this._camera = new THREE.OrthographicCamera(-this._s * this._k, this._s * this._k, this._s, -this._s, 1, 1000);
        this._camera.position.set(200, 300, 200); //设置相机位置
        this._camera.lookAt(this._scene.position); //设置相机方向(指向的场景对象)
        /**
          * 创建渲染器对象
          */
        this._renderer = new THREE.WebGLRenderer();
        this._renderer.setSize(this._width, this._height); //设置渲染区域尺寸
        this._renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
        let ele:any=document.getElementById(threeConfig.id)
        ele.appendChild(this._renderer.domElement); //body元素中插入canvas对象

        this._clock = new THREE.Clock() //用于跟踪时间

        //创建GLTF加载器
        this._loader = new GLTFLoader()

        this._controls = new OrbitControls(this._camera, this._renderer.domElement)//创建控件对象
        this._controls.addEventListener('change', this.render.bind(this)); //监听鼠标、键盘事件
        this.render()
    }
    /**
     * @desc 渲染
     * @param 
     * @return 
     * @author ppc
     * @date 2023-02-28 04:56:16
    */
    render() {
        this._renderer.render(this._scene, this._camera); //执行渲染操作
        const clockValue = this._clock.getDelta()
        this._mixerList.forEach((item)=>{
            if(item){
                item.update(clockValue)
            }
        })
        requestAnimationFrame(this.render.bind(this))
    }
    /**
     * @desc 导入模型
     * @param {string} path 导入地址
     * @return reslove 当前模型 reject 导入错误信息
     * @author ppc
     * @date 2023-02-28 04:54:48
    */
    loader(path: string,dataFrom:loadFrom) {
        const that = this
        const loaderKey=dataFrom.key
        return new Promise((reslove, reject) => {
            this._loader.load(path, function (gltf: GLTF) {

                gltf.scene.scale.set(3, 3, 3);
                gltf.scene.position.set(20, 20, 20)
                that._scene.add(gltf.scene);
                that.resolveAnimations(gltf,loaderKey)
                reslove(gltf)

            }, function (xhr) {
                if (xhr.loaded / xhr.total == 1) {

                }
            }, function (error) {
                reject(error)

            })
        })

    }
    /**
     * @desc 动画处理
     * @param 
     * @return 
     * @author ppc
     * @date 2023-02-28 04:58:42
    */
    resolveAnimations(gltf: GLTF,loaderKey:String) {
        this._mixer = new THREE.AnimationMixer(gltf.scene)
        gltf.animations.forEach((animation: any) => {
            this._mixer.clipAction(animation).play()
        })
        this._mixerList.set(loaderKey,this._mixer)
    }
}
