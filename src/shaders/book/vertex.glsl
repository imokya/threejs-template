
varying vec3 vNormal;
varying vec2 vUv;

uniform float uTime;
uniform float uFlipProgress;

void main() {
  vNormal = normal;
  vUv = uv;
  vec3 newPos = position;
  float z = newPos.z;
  z = clamp(-2.0, 1.0, z);
  newPos.x += z * z * 0.3 * uFlipProgress;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
}