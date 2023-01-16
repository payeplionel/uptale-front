import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, catchError, tap } from 'rxjs';
import { Equip } from '../models/equip';
import {Globals} from "../Globals";
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class EquipService {
  private localurl = environment.apiurl;

  constructor(private http: HttpClient, public global: Globals) { }

  getGroups(experience: string): Observable<Equip[]>{
    return this.http.get<Equip[]>(this.localurl+'experience/list/groups?experience='+experience).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  deleteGroups(experience: string, groupId: number){
    return this.http.get(this.localurl+'experience/delete/groups?experience='+experience+'&groupId='+groupId)
  }

  updateGroups( groupId: number, update: string){
    return this.http.get(this.localurl+'experience/update/groups?groupId='+groupId+'&update='+update)
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }

  log(response: Equip[]| Equip |undefined) {

  }
}
