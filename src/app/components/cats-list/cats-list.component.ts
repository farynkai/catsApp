import { selectData } from './../../store/cats.selectors';
import { Observable } from 'rxjs';
import { filterData } from '../../store/cats.selectors';
import { Cat } from '../../interfaces/сat';
import { CatsService } from './../../services/cats.service';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Store } from '@ngrx/store';
import { setFilterBy, setListData } from '../../store/cats.actions';
import { CatsListState } from './../../interfaces/cats-list';

@Component({
  selector: 'app-cats-list',
  templateUrl: './cats-list.component.html',
  styleUrls: ['./cats-list.component.scss'],
})
export class CatsListComponent {
  cats$: Observable<Cat[]>;
  searchControl = new FormControl('');
  limitValue = new FormControl('');

  constructor(
    private catsService: CatsService,
    private store: Store<CatsListState>
  ) {}

  ngOnInit() {
    this.store.dispatch(setListData());
    this.cats$ = this.catsService.selectCats();

    this.searchControl.valueChanges.pipe().subscribe((query) => {
      if (query !== null) {
        this.store.dispatch(setFilterBy({ filters: { query } }));
        this.cats$ = this.store.select(filterData);
      }
    });

    this.limitValue.valueChanges.subscribe((query) => {
      if (query === null) {
        this.store.dispatch(setListData());
      }
      let limit = Number(query);
      if (query !== null && limit >= 1 && limit <= 100) {
        this.catsService.setLimit(limit);
        this.store.dispatch(setListData());
      }
    });
  }
}
