import Env from './env'
import * as THREE from 'three'
import vertexShader from './shaders/gradient/vertex.glsl'
import fragmentShader from './shaders/gradient/fragment.glsl'

export default class Gradient {

  constructor() {
    this.env = new Env()
    this.scene = this.env.scene

    this.debug = this.env.pane
    this.debugFolder = this.debug.addFolder({
      title: 'gradient'
    })

    this.setGeometry()
    this.setColors()
    this.setMaterial()
    this.setMesh()


  }

  setColors() {
    this.colors = {}
    this.colors.end = {}
    this.colors.end.value = '#303548'
    this.colors.end.instance = new THREE.Color(this.colors.end.value)

    this.debugFolder.addInput(
      this.colors.end,
      'value',
      {
        view: 'color'
      }
    ).on('change',  () => {
      this.colors.end.instance.set(this.colors.end.value)
    })

  }

  update() {
    this.material.uniforms.uTime.value = this.env.time
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(2, 2, 1, 1)
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      depthWrite: false,
      uniforms: {

        uTime: {
          value: 0
        },

        uEndColor: {
          value: this.colors.end.instance
        },

        uSaturation: {
          value: 0.32
        },

        uLightness: {
          value: 0.38
        }

      },
      vertexShader,
      fragmentShader
    })

    this.debugFolder.addInput(
      this.material.uniforms.uSaturation,
      'value',
      {
        label: 'uSaturation',
        min: 0,
        max: 1
      }
    )

    this.debugFolder.addInput(
      this.material.uniforms.uLightness,
      'value',
      {
        label: 'uLightness',
        min: 0,
        max: 1
      }
    )


  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)
  }

}