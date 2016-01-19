'use strict'
var imageNames = ['bag.jpg','banana.jpg','boots.jpg','chair.jpg','cthulhu.jpg','dragon.jpg','pen.jpg','scissors.jpg','shark.jpg','sweep.png','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'];
var imageLabel = [];
for (var i =0; i< imageNames.length; i++){
  imageLabel[i] = imageNames[i].substr(0, imageNames[i].indexOf('.'));
}
var count = -1;
var allProducts = [];
function imageData(name, imageAmount){
  this.imageName = name;
  this.imageLocation = imageAmount;
  this.clicks = 0;
  this.presented = 0;
  allProducts.push(this);
}
var bag = new imageData('R2D2 Bag', 'bag.jpg');
var banana = new imageData('Banana Slicer', 'banana.jpg');
var boots = new imageData('Toeless Boots', 'boots.jpg');
var chair = new imageData('"Comfy" Chair', 'chair.jpg');
var cthulhu = new imageData('Cthulhu', 'cthulhu.jpg');
var dragon = new imageData('Dragon Meat', 'dragon.jpg');
var pen = new imageData('Pen Utencils', 'pen.jpg');
var scissors = new imageData('Pizza Cutter', 'scissors.jpg');
var shark = new imageData('Shark Sleeping Bag', 'shark.jpg');
var sweep = new imageData('Baby Cleaner', 'sweep.png');
var unicorn = new imageData('Unicorn Ji... Meat', 'unicorn.png');
var usb = new imageData('USB Tail', 'usb.gif');
var water = new imageData('Never Ended Waterer', 'water-can.jpg');
var wine = new imageData('Das Boot for Wine', 'wine-glass.jpg');

function randomImage(names, idTag){
  var imageNumber = Math.floor(Math.random() * names.length);
  var image = document.getElementById('images')
  var imgEl = document.createElement('img');
  imgEl.setAttribute('id', idTag);
  imgEl.src = 'img/' + names[imageNumber];
  image.appendChild(imgEl);
  return imageNumber;
}

function uniqueImage(){
  var imageOne = randomImage(imageNames, 'imageOne');
  var imageTwo = randomImage(imageNames, 'imageTwo');
  var imageThree = randomImage(imageNames, 'imageThree');
  while(imageOne === imageTwo){
    var image = document.getElementById('imageTwo');
    var containerEl = image.parentNode;
    containerEl.removeChild(image);
    imageTwo = randomImage(imageNames, 'imageTwo');
  }
  while(imageOne === imageThree || imageTwo === imageThree ){
    var image = document.getElementById('imageThree');
    var containerEl = image.parentNode;
    containerEl.removeChild(image);
    imageThree = randomImage(imageNames, 'imageThree');
  }
  count += 1;
  console.log(count);
  allProducts[imageOne].presented += 1;
  allProducts[imageTwo].presented += 1;
  allProducts[imageThree].presented += 1;
  return [imageOne,imageTwo,imageThree];
}
var displayedImages = uniqueImage();
newEventSet();

function newEventSet(){
  var imageOne = document.getElementById('imageOne');
  var imageTwo = document.getElementById('imageTwo');
  var imageThree = document.getElementById('imageThree');
  imageOne.addEventListener('click', clickOnFirst);
  imageTwo.addEventListener('click', clickOnSecond);
  imageThree.addEventListener('click', clickOnThird);
  if(count === 15){
    for(var i=0;i < allProducts.length; i++){
      var results = document.getElementById('results');
      var resultEl = document.createElement('p');
      resultEl.textContent = allProducts[i].imageName + ' was presented: ' + allProducts[i].presented + ' times. Clicked ' + allProducts[i].clicks + ' times.';
      results.appendChild(resultEl);
    }
  }
}

function clearImages(){
  var image = document.getElementById('images');
  while(image.firstChild){
    image.removeChild(image.firstChild);
  }
}
function clickOnFirst(){
  allProducts[displayedImages[0]].clicks += 1;
  clearImages();
  displayedImages = uniqueImage();
  newEventSet();
}
function clickOnSecond(){
  allProducts[displayedImages[1]].clicks += 1;
  clearImages();
  displayedImages = uniqueImage();
  newEventSet();
}
function clickOnThird(){
  allProducts[displayedImages[2]].clicks += 1;
  clearImages();
  displayedImages = uniqueImage();
  newEventSet();
}
