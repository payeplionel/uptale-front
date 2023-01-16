import { Learner } from "./learner";

export class Session{
    constructor(public sessionId: number, public session: string, public learner: Learner){

    }
}