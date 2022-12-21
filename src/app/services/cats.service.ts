import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { Cat } from '../interfaces/сat';

@Injectable({
  providedIn: 'root',
})
export class CatsService {
  constructor(private httpClient: HttpClient) {}

  getCats(): Observable<Cat[]> {
    return this.httpClient.get<Cat[]>(`${environment.url}images/search`);
  }
}
