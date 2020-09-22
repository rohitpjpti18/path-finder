class Heap{
    private size:number;
    private items:number[];

    constructor(items:number[]){
        this.items = items;
        this.size = items.length;
    }

    private getLeftChildIndex(parentIndex:number):number{return 2*parentIndex+1;}
    private getRightChildIndex(parentIndex:number):number{return 2*parentIndex + 2;}
    private getParentIndex(childIndex:number){return (childIndex-1)/2;}

    private hasLeftChild(index:number):boolean{return this.getLeftChildIndex(index)<this.size;}
    private hasRightChild(index:number):boolean{return this.getRightChildIndex(index)<this.size;}
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

        this.items[0] = this.items[this.size-1];
        this.size--;
        this.heapifyDown(0);

        return item;
    } 


    public add(item:number){
        this.items[this.size] = item;
        this.items[this.size] = item;

        this.size++;
        this.heapifyUp();
    }

    public heapifyUp(){
        let index = this.size-1;

        while(this.hasParent(index) && this.parent(index) > this.items[index]){

        }
    }

    public heapifyDown(index:number){

    }

}

export default Heap;