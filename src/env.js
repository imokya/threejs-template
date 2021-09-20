

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Gradient from './gradient'


class Env {
  
  static instance

  constructor() {
    if(Env.instance) {
      return Env.instance
    }
    Env.instance = this
    this.init()
  }

  init() {
    this._createScene()
    this._createEvent()
    this._createControls()
    this.render()
    this.setGradient()
  }

  setGradient() {
    this.gradient = new Gradient()
  }

  render() {
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(this.render.bind(this))
  }

  _onResize() {
    const w = window.innerWidth
    const h = window.innerHeight
    this.renderer.setSize(w, h)
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
  }

  _createControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
  }

  _createEvent() {
    window.addEventListener('resize', this._onResize.bind(this))
  }

  _createScene() {
    this.renderer =  new THREE.WebGLRenderer({
      antialias: true
    })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.set(0, 0, 5)
    document.querySelector('#app').appendChild(this.renderer.domElement)
  }

}


export default Env