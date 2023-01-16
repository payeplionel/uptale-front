import { Experience } from "./experience";
import { Learner } from "./learner";

export class Quiz{
    quizId !: number;
    hypothese !: string;
    hypotheseSecondaire !: string;
    solution !: string;
    correction!: string;
    experience ?: Experience;
    learner ?: Learner;
}