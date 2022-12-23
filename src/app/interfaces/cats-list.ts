import { Cat } from './сat';

export interface CatsListState {
  listData: Cat[];
  filterQuery: string;
  filteredData: Cat[];
  limit: number | null;
}
