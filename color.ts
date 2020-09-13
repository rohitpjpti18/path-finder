import NodeSet from "./graph/node";

class ColorNode{
    speed: number;
    wallColor: string;
    visitedColor: string;
    pathColor: string;

    constructor(){
        this.speed = 25;
        this.wallColor = "#3f3e45";
        this.visitedColor = "#f5c271";
        this.pathColor = "#71f582";
    }

    sleep(){
        return new Promise(resolve => setTimeout(resolve, this.speed));
    }


    async updateNodeColor(node:[string, number, number, number, boolean]){
        var cell = document.getElementById(node[0]);

        if(node[1] == 1){
            cell.style.backgroundColor = this.visitedColor;
        }
        else if(node[1] == 2){
            cell.style.backgroundColor = this.pathColor;
        }
        else if(node[1] == 3){
            cell.style.backgroundColor = this.wallColor;
        }

        await this.sleep();
    }

    recolorAllNodes(nodeList: any[]){
        for(let i:number=0; i<nodeList.length; i++){
            let cell = document.getElementById(nodeList[i][0]);
            if(nodeList[i][1] == 0){
                cell.style.backgroundColor = "white";
            }
            if(nodeList[i][1] == 1){
                cell.style.backgroundColor = this.visitedColor;
            }
            if(nodeList[i][1] == 2){
                cell.style.backgroundColor = this.pathColor;
            }
            if(nodeList[i][1] == 3){
                cell.style.backgroundColor = this.wallColor;
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