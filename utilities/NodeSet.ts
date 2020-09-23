/*
nodeList Description: 

- indexes and the meaning
    index       data type       description
    0           string          element id;
    1           number          color code (0-default, 1-visited, 2-path, 3-path);
    2           number          parent  ; -1 indicate no parents
    3           number          visited
    4           boolean         is node a wall (true-is wall, false-not a wall)
    5           boolean         isWeighted   - is a weighted node

- color code usage
    use to colour the node elements according to the code;

- is node a wall usage
    use to set edges in 

*/

class NodeSet{
    column: number;
    row: number;
    nodeList: [string, number, number, number, boolean, boolean][];
    totalNodes: number;

    constructor(row: number, column: number){
        this.column = column;
        this.row = row;
        this.nodeList = [];
        this.totalNodes = this.column*this.row;


        for(let i = 0 ; i<this.totalNodes; i++){
            this.nodeList.push([i.toString(), 0, -1, -1, false, false]);
        }
    }

    isWall(index:number){
        return this.nodeList[index][4];
    }


    removeWeight(index:number){
        this.nodeList[index][5] = false;
    }

    addWeight(index:number){
        this.nodeList[index][5] = true;
    }

    resetAllNodes(){
        for(let i = 0; i<this.nodeList.length; i++){
            this.nodeList[i][1] = 0;
            this.nodeList[i][2] = -1;
            this.nodeList[i][3] = -1;
            this.nodeList[i][4] = false;
            this.nodeList[i][5] = false;
        }
    }

    resetNodesForUA(){
        for(let i = 0; i<this.nodeList.length; i++){
            if(this.nodeList[i][4])
                this.nodeList[i][1] = 3;
            else
                this.nodeList[i][1] = 0;
            this.nodeList[i][2] = -1;
            this.nodeList[i][3] = -1;
            this.nodeList[i][5] = false;
        }
    }

    resetNodesForWA(){
        for(let i = 0; i<this.nodeList.length; i++){
            if(this.nodeList[i][4])
                this.nodeList[i][1] = 3;
            else
                this.nodeList[i][1] = 0;
            this.nodeList[i][2] = -1;
            this.nodeList[i][3] = -1;
        }
    }


    getNeighbours(index:number):number[]{
        let neighbours:number[] = [];

        if(index>=this.column) neighbours.push(index-this.column);
        if(index < this.nodeList.length - this.column) neighbours.push(index+this.column);
        if(index%this.column != 0) neighbours.push(index-1);
        if(index == 0 || (index+1)%this.column != 0) neighbours.push(index+1);

        return neighbours;
    }

    // if node is a wall then change it to default and vice-versa;
    handleWallSwitch(index:number){
        this.nodeList[index][4] = !this.nodeList[index][4];
        if(this.nodeList[index][4]){
            this.nodeList[index][1] = 3; 
            this.nodeList[index][5] = false;
        }
        else{
            this.nodeList[index][1] = 0;
        }
    }

    handleWeightSwitch(index:number){
        this.nodeList[index][5] = !this.nodeList[index][5];
        if(this.nodeList[index][5]){
            this.nodeList[index][1] = 0;
            this.nodeList[index][4] = false;
        }else{
            this.nodeList[index][1] = 0;
        }
    }


    setNodeToWall(index:number){
        this.nodeList[index][4] = true;
        this.nodeList[index][5] = false;
        this.nodeList[index][1] = 3; 
    }

    setNodeToDefault(index:number){
        this.nodeList[index][4] = false;
        this.nodeList[index][5] = false;
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