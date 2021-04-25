class EdgeSet{
    adjacenyList: any[];
    edgeList: [number, number, number][];
    weight: number;
    constructor(){
        this.adjacenyList = []
        this.edgeList = [];
        this.weight = 10;
    }

    resetEdges(){
        this.edgeList = [];
        this.adjacenyList = []
    }

    computeUnweightedEdges(nodes: [string, number, number, number, boolean, boolean, number, number, number][], column: number){
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

    computeWeightedEdges(nodes: [string, number, number, number, boolean, boolean, number, number, number][], column:number){
        this.edgeList = [];
        this.adjacenyList = [];
        
        for(let i = 0; i<nodes.length; i++){
            let temp = [];
            if(!nodes[i][4]){
                if(i >= column){
                    if(!nodes[i-column][4] && !nodes[i-column][5]) temp.push([i-column, 1]);
                    if(!nodes[i-column][4] && nodes[i-column][5]) temp.push([i-column, this.weight]);
                }
                if(i<nodes.length - column){
                    if(!nodes[i+column][4]  && !nodes[i+column][5]) temp.push([i+column, 1]);
                    if(!nodes[i+column][4]  && nodes[i+column][5]) temp.push([i+column, this.weight]);
                }
                if(i%column != 0){
                    if(!nodes[i-1][4]  && !nodes[i-1][5]) temp.push([i-1, 1]);
                    if(!nodes[i-1][4]  && nodes[i-1][5]) temp.push([i-1, this.weight]);
                }
                if(i == 0 || (i+1)%column != 0){
                    if(!nodes[i+1][4]  && !nodes[i+1][5]) temp.push([i+1, 1]);
                    if(!nodes[i+1][4]  && nodes[i+1][5]) temp.push([i+1, this.weight]);
                }
            }

            this.adjacenyList.push(temp);
        }

        return this.adjacenyList;
    }

}


export default EdgeSet;