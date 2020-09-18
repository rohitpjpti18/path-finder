import Board from "../board";
import Random from "../utilities/randomnumbers";

class RecursiveDivision{

    board:Board;
    random:Random;

    constructor(board:Board){
        this.board = board;
        this.random = new Random();

    }

    async buildBorder(){
        for(let i = 0; i<this.board.nodes.column; i++){
            this.board.nodes.setNodeToWall(i);
            await this.board.colorHandler.updateNodeColor(this.board.nodes.nodeList[i])
        }
        for(let i = 1; i<this.board.nodes.row-1; i++){
            this.board.nodes.setNodeToWall(i*this.board.nodes.column);
            this.board.nodes.setNodeToWall(i*this.board.nodes.column+(this.board.nodes.column-1))
            await Promise.all([this.board.colorHandler.updateNodeColor(this.board.nodes.nodeList[i*this.board.nodes.column]), 
            this.board.colorHandler.updateNodeColor(
                this.board.nodes.nodeList[i*this.board.nodes.column+(this.board.nodes.column-1)])]);
        }

        for(let i = 0; i<this.board.nodes.column; i++){
            this.board.nodes.setNodeToWall(i+((this.board.nodes.row-1)*this.board.nodes.column));
            await this.board.colorHandler.updateNodeColor(
                this.board.nodes.nodeList[i+((this.board.nodes.row-1)*this.board.nodes.column)])
        }
    }

    async recursiveDivision(rowStartPos:number, rowEndPos:number, colStartPos:number, colEndPos:number){
        if((rowEndPos>rowStartPos+1)&&(colEndPos>colStartPos+1)){
            if((rowEndPos-rowStartPos)<(colEndPos-colStartPos)){
                let divider = this.random.GenerateEvenRandomNumber(colStartPos, colEndPos);
                for(let i = rowStartPos; i<=rowEndPos; i++){
                    let currentIndex = this.board.nodes.resolveRowColumn(i, divider);
                    await this.board.handleWallBuildingHauleHaule(currentIndex);
                }
                let openRow = this.random.GenerateOddRandomNumber(rowStartPos, rowEndPos);
                let openNode = this.board.nodes.resolveRowColumn(openRow, divider);
                await this.board.handleWallBuildingHauleHaule(openNode);


                await this.recursiveDivision(rowStartPos, rowEndPos, colStartPos, divider-1);
                await this.recursiveDivision(rowStartPos, rowEndPos, divider+1, colEndPos);
            }
            else{
                let divider = this.random.GenerateEvenRandomNumber(rowStartPos, rowEndPos);
                for(let i = colStartPos; i<=colEndPos; i++){
                    let currentIndex = this.board.nodes.resolveRowColumn(divider, i);
                    await this.board.handleWallBuildingHauleHaule(currentIndex);
                }
                let openCol = this.random.GenerateOddRandomNumber(colStartPos, colEndPos);
                let openNode = this.board.nodes.resolveRowColumn(divider, openCol);
                await this.board.handleWallBuildingHauleHaule(openNode);
    
                await this.recursiveDivision(rowStartPos, divider-1, colStartPos, colEndPos);
                await this.recursiveDivision(divider+1, rowEndPos, colStartPos, colEndPos);
            }
        }
    }


    async recursiveDivisionMaze(){
        this.board.algoInProgress = true;
        this.board.clearBoard();

        await this.buildBorder();
        await this.recursiveDivision(1, this.board.nodes.row-2, 1, this.board.nodes.column-2);
        this.board.algoInProgress = false;
    }
}


export default RecursiveDivision;