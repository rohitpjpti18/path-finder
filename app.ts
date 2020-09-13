import Board from './board';


const row = 20;
const column = 50;
const source = 61;
const destination = 380;


let board = new Board(row, column, source, destination);


var starter = document.getElementById("start");
let wal = document.getElementById("wall");
let clear = document.getElementById("clear");

async function initiateBFS(){
    await board.algoHandler("bfs");
}

starter.onclick = (e)=>{

    initiateBFS();


}

wal.onclick = (e)=>{
    board.buildBorder();
}

clear.onclick = (e)=>{
    board.clearPath();
}