//Algorithm:
//1. Start the game when user presses any key
//2. Show the level number and flash a random button
//3. User clicks a button and it gets added to user sequence
//4. Check if the user sequence is correct or not
//5. If correct, then repeat step 2 with level number incremented by 1
//6. If wrong, then show game over message and reset the game

let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "blue"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game is started");
    started = true;
    levelUp();
  }
});

function flashBtn(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function UserBtn(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randcolor = btns[randIdx];
  let randBtn = document.querySelector(`.${randcolor}`);
  gameSeq.push(randcolor);
  console.log(gameSeq);
  flashBtn(randBtn);
}

function btnPress() {
  let btn = this;
  UserBtn(btn);
  userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkSeq(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function checkSeq(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(function () {
        levelUp();
      }, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your score was <b>${level}</b>. <br> Press any key to restart`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 1000);
    reset();
  }
}

function reset() {
  level = 0;
  gameSeq = [];
  started = false;
  userSeq = [];
}
