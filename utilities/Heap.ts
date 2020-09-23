class Heap{
    private items:any[];
    private heapToNode:number[];
    private nodeToHeap:number[];

    constructor(items:number[]){
        for(let i = 0; i<items.length; i++){
            this.heapToNode.push(0);
            this.nodeToHeap.push(0);
        }
        for(let i = 0; i<items.length; i++){
            this.add(items[i], i);
        }
    }

    getTheBestNode(){
        let node = this.poll();

        return node;
    }

    private getLeftChildIndex(parentIndex:number):number{return 2*parentIndex+1;}
    private getRightChildIndex(parentIndex:number):number{return 2*parentIndex + 2;}
    private getParentIndex(childIndex:number){return (childIndex-1)/2;}

    private hasLeftChild(index:number):boolean{return this.getLeftChildIndex(index)<this.items.length;}
    private hasRightChild(index:number):boolean{return this.getRightChildIndex(index)<this.items.length;}
    private hasParent(index:number):boolean{return this.getParentIndex(index) >= 0;}

    private leftChild(index:number):number{ return this.items[this.getLeftChildIndex(index)];}
    private rightChild(index:number):number{return this.items[this.getRightChildIndex(index)];}
    private parent(index:number):number{return this.items[this.getParentIndex(index)];}

    private swap(indexOne:number, indexTwo:number){
        let temp = this.items[indexOne];
        this.items[indexOne] = this.items[indexTwo];
        this.items[indexTwo] = temp;
    }

    public peek():number{
        return this.items[0];
    }

    public poll():number{
        let item = this.items[0];

        let bestNode = this.heapToNode[0];
        this.items[0] = this.items[this.items.length-1];
        this.update(this.heapToNode[0], this.items.length-1);
        this.update(this.heapToNode[this.items.length-1], -1)
        this.heapifyDown(0);

        return bestNode;
    } 

    private update(node:number, heap:number){
        if(heap == -1){
            this.nodeToHeap[node] = -1;
            this.heapToNode[this.items.length-1] = -1;
            return;
        }
        this.nodeToHeap[node] = heap;
        this.heapToNode[heap] = node;
    }

    public updateHeap(node){
        
    }


    public add(item:any, nodeValue:number){
        this.items.push(item);
        this.update(nodeValue ,this.items.length-1)
        this.heapifyUp();
    }

    public heapifyUp(){
        let index = this.items.length-1;

        while(this.hasParent(index) && this.parent(index) > this.items[index]){
            // update both heapToNode and nodeToHeap
            this.update(this.heapToNode[index], this.getParentIndex(index));
            this.update(this.heapToNode[this.getParentIndex(index)], index);

            this.swap(this.getParentIndex(index), index);
            index = this.getParentIndex(index);
        }
    }

    public heapifyDown(index:number){
        while(this.hasLeftChild(index)){
            let smallerChildIndex = this.getLeftChildIndex(index);

            if(this.hasRightChild(index) && this.rightChild(index)<this.leftChild(index)){
                smallerChildIndex = this.getRightChildIndex(index);
            }

            if(this.items[index] < this.items[smallerChildIndex]){
                break;
            }
            else{
                this.update(this.heapToNode[index], smallerChildIndex);
                this.update(this.heapToNode[smallerChildIndex], index);

                this.swap(index, smallerChildIndex);
            }
            index = smallerChildIndex;
        }
    }

}

export default Heap;