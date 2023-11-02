// Enter the relevant values
let h = 3; // x 1000 kms above earth's surface
let v = 11.3*18/5 // x 1000 kmph
let g = 36*3.6; //acceleration due to gravity at surface (x1000 km/h^2)
let r = 6.4; // x 1000 kms

// Initialise positions and velocities (reduced units)
let pos = [0, h+r];
let vel = [v, 0];
let org = [0, 0];

// Calculate forces
function a(pos) {
    let d = Math.sqrt(Math.pow(pos[0], 2) + Math.pow(pos[1], 2));
    let vector = [-pos[0]/d, -pos[1]/d];
    return [(g*Math.pow(r, 2)/Math.pow(d, 2))*vector[0], (g*Math.pow(r, 2)/Math.pow(d, 2))*vector[1]];
}

// Setting up loop
let total_time = 1800; //hours
let timesteps = total_time*1000;
let dt = 0.001;

let pos_init = pos;
let pos_next = [pos[0]+vel[0]*dt, pos[1]+vel[1]*dt];

let positions = [];
positions[0] = pos_init;
positions[1] = pos_next;

// Main loop
for (let t = 2; t < timesteps; t++) {
    positions[t] = [2*positions[t-1][0] - positions[t-2][0] + a(positions[t-1])[0]*dt*dt, 2*positions[t-1][1] - positions[t-2][1] + a(positions[t-1])[1]*dt*dt];
}

// Plotting the path
function setup() {

     createCanvas(700, 700);


}

function draw() {

    clear();
    translate(width/2, height/2);
    scale(2,2);
    background(0);
    fill('#00ff00')
    stroke('#384e1d');


    ellipse(0, 0, 6.4*2, 6.4*2);
    noFill();
    strokeWeight(0.3);
    stroke(200);
    beginShape();
    for (let i = 0; i < positions.length; i++) {
        vertex(positions[i][0], positions[i][1]);
    }
    endShape();

}


function velocityUpdate() {
  v = this.value();
  console.log(v)
}
