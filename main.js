img = "";

function draw(){

   image(img, 0, 0, 380, 380);
   
if(status != ""){
  r = random(255);
  g = random(255);
  b = random(255);
  object_detector.detect(img, gotResults);
  for(i = 0; i < objects.length; i++){
    document.getElementById("status").innerHTML = "Status : Object Detected";
    document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+ objects.length;
    fill(r,g,b);
    stroke(r,g,b);
    noFill();
    percent = floor(objects[i].confidence * 100);
    text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
    rect(objects[i].x , objects[i].y, objects[i].width, objects[i].height); 
  }
}

}

status = "";
objects = [];

function preload(){

  img = loadImage("dog and cat.jpg");

}

function setup(){
  
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  video.size(380, 380);
  object_detector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";

}

function modelLoaded(){
  console.log("Model Loaded!");
  status = true;
}

function gotResults(error, results){
if(error){
  console.error(error);
}
else{
console.log(results);
objects = results;

}

}