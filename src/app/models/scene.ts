import { Experience } from "./experience";

export class Scene {
    sceneId !: number;
    sceneName !: string;
    optional !: string;
    experience ?: Experience;
}