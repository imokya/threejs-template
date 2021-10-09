

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Pane } from 'tweakpane'
import Guify from 'guify'
import Ring from './ring'
import Plane from './plane'
import Book from './book'


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
    this._setTime()
    this._createScene()
    this._createEvent()
    this._createControls()
    //this._createPane()
    this._setBook()
    this._setRing()
    this._setPlane()
    
    this.render()
  }

  _setBook() {
    this.book = new Book()    
  }

  _setPlane() {
    this.plane = new Plane()
  }

  _setRing() {
    this.ring = new Ring()
  }

  _createPane() {
    this.pane = new Pane()
    this.pane.containerElem_.style.width = '320px'
  }

  _setTime() {
    this._clock = new THREE.Clock()
    this.time = this._clock.getElapsedTime()
  }

  update() {

    if(this.controls) {
      this.controls.update()
    }

    if(this.ring && this.ring.update) {
      this.ring.update()
    }
    
    if(this.plane && this.plane.update) {
      this.plane.update()
    }

    if(this.book && this.book.update) {
      this.book.update()
    }
   
  } 

  render() {
    this.time = this._clock.getElapsedTime()
    this.update()
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
    this.controls.dampingFactor = 0.02
    this.controls.enableDamping = true
  }

  _createEvent() {
    window.addEventListener('resize', this._onResize.bind(this))
  }

  _createScene() {
    this.renderer =  new THREE.WebGLRenderer({
      antialias: true
    })
    //this.renderer.outputEncoding = THREE.sRGBEncoding
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor(0x000000, 1)
    this.renderer.outputEncoding = THREE.sRGBEncoding
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000)
    this.camera.position.set(0, 5, 10)
    this.camera.lookAt(new THREE.Vector3())
    document.querySelector('#app').appendChild(this.renderer.domElement)
  }

}


export default Env