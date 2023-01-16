import { Learner } from './learner';
import { Experience } from './experience';

export class LearnerExperience{
    constructor(public idLearnerExperience: number, public utile:string, public learner: Learner, public experience: Experience){
    }
}