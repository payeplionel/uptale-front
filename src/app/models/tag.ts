export class Tag{
    constructor(public tagId: number, public tagName: string, public tagType: string,
        public tagTypeId: string, events?: Event[]){

    }
}