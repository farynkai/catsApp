import { selectData } from './../../store/cats.selectors';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import { filterData } from '../../store/cats.selectors';
import { Cat } from '../../interfaces/сat';
import { CatsService } from '../../services/cats.service';
import { setFilterBy, setListData } from '../../store/cats.actions';
import { CatsListState } from '../../interfaces/cats-list';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.scss'],
})
export class CatsComponent {
  defaultLimit: number = 10;
  cats$: Observable<Cat[]>;
  searchControl = new FormControl('');
  limitValue = new FormControl('');

  constructor(
    private catsService: CatsService,
    private store: Store<CatsListState>,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.store.dispatch(setListData());
    this.cats$ = this.activatedRoute.data.pipe(
      map((data) => {
        return data['cat'];
      })
    );

    this.searchControl.valueChanges.pipe().subscribe((query) => {
      if (query !== null) {
        this.store.dispatch(setFilterBy({ filters: { query } }));
        this.cats$ = this.store.select(filterData);
      }
    });

    this.limitValue.valueChanges.subscribe((query) => {
      if (query === null) {
        this.catsService.setLimit(this.defaultLimit);
        this.store.dispatch(setListData());
      }
      let limit = Number(query);
      if (query !== null && limit >= 1 && limit <= 100) {
        this.catsService.setLimit(limit);
        this.store.dispatch(setListData());
        this.cats$ = this.store.select(selectData);
      }
    });
  }
}
