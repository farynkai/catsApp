import { Observable } from 'rxjs';
import { Cat } from '../interfaces/сat';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CatsService {
  constructor(private httpClient: HttpClient) {}
  readonly API_KEY =
    'live_KWRFZyBYVvyTXkFekYv2jmMSTIlTcMb9738AksD0JzKRktMhpc4P6lnE0SfHT4QJ';

  getCats(limit: number = 10): Observable<Cat[]> {
    return this.httpClient.get<Cat[]>(
      `https://api.thecatapi.com/v1/images/search?limit=${limit}&has_breeds=1&order=DESC&api_key=${this.API_KEY}`
    );
  }
}
