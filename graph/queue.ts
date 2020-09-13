class Queue{
    items: number[];

    constructor(){
        this.items = [];
    }

    isEmpty(){
        return this.items.length == 0;
    }

    printQueue(){
        let str = "[";
        for(let i = 0; i<this.items.length; i++)
            str += this.items[i] + " ";
        return str;
    }

    enqueue(item: number){
        this.items.push(item);
    }

    dequeue(){
        if(this.isEmpty()) return "Underflow";
        return this.items.shift();
    }

    front(){
        if(this.isEmpty()) return "No elements in Queue";
        return this.items[0];
    }
}

export default Queue;