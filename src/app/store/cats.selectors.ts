import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CatsListState } from '../interfaces/cats-list';
import { dataListFeatureKey } from './cats.reducers';

export const selectDataTableState =
  createFeatureSelector<CatsListState>(dataListFeatureKey);

export const selectData = createSelector(
  selectDataTableState,
  (state: CatsListState) => state.listData
);

export const selectFilterQuery = createSelector(
  selectDataTableState,
  (state: CatsListState) => state.filterQuery
);

export const selectFilteredData = createSelector(
  selectDataTableState,
  (state: CatsListState) => state.filteredData
);

export const selectLimit = createSelector(
  selectDataTableState,
  (state: CatsListState) => state.limit
);
