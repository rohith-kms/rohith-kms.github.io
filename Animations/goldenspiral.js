function setup() {
  h = 600;
  w = 800;
  n = 13;
  anim_stage = 0;
  canvas = createCanvas(w, h);
  canvas.id('spiral');
  fibo = createFibArray(n);
  colorMode(HSB,n);
  print(fibo);

  scale_const = w/(fibo[n - 1]+fibo[n - 2]);
  scale_par = w/(fibo[n - 1]+fibo[n - 2]);
  scale_reset_ratio = scale_par*fibo[n - 5]/fibo[n - 1];
  print(scale_reset_ratio);

  length_series_sum = 0;
  for(i=0;i<n;i++){
    if(i%4==2){
      length_series_sum +=fibo[i];
    }
  }

  x_origin = length_series_sum*scale_par;
  y_origin = height*fibo[n-1]/(fibo[n-1]+fibo[n-2])+h*0.1;

  colors = ['#0F2043','#E8AF30','#3361AC','#E8C766'];
  draw_length = 0;
}

function draw() {
  //noStroke();
  rect(0,0,w,h,10);
  strokeWeight(1);
  background(colors[0]);
  translate(x_origin,y_origin);
  noFill();
  for (let i=0; i<fibo.length; i++){
    len = fibo[i]*scale_par
    fill(colors[2]);
    rect(0,0,len,len);
    strokeWeight(2);
    fill(colors[1]);
    arc(0,len,2*len,2*len,1.5*PI,2*PI);

    // content
    if(i==15 || i==13){
      fill(colors[0]);
      rect(0,0,len,draw_length);
    }
    if(i==12 || i==11){
      fill(colors[3]);
      rect(0,0,len,draw_length);
    }
    if(anim_stage ==2){
    if(draw_length<len){
      draw_length +=5;
    }
    }

    strokeWeight(1);
    translate(len,len);
    rotate(PI/2);

  }

  if (anim_stage == 0){
    scale_par*=0.95;
    if(scale_par<scale_reset_ratio-0.07){
      //scale_par = scale_const;
      anim_stage = 1;
      print(scale_par);
    }
  } else if (anim_stage == 1){
    scale_par *= 1.03;
    if(scale_par>scale_reset_ratio){
      anim_stage = 2;
      scale_par = scale_const;
    }
  }


}

function createFibArray(n) {
  let fibo = [1,1];
  for(let i=2;i<n+3*4;i++){
    fibo.push(fibo[i-1]+fibo[i-2]);
  }
  return fibo;
}
