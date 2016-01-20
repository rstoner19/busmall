'use strict'
var totalClicks = -1;
var ran = 'no';
function imageData(name, imageAmount){
  this.imageName = name;
  this.imageLocation = imageAmount;
  this.clicks = 0;
  this.presented = 0;
}
var allProducts = [ new imageData('R2D2 Bag', 'bag.jpg'),
            new imageData('Banana Slicer', 'banana.jpg'),
            new imageData('Toeless Boots', 'boots.jpg'),
            new imageData('"Comfy" Chair', 'chair.jpg'),
            new imageData('Cthulhu', 'cthulhu.jpg'),
            new imageData('Dragon Meat', 'dragon.jpg'),
            new imageData('Pen Utencils', 'pen.jpg'),
            new imageData('Pizza Cutter', 'scissors.jpg'),
            new imageData('Shark Sleeping Bag', 'shark.jpg'),
            new imageData('Baby Cleaner', 'sweep.png'),
            new imageData('Unicorn Meat', 'unicorn.jpg'),
            new imageData('USB Tail', 'usb.gif'),
            new imageData('Never Ended Waterer', 'water-can.jpg'),
            new imageData('Wine Glass', 'wine-glass.jpg')];

function randomImage(names,idTag){
  var imageNumber = Math.floor(Math.random() * names.length);
  document.getElementById(idTag).src = 'img/' + allProducts[imageNumber].imageLocation;
  return imageNumber;
}

function uniqueImage(){
  var imageOne = randomImage(allProducts, 'imageOne');
  var imageTwo = randomImage(allProducts, 'imageTwo');
  var imageThree = randomImage(allProducts, 'imageThree');
  while(imageOne === imageTwo){
    imageTwo = randomImage(allProducts, 'imageTwo');
  }
  while(imageOne === imageThree || imageTwo === imageThree ){
    imageThree = randomImage(allProducts, 'imageThree');
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
  if(totalClicks >= 5 && allPresented() === true && ran === 'no'){
    var button = document.getElementById("graphResults");
    var buttonEl = document.createElement('button');
    buttonEl.setAttribute('id', 'submitResults');
    buttonEl.textContent = 'Show Results';
    button.appendChild(buttonEl);
    var showResults = document.getElementById('submitResults')
    showResults.addEventListener('click', drawChart);
    ran = 'yes';
  }
}
function allPresented(){
  for(var i=0; i < allProducts.length; i++){
    if(allProducts[i].presented === 0){
      return false;
    }
  }
  return true;
}

function clickOnFirst(){
  afterClick(0)
}
function clickOnSecond(){
  afterClick(1)
}
function clickOnThird(){
  afterClick(2)
}
function afterClick(number){
  allProducts[displayedImages[number]].clicks += 1;
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
              data: selections
          },
          {
              label: "Displayed",
              fillColor: "rgba(235,246,252,0.75)",
              data: userDisplayed
          }
      ]
  };
    var ctx = document.getElementById("results").getContext("2d");
    var myBarChart = new Chart(ctx).Bar(data);
}
