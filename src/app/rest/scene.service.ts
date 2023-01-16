import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, catchError, tap } from 'rxjs';
import { Scene } from '../models/scene';
import {Globals} from "../Globals";
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class SceneService {
  private localurl = environment.apiurl;

  constructor(private http:HttpClient, public global: Globals) { }

  getScenesOfOneExperience(experience : string): Observable<Scene[]> {
    return this.http.get<Scene[]>(this.localurl+'experience/list/scenes?experience='+experience).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  getScenesOfOneExperienceOptional(experience : string):  Observable<Scene[]> {
    return this.http.get<Scene[]>(this.localurl+'experience/list/scenes/optional?experience='+experience).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  updateStatus(scene: number, experience: string):  Observable<Scene[]>{
    return this.http.get<Scene[]>(this.localurl+'experience/update/status?experience='+experience+'&scene='+scene).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  updateSceneName(scene: number, experience: string, sceneName: string):  Observable<Scene[]>{
    return this.http.get<Scene[]>(this.localurl+'experience/update/scenes/name?experience='+experience+'&scene='+scene+'&sceneName='+sceneName).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  getTimeGroup(experience: string): Observable<string[]>{
    return this.http.get<any>(this.localurl+'experience/list/time?experience='+experience).pipe(
      catchError((error) => this.handleError(error, []))
    );
  }

  getAnswerGroup(experience: string): Observable<string[]>{
    return this.http.get<any>(this.localurl+'experience/answer/group?experience='+experience).pipe(
      catchError((error) => this.handleError(error, []))
    );
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }

  log(response: Scene[]| Scene |undefined) {

  }
}
