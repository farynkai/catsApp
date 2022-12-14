import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CatsListState } from './../../interfaces/cats-list';
import { dataListFeatureKey } from './cats-list.reducer';

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

export const filterData = createSelector(
  selectData,
  selectFilterQuery,
  (listData, filterQuery) => {
    let filteredData = [...listData];
    if (filterQuery !== '') {
      filteredData = filteredData.filter((item) => {
        let result = [];
        if (item.breeds.length !== 0) {
          result = item.breeds.filter((breedItem) =>
            breedItem.name.toLowerCase().startsWith(filterQuery.toLowerCase())
          );
        }
        return result.length !== 0;
      });
    }
    return filteredData;
  }
);
