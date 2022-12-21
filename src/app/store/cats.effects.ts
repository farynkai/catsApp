import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import {
  setListData,
  setListDataSuccess,
  setListDataFailed,
} from './cats.actions';
import { CatsService } from './../services/cats.service';

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
        return of(setListDataFailed({ httpError }));
      })
    )
  );
  constructor(private actions$: Actions, private catsService: CatsService) {}
}
