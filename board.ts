import NodeSet from "./utilities/NodeSet";
import EdgeSet from "./utilities/EdgeSet";
import ColorNode from "./Color";
import Random from "./utilities/Random";
import BreadthFirstSearch from "./algorithms/BreadthFirstSearch";
import DepthFirstSearch from "./algorithms/DepthFirstSearch";

class Board{
    nodes:NodeSet;
    openBuildByRD: boolean[];
    edges:EdgeSet;
    bfs:BreadthFirstSearch;
    colorHandler:ColorNode;
    container:any;
    table:any;
    source:number;
    destination:number;


    sSymbol:string;
    dSymbol:string;
    sSelectedSymbol:string;
    dSelectedSymbol:string;


    leftClicked:boolean;
    startNodeSelected:boolean;
    endNodeSelected:boolean;
    overlapped: boolean;
    algoExecuted: boolean;
    algoInProgress: boolean;
    algoID: number;

    previousCol: boolean;

    constructor(row: number, column: number, start: number, end: number){
        this.nodes = new NodeSet(row, column);
        this.edges = new EdgeSet();
        this.colorHandler = new ColorNode();
        this.container = document.getElementById("main");
        this.table = document.createElement("table");
        this.source = start;
        this.destination = end;
        this.algoID = -1;



        this.sSymbol = "<img class='start-mark'>$</img>";
        this.sSelectedSymbol = "<img class='start-mark'>$</img>";
        this.dSymbol = "<img class='end-mark'>O</img>";
        this.dSelectedSymbol =  "<img class='end-mark'>O</img>";

        this.algoExecuted = false;
        this.algoInProgress = false;
        this.leftClicked = false;
        this.startNodeSelected = false;
        this.endNodeSelected = false;
        this.overlapped = false;

        this.openBuildByRD = []

        this.previousCol = false;

        for(let i = 0; i<row; i++){
            let currentRow = document.createElement("tr");
            for(let j = 0; j<column; j++){
                let ID = (i*column+j).toString();
                let currentCol = document.createElement("td");
                currentCol.id = ID;
                currentRow.appendChild(currentCol);
                this.openBuildByRD.push(false);
            }
            this.table.appendChild(currentRow);
        }
        
        this.container.appendChild(this.table);
    
        let startNode = document.getElementById(this.source.toString());
        startNode.innerHTML = this.sSymbol;

        let endNode = document.getElementById(this.destination.toString());
        endNode.innerHTML = this.dSymbol;

        this.eventListeners();
    }

    handleWallBuilding(index:number){
        if(index != this.source && index != this.destination)
            this.nodes.setWallStatus(index);
        else{
            this.nodes.nodeList[index][4] = false;
        }
        this.colorHandler.recolorAllNodes(this.nodes.nodeList);
    }

    async handleWallBuildingHauleHaule(index:number){
        if(index != this.source && index != this.destination)
            this.nodes.setWallStatus(index);
        else{
            this.nodes.nodeList[index][4] = false;
        }
        await this.colorHandler.updateNodeColor(this.nodes.nodeList[index]);
    }



    clearPath(){

        this.algoExecuted = false;

        for(let i = 0; i<this.nodes.nodeList.length; i++){
            if(this.nodes.nodeList[i][4])
                this.nodes.nodeList[i][1] = 3;
            else
                this.nodes.nodeList[i][1] = 0;

            this.nodes.nodeList[i][2] = -1;
            this.nodes.nodeList[i][3] = -1;
        }

        this.colorHandler.recolorAllNodes(this.nodes.nodeList);
    }



    resetNodes(){
        
        for(let i = 0; i<this.nodes.nodeList.length; i++){
            if(this.nodes.nodeList[i][4])
                this.nodes.nodeList[i][1] = 3;
            else
                this.nodes.nodeList[i][1] = 0;

            this.nodes.nodeList[i][2] = -1;
            this.nodes.nodeList[i][3] = -1;
        }

        this.colorHandler.recolorAllNodes(this.nodes.nodeList);
    }


    clearBoard(){

        this.algoExecuted = false;

        for(let i = 0; i<this.nodes.nodeList.length; i++){
            if(this.nodes.nodeList[i][4]){
                this.nodes.setNodeToDefault(i)
            }
            else{
                this.nodes.nodeList[i][1] = 0;
            }
            this.nodes.nodeList[i][2] = -1;
            this.nodes.nodeList[i][3] = -1;
        }
        this.colorHandler.recolorAllNodes(this.nodes.nodeList);
    }

