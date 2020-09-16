import Board from './board';
import RecursiveDivision from './mazes/recursivedivision';


const row = 19;
const column = 51;
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