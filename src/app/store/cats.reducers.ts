import { Action, createReducer, on } from '@ngrx/store';

import { setFilterBy, setListDataSuccess, setLimit } from './cats.actions';
import { CatsListState } from '../interfaces/cats-list';

export const INITIAL_STATE: CatsListState = {
  listData: [],
  filterQuery: '',
  filteredData: [],
  limit: 10,
};

export const dataListFeatureKey = 'catsList';

export const catsListReducer = createReducer(
  INITIAL_STATE,
  on(setListDataSuccess, (state, { data }) => {
    return {
      ...state,
      listData: data,
    };
  }),
  on(setFilterBy, (state, { filters }) => {
    return {
      ...state,
      filterQuery: filters.query,
      filteredData: (function () {
        let filteredCats = [...state.listData];
        if (filters.query !== '') {
          filteredCats = filteredCats.filter((item) => {
            let result = [];
            if (item.breeds.length !== 0) {
              result = item.breeds.filter((breedItem) =>
                breedItem.name
                  .toLowerCase()
                  .startsWith(filters.query.toLowerCase())
              );
            }
            return result.length !== 0;
          });
        }
        return filteredCats;
      })(),
    };
  }),
  on(setLimit, (state, { dataLimit }) => {
    return {
      ...state,
      limit: dataLimit,
    };
  })
);

export function CatsListReducer(state: CatsListState, action: Action) {
  return catsListReducer(state, action);
}
