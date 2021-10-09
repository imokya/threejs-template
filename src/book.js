import Env from "./env"
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import vertexShader from './shaders/book/vertex.glsl'
import fragmentShader from './shaders/book/fragment.glsl'
import gsap from 'gsap'

export default class Book {

  constructor() {
    this.env = new Env()
    this.scene = this.env.scene
    this.camera = this.env.camera
    this.time = this.env.time
    this._flipTarget = 0
    this._flipProgress= 0
    this._flipRatio = 0.15
    this._createEvent()
    this._loadModel()
  }

  _createEvent() {
    const touch = 'ontouchstart' in window
    const touchBegan = touch ? 'touchstart' : 'mousedown'
    const touchMoved = touch ? 'touchmove' : 'mousemove'
    const touchEnded = touch ? 'touchend' : 'mouseup'
    document.addEventListener(touchBegan, this._onTouchBegan.bind(this)) 
    document.addEventListener(touchMoved, this._onTouchMoved.bind(this)) 
    document.addEventListener(touchEnded, this._onTouchEnded.bind(this)) 
    this.touch = touch
  }

  _onTouchBegan(e) {
    this._touchDown = true
    this.startX = this.touch ? e.changedTouches[0].pageX : e.pageX
  }

  _onTouchMoved(e) {
    if(!this._touchDown) return
    const x = this.touch ? e.changedTouches[0].pageX : e.pageX
    const progress = x / window.innerWidth
    this.uniforms.uProgress.value = progress
    const dx = x - this.startX
    
    if(Math.abs(dx) < 50) return

    if(dx > 0) {
      this._flipTarget = 1.5
    } else {
      this._flipTarget = -1.5
    }
    this._flipRatio = Math.abs(dx) * 0.0045
    this.startX = x
  }

  _onTouchEnded(e) {
    this._touchDown = false
  }

  _loadModel() {
    const texture = new THREE.TextureLoader().load('texture/book.jpg')
    this.uniforms = {
      uTexture: {
        value: texture
      },
      uTime: {
        value: 0
      },
      uProgress: {
        value: 0
      },
      uFlipProgress: {
        value: 0
      }
    }
    this.loader = new GLTFLoader()
    this.loader.load('model/book.glb', gltf => {
      gltf.scene.traverse(child => {
        if(child instanceof THREE.Mesh) {
          child.material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader,
            fragmentShader
          })
        }
      })
      gltf.scene.scale.set(2, 2, 2)
      this.scene.add(gltf.scene)
    })
  }

  update() {
    this.uniforms.uTime.value = this.env.time

    this._flipProgress += (this._flipTarget - this._flipProgress) * this._flipRatio
    if(this._flipProgress >= 1.49) {
      this._flipProgress = 1.5
      this._flipTarget = 0
    }  
    if(this._flipProgress <= -1.49) {
      this._flipProgress = -1.5
      this._flipTarget = 0
    }  
    
    this.uniforms.uFlipProgress.value = this._flipProgress
    
    
  }

}