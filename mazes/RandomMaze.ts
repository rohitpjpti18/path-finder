import Board from "../Board";
import ColorNode from "../Color";
import Random from "../utilities/Random";


class RandomMaze{
    board: Board;
    random: Random;
    color: ColorNode;

    constructor(board:Board, colorhandler:ColorNode){
        this.board = board;
        this.color = colorhandler;
        this.random = new Random();
    }
    
    generateRandomMaze(){
        this.board.clearBoard();
        this.board.algoInProgress = true;
        for(let i = 0; i<this.board.nodes.nodeList.length; i++){
            if(i != this.board.source && i != this.board.destination){
                let random = this.random.generateTrueOrFalse();
                if(random){
                    let random2 = this.random.generateTrueOrFalse();
                    if(random2)
                        this.board.nodes.setNodeToWall(i);
                }
            }
        }
        this.color.recolorAllNodes(this.board.nodes.nodeList);

        this.board.algoInProgress = false;
    }

    execute(){
        this.generateRandomMaze();
    }
}


export default RandomMaze;