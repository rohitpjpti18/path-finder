class ColorNode{
    speed: number;
    defaultColor: string;
    wallColor: string;
    visitedColor: string;
    pathColor: string;

    constructor(defaultSpeed:number){
        this.speed = defaultSpeed;
        this.defaultColor = "#c5e2db";
        this.wallColor = "#4a5e58";
        this.visitedColor = "#96daeb";
        this.pathColor = "#f5da7a";
    }

    setSpeed(value:number){
        this.speed=value
    }

    sleep(){
        return new Promise(resolve => setTimeout(resolve, this.speed));
    }

    updateCellColor(cell:any ,bcolor:string, borderColor:string){
        cell.style.backgroundColor = bcolor;
        cell.style.borderColor = borderColor;
    }


    async updateNodeColor(node:[string, number, number, number, boolean, boolean, number, number, number]){
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

    recolorAllNodes(nodeList: any[], source:number, destination:number){
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

            if(nodeList[i][5]){
                cell.innerHTML = "W";
            }else{
                if(i != source && i != destination) cell.innerHTML = "";
                if(i == source) cell.innerHTML = "$";
                if(i == destination) cell.innerHTML = "O";
            }
        }
    }


    justRecolor(nodeList: any[]){
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


    async findPath(nodes:[string, number, number, number, boolean, boolean, number, number, number][], destination:number, source:number){
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


    findQuickPath(nodes:[string, number, number, number, boolean, boolean, number, number, number][], destination:number, source:number){
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

        this.recolorAllNodes(nodes, source, destination);
    }
}



export default ColorNode;