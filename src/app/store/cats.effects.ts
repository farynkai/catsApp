import { CatsService } from './../services/cats.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  setFilterBy,
  setListData,
  setListDataSuccess,
  showError,
} from './cats.actions';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class CatsEffects {
  getFilteredCats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setListData),
      mergeMap(() => {
        return this.catsService
          .getCats()
          .pipe(map((cats) => setListDataSuccess({ data: cats })));
      }),
      catchError((httpError) => {
        return of(showError({ httpError }));
      })
    )
  );
  constructor(private actions$: Actions, private catsService: CatsService) {}
}
