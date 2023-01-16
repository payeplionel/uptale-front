import { Session } from "./session";

export class Learner{
    constructor(public idLearner:number, public learnerFirstname: string, 
        public learnerLastname: string , public email: string, 
        public session?: Session){}
}