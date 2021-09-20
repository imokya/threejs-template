uniform sampler2D uMask;
varying float vAlpha;

void main() {
  
  vec4 maskStrength = texture2D(uMask, gl_PointCoord).rgba;
  gl_FragColor = vec4(maskStrength.r, maskStrength.g, maskStrength.b, maskStrength.a * vAlpha);
}