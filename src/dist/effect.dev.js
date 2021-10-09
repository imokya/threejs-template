"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _env = _interopRequireDefault(require("./env"));

var THREE = _interopRequireWildcard(require("three"));

var _GLTFLoader = require("three/examples/jsm/loaders/GLTFLoader");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Effect =
/*#__PURE__*/
function () {
  function Effect() {
    _classCallCheck(this, Effect);

    this.env = new _env["default"]();
    this.scene = this.env.scene;
    this.camera = this.env.camera;

    this._loadModel();
  }

  _createClass(Effect, [{
    key: "_loadModel",
    value: function _loadModel() {
      var _this = this;

      var loader = new _GLTFLoader.GLTFLoader();
      var texLoader = new THREE.TextureLoader();
      var gTex = texLoader.load('textures/greyMetal.png');
      var bTex = texLoader.load('textures/blackMetal.png');
      this.gMatCap = new THREE.MeshMatcapMaterial({
        matcap: gTex
      });
      this.bMatCap = new THREE.MeshMatcapMaterial({
        matcap: bTex
      });
      loader.load('models/pillard.glb', function (gltf) {
        gltf.scene.traverse(function (child) {
          if (child.name === 'base') {
            _this.pillard = child;
            child.material = _this.bMatCap;
          }

          if (child.name === 'Cylinder') {
            child.material = _this.gMatCap;
          }
        });

        _this.computePositions();
      });
    }
  }, {
    key: "computePositions",
    value: function computePositions() {
      this.scene.add(this.pillard);
      var sphereGeo = new THREE.IcosahedronGeometry(2, 2);
      var sphereMat = this.gMatCap;
      var sphere = new THREE.Mesh(sphereGeo, sphereMat);
      var vertices = [];

      for (var i = 0; i < sphereGeo.attributes.position.array.length; i += 3) {
        var x = sphereGeo.attributes.position.array[i + 0];
        var y = sphereGeo.attributes.position.array[i + 1];
        var z = sphereGeo.attributes.position.array[i + 2];
        vertices.push({
          x: x,
          y: y,
          z: z
        });
      }

      this.pillards = [];
      var positions = [];

      for (var _i = 0; _i < vertices.length; _i++) {
        var exists = false;

        for (var j = 0; j < positions.length; j++) {
          if (positions[j].x == vertices[_i].x && positions[j].y == vertices[_i].y && positions[j].z == vertices[_i].z) {
            exists = true;
          }
        }

        if (!exists) {
          positions.push({
            x: vertices[_i].x,
            y: vertices[_i].y,
            z: vertices[_i].z
          });
          var c = this.pillard.clone();
          c.scale.multiplyScalar(0.25);
          c.position.set(vertices[_i].x, vertices[_i].y, vertices[_i].z);
          var up = new THREE.Vector3(0, 1, 0);
          var to = c.position.clone().normalize();
          c.quaternion.setFromUnitVectors(up, to);
          c.children[0].position.y = 1;
          this.pillards.push(c);
          this.scene.add(c);
        }
      }

      this.scene.add(sphere);
    }
  }, {
    key: "update",
    value: function update() {
      if (this.pillards) {
        for (var i = 0; i < this.pillards.length; i++) {
          this.pillards[i].children[0].position.y = Math.sin(Date.now() * 0.01 + this.pillards[i].position.x) * 1.5;
        }
      }
    }
  }]);

  return Effect;
}();

exports["default"] = Effect;