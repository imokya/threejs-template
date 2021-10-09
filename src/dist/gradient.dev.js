"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _env = _interopRequireDefault(require("./env"));

var THREE = _interopRequireWildcard(require("three"));

var _vertex = _interopRequireDefault(require("./shaders/gradient/vertex.glsl"));

var _fragment = _interopRequireDefault(require("./shaders/gradient/fragment.glsl"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Gradient =
/*#__PURE__*/
function () {
  function Gradient() {
    _classCallCheck(this, Gradient);

    this.env = new _env["default"]();
    this.scene = this.env.scene;
    this.debug = this.env.pane;
    this.debugFolder = this.debug.addFolder({
      title: 'gradient'
    });
    this.setGeometry();
    this.setColors();
    this.setMaterial();
    this.setMesh();
  }

  _createClass(Gradient, [{
    key: "setColors",
    value: function setColors() {
      var _this = this;

      this.colors = {};
      this.colors.end = {};
      this.colors.end.value = '#303548';
      this.colors.end.instance = new THREE.Color(this.colors.end.value);
      this.debugFolder.addInput(this.colors.end, 'value', {
        view: 'color'
      }).on('change', function () {
        _this.colors.end.instance.set(_this.colors.end.value);
      });
    }
  }, {
    key: "update",
    value: function update() {
      this.material.uniforms.uTime.value = this.env.time;
    }
  }, {
    key: "setGeometry",
    value: function setGeometry() {
      this.geometry = new THREE.PlaneGeometry(2, 2, 1, 1);
    }
  }, {
    key: "setMaterial",
    value: function setMaterial() {
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
        vertexShader: _vertex["default"],
        fragmentShader: _fragment["default"]
      });
      this.debugFolder.addInput(this.material.uniforms.uSaturation, 'value', {
        label: 'uSaturation',
        min: 0,
        max: 1
      });
      this.debugFolder.addInput(this.material.uniforms.uLightness, 'value', {
        label: 'uLightness',
        min: 0,
        max: 1
      });
    }
  }, {
    key: "setMesh",
    value: function setMesh() {
      this.mesh = new THREE.Mesh(this.geometry, this.material);
      this.scene.add(this.mesh);
    }
  }]);

  return Gradient;
}();

exports["default"] = Gradient;