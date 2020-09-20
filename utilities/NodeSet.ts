/*
nodeList Description: 

- indexes and the meaning
    index       data type       description
    0           string          element id;
    1           number          color code (0-default, 1-visited, 2-path, 3-path);
    2           number          parent
    3           number          visited
    4           boolean         is node a wall (true-is wall, false-not a wall)

- color code usage
    use to colour the node elements according to the code;

- is node a wall usage
    use to set edges in 

*/

class NodeSet{
    column: number;
    row: number;
    nodeList: [string, number, number, number, boolean][];
    totalNodes: number;

    constructor(row: number, column: number){
        this.column = column;
        this.row = row;
        this.nodeList = [];
        this.totalNodes = this.column*this.row;

        for(let i = 0 ; i<this.totalNodes; i++){
            this.nodeList.push([i.toString(), 0, -1, -1, false]);
        }
    }

    isWall(index:number){
        return this.nodeList[index][4];
    }

    // if node is a wall then change it to default and vice-versa;
    setWallStatus(index:number){
        this.nodeList[index][4] = !this.nodeList[index][4];
        if(this.nodeList[index][4]){
            this.nodeList[index][1] = 3; 
        }
        else{
            this.nodeList[index][1] = 0;
        }
    }


    setNodeToWall(index:number){
        this.nodeList[index][4] = true;
        this.nodeList[index][1] = 3; 
    }

    setNodeToDefault(index:number){
        this.nodeList[index][4] = false;
        this.nodeList[index][1] = 0
    }

    getNode(index:number){
        return this.nodeList[index];
    }

    resolveRowColumn(i:number, j:number){
        return i*this.column+j;
    }
}


export default NodeSet;