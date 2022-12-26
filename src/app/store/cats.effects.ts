import { ErrorService } from './../services/error.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';

import {
  getListData,
  setListDataSuccess,
  setListDataFailed,
} from './cats.actions';
import { CatsService } from './../services/cats.service';

@Injectable()
export class CatsEffects {
  constructor(
    private actions$: Actions,
    private catsService: CatsService,
    private errorService: ErrorService
  ) {}

  getCats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getListData),
      mergeMap(() => {
        return this.catsService
          .getCats()
          .pipe(map((cats) => setListDataSuccess({ data: cats })));
      }),
      catchError((httpError) => {
        this.errorService.showError(httpError);
        return of(setListDataFailed({ httpError }));
      })
    )
  );
}
