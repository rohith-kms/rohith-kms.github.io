function setup() {
  var canvas = createCanvas(600, 500);
  slider_angle = createSlider(0, TWO_PI, PI/4, 0.01);
  canvas.parent('tree-graphic');
  slider_angle.parent('slider-container')
  background(0);
  colorMode(HSB, 150);
  var c = 0;
}

function draw() {
  background(255);
  angle = slider_angle.value();
  stroke(0,100,255);
  translate(300, height);
  branch(130)
}

function branch(len) {
  strokeWeight(1+len/18);
  stroke(100-Math.round(len/3),150,255);
  line(0,0,0,-len);
  translate(0,-len);
  if (len > 4){
    push();
    rotate(angle);
    branch(len * 0.67);
    pop();
    push();
    rotate(-angle);
    branch(len * 0.67);
    pop();
  }
}
