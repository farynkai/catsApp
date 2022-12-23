import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import {
  getListData,
  setListDataSuccess,
  setListDataFailed,
} from './cats.actions';
import { CatsService } from './../services/cats.service';

@Injectable()
export class CatsEffects {
  getCats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getListData),
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
