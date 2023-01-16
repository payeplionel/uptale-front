import {Experience} from "./experience";

export class Ressources{
  constructor(public ressourceOpen: string, public ressourceClose: string, public importance: string,
              public experience?: Experience, public ressourcesId?: number,) {
  }
}
