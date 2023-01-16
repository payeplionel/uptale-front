import { Injectable } from "@angular/core";
import { Equip } from "./models/equip";
import { Experience } from "./models/experience";
import { NumberTags } from "./models/numberTags";
import { Scene } from "./models/scene";
import { Session } from "./models/session";
import { TimeScene } from "./models/timeTag";

export interface Tags {
    firstname: string;
    lastname: string;
    count: number;
}

export interface Answers{
    answer: string;
    response: string;
    count: string;
    group: string;
}

export interface GraphData{
    count: string;
    name: string;
}

@Injectable()
export class Globals{
    url: string = "http://127.0.0.1:8080/";

    isChecked: boolean=false;
    loading:boolean=false;
    color: string = "moon-color"
    loadingExperience: boolean = false;
    hideTag: boolean = true;
    hideTime: boolean = true;
    hideLegend: boolean = true;
    action:boolean = false;
    loadingTime: boolean = true;
    loadingAnswer: boolean = true;
    loadingQuiz: boolean = false;
    loadingMails: boolean = false;

    selectExperience!: string;
    selectScene!: number;
    selectGroup!: Equip;

    tag: TimeScene[] = [];
    groups: Equip[] = [];
    time: Tags[] = [];
    numberTags: NumberTags[] = [];

    scenes: Scene[] = [];
    session: Session[] = [];
    experiences: Experience[] = [];

    dataNumberTag: number[] = [];
    dataLabelTag: string[] = [];
    dataNumberTime: number[] = [];
    dataLabelTimeGroup: string[] = [];
    dataNumberTimeGroup: number[] = [];
    dataAnswers: Answers[] = [];

    graphCycle: GraphData[] = [];
    graphUtilisation: GraphData[] = [];
    graphGenre: GraphData[] = [];
    graphExperience: GraphData[] = [];

    setisLoading(value: boolean) {
        this.loading=value;
    }
    setisChecked(value: boolean) {
        this.isChecked=value;
    }

    getisLoading() {
        return this.loading;
    }
    getisChecked() {
        return this.getisChecked;
    }

    setExperience(experienceList: Experience[]){
        this.experiences = experienceList;
    }
}


