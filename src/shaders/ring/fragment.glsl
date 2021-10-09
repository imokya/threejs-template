varying vec2 vUv;
uniform sampler2D uTexture;
uniform float uTextureRepeatX;
uniform float uTextureRepeatY;
uniform float uTime;

void main() {
  vec2 tUv = vUv;
  tUv.y += uTime * 0.5;
  vec2 textureUV = tUv;
   
  textureUV.x *= uTextureRepeatX;
  textureUV.y *= uTextureRepeatY;

  vec4 outColor = texture(uTexture, textureUV);
  gl_FragColor = outColor;
}