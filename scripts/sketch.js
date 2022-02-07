function setup() {
  if (windowWidth >= 700) {
    var canvas = createCanvas(600, 400);
    scaling = 1;
  } else {
    var canvas = createCanvas(windowWidth/2+100,windowHeight/2);
    scaling = 0.8*windowWidth/500;
  }

  // opacity of later elements
  elem_opacity = 0
  later = selectAll('.later');
  later.forEach(function(e){
    e.style('opacity',elem_opacity);
  });

  // initial setup
  canvas.parent('tree-graphic');
  background(0);
  colorMode(HSB, 150);
  var c = 0;
  factor = 0.6;
  animationflag = 0;
  angle = 3.14;
}

function draw() {
  background(255);
  stroke(0,100,255);
  translate(width/2, height);
  branch(120 * scaling);
  openAnimation();
  later.forEach(function(e){
    e.style('opacity',elem_opacity);
  });
}

function branch(len) {
  strokeWeight(1+len/18);
  stroke(100-Math.round(len/3/scaling),150,255);
  line(0,0,0,-len);
  translate(0,-len);
  if (len > 4 * scaling){
    push();
    rotate(angle);
    branch(len * factor);
    pop();
    push();
    rotate(-angle);
    branch(len * factor);
    pop();
  }
}

function openAnimation(){
  if (animationflag == 0) {
    angle -= 0.05;
    if (angle < 0.05) {
      animationflag = 1;
    }
  }
  else if (animationflag == 1) {
    angle += 0.01;
    factor +=0.0027;
    if (angle > 0.3){
      animationflag = 2;
    }
  }
  else if (animationflag == 2) {
    if (elem_opacity < 1) {
      elem_opacity+=0.035;
    }
  }
}
