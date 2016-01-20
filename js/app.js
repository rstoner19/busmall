'use strict'
var imageNames = ['bag.jpg','banana.jpg','boots.jpg','chair.jpg','cthulhu.jpg','dragon.jpg','pen.jpg','scissors.jpg','shark.jpg','sweep.png','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'];
var totalClicks = -1;
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
var unicorn = new imageData('Unicorn Meat', 'unicorn.png');
var usb = new imageData('USB Tail', 'usb.gif');
var water = new imageData('Never Ended Waterer', 'water-can.jpg');
var wine = new imageData('Wine Glass', 'wine-glass.jpg');

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
  totalClicks += 1;
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
  if(totalClicks === 15){
    var button = document.getElementById("graphResults");
    var buttonEl = document.createElement('button');
    buttonEl.setAttribute('id', 'submitResults');
    buttonEl.textContent = 'Show Resutls';
    button.appendChild(buttonEl);
    var showResults = document.getElementById('submitResults')
    showResults.addEventListener('click', drawChart);
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

function drawChart(){
  var imageLabels = [];
  var selections = [];
  var userDisplayed = [];
  for(var i=0; i < allProducts.length; i++){
    imageLabels.push(allProducts[i].imageName);
    selections.push(allProducts[i].clicks);
    userDisplayed.push(allProducts[i].presented);
  }
  var data = {
      labels: imageLabels,
      datasets: [
          {
              label: "Selections",
              fillColor: "rgba(114,245,156,0.75)",
              strokeColor: "rgba(220,220,220,0.8)",
              highlightFill: "rgba(114,245,156,0.25)",
              highlightStroke: "rgba(220,220,220,1)",
              data: selections
          },
          {
              label: "Displayed",
              fillColor: "rgba(235,246,252,0.75)",
              strokeColor: "rgba(151,187,205,0.8)",
              highlightFill: "rgba(1235,246,252,0.25)",
              highlightStroke: "rgba(151,187,205,1)",
              data: userDisplayed
          }
      ]
  };
  var ctx = document.getElementById("results").getContext("2d");
  var myBarChart = new Chart(ctx).Bar(data);
}
