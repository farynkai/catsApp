import { selectData } from './../store/cats.selectors';
import { Store } from '@ngrx/store';
import { CatsListState } from './../interfaces/cats-list';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Cat } from '../interfaces/сat';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CatsService {
  limit: number = 10;
  constructor(private httpClient: HttpClient) {}

  setLimit(limit: number): void {
    this.limit = limit;
  }

  getCats(): Observable<Cat[]> {
    return this.httpClient.get<Cat[]>(`${environment.url}images/search`);
  }
}
