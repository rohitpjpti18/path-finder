class EdgeSet{
    edgeList: [number, number, number][];
    weight: number;
    constructor(){
        this.edgeList = [];
        this.weight = 5;
    }

    resetEdges(){
        this.edgeList = [];
    }

    computeUnweightedEdges(nodes: [string, number, number, number, boolean][], column: number){
        this.edgeList = [];

        for(let i = 0; i<nodes.length; i++){
            if(!nodes[i][4]){
                if(i >= column){
                    if(!nodes[i-column][4]) this.edgeList.push([i, i-column, 1]);
                }
                if(i<nodes.length - column){
                    if(!nodes[i+column][4]) this.edgeList.push([i, i+column, 1]);
                }
                if(i%column != 0){
                    if(!nodes[i-1][4]) this.edgeList.push([i, i-1, 1]);
                }
                if(i == 0 || (i+1)%column != 0){
                    if(!nodes[i+1][4]) this.edgeList.push([i, i+1, 1]);
                }
            }
        }
    }

    computeWeightedEdges(weights:boolean[], nodes: [string, number, number, number, boolean][], column:number){
        this.edgeList = [];
        
        for(let i = 0; i<nodes.length; i++){
            if(!nodes[i][4]){
                if(i >= column){
                    if(!nodes[i-column][4] && !weights[i-column]) this.edgeList.push([i, i-column, 1]);
                    if(!nodes[i-column][4] && weights[i-column]) this.edgeList.push([i, i-column, this.weight]);
                }
                if(i<nodes.length - column){
                    if(!nodes[i+column][4]  && !weights[i-column]) this.edgeList.push([i, i+column, 1]);
                    if(!nodes[i+column][4]  && weights[i-column]) this.edgeList.push([i, i+column, this.weight]);
                }
                if(i%column != 0){
                    if(!nodes[i-1][4]  && !weights[i-column]) this.edgeList.push([i, i-1, 1]);
                    if(!nodes[i-1][4]  && weights[i-column]) this.edgeList.push([i, i-1, this.weight]);
                }
                if(i == 0 || (i+1)%column != 0){
                    if(!nodes[i+1][4]  && !weights[i-column]) this.edgeList.push([i, i+1, 1]);
                    if(!nodes[i+1][4]  && weights[i-column]) this.edgeList.push([i, i+1, this.weight]);
                }
            }
        }
    }

}


export default EdgeSet;