import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { Cat } from './../interfaces/сat';
import { CatsService } from './../services/cats.service';

@Injectable({
  providedIn: 'root',
})
export class CatResolver implements Resolve<Cat[]> {
  constructor(private catsService: CatsService) {}
  resolve(): Observable<Cat[]> {
    return this.catsService.getCats();
  }
}
