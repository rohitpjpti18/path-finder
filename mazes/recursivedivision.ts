import Board from "../Board";
import Random from "../utilities/Random";

class RecursiveDivision{

    board:Board;
    random:Random;

    constructor(board:Board){
        this.board = board;
        this.random = new Random();

    }


    handleReachability(sor:number, dest:number ){
        let sourceNeighbours = this.board.nodes.getNeighbours(sor);
        let destinationNeighbours = this.board.nodes.getNeighbours(dest);
        console.log(sourceNeighbours);
        console.log(destinationNeighbours);
        let isSNAllWalls:boolean = true;
        let isDNAllWalls:boolean = true; 

        for(let sn = 0; sn<sourceNeighbours.length; sn++){
            if(!this.board.nodes.isWall(sourceNeighbours[sn])) isSNAllWalls = false;
        }
        
        for(let dn = 0; dn<destinationNeighbours.length; dn++){
            if(!this.board.nodes.isWall(destinationNeighbours[dn])) isDNAllWalls = false;
        }

        if(isSNAllWalls){
            let random = new Random();
            let i = random.generateRandomNumber(0, sourceNeighbours.length-1);
            this.board.nodes.setNodeToDefault(sourceNeighbours[i]);
        }

        if(isDNAllWalls){
            let random = new Random();
            let i = random.generateRandomNumber(0, destinationNeighbours.length-1);
            this.board.nodes.setNodeToDefault(destinationNeighbours[i]);
        }

        this.board.colorHandler.recolorAllNodes(this.board.nodes.nodeList, this.board.source, this.board.destination);
    }

    async buildBorder(){
        for(let i = 0; i<this.board.nodes.column; i++){
            if(i !== this.board.source && i !== this.board.destination){
                this.board.nodes.setNodeToWall(i);
                await this.board.colorHandler.updateNodeColor(this.board.nodes.nodeList[i])
            }
        }
        for(let i = 1; i<this.board.nodes.row-1; i++){
            if(i*this.board.nodes.column !== this.board.source && i*this.board.nodes.column !== this.board.destination){
                this.board.nodes.setNodeToWall(i*this.board.nodes.column);
                this.board.nodes.setNodeToWall(i*this.board.nodes.column+(this.board.nodes.column-1))
                await Promise.all([this.board.colorHandler.updateNodeColor(this.board.nodes.nodeList[i*this.board.nodes.column]), 
                this.board.colorHandler.updateNodeColor(
                    this.board.nodes.nodeList[i*this.board.nodes.column+(this.board.nodes.column-1)])]);
            }
        }

        for(let i = 0; i<this.board.nodes.column; i++){
            if(i+((this.board.nodes.row-1)*this.board.nodes.column) !== this.board.source &&
               i+((this.board.nodes.row-1)*this.board.nodes.column) !== this.board.destination
            ){
                this.board.nodes.setNodeToWall(i+((this.board.nodes.row-1)*this.board.nodes.column));
                await this.board.colorHandler.updateNodeColor(
                    this.board.nodes.nodeList[i+((this.board.nodes.row-1)*this.board.nodes.column)]);
            }

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


    async recursiveDivisionVertical(rowStartPos:number, rowEndPos:number, colStartPos:number, colEndPos:number){
        if((rowEndPos>rowStartPos+1)&&(colEndPos>colStartPos+1)){
            let divider = this.random.GenerateEvenRandomNumber(colStartPos, colEndPos);
            for(let i = rowStartPos; i<=rowEndPos; i++){
                let currentIndex = this.board.nodes.resolveRowColumn(i, divider);
                await this.board.handleWallBuildingHauleHaule(currentIndex);
            }
            let openRow = this.random.GenerateOddRandomNumber(rowStartPos, rowEndPos);
            let openNode = this.board.nodes.resolveRowColumn(openRow, divider);
            await this.board.handleWallBuildingHauleHaule(openNode);


            await this.recursiveDivisionVertical(rowStartPos, rowEndPos, colStartPos, divider-1);
            await this.recursiveDivisionVertical(rowStartPos, rowEndPos, divider+1, colEndPos);
        }
    }


    async recursiveDivisionHorizontal(rowStartPos:number, rowEndPos:number, colStartPos:number, colEndPos:number){
        if((rowEndPos>rowStartPos+1)&&(colEndPos>colStartPos+1)){
            let divider = this.random.GenerateEvenRandomNumber(rowStartPos, rowEndPos);
                for(let i = colStartPos; i<=colEndPos; i++){
                    let currentIndex = this.board.nodes.resolveRowColumn(divider, i);
                    await this.board.handleWallBuildingHauleHaule(currentIndex);
                }
                let openCol = this.random.GenerateOddRandomNumber(colStartPos, colEndPos);
                let openNode = this.board.nodes.resolveRowColumn(divider, openCol);
                await this.board.handleWallBuildingHauleHaule(openNode);
    
                await this.recursiveDivisionHorizontal(rowStartPos, divider-1, colStartPos, colEndPos);
                await this.recursiveDivisionHorizontal(divider+1, rowEndPos, colStartPos, colEndPos);
        }
    }


    async recursiveDivisionMaze(){
        this.board.algoInProgress = true;
        this.board.clearBoard();

        await this.buildBorder();
        await this.recursiveDivision(1, this.board.nodes.row-2, 1, this.board.nodes.column-2);
        
        this.handleReachability(this.board.source, this.board.destination);
        this.board.algoInProgress = false;
    }



    async recursiveDivisionVerticalMaze(){
        this.board.algoInProgress = true;
        this.board.clearBoard();

        await this.buildBorder();
        await this.recursiveDivisionVertical(1, this.board.nodes.row-2, 1, this.board.nodes.column-2);

        this.board.algoInProgress = false;
    }

    async recursiveDivisionHorizontalMaze(){
        this.board.algoInProgress = true;
        this.board.clearBoard();

        await this.buildBorder();
        await this.recursiveDivisionHorizontal(1, this.board.nodes.row-2, 1, this.board.nodes.column-2);

        this.board.algoInProgress = false;
    }





    async execute(id:number){
        if(id == 1){
            await this.recursiveDivisionMaze();
        }
        if(id == 2){
            await this.recursiveDivisionVerticalMaze();
        }
        if(id == 3){
            await this.recursiveDivisionHorizontalMaze();
        }
    }
}


export default RecursiveDivision;