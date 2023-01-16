import {Session} from "./session";
import {Scene} from "./scene";

export class Answers{
  constructor(public answerId: number, public question: string, public responses: string, public status : boolean,session?: Session, scene?: Scene){}
}
