import Dijkstra from './algorithms/DijkstrasAlgorithm';
import Board from './Board';
import RandomMaze from './mazes/RandomMaze';
import RandomWeigths from './mazes/RandomWeights';
import RecursiveDivision from './mazes/RecursiveDivision';

let temp1 = 23;
let temp2 = 59;
let temp3 = 600;
let temp4 = 636;
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


let weights = document.getElementById("weights") as HTMLInputElement;


weights.onclick = () =>{
    if(weights.checked == true){
        board.addWeight = true;
    }else{
        board.addWeight = false;
    }
}





let startExec = document.getElementById("startExec");
let wal = document.getElementById("wall");
let clear = document.getElementById("clear");

// get all maze buttons tag
let rdi = document.getElementById("rdi");
let rdv = document.getElementById("rdv");
let rdh = document.getElementById("rdh");
let rwl = document.getElementById("rwl");
let rweight = document.getElementById("rweight");


// get all algorithm buttons tag
let dfs = document.getElementById("dfs");
let bfs = document.getElementById("bfs");
let dijkstra = document.getElementById("dijkstra");


rdi.onclick = ()=>{
    let rd = new RecursiveDivision(board);
    rd.execute(1);
}

rdv.onclick = ()=>{
    let rd = new RecursiveDivision(board);
    rd.execute(2);
}

rdh.onclick = ()=>{
    let rd = new RecursiveDivision(board);
    rd.execute(3);
}

rwl.onclick = ()=>{
    let rw = new RandomMaze(board, board.colorHandler);
    rw.execute();
}

rweight.onclick = ()=>{
    let ri = new RandomWeigths(board, board.colorHandler);
    ri.execute();
}

dfs.onclick = ()=>{
    //console.log("dfs worked!!");
    board.algoID = 2;
}

bfs.onclick = ()=>{
    board.algoID = 1;
}

dijkstra.onclick = ()=>{
    board.algoID = 3;
}








startExec.onclick = ()=>{
    //console.log("startExec worked!!");
    board.algoHandler();
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