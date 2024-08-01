const start = document.querySelector(".start");
const player1btn = document.querySelectorAll(".player1 button");
const player2btn = document.querySelectorAll(".player2 button");
const dashboard = document.querySelector(".dashboard");
const play = document.querySelector(".play");
const cellDiv = document.querySelectorAll(".cell");
const p = document.querySelector("p");
const h3=document.querySelector("h3");
const playAgain=document.querySelector(".playAgain");

const cells = [];
cellDiv.forEach((cell) => cells.push(cell));
let p1choice = null;
let p2choice = null;
let winner;
let turn = 1;

function selectChoice(playerbtn, playerNum) {
  let clickedBtn = null;
  playerbtn.forEach((currBtn) => {
    currBtn.addEventListener("click", () => {
      if (clickedBtn !== null) {
        clickedBtn.style.backgroundColor = "#FCF7E8";
      }
      currBtn.style.backgroundColor = "#86CBC1";
      clickedBtn = currBtn;
      if (playerNum === 1) {
        p1choice = clickedBtn.className;
      } else if (playerNum === 2) {
        p2choice = clickedBtn.className;
      }
    });
  });
}

selectChoice(player1btn, 1);
selectChoice(player2btn, 2);

playAgain.addEventListener("click",()=>{
    dashboard.classList.remove("hide");
    play.classList.add("hide");
    player1btn.forEach(btn=>{
        btn.style.backgroundColor = "#FCF7E8";
    })
    player2btn.forEach(btn=>{
        btn.style.backgroundColor = "#FCF7E8";
})
})


start.addEventListener("click", () => {
  if (p1choice === null && p2choice === null || p1choice===null && p2choice!==null || p2choice===null && p1choice!==null) {
    alert("Please Select a player type for each player");
  }
  else {
    dashboard.classList.add("hide");
    play.classList.remove("hide");
    startPlay();
  }
});



function startPlay() {
  if (p1choice === "computer" && p2choice === "computer") {
    computerVscomputer();
  } else if (p1choice === "computer" && p2choice === "human") {
    if (computerMove()) return;
    humanMove();
  }else if (p1choice==='human' && p2choice==='computer'){
    if(turn==1)humanMove();
    else if((computerMove()))  return;
  }else {
    if(turn==1)
        h3.textContent='Turn of Player 1';
    if(turn==2)
        h3.textContent='Turn of Player 2';
    humanMove();
    let availableCells = cells.filter((cell) => cell.textContent === "");
  if (availableCells.length === 0) {
    h3.textContent='';
    p.textContent="It's a tie!";
    disableCells();
    return ;
  }
}}


function humanMove() {
  cells.forEach((cell) =>
    cell.addEventListener("click", function (event) {
      const pos = event.target;
      if (pos.textContent === "") {
        if (turn == 1) {
          pos.textContent = "X";
          turn = 2;
        } else {
          pos.textContent = "O";
          turn = 1;
        }
        winner = checkWinner(cells);
        if (winner === null) startPlay();
        else{
            h3.textContent='';
          if (winner === "X") p.textContent = "Player1 is the winner!";
          else p.textContent = "Player2 is the winner!";
          disableCells();
          return ;
        }
      }
    })
  );
}


function computerMove() {
  let markCell = selectCellComputer(cells);
  if (markCell === null) {
    p.textContent = "It's a tie!";
    return;
  }
  if (turn == 1) {
    markCell.textContent = "X";
    turn = 2;
  } else {
    markCell.textContent = "O";
    turn = 1;
  }
  winner = checkWinner(cells);
  if (winner === null){
    let availableCells = cells.filter((cell) => cell.textContent === "");
  if (availableCells.length === 0) {
    p.textContent="It's a tie!";
    disableCells();
    return true;
  }else
    return false;
} 
  {
    if (winner === "X") p.textContent = "Player1 is the winner!";
    else p.textContent = "Player2 is the winner!";
    disableCells();
    return true;
  }
}

function ComputerVsComputer() {
  if (p1choice == "computer" && p2choice == "computer") {
    let markCell = selectCellComputer(cells);
    while (markCell) {
      if (turn == 1) {
        markCell.textContent = "X";
        turn = 2;
      } else {
        markCell.textContent = "0";
        turn = 1;
      }
      winner = checkWinner(cells);
      if (winner != null) break;
      let availableCells = cells.filter((cell) => cell.textContent === "");
      if (availableCells.length === 0) {
        p.textContent = "It's a tie!";
        disableCells();
        return;
      }
      markCell = selectCellAi(cells);
    }
    if (winner === "X") p.textContent = "Player1 is the winner!";
    else p.textContent = "Player2 is the winner!";
    disableCells();
  }
}

function selectCellComputer(cells) {
    let availableCells = cells.filter((cell) => cell.textContent === "");
    if (availableCells.length === 0) return null;
    const index = Math.floor(Math.random() * availableCells.length);
    return availableCells[index];
  }
  

function checkWinner(cells) {
  const winnigCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let [a, b, c] of winnigCombos) {
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[b].textContent === cells[c].textContent
    )
      return cells[a].textContent;
  }
  return null;
}

function disableCells(){
    cells.forEach(cell=>{
        if(cell.textContent==='')
            cell.classList.add('inactive');
    })
}