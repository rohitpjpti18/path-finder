import NodeSet from "./graph/node";

class ColorNode{
    speed: number;
    defaultColor: string;
    wallColor: string;
    visitedColor: string;
    pathColor: string;

    constructor(){
        this.speed = 25;
        this.defaultColor = "#c5e2db";
        this.wallColor = "#334d46";
        this.visitedColor = "#00e68a";
        this.pathColor = "#ffe066";
    }

    sleep(){
        return new Promise(resolve => setTimeout(resolve, this.speed));
    }

    updateCellColor(cell:any ,bcolor:string, borderColor:string){
        cell.style.backgroundColor = bcolor;
        cell.style.borderColor = borderColor;
    }


    async updateNodeColor(node:[string, number, number, number, boolean]){
        var cell = document.getElementById(node[0]);

        if(node[1] == 0){
            this.updateCellColor(cell, "white", this.defaultColor);
        }
        else if(node[1] == 1){
            this.updateCellColor(cell, this.visitedColor, this.defaultColor);
        }
        else if(node[1] == 2){
            this.updateCellColor(cell, this.pathColor, this.defaultColor);
        }
        else if(node[1] == 3){
            this.updateCellColor(cell, this.wallColor, this.wallColor);
        }

        await this.sleep();
    }

    recolorAllNodes(nodeList: any[]){
        for(let i:number=0; i<nodeList.length; i++){
            let cell = document.getElementById(nodeList[i][0]);
            if(nodeList[i][1] == 0){
                this.updateCellColor(cell, "white", this.defaultColor);
            }
            if(nodeList[i][1] == 1){
                this.updateCellColor(cell, this.visitedColor, this.defaultColor);
            }
            if(nodeList[i][1] == 2){
                this.updateCellColor(cell, this.pathColor, this.defaultColor);
            }
            if(nodeList[i][1] == 3){
                this.updateCellColor(cell, this.wallColor, this.wallColor);
            }
        }
    }


    async findPath(nodes:[string, number, number, number, boolean][], destination:number, source:number){
        let path = [];
        let currentNode = destination;
        while(nodes[currentNode][2] != -1){
            nodes[currentNode][1] = 2;
            path.push(currentNode);
            currentNode = nodes[currentNode][2];
        }

        if(currentNode == source){
            nodes[currentNode][1] = 2;
            path.push(currentNode);
        }

        for(let i = path.length-1; i>=0; --i){
            await this.updateNodeColor(nodes[path[i]])
        }
    }


    findQuickPath(nodes:[string, number, number, number, boolean][], destination:number, source:number){
        let path = [];
        let currentNode = destination;
        while(nodes[currentNode][2] != -1){
            nodes[currentNode][1] = 2;
            path.push(currentNode);
            currentNode = nodes[currentNode][2];
        }

        if(currentNode == source){
            nodes[currentNode][1] = 2;
            path.push(currentNode);
        }

        this.recolorAllNodes(nodes);
    }
}



export default ColorNode;