    eventListeners(){
        for(let i = 0; i<this.nodes.totalNodes; i++){
            let currentCell = document.getElementById(this.nodes.nodeList[i][0]);


            currentCell.onmousedown = (e)=>{
                e.preventDefault();
                if(this.algoInProgress){
                    return;
                }
                
                if(this.leftClicked && (this.startNodeSelected || this.endNodeSelected)){
                    this.leftClicked = false;
                    if(this.startNodeSelected){
                        currentCell.innerHTML = this.sSymbol;
                    }
                    else{
                        currentCell.innerHTML = this.dSymbol;
                    }
                    return;
                }



                this.leftClicked = true;
                if(currentCell.id !== this.source.toString() && currentCell.id !== this.destination.toString()){
                    let id = parseInt(currentCell.id);
                    this.handleWallBuilding(id);
                    return;
                }
                if(currentCell.id === this.source.toString()){
                    this.startNodeSelected = true;
                    currentCell.innerHTML = this.sSelectedSymbol;
                }
                else{
                    this.endNodeSelected = true;
                    currentCell.innerHTML = this.dSelectedSymbol;
                }
            }


            currentCell.onmouseenter = ()=>{
                if(this.algoInProgress){
                    return;
                }
                
                if(this.leftClicked && (!this.startNodeSelected && !this.endNodeSelected)){
                    if(currentCell.id !== this.source.toString() || currentCell.id !== this.destination.toString()){
                        let id = parseInt(currentCell.id);
                        this.handleWallBuilding(id);
                    }
                    return;
                }

                if(this.leftClicked && (this.startNodeSelected || this.endNodeSelected)){
 
                    if(this.nodes.isWall(parseInt(currentCell.id))){
                        this.overlapped = true;
                        this.nodes.setNodeToDefault(parseInt(currentCell.id)); 
                        this.colorHandler.recolorAllNodes(this.nodes.nodeList);
                    }


                    if(this.algoExecuted){
                        if(this.endNodeSelected)
                            this.reCompute("bfs", this.source , parseInt(currentCell.id));
                        else if (this.startNodeSelected)
                            this.reCompute("bfs", parseInt(currentCell.id), this.destination)
                    }
                    
                    if(this.startNodeSelected) currentCell.innerHTML = this.sSelectedSymbol;
                    else currentCell.innerHTML = this.dSelectedSymbol;
                }
            }

            currentCell.onmouseleave = () =>{
                if(this.algoInProgress){
                    return;
                }
                if(this.leftClicked && (currentCell.id == this.source.toString() || currentCell.id == this.destination.toString())){
                    if(currentCell.id == this.source.toString() && this.endNodeSelected){
                        currentCell.innerHTML = this.sSymbol;
                    }
                    else if(currentCell.id == this.destination.toString() && this.startNodeSelected){
                        currentCell.innerHTML = this.dSymbol;
                        return;
                    }


                }


                if(this.leftClicked && this.overlapped){
                    this.nodes.setNodeToWall(parseInt(currentCell.id));
                    this.colorHandler.recolorAllNodes(this.nodes.nodeList);
                    this.overlapped = false;
                }

                if(this.startNodeSelected || this.endNodeSelected){
                    currentCell.innerHTML = "";
                    return;
                }
            }

            currentCell.onmouseup = ()=>{

                if(this.algoInProgress){
                    return;
                }
                if(this.startNodeSelected){
                    if(this.nodes.isWall(parseInt(currentCell.id))){
                        this.nodes.setNodeToDefault(parseInt(currentCell.id));
                        this.colorHandler.recolorAllNodes(this.nodes.nodeList);
                        this.overlapped = false;
                    }
                    if(currentCell.id == this.destination.toString()){
                        var sN = document.getElementById(this.source.toString());
                        sN.innerHTML = this.sSymbol;
                        currentCell.innerHTML = this.dSymbol;
                        this.startNodeSelected = false;
                    }
                    else{
                        this.source = parseInt(currentCell.id);
                        this.startNodeSelected = false;
                        currentCell.innerHTML = this.sSymbol;
                    }
                }
                if(this.endNodeSelected){
                    if(this.nodes.isWall(parseInt(currentCell.id))){
                        this.nodes.setNodeToDefault(parseInt(currentCell.id));
                        this.colorHandler.recolorAllNodes(this.nodes.nodeList);
                        this.overlapped = false;
                    }
                    if(currentCell.id == this.source.toString()){
                        var eN = document.getElementById(this.destination.toString());
                        eN.innerHTML = this.dSymbol;
                        currentCell.innerHTML = this.sSymbol;
                        this.endNodeSelected = false;
                    }
                    else{
                        this.destination = parseInt(currentCell.id);
                        this.endNodeSelected = false;
                        currentCell.innerHTML = this.dSymbol;
                    }
                }

                this.leftClicked = false;
            }
        }
    }

    reCompute(algId:string, sor:number ,dest:number){
        if(this.algoID == 1){
            let bfs = new BreadthFirstSearch(this.nodes.nodeList, this.edges.edgeList, this.source, this.destination, this.colorHandler);

            bfs.quickExecute(this, sor, dest);
        }

        if(this.algoID == 2){
            this.resetNodes();
            this.colorHandler.recolorAllNodes(this.nodes.nodeList);
            
            this.edges.computeUnweightedEdges(this.nodes.nodeList, this.nodes.column);
            let dfs = new DepthFirstSearch(this.nodes.nodeList, this.edges.edgeList, this.source, this.destination, this.colorHandler);
            this.nodes.nodeList[sor][1] = 1;
            this.colorHandler.findQuickPath(this.nodes.nodeList, dest, sor);
            dfs.computeQuickDFS(sor, dest);
            this.colorHandler.findQuickPath(this.nodes.nodeList, dest, sor);
        }

    }

    async algoHandler(){
        switch(this.algoID){
            case 1:
                let bfs = new BreadthFirstSearch(this.nodes.nodeList, this.edges.edgeList, this.source, this.destination, this.colorHandler);
                await bfs.execute(this);
                break;
            case 2:
                this.algoInProgress = true;

                this.resetNodes();
                this.colorHandler.recolorAllNodes(this.nodes.nodeList);
    
                this.edges.computeUnweightedEdges(this.nodes.nodeList, this.nodes.column);
                let dfs = new DepthFirstSearch(this.nodes.nodeList, this.edges.edgeList, this.source, this.destination, this.colorHandler);
                this.nodes.nodeList[this.source][1] = 1;
                await this.colorHandler.updateNodeColor(this.nodes.nodeList[this.source]);
                await dfs.computeDFS(this.source);
                await this.colorHandler.findPath(this.nodes.nodeList, this.destination, this.source);
    
                this.algoInProgress = false;
                this.algoExecuted = true;
                break;
            default:
                alert("You haven't selected an algorithm or the algorithm you selected is not yet implemented. Please choose a valid algorithm.");
        }
        if(this.algoID == 1){

        }

        if(this.algoID == 2){

        }
    }
}


export default Board;