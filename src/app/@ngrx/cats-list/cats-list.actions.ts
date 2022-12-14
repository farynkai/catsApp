import { Cat } from './../../interfaces/сat';
import { createAction, props } from '@ngrx/store';

export const setFilterBy = createAction(
  '[Cats List] Set Filter By Properties and Query',
  props<{ filters: { query: string } }>()
);

export const setListData = createAction(
  '[Cats List] Set List Data',
  props<{ data: Cat[] }>()
);
