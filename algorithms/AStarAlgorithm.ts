import { timeStamp } from "console";
import Board from "../Board";
import ColorNode from "../Color";
import EdgeSet from "../utilities/EdgeSet";
import Heap from "../utilities/Heap";

class AStarAlgorithm{
    source:number;
    destination:number;
    colorhandler:ColorNode;
    nodes:any[];
    edges:any[];
    distance:any[];
    heap:Heap;
    board: Board;

    constructor(board:Board, colorhandler: ColorNode){
        this.source = board.source;
        this.destination = board.destination;
        this.nodes = board.nodes.nodeList;
        this.edges = board.edges.adjacenyList;
        this.colorhandler = colorhandler;
        this.board = board;
    }

    computeQuickAStar(){
        this.nodes[this.source][6] = 0;
        this.nodes[this.source][7] = this.computeDistance(this.source, this.destination);
        this.nodes[this.source][2] = -1;
        this.nodes[this.source][1] = 1;
        this.nodes[this.source][3] = 1
        let toBeEvaluated = []; // open: the set of nodes to be evaluated
        toBeEvaluated.sort((a, b) => {return b[8]-a[8]});  // sort according to fCost
        let evaluated = []; // closed: the set of nodes already evaluated 
        toBeEvaluated.push(this.source);

        while(toBeEvaluated.length !== 0){
            let nodeWithLowestFCost = toBeEvaluated[0];
            let iONWLC = 0 // index of node with lowest Cost 
            for(let i = 1; i<toBeEvaluated.length; i++){
                if(this.nodes[toBeEvaluated[i]][8] <= this.nodes[nodeWithLowestFCost][8]){
                    if(this.nodes[toBeEvaluated[i]][7] < this.nodes[nodeWithLowestFCost][7]){
                        nodeWithLowestFCost = toBeEvaluated[i];
                        iONWLC = i;
                    }
                }    
            }

            toBeEvaluated.splice(iONWLC, 1);
            let current = nodeWithLowestFCost;
            evaluated.push(current);
            this.nodes[current][1] = 1;
            this.nodes[current][3] = 1; 


            if(current === this.destination){
                return;
            }

            for(let i = 0; i<this.edges[current].length; i++){
                let neighbour = this.edges[current][i][0];
                
                if(!this.nodes[neighbour][4] && !evaluated.includes(neighbour)){
                    let newGCostToNeighbour = 0;
                    if(!this.nodes[neighbour][5]){
                        newGCostToNeighbour = this.nodes[current][6] + 1;
                    }else{
                        newGCostToNeighbour = this.nodes[current][6] + 1 + this.edges[current][i][1];
                    }

                    if( newGCostToNeighbour < this.nodes[neighbour][6] || !toBeEvaluated.includes(neighbour) ){
                        this.nodes[neighbour][6] = newGCostToNeighbour;    
                        this.nodes[neighbour][7] = this.computeDistance(neighbour, this.destination);
                        this.nodes[neighbour][8] = this.nodes[neighbour][6] + this.nodes[neighbour][7];
                        this.nodes[neighbour][2] = current;

                        if(!toBeEvaluated.includes(neighbour)){
                            toBeEvaluated.push(neighbour);
                        }
                    }
                }


            }
        }
    }

    async computeAStar(){
        this.nodes[this.source][6] = 0;
        this.nodes[this.source][7] = this.computeDistance(this.source, this.destination);
        this.nodes[this.source][2] = -1;
        this.nodes[this.source][1] = 1;
        this.nodes[this.source][3] = 1
        let toBeEvaluated = []; // open: the set of nodes to be evaluated
        toBeEvaluated.sort((a, b) => {return b[8]-a[8]});  // sort according to fCost
        let evaluated = []; // closed: the set of nodes already evaluated 
        toBeEvaluated.push(this.source);

        while(toBeEvaluated.length !== 0){
            let nodeWithLowestFCost = toBeEvaluated[0];
            let iONWLC = 0 // index of node with lowest Cost 
            for(let i = 1; i<toBeEvaluated.length; i++){
                if(this.nodes[toBeEvaluated[i]][8] <= this.nodes[nodeWithLowestFCost][8]){
                    if(this.nodes[toBeEvaluated[i]][7] < this.nodes[nodeWithLowestFCost][7]){
                        nodeWithLowestFCost = toBeEvaluated[i];
                        iONWLC = i;
                    }
                }    
            }

            toBeEvaluated.splice(iONWLC, 1);
            let current = nodeWithLowestFCost;
            evaluated.push(current);
            this.nodes[current][1] = 1;
            this.nodes[current][3] = 1; 


            await this.colorhandler.updateNodeColor(this.nodes[current]);

            if(current === this.destination){
                return;
            }

            for(let i = 0; i<this.edges[current].length; i++){
                let neighbour = this.edges[current][i][0];
                
                if(!this.nodes[neighbour][4] && !evaluated.includes(neighbour)){
                    let newGCostToNeighbour = 0;
                    newGCostToNeighbour = this.nodes[current][6] + this.edges[current][i][1];

                    if( newGCostToNeighbour < this.nodes[neighbour][6] || !toBeEvaluated.includes(neighbour) ){
                        this.nodes[neighbour][6] = newGCostToNeighbour;    
                        this.nodes[neighbour][7] = this.computeDistance(neighbour, this.destination);
                        this.nodes[neighbour][8] = this.nodes[neighbour][6] + this.nodes[neighbour][7];
                        this.nodes[neighbour][2] = current;

                        if(!toBeEvaluated.includes(neighbour)){
                            toBeEvaluated.push(neighbour);
                        }
                    }
                }
            }
        }
    }
    
    computeDistance(startNode:number, endNode:number){
        let totaldistacne = 0;
        let baseDiff = Math.abs(
                                Math.floor(endNode/this.board.nodes.column) - 
                                Math.floor(startNode/this.board.nodes.column)
                        );
        let heightDiff = Math.abs(
                                endNode%this.board.nodes.column - 
                                startNode%this.board.nodes.column
                        );
        return baseDiff+heightDiff;
    }

    async execute(){
        this.board.algoInProgress = true;

        this.board.nodes.resetNodesForWA();
        this.colorhandler.recolorAllNodes(this.board.nodes.nodeList, this.board.source, this.board.destination);
        
        let e = new EdgeSet();
        this.edges = e.computeWeightedEdges(this.board.nodes.nodeList, this.board.nodes.column);

        await this.computeAStar();

        await this.colorhandler.findPath(this.nodes, this.destination, this.source);

        this.board.algoInProgress = false;
        this.board.algoExecuted = true;
    }

    quickExecute(currentSource:number, currentDestination:number){
        this.board.algoInProgress = true;

        this.board.nodes.resetNodesForWA();
        this.colorhandler.recolorAllNodes(this.board.nodes.nodeList, this.board.source, this.board.destination);
        
        let e = new EdgeSet();
        this.edges = e.computeWeightedEdges(this.board.nodes.nodeList, this.board.nodes.column);

        this.source = currentSource;
        this.destination = currentDestination;
        this.computeQuickAStar();

        this.colorhandler.findQuickPath(this.nodes, this.destination, this.source);

        this.board.algoInProgress = false;
        this.board.algoExecuted = true;
    }
}

export default AStarAlgorithm;