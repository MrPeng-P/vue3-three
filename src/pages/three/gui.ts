import { GUI } from "dat.gui";
import * as THREE from 'three';
import { AnimationClip } from "three";
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
export class ThreeGui {
    _gui: any = null;
    guiList = new Map();
    _mixer: any = null;
    _mixerList: any = []
    animationFolder:any
    constructor() {
        this._gui = new GUI()

    }
    get Gui() {
        return this._gui
    }
    set Gui(val) {

    }
    get mixerList() {
        return this._mixerList
    }

    defaultScene(scene: any, name?: string) {
        let folder = this._gui.addFolder(name);
        folder.add(scene.position, 'x')
            .min(-100)
            .max(100)
            .step(0.01)
            .name(name + '的x')
        folder.add(scene.position, 'y')
            .min(-100)
            .max(100)
            .step(0.01)
            .name(name + '的y')
         


    }
    resolveGltf(gltf: GLTF, name?: string) {
        this._resolveAnimations(gltf)
  
    }
    _resolveAnimations(gltf: GLTF) {
     
        if(this._mixerList.length===0){
            this.animationFolder = this._gui.addFolder('动画');
         
        }
        this._mixer = new THREE.AnimationMixer(gltf.scene)
     
        gltf.animations.forEach((animation: any) => {

            this._mixer.clipAction(animation).play()
            const name=animation.name

            this.animationFolder.add({name:this._mixer.clipAction(animation).isRunning()}, 'name')
            .onChange((val:Boolean) => {
                console.log("select", val);
                val&& this._mixer.clipAction(animation).play()
                !val&& this._mixer.clipAction(animation).stop()

            });
        })
        this._mixerList.push(this._mixer)
        
    }
}   


