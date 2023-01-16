import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, catchError, map, tap } from 'rxjs';
import { Experience } from '../models/experience';
import { Scene } from '../models/scene';
import { environment } from 'src/environments/environment';
import {Globals} from "../Globals";
import {global} from "@angular/compiler/src/util";


@Injectable({
  providedIn: 'root'
})

export class ServicesService {

  private localurl = environment.apiurl;

  HttpHeaders = new HttpHeaders(
    {
      'Content-Type' : 'application/json',
    }
  );

  constructor(private http:HttpClient, public global: Globals) { }

  getDatas(): Observable<Experience[]>{
    return this.http.get<Experience[]>(this.localurl+'datas').pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  addExperience(experience: string, file: File): Observable<Experience[]>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    const formData: FormData = new FormData();
    formData.append('files', file);
    formData.append('experience', experience);
    const req = new HttpRequest('POST', this.localurl+'experience/file', formData, {
      reportProgress: true,
      responseType: 'json'
    })

    return this.http.post<Experience[]>(this.localurl+'experience/file', formData).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  addQuiz(experience: string, file: File): Observable<Experience[]>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    const formData: FormData = new FormData();
    formData.append('files', file);
    formData.append('experience', experience);

    return this.http.post<Experience[]>(this.localurl+'experience/quiz', formData).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  numberTagsPerLearner(experience: string, group: number){
    return this.http.get(this.localurl+'experience/groupby/countTags?experience='+experience+'&group='+group);
  }

  timeBethweenScene(experience: string, scene: number, group: number){
    return this.http.get(this.localurl+'experience/list/time/scene?scene='+scene+'&experience='+experience+'&group='+group);
  }

  timeBethweenGlobal(experience: string, group: number){
    return this.http.get(this.localurl+'experience/list/time/experience?experience='+experience+'&group='+group);
  }

  listTagsChosen(experience: string, scene: number, group: number){
    return this.http.get(this.localurl+'experience/list/tags/scene?scene='+scene+'&experience='+experience+'&group='+group)
  }

  deleteExperience(experience: string){
    return this.http.get(this.localurl+'experience/delete?experience='+experience);
  }

  addDataExperience(experience: string, file: File){
    const formData: FormData = new FormData();
    formData.append('files', file);
    formData.append('experience', experience);
    const req = new HttpRequest('POST', this.localurl+'experience/file/addData', formData, {
      reportProgress: true,
      responseType: 'json'
    })
    return this.http.request(req);
  }

  ressourceOfSession(ressourceId: number){
    return this.http.get(`${this.localurl}experience/quiz/stat/one?quizId=${ressourceId}`);
  }

  answerOfUser(sessionId: number){
    return this.http.get(this.localurl+'experience/answer?session='+sessionId)
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }

  log(response: Experience[]|Experience|undefined) {
    console.table(response);
  }


}

