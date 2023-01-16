import { learners } from "../analyse/analyse.component";
import { Experience } from "./experience";

export class Equip{
    groupId !: number;
    date !: Date;
    groupName !: string;
    experience ?: Experience;
}