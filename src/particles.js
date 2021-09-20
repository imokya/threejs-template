import * as THREE from 'three'
import Env from './env'

import fragmentShader from './shaders/particles/fragment.glsl'
import vertexShader from './shaders/particles/vertex.glsl'


export default class Particles {

  constructor() {
    this.env = new Env()
    this.scene = this.env.scene

    this.debug = this.env.pane
    this.debugFolder = this.debug.addFolder({
      title: 'particles'
    })

    this.count = 1000

    this.setGeometry()
    this.setMaterial()
    this.setMesh()

  }

  setGeometry() {
    this.geometry = new THREE.BufferGeometry()
    const positionArray = new Float32Array(this.count * 3)
    const sizeArray = new Float32Array(this.count)
    const alphaArray = new Float32Array(this.count)
    const progressArray = new Float32Array(this.count)

    for(let i = 0; i < this.count; i++) {
      positionArray[i * 3 + 0] = (Math.random() - 0.5) * 20
      positionArray[i * 3 + 1] = 0
      positionArray[i * 3 + 2] = (Math.random() - 0.5) * 10

      progressArray[i] = Math.random()  
      sizeArray[i] = Math.random()
      alphaArray[i] = Math.random()
    }
    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positionArray, 3))
    this.geometry.setAttribute('aSize', new THREE.Float32BufferAttribute(sizeArray, 1))
    this.geometry.setAttribute('aAlpha', new THREE.Float32BufferAttribute(alphaArray, 1))
    this.geometry.setAttribute('aProgress', new THREE.Float32BufferAttribute(progressArray, 1))
  }

  setMaterial() {
    const particleImage = require('./img/particle.png')
    this.material = new THREE.ShaderMaterial({
      
      uniforms: {

        uTime: {
          value: 0
        },

        uMask: {
          value: new THREE.TextureLoader().load(particleImage)
        },

        uSize: {
          value: 50.0
        },

        uProgressSpeed: {
          value: 0.1
        },

        uPerlinFrequency: {
          value: 0.3
        },

        uPerlinMultiplier: {
          value: 3.0
        }

      },
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      vertexShader,
      fragmentShader
    })

    this.debugFolder.addInput(
      this.material.uniforms.uSize,
      'value',
      {
        label: 'uSize',
        min: 0,
        max: 200,
        step: 0.1
      }
    )

    this.debugFolder.addInput(
      this.material.uniforms.uProgressSpeed,
      'value',
      {
        label: 'uProgressSpeed',
        min: 0,
        max: 1,
        step: 0.01
      }
    )

    this.debugFolder.addInput(
      this.material.uniforms.uPerlinFrequency,
      'value',
      {
        label: 'uPerlinFrequency',
        min: 0,
        max: 1,
        step: 0.01
      }
    )

    this.debugFolder.addInput(
      this.material.uniforms.uPerlinMultiplier,
      'value',
      {
        label: 'uPerlinMultiplier',
        min: 0,
        max: 10,
        step: 0.1
      }
    )

  }

  setMesh() {
    this.mesh = new THREE.Points(this.geometry, this.material)
    this.mesh.position.y = -5
    this.scene.add(this.mesh)
  }

  update() {
    this.material.uniforms.uTime.value = this.env.time
  }

}