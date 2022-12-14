import { filterData } from './../../@ngrx/cats-list/cats-list.selectors';
import { Cat } from '../../interfaces/сat';
import { CatsService } from './../../services/cats.service';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Store } from '@ngrx/store';
import {
  setFilterBy,
  setListData,
} from 'src/app/@ngrx/cats-list/cats-list.actions';
import { CatsListState } from './../../interfaces/cats-list';

@Component({
  selector: 'app-cats-list',
  templateUrl: './cats-list.component.html',
  styleUrls: ['./cats-list.component.scss'],
})
export class CatsListComponent {
  cats: Cat[];
  searchControl = new FormControl('');
  limitValue = new FormControl('');

  constructor(
    private catsService: CatsService,
    private store: Store<CatsListState>
  ) {}

  ngOnInit() {
    this.catsService.getCats().subscribe((cats) => {
      this.cats = cats;
      this.store.dispatch(setListData({ data: cats }));
    });

    this.searchControl.valueChanges.pipe().subscribe((query) => {
      if (query !== null) {
        this.store.dispatch(setFilterBy({ filters: { query } }));
        this.store
          .select(filterData)
          .subscribe((filteredCats) => (this.cats = filteredCats));
      }
    });

    this.limitValue.valueChanges.subscribe((query) => {
      if (query === null) {
        this.catsService.getCats().subscribe((cats) => {
          this.cats = cats;
          this.store.dispatch(setListData({ data: cats }));
        });
      }
      let limit = Number(query);
      if (query !== null && limit >= 1 && limit <= 100) {
        this.catsService.getCats(limit).subscribe((cats) => {
          this.cats = cats;
          this.store.dispatch(setListData({ data: cats }));
        });
      }
    });
  }
}
