import Env from './env'
import * as THREE from 'three'


export default class Plane {

  constructor() {
    this.env = new Env()
    this.scene = this.env.scene
    this.camera = this.env.camera
    this.setMaterial()
    this.setMesh()
  }


  setMaterial() {
    this.material = new THREE.SpriteMaterial({
      map: new THREE.TextureLoader().load('img/tunnel.png')
    })
  }

  setMesh() {
    this.mesh = new THREE.Sprite(this.material)
    this.mesh.scale.set(20, 20, 1)
    this.mesh.position.z = -5
    this.scene.add(this.mesh)
  }

  update() {
    this.mesh.position.x = -this.camera.position.x
    this.mesh.position.y = -this.camera.position.y
    this.mesh.position.z = -this.camera.position.z
  }

}