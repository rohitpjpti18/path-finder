import Board from "../Board";
import ColorNode from "../Color";
import Queue from "../utilities/Queue";

class BreadthFirstSearch{
    nodes: any[];
    edges: any[];
    source: number;
    destination: number;
    colorhandler: ColorNode;

    constructor(nodes: any[], edges: any[], source: number, destination: number, colorhandler: ColorNode){
        this.colorhandler = colorhandler;
        this.nodes = nodes;
        this.edges = edges;
        this.source = source;
        this.destination = destination;
    }

    async computeBFS(source:number){
        let q = new Queue();

        this.nodes[source][3] = 1;
        q.enqueue(source);
        this.nodes[source][1] = 1;

        await this.colorhandler.updateNodeColor(this.nodes[source]);


        while(!q.isEmpty()){
            let value = q.front();
            q.dequeue();

            for(let i = 0; i<this.edges.length; i++){
                var currentNode = this.edges[i][0];
                let neighbourNode = this.edges[i][1];

                if(currentNode == value && this.nodes[neighbourNode][3] != 1){
                    this.nodes[neighbourNode][3] = 1;
                    q.enqueue(neighbourNode);
                    this.nodes[neighbourNode][2] = value;
                    this.nodes[neighbourNode][1] = 1;


                    await this.colorhandler.updateNodeColor(this.nodes[neighbourNode]);

                    if(neighbourNode == this.destination){
                        return ;
                    }
                }
            }
        }
    }


    computeQuickBFS(source:number, destination:number){
        let q = new Queue();

        this.nodes[source][3] = 1;
        q.enqueue(source);
        this.nodes[source][1] = 1;



        while(!q.isEmpty()){
            let value = q.front();
            q.dequeue();

            for(let i = 0; i<this.edges.length; i++){
                var currentNode = this.edges[i][0];
                let neighbourNode = this.edges[i][1];

                if(currentNode == value && this.nodes[neighbourNode][3] != 1){
                    this.nodes[neighbourNode][3] = 1;
                    q.enqueue(neighbourNode);
                    this.nodes[neighbourNode][2] = value;
                    this.nodes[neighbourNode][1] = 1;



                    if(neighbourNode == destination){
                        return ;
                    }
                }

            }
        }
    }


    async execute(board:Board){
        board.algoInProgress = true;

        board.resetNodes();
        this.colorhandler.recolorAllNodes(this.nodes);
        
        board.edges.computeUnweightedEdges(board.nodes.nodeList, board.nodes.column);
        this.edges = board.edges.edgeList;
        await this.computeBFS(this.source);
        await board.colorHandler.findPath(board.nodes.nodeList, this.destination, this.source);

        board.algoInProgress = false;
        board.algoExecuted = true;
    }

    quickExecute(board:Board, currentSor:number, currentDest:number){
        board.resetNodes();
        board.colorHandler.recolorAllNodes(board.nodes.nodeList);

        board.edges.computeUnweightedEdges(board.nodes.nodeList, board.nodes.column);
        this.edges = board.edges.edgeList;
        this.computeQuickBFS(currentSor, currentDest);
        board.colorHandler.findQuickPath(board.nodes.nodeList, currentDest, currentSor);
    }
}

export default BreadthFirstSearch;