import { Action, createReducer, on } from '@ngrx/store';

import { setFilterBy, setListDataSuccess, setListData } from './cats.actions';
import { CatsListState } from '../interfaces/cats-list';

export const INITIAL_STATE: CatsListState = {
  listData: [],
  filterQuery: '',
  filteredData: [],
};

export const dataListFeatureKey = 'catsList';

export function CatsListReducer(state: CatsListState, action: Action) {
  return catsListReducer(state, action);
}

const catsListReducer = createReducer(
  INITIAL_STATE,

  on(setListDataSuccess, (state, { data }) => ({
    ...state,
    listData: data,
  })),

  on(setListData, (state, { data }) => ({
    ...state,
    listData: data,
  })),

  on(setFilterBy, (state, { filters }) => {
    let filteredCats = [...state.listData];
    if (filters.query !== '') {
      filteredCats = filteredCats.filter((item) => {
        let result = [];
        if (item.breeds.length !== 0) {
          result = item.breeds.filter((breedItem) =>
            breedItem.name.toLowerCase().startsWith(filters.query.toLowerCase())
          );
        }
        return result.length !== 0;
      });
    }
    return {
      ...state,
      filterQuery: filters.query,
      filteredData: filteredCats,
    };
  })
);


