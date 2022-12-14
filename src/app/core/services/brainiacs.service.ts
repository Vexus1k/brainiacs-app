import { Injectable } from '@angular/core';
import { map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import {User, readDataFromObject} from '../models/global-interfaces';

@Injectable({
  providedIn: 'root'
})
export class BrainiacsService {
  urlApi: string = "https://reqres.in/api"
  constructor(private http: HttpClient) { }

  addPersonToList(user: User){
    return this.http.post(this.urlApi + '/users/', user)
  }

  removePersonFromList(id: number) {
    return this.http.delete(this.urlApi + '/users/' + id)
  }

  editPersonFromList(user: User) {
    return this.http.put(this.urlApi + '/users/' + user.id, user)
  }

  getFamousPeopleList() {
    return this.http.get(this.urlApi + '/users').pipe(
      map((res: readDataFromObject) => res['data'])
    )
  }
}
