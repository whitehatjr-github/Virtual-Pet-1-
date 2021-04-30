//Create variables here
var dog, dogImg;
var happyDog;
var database;
var foodS;
var foodStock;

function preload()
{
	//load images here
  //PROPERLY LOAD THE IMAGES
  dogImg=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png");

}

function setup() {
  database = firebase.database();

	createCanvas(500, 500);

  
  dog = createSprite(250,250,10,10);
  //PROPERLY ADD THE IMAGE
  dog.addImage(dogImg)
  var dogPosition = database.ref("dog/Position");

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);




}


function draw() {  
  
  //always put background command in function draw
  background(46,139,87);

  fill("yellow");
  text("Press Up-Arrow Key to feed the Dog", 150, 20);

  dog.scale = 0.3;

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    //add the other dog image for this function, the dog is happy while eating food
    dog.addImage(happyDog);
  }

  drawSprites();
    
}

//function to read values from database
function readStock(data){
  foodS=data.val();
}

//function to write values in database
function writeStock(x){

//when foodS is at 0, it CAN'T get lower and become negative, so keep it at 0 
if(x<=0){
  x=0;
}else{
  x=x-1;
}

  database.ref('/').update({
    Food:x
  })
}


