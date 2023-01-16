import { Time } from "@angular/common";
import { Scene } from "./scene";
import { Session } from "./session";
import { Tag } from "./tag";

export class Event{
    constructor(public eventId: number, public eventName: string, public localTime: Time,
        public answer: string, public scene?: Scene, public tag?: Tag, public session?: Session){}
}