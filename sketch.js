var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed;
var lastFed;
//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feedTheDog = createButton("Feed The Dog");
  feedTheDog.position(500,200);
  feedTheDog.mousePressed(feedDog);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  lastFed = database.ref('FeedTime')
  lastFed.on("value",function(data){
    ;stFed = data.val()
  })
 
  //write code to display text lastFed time here
textSize(20);
fill("black");
text("Last Fed : "+lastFed,300,30);

 
  drawSprites();

  database.ref('/').update({
    Food:foodObj.getFoodStock(),FeedTime:hour()
  })
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
var food_stock_val = foodObj.getFoodStork();
if(food_stock_val <=0){
  foodObj.updateFoodStock(food_stock_val *0);
}else{
  foodObj.updateFoodStock(food_stock_val-1);
}


database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FoodTime:hour()
});




}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
