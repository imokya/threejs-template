import Env from './env'
import * as THREE from 'three'
import vertexShader from './shaders/ring/vertex.glsl'
import fragmentShader from './shaders/ring/fragment.glsl'

export default class Ring {

  constructor() {
    this.env = new Env()
    this.scene = this.env.scene
    this.camera = this.env.camera
    this.setGeometry()
    this.setMaterial()
    this.setMesh()
  }

  setGeometry() {
    this.geometry = new THREE.TorusGeometry(3, 0.5, 15, 60)
  }

  setMaterial() {
    const texture = new THREE.TextureLoader().load('texture/mayupai.png')
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: {
          value: texture
        },
        uTextureRepeatX: {
          value: 10.0
        },
        uTextureRepeatY: {
          value: 2.0
        },
        uTime: {
          value: 0
        }
      },
      vertexShader,
      fragmentShader,
      depthWrite: false,
      depthWrite: false,
      transparent: true
    })
 
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)
    this.mesh.rotateX(-Math.PI / 2)
  }

  update() {
    this.material.uniforms.uTime.value = this.env.time
    this.mesh.rotation.z += 0.01;
    const scale = (Math.sin(this.env.time * 2) + 1) * 0.1 + 1
    this.mesh.scale.set(scale, scale, scale)
  }

}