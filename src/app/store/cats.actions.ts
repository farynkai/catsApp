import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import { Cat } from '../interfaces/сat';

export const getListData = createAction('[Cats List] Get List Data');
export const setListDataSuccess = createAction(
  '[Cats List] Set List Data Success',
  props<{ data: Cat[] }>()
);
export const setListDataFailed = createAction(
  '[Cats List] Set List Data Failed',
  props<{ httpError: HttpErrorResponse }>()
);
export const setListData = createAction(
  '[Cats List] Set List Data',
  props<{ data: Cat[] }>()
);

export const setFilterBy = createAction(
  '[Cats List] Set Filter By Query',
  props<{ filters: { query: string } }>()
);
