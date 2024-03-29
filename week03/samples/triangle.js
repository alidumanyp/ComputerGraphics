
var gl;
var points;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    //webgl desteklemiyorsa uyarı veriyor

    
    // var vertices = new Float32Array([0, -1, 0, 1, 1, -1]);
    //var vertices = new Float32Array([0, -1, 0, 0, 1, -1]);
    //köşelerin x,y kordinatları(3 köşe)

    var vertices = [
        vec2(-0.5,0.5),
        vec2(0.5,0.5),
        vec2(0.5,-0.5),
        vec2(-0.5,-0.5),
    ];


    //  Configure WebGL

    gl.viewport( 0, 0, canvas.width, canvas.height );// canvasın kullanacağım kısmını söylüyorum.
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 ); //background color R,G,B,ALPHA(opacity)
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    //shaderlarımı başlatıyorum.
    gl.useProgram( program );//farklı shaderlar üzerinde çalışırken değiştireceğiz.
    
    // Load the data into the GPU
    
    var bufferId = gl.createBuffer();//gpuda buffar açıyorum.
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    //flatten fonksiyonu otomatik C tipi arraye dönüştürüyor.
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    //2boyutlu görüntü, 
    gl.enableVertexAttribArray( vPosition );

    render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLE_FAN  , 0, 4 );
}
