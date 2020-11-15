import { start } from 'repl';
import Board from './Board';
import RandomMaze from './mazes/RandomMaze';
import RandomWeigths from './mazes/RandomWeights';
import RecursiveDivision from './mazes/RecursiveDivision';
import * as $ from 'jquery';

let temp1:number;
temp1 = Math.floor($(document).height()/28)+2;
if(temp1%2 == 0) temp1--;

let temp2:number;
temp2 = Math.floor($(document).width()/28)+5;
if(temp2%2 == 0) temp2--;

let temp3 = (temp2)+1;
let temp4 = (temp1-1)*(temp2)-2;
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
let row = temp1;
let column = temp2;
const source = temp3;
const destination = temp4;

// Initialize board
let board = new Board(row, column, source, destination);

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


let weights = document.getElementById("weights") as HTMLInputElement;


// generate random walls by default
let le = new RandomMaze(board, board.colorHandler);
le.execute();
le = null;



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


weights.onclick = () =>{
    if(weights.checked == true){
        board.addWeight = true;
    }else{
        board.addWeight = false;
    }
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