import Env from './env'
import * as THREE from 'three'
import vertexShader from './shaders/gradient/vertex.glsl'
import fragmentShader from './shaders/gradient/fragment.glsl'

export default class Gradient {

  constructor() {
    this.env = new Env()
    this.scene = this.env.scene
    this.setGeometry()
    this.setMaterial()
    this.setMesh()
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(2, 2, 1, 1)
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader
    })
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)
  }

}