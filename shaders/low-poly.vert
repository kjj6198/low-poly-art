attribute vec4 position;
attribute float size;

attribute vec4 aVertexColor;
varying lowp vec4 vColor;

void main(void) {
  gl_Position = position;
  gl_PointSize = 3.0;
  vColor = aVertexColor;
}