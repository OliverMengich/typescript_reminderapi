export default class Reminder{
    id: number;
    isComplete: boolean
    constructor(public title: string){
        // set id
        this.id = Date.now();
        this.isComplete = false
    }
}