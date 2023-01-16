import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Globals } from '../Globals';
import { Quiz } from '../models/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizServiceService {
  private api = environment.apiurl;
  
  constructor(private http:HttpClient, public global: Globals) { }

  quizOfExperience(experienceId: String){
    return this.http.get<Quiz[]>(this.api+`experience/quiz?experience=${experienceId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }

  log(response: Quiz[]|Quiz|undefined) {}
}
