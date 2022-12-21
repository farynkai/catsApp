import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import { Cat } from '../../../interfaces/сat';
import { setFilterBy, setListData } from '../../../store/cats.actions';
import { CatsListState } from '../../../interfaces/cats-list';
import { selectData } from '../../../store/cats.selectors';
import { UnsubscriberComponent } from '../unsubscriber/unsubcriber.component';
import {
  selectFilteredData,
  selectLimit,
} from './../../../store/cats.selectors';
import { setListDataSuccess, setLimit } from './../../../store/cats.actions';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.scss'],
})
export class CatsComponent extends UnsubscriberComponent implements OnInit {
  defaultLimit: number = 10;
  cats$: Observable<Cat[]>;
  searchControl = new FormControl('');
  limitValue = new FormControl('');

  constructor(
    private store: Store<CatsListState>,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this.store.dispatch(setListData());
    this.activatedRoute.data.pipe(
      map((data) => {
        this.store.dispatch(setListDataSuccess(data['cat']));
      })
    );
    this.cats$ = this.store.select(selectData);

    this.searchControl.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((query) => {
        if (query !== null) {
          this.store.dispatch(setFilterBy({ filters: { query } }));
          this.cats$ = this.store.select(selectFilteredData);
        }
      });

    this.limitValue.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((query) => {
        if (query === null) {
          this.store.dispatch(setLimit({ dataLimit: this.defaultLimit }));
          this.store.dispatch(setListData());
        }
        let limit = Number(query);
        if (query !== null && limit >= 1 && limit <= 100) {
          this.store.dispatch(setLimit({ dataLimit: limit }));
          console.log(this.store.select(selectLimit));
          this.store.dispatch(setListData());
        }
      });
  }
}
