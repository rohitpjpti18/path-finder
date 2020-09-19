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


var starter = document.getElementById("start");
let wal = document.getElementById("wall");
let clear = document.getElementById("clear");





async function handleMazeBuilding(mazeType:string){
    if(mazeType == "recursive-division"){
        let mazeAlgo = new RecursiveDivision(board);
        mazeAlgo.recursiveDivisionMaze();
    }
}
async function handleAlgorithms(){
   board.algoHandler("bfs");
}

starter.onclick = (e)=>{
    handleAlgorithms();
}

wal.onclick = (e)=>{
    handleMazeBuilding("recursive-division");
}

clear.onclick = (e)=>{
    board.clearBoard();
}