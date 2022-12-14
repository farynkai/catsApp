import { Cat } from './сat';

export interface CatsListState {
  listData: Cat[];
  filterQuery: string;
}
