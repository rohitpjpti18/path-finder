import Board from './board';
import RecursiveDivision from './mazes/recursivedivision';

let temp1 = 23;
let temp2 = 59;
let temp3 = 61;
let temp4 = 380;
if (navigator.userAgent.match(/Android/i) 
        || navigator.userAgent.match(/webOS/i) 
        || navigator.userAgent.match(/iPhone/i)  
        || navigator.userAgent.match(/iPad/i)  
        || navigator.userAgent.match(/iPod/i) 
        || navigator.userAgent.match(/BlackBerry/i) 
        || navigator.userAgent.match(/Windows Phone/i)) { 
        temp1 = 23;
        temp2 = 15;
        temp3 = 16;
        temp4 = 313;
} 

const row = temp1;
const column = temp2;
const source = temp3;
const destination = temp4;


let board = new Board(row, column, source, destination);


let startExec = document.getElementById("startExec");
let wal = document.getElementById("wall");
let clear = document.getElementById("clear");

let dfs = document.getElementById("dfs");
let bfs = document.getElementById("bfs");

dfs.onclick = ()=>{
    console.log("dfs worked!!");
    board.algoID = 2;
}

bfs.onclick = ()=>{
    board.algoID = 1;
}


startExec.onclick = ()=>{
    console.log("startExec worked!!");
    board.algoHandler("bfs");
}


async function handleMazeBuilding(mazeType:string){
    if(mazeType == "recursive-division"){
        let mazeAlgo = new RecursiveDivision(board);
        mazeAlgo.recursiveDivisionMaze();
    }
}
async function handleAlgorithms(){
   board.algoHandler("bfs");
}


wal.onclick = ()=>{
    handleMazeBuilding("recursive-division");
}

clear.onclick = ()=>{
    board.clearBoard();
}





var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementById("close");

// When the user clicks the button, open the modal 
modal.style.display = "block";

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}