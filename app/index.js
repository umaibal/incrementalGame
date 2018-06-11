//counter variables:
let points = 0;
let clickCount = 0;
let movingBird;
let can = document.getElementById("myCanvas").getContext("2d");
can.fillStyle = "hsl(50, 100%, 50%)"; //set initial canvas fill
can.fillRect(0,0,500,600);

let clickCanvasA = document.getElementById("clickProgressA").getContext("2d");
let clickCanvasB = document.getElementById("clickProgressB").getContext("2d");

class FlappyBirdAvatar {
  constructor(name, xCoord, yCoord){
    this.name = name;
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    this.avatar = new Image();
    this.avatar.src = 'flappyBird.png';

    this.avatar.onload = () => {
      can.drawImage(this.avatar, this.xCoord, this.yCoord) ;
    } //draw image on avatar load
  }

  flyUp() {

    if(this.yCoord >= 20) { //if near top of canvas
      this.yCoord -= 20;
      console.log("new coord" + this.yCoord);
      can.fillStyle = "hsl(50, 100%, 50%)"; //refill bkgd
      can.fillRect(0, 0, 500, 600);
    } else {
      // can.fillStyle = "hsl(25, 100%, 50%)"; //reset fill
      fillColor(); //get a new randomized canvas fill
      can.fillRect(0, 0, 500, 600);
      this.yCoord = 530; //reset bird position
    }

    movingBird = new FlappyBirdAvatar("yellowBird", this.xCoord, this.yCoord);
  } //function to increase avatar's yCoord as user clicks
}

//create inital avatar:
let birdOne = new FlappyBirdAvatar("yellowBird", 210, 530);

window.onload = () => {
  console.log("loading game when window loads");
  setTimeout(gameTime(), 60000); //call game timer function
  document.getElementById("pointsDisplay").innerHTML = "Points: "
  + points; //make sure points display

  try {
    const loadedData = JSON.parse(localStorage.getItem("save"));
    console.log("load complete");

    //if statements to check if each value is valid:
    if(typeof loadedData.clicks !== "undefined") {
      points = loadedData.clicks;
      document.getElementById("clickButton").textContent = "CLICK HERE!";
    }
    if(typeof loadedData.currentItem !== "undefined") {
      points = loadedData.currentItem;
      document.getElementById("clickButton").textContent = "CLICK HERE!";
    }
  }
  catch(error) {
    console.error(error);
  }
}

function fillColor() {
  let hue = (Math.random() * 100) + (Math.random() * 100);
  can.fillStyle = "hsl(" + hue + ", 100%, 50%)"; //set initial canvas fill
}

document.getElementById("clickButton").addEventListener ('click', () => {
  console.log(clickCount);
  points++; //increment point count when clicked
  clickCount++;
  document.getElementById("clickButton").textContent = "CLICK HERE!";
  if(clickCount == 1) {
    //highlight clickProgressA on first click:
    clickCanvasA.fillStyle = "blue";
    clickCanvasA.fillRect(0, 0, 500, 40);
    console.log("blue" + clickCount);
  }else if(clickCount == 2 ) {
    //highlight clickProgressB on second click:
    clickCanvasB.fillStyle = "pink";
    clickCanvasB.fillRect(0, 0, 500, 40);
    console.log("pink" + clickCount);
  }
  birdOne.flyUp(); //make bird fly by calling function
});

function cheatFunction() {
  console.log("current points" + points);
  points += 50; //adds enough points to progress to next level
  console.log("upgraded points" + points);
}

document.getElementById("cheatButton").addEventListener('click', () => {
  //upgrade pounts using cheat if user clicks cheatButton
  cheatFunction();
});

function saveGame() {
  // store save data as object literal:
  console.log("Attempting save...");
  let save = {
    clicks: points, //points is the variable that stores each click
    currentItem: points //one option from an array of options
  }
  try {
    localStorage.setItem("save", JSON.stringify(save));
    console.log("Save complete :)");
  }
  catch(error) {
    console.error(error);
  }
}

document.getElementById("saveButton").addEventListener('click', () => {
  saveGame(); //save game upon clicking save button
});

function newGame() {
  const loadedData = JSON.parse(localStorage.getItem("save"));
  //enable buttons so user can play game:
  document.getElementById("clickButton").disabled = false;
  document.getElementById("saveButton").disabled = false;
  document.getElementById("cheatButton").disabled = false;
  //reset points variable:
  points = 0;
  loadedData.clicks = 0;
}

document.getElementById("newGameButton").addEventListener('click', () => {
  newGame(); //start a new game, erase save data
  gameTime(); //restart countdown timer function
});

function gameTime() {
  let seconds = 60; //game lasts for 60 seconds
  let myInterval = setInterval(function() {
    if(seconds == 0) {
      //stop timer after it reaches 0 seconds or bird falls down:
      alert("GAME OVER!!!");
      clearInterval(myInterval);
      //disable buttons so user cannot control game:
      document.getElementById("clickButton").disabled = true;
      document.getElementById("saveButton").disabled = true;
      document.getElementById("cheatButton").disabled = true;
      //hide canvases by setting to white:
      clickCanvasA.fillStyle = "white";
      clickCanvasA.fillRect(0, 0, 500, 40);
      clickCanvasB.fillStyle = "white";
      clickCanvasB.fillRect(0, 0, 500, 40);
    }
    document.getElementById("timer").innerHTML = "Time Left: "
    + seconds + " seconds"; //display countdown
    seconds--; //decrement each second
  }, 1000); //do this every second

  let pointsInterval = setInterval(function() {
    document.getElementById("pointsDisplay").innerHTML = "Points: "
    + points; //make sure points display
  }, 100);

  let progressInterval = setInterval(function() {
    if(clickCanvasA.fillStyle != "white" && clickCanvasB.fillStyle != "white") {
      console.log(clickCount + " both bars have been filled up");
      clickCount = 0; //reset counter
      //discolor progress bars
      clickCanvasB.fillStyle = "white";
      clickCanvasB.fillRect(0, 0, 500, 40);
      clickCanvasA.fillStyle = "white";
      clickCanvasA.fillRect(0, 0, 500, 40);
      can.fillStyle = "hsl(50, 100%, 50%)"; //refill bkgd
      can.fillRect(0, 0, 500, 600);

      birdOne = new FlappyBirdAvatar("yellowBird", 210, 545);
      console.log("NEW Y COORD AFTER FALLING: " + birdOne.yCoord);
      if(birdOne.yCoord == 345) {
        points += 10; //bonus for fast clicks!
        console.log('good job: bonus + 10 points');
      } else if(birdOne.yCoord >= 325) {
        points += 20; //bonus for fast clicks!
        console.log('good job: bonus + 20 points');
      }
    }
  }, 2000);
}
