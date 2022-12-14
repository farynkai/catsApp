import { CatsListState } from './../../interfaces/cats-list';
import { Action, createReducer, on } from '@ngrx/store';
import { setFilterBy, setListData } from './cats-list.actions';

export const INITIAL_STATE: CatsListState = {
  listData: [],
  filterQuery: '',
};

export const dataListFeatureKey = 'catsList';

export const catsListReducer = createReducer(
  INITIAL_STATE,
  on(setListData, (state, { data }) => {
    return {
      ...state,
      listData: data,
    };
  }),
  on(setFilterBy, (state, { filters }) => {
    return {
      ...state,
      filterQuery: filters.query,
    };
  })
);

export function CatsListReducer(state: CatsListState, action: Action) {
  return catsListReducer(state, action);
}
