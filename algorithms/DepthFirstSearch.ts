import Board from "../board";
import ColorNode from "../color";
import NodeSet from "../utilities/node";

class DepthFirstSearch{
    nodes:any[];
    colorhandler: ColorNode;
    edges: [number, number, number][];
    source: number;
    destination: number;
    destinationFound:boolean;
    
    constructor(nodes:any[], edges: [number, number, number][], source:number, destination:number, colorhandler: ColorNode){
        this.colorhandler = colorhandler;
        this.nodes = nodes;
        this.edges = edges;
        this.source = source;
        this.destination = destination;
        this.destinationFound = false;
    }

    async computeDFS(index:number){
        if(this.destinationFound) return;

        this.nodes[index][3] = 1;
    
        for(let i = 0; i<this.edges.length; i++){
            let currentNode = this.edges[i][0];
            let neighbourNode = this.edges[i][1];



            if(currentNode == index && this.nodes[neighbourNode][3] != 1){
                    this.nodes[neighbourNode][2] = index;
                    this.nodes[neighbourNode][1] = 1;


                    await this.colorhandler.updateNodeColor(this.nodes[neighbourNode]);
                    if(neighbourNode == this.destination) this.destinationFound = true;

                    await this.computeDFS(neighbourNode);
                    if(this.destinationFound) break;
            }
        }
    }

    computeQuickDFS(index:number, destination:number){
        if(this.destinationFound) return;
        this.nodes[index][3] = 1;
    
        for(let i = 0; i<this.edges.length; i++){
            let currentNode = this.edges[i][0];
            let neighbourNode = this.edges[i][1];

            if(currentNode == index && this.nodes[neighbourNode][3] != 1){
                    this.nodes[neighbourNode][2] = index;
                    this.nodes[neighbourNode][1] = 1;
                    
                    if(neighbourNode == destination) this.destinationFound = true;

                    this.computeQuickDFS(neighbourNode, destination);
                    if(this.destinationFound) break;
            }
        }
    }
}


export default DepthFirstSearch;
