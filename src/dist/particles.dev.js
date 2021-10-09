"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var THREE = _interopRequireWildcard(require("three"));

var _env = _interopRequireDefault(require("./env"));

var _fragment = _interopRequireDefault(require("./shaders/particles/fragment.glsl"));

var _vertex = _interopRequireDefault(require("./shaders/particles/vertex.glsl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Particles =
/*#__PURE__*/
function () {
  function Particles() {
    _classCallCheck(this, Particles);

    this.env = new _env["default"]();
    this.scene = this.env.scene;
    this.debug = this.env.pane;
    this.debugFolder = this.debug.addFolder({
      title: 'particles'
    });
    this.count = 1000;
    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  _createClass(Particles, [{
    key: "setGeometry",
    value: function setGeometry() {
      this.geometry = new THREE.BufferGeometry();
      var positionArray = new Float32Array(this.count * 3);
      var sizeArray = new Float32Array(this.count);
      var alphaArray = new Float32Array(this.count);
      var progressArray = new Float32Array(this.count);

      for (var i = 0; i < this.count; i++) {
        positionArray[i * 3 + 0] = (Math.random() - 0.5) * 20;
        positionArray[i * 3 + 1] = 0;
        positionArray[i * 3 + 2] = (Math.random() - 0.5) * 10;
        progressArray[i] = Math.random();
        sizeArray[i] = Math.random();
        alphaArray[i] = Math.random();
      }

      this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positionArray, 3));
      this.geometry.setAttribute('aSize', new THREE.Float32BufferAttribute(sizeArray, 1));
      this.geometry.setAttribute('aAlpha', new THREE.Float32BufferAttribute(alphaArray, 1));
      this.geometry.setAttribute('aProgress', new THREE.Float32BufferAttribute(progressArray, 1));
    }
  }, {
    key: "setMaterial",
    value: function setMaterial() {
      var particleImage = require('./img/particle.png');

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
        vertexShader: _vertex["default"],
        fragmentShader: _fragment["default"]
      });
      this.debugFolder.addInput(this.material.uniforms.uSize, 'value', {
        label: 'uSize',
        min: 0,
        max: 200,
        step: 0.1
      });
      this.debugFolder.addInput(this.material.uniforms.uProgressSpeed, 'value', {
        label: 'uProgressSpeed',
        min: 0,
        max: 1,
        step: 0.01
      });
      this.debugFolder.addInput(this.material.uniforms.uPerlinFrequency, 'value', {
        label: 'uPerlinFrequency',
        min: 0,
        max: 1,
        step: 0.01
      });
      this.debugFolder.addInput(this.material.uniforms.uPerlinMultiplier, 'value', {
        label: 'uPerlinMultiplier',
        min: 0,
        max: 10,
        step: 0.1
      });
    }
  }, {
    key: "setMesh",
    value: function setMesh() {
      this.mesh = new THREE.Points(this.geometry, this.material);
      this.mesh.position.y = -5;
      this.scene.add(this.mesh);
    }
  }, {
    key: "update",
    value: function update() {
      this.material.uniforms.uTime.value = this.env.time;
    }
  }]);

  return Particles;
}();

exports["default"] = Particles;