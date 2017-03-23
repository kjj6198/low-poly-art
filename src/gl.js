import vert from '../shaders/low-poly.vert';
import frag from '../shaders/low-poly.frag';

var POINTS_COUNT = 1000;
setTimeout(() => {
  function initGL() {
     var canvas = document.querySelector('#lowpoly');
     var gl = canvas.getContext('webgl');
     canvas.width = window.data.imageData.width;
     canvas.height = window.data.imageData.height;
     gl.viewport(0,0, canvas.width, canvas.height);
     gl.clearColor(1,1,1,1);
    
     return gl;
  }

  function createShaders(gl, type) {
    var shaderScript = '';
    var shader;

    switch(type) {
      case 'fragment':
        shaderScript = frag
        shader = gl.createShader(gl.FRAGMENT_SHADER);
        break;
      case 'vertex':
        shaderScript = vert
        shader = gl.createShader(gl.VERTEX_SHADER);
        break;
    }

    gl.shaderSource(shader, shaderScript);
    gl.compileShader(shader);
    
    return shader;
  }

  function initShaders(gl) {
    const fragmentShader = createShaders(gl, 'fragment');
    const vertexShader = createShaders(gl, 'vertex');
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);
    
    return shaderProgram;
  }

  function times(times) {
    var array = [];
    for(var i = 0; i < times; i++) {
      array.push(null);
    }
    
    return array;
  }

  function createPoints(gl, program) {
    var points = gl.getAttribLocation(program, "position");
    var aVertexColor = gl.getAttribLocation(program, "aVertexColor");
    var vertices = [
      0.9,  0.9,  0.0,
      -0.9, 0.9,  0.0,
      0.9,  -0.9, 0.0,
      -0.9, -0.9, 0.0
    ];
    
    var colors = [
      1.0,  1.0,  1.0,  1.0,    // white
      1.0,  0.0,  0.0,  1.0,    // red
      0.0,  1.0,  0.0,  1.0,    // green
      0.0,  0.0,  1.0,  1.0     // blue
    ];

    
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.vertices), gl.STATIC_DRAW);
    
    gl.vertexAttribPointer(points, 2, gl.FLOAT, false, 0 , 0);
    gl.enableVertexAttribArray(points);

    // gl.vertexAttrib3f(points, 0, 0, 0);
    
    
    // var colorBuffer = gl.createBuffer();
    
    // gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    
    // gl.vertexAttribPointer(aVertexColor, 4, gl.FLOAT, false, 0, 0);
    // gl.enableVertexAttribArray(aVertexColor);
    
    return data.vertices;
  }

  function draw(gl, vertices) {
    
    gl.drawArrays(gl.LINES, 0, data.vertices.length / 2);
    
  }

  function main() {
    var gl = initGL();
    var shaderProgram = initShaders(gl);
    var vertices = createPoints(gl, shaderProgram);
    draw(gl, vertices);
  }

  main();
}, 2000);
