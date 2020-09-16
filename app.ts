import Board from './board';
import RecursiveDivision from './mazes/recursivedivision';

let temp1 = 19;
let temp2 = 51;
if (navigator.userAgent.match(/Android/i) 
        || navigator.userAgent.match(/webOS/i) 
        || navigator.userAgent.match(/iPhone/i)  
        || navigator.userAgent.match(/iPad/i)  
        || navigator.userAgent.match(/iPod/i) 
        || navigator.userAgent.match(/BlackBerry/i) 
        || navigator.userAgent.match(/Windows Phone/i)) { 
        temp1= 13;
        temp2= 19;
} 

const row = temp1;
const column = temp2;
const source = 61;
const destination = 380;


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