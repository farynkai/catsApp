import { Cat } from '../interfaces/сat';
import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export const setFilterBy = createAction(
  '[Cats List] Set Filter By Query',
  props<{ filters: { query: string } }>()
);

export const setListData = createAction('[Cats List] Set List Data');

export const setListDataSuccess = createAction(
  '[Cats List] Set List Data Success',
  props<{ data: Cat[] }>()
);

export const showError = createAction(
  '[Cats List] Set List Data Failed',
  props<{ httpError: HttpErrorResponse }>()
);
