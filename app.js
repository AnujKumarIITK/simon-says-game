//JavaScript File app.js

let gameseq = [];
let userseq = [];

let btns = ["red" , "yellow" , "green" , "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// For starting the Game.
document.addEventListener("keypress" , function() {
    if (started == false) {
        console.log("Game is started.");
        started = true;

        levelup();
    }
});

// For button flash
function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

//for user button flash
function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

// Game Level up
function levelup() {
    userseq = []; 
    level++;
    h2.innerText = `Level ${level}`;

    // Random Button chosen by Game
    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    
    //Matching Sequence
    gameseq.push(randColor);
    
    // Function for flashing button
    gameflash(randBtn);
}

//Matching sequence -> Check Sequence
function checkAns(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length == gameseq.length) {
            setTimeout(levelup, 1000);
        }
    }
    else {
        //Display Score
        h2.innerHTML = `Game Over! Your score was <b>${level}.</b> 
        <br><br>Press any key to start again.`;
        h2.style.color = "lightblue";

        //Change color of screen when game is over.
        document.querySelector("body").style.backgroundImage = "none";
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundImage = 'url("assets/background-image.jpeg")';
        }, 150);

        //Reset Game
        reset();
    }
}

//Button Event Listeners
function btnPress() {
    let btn = this;
    userflash(btn);
    
    //Matching Sequence
    userColor = btn.getAttribute("id");
    userseq.push(userColor);
    
    checkAns(userseq.length-1);
}

let allBtns = document.querySelectorAll(".btn");

for (btn of allBtns) {
    btn.addEventListener("click" , btnPress);
}

//Reset Game
function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}



