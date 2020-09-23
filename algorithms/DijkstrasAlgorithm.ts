import Board from "../Board";
import ColorNode from "../Color";
import EdgeSet from "../utilities/EdgeSet";
import Heap from "../utilities/Heap";

class Dijkstra{
    source:number;
    destination:number;
    colorhandler:ColorNode;
    nodes:any[];
    adjencenyList:any[];
    distance:any[];
    heap:Heap;
    board: Board;

    constructor(board:Board, colorhandler: ColorNode){
        this.source = board.source;
        this.destination = board.destination;
        this.nodes = board.nodes.nodeList;
        this.colorhandler = colorhandler;
        this.board = board;


    }

    private computeInfinity(edge:any[]):number{
        let sum:number = 0;
        for(let i = 0; i <edge.length; i++){
            for(let j = 0; j<edge[i].length; j++){
                sum += edge[i][j][1];
            }
        }
        return sum+1;
    }


    private findAppropiateNode(infinite:number):number{
        let minimum = infinite;
        let minIndex = -1;

        for(let i = 0; i<this.nodes.length; i++){
            //console.log(this.distance[i]);
            if(this.nodes[i][3] != 1 && minimum > this.distance[i]){
                minimum = this.distance[i];
                minIndex = i;
            }
        }

        return minIndex;
    }

    computeQuickDijkstra(source:number, destination:number, edges:any[]){
        let infiniteValue = this.computeInfinity(edges);
        this.distance = []

        for(let i = 0; i<this.nodes.length; i++){
            this.distance.push(infiniteValue);
        }
        this.distance[source] = 0;


        for(let i = 0; i<this.nodes.length; i++){
            let u = this.findAppropiateNode(infiniteValue);

            if(u == -1){
                return;
            }

            this.nodes[u][3] = 1;
            this.nodes[u][1] = 1;

            if(u == destination){
                return;
            }
            for(let j = 0; j<edges[u].length; j++){
                let v = edges[u][j][0];
                let distanceUV = edges[u][j][1];

                if(this.nodes[v][3] != 1 && this.distance[v] > (this.distance[u]+ distanceUV)){
                    this.distance[v] = this.distance[u] + distanceUV;
                    this.nodes[v][2] = u;
                }
            }
        }
    }


    async computeDijkstra(source:number, destination:number, edges:any[]){
        let infiniteValue = this.computeInfinity(edges);
        //console.log(infiniteValue);
        this.distance = []

        for(let i = 0; i<this.nodes.length; i++){
            this.distance.push(infiniteValue);
        }
        this.distance[source] = 0;


        for(let i = 0; i<this.nodes.length; i++){
            let u = this.findAppropiateNode(infiniteValue);

            if(u == -1){
                return;
            }

            // set u to visited
            this.nodes[u][3] = 1;
            this.nodes[u][1] = 1;

            await this.colorhandler.updateNodeColor(this.nodes[u]);

            if(u == destination){
                return;
            }
            for(let j = 0; j<edges[u].length; j++){
                let v = edges[u][j][0];
                let distanceUV = edges[u][j][1];
                //console.log(v);


                if(this.nodes[v][3] != 1 && this.distance[v] > (this.distance[u]+ distanceUV)){
                    //console.log(this.distance)
                    this.distance[v] = this.distance[u] + distanceUV;
                    //console.log(this.distance[v]);
                    this.nodes[v][2] = u;
                }
            }
        }
    }

    async execute(){
        this.board.algoInProgress = true;

        this.board.nodes.resetNodesForWA();
        this.colorhandler.recolorAllNodes(this.board.nodes.nodeList, this.board.source, this.board.destination);
        
        let e = new EdgeSet();
        this.adjencenyList = e.computeWeightedEdges(this.board.nodes.nodeList, this.board.nodes.column);
        console.log(this.adjencenyList);

        await this.computeDijkstra(this.source, this.destination, this.adjencenyList);

        await this.colorhandler.findPath(this.nodes, this.destination, this.source);

        this.board.algoInProgress = false;
        this.board.algoExecuted = true;
    }

    quickExecute(sor:number, dest:number){
        this.board.algoInProgress = true;

        this.board.nodes.resetNodesForWA();

        
        let e = new EdgeSet();
        this.adjencenyList = e.computeWeightedEdges(this.board.nodes.nodeList, this.board.nodes.column);
        

        this.computeQuickDijkstra(sor, dest, this.adjencenyList);

        this.colorhandler.findQuickPath(this.nodes, dest, sor);

        this.board.algoInProgress = false;
        this.board.algoExecuted = true;
    }
}




export default Dijkstra;