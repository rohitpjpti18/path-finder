import { start } from 'repl';
import Board from './Board';
import RandomMaze from './mazes/RandomMaze';
import RandomWeigths from './mazes/RandomWeights';
import RecursiveDivision from './mazes/RecursiveDivision';
import * as $ from 'jquery';

let temp1:number;
temp1 = Math.floor($(document).height()/24)-4;
if(temp1%2 == 0) temp1--;

let temp2:number;
temp2 = Math.floor($(document.getElementById("my")).width()/24);
if(temp2%2 == 0) temp2--;

let row = temp1;
let column = temp2;
const source = Math.floor(row/2)*column + Math.floor(column*(1/3));
const destination = Math.floor(row/2)*column + Math.floor(column*(2/3));

let activeColor = "#6199f2";

let defaultSpeed = 55
// Initialize board
let board = new Board(row, column, source, destination, defaultSpeed);

// get find path and clear the board buttons tag
let startExec = document.getElementById("startExec") as HTMLInputElement;
let clear = document.getElementById("clear") as HTMLInputElement;

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
let astar = document.getElementById("astar");


let weights = document.getElementById("weights") as HTMLInputElement;
let speed = document.getElementById("speed") as HTMLInputElement;



function disableAllButton(){
    clear.disabled = true;
    startExec.disabled = true;
    weights.disabled = true;
}

function enableAllButton(){
    clear.disabled = false;
    startExec.disabled = false;
    weights.disabled = false;
}


let defaultpattern = new RecursiveDivision(board);
disableAllButton();
defaultpattern.execute(0);
enableAllButton();
defaultpattern = null;


rdi.onclick = async ()=>{
    if(clear.disabled){
        return;
    }
    disableAllButton();
    let rd = new RecursiveDivision(board);
    await rd.execute(1);
    enableAllButton();
}

rdv.onclick = async ()=>{
    if(clear.disabled){
        return;
    }
    disableAllButton();
    let rd = new RecursiveDivision(board);
    await rd.execute(2);
    enableAllButton();
}

rdh.onclick = async ()=>{
    if(clear.disabled){
        return;
    }
    disableAllButton();
    let rd = new RecursiveDivision(board);
    await rd.execute(3);
    enableAllButton();
}

rwl.onclick = async ()=>{
    if(clear.disabled){
        return;
    }
    disableAllButton();
    let rw = new RandomMaze(board, board.colorHandler);
    rw.execute();
    enableAllButton();
}

rweight.onclick = ()=>{
    if(clear.disabled){
        return;
    }
    disableAllButton();
    let ri = new RandomWeigths(board, board.colorHandler);
    ri.execute();
    enableAllButton();
}


function updateAlgoActive(activeStr:number){
    var algo = [bfs ,bfs, dfs, dijkstra, astar];

    for(let i = 0; i<algo.length; i++){
        algo[i].style.backgroundColor = "initial";
    }

    algo[activeStr].style.backgroundColor = activeColor;
}

bfs.onclick = ()=>{
    if(board.algoInProgress) return;

    updateAlgoActive(1);
    startExec.innerText = "Find path using BFS";
    board.algoID = 1;
}

dfs.onclick = ()=>{
    //console.log("dfs worked!!");
    if(board.algoInProgress) return;

    updateAlgoActive(2);
    startExec.innerText = "Find path using DFS";
    board.algoID = 2;
}



dijkstra.onclick = ()=>{
    if(board.algoInProgress) return;

    updateAlgoActive(3);
    startExec.innerText = "Find path using dijkstra's";
    board.algoID = 3;
}

astar.onclick = ()=>{
    if(board.algoInProgress) return;

    updateAlgoActive(4);
    startExec.innerText = "Find path using A*";
    board.algoID = 4;
}


startExec.onclick = async ()=>{
    //console.log("startExec worked!!");
    if(board.algoInProgress) return;

    clear.disabled = true;
    weights.disabled = true;

    await board.algoHandler();
    clear.disabled = false;
    weights.disabled = false;
}

clear.onclick = ()=>{
    if(board.algoInProgress) return;

    board.clearBoard();
}


weights.onclick = () =>{
    if(board.algoInProgress) return;

    if(weights.checked == true){
        board.addWeight = true;
    }else{
        board.addWeight = false;
    }
}

speed.oninput = () =>{
    let incrementvalue = 5;
    let baseSpeed = 105;
    board.changeSpeed(baseSpeed - Math.floor(incrementvalue*parseInt(speed.value)))
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