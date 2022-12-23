import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import { setFilterBy, getListData } from '../../../store/cats.actions';
import { CatsListState } from '../../../interfaces/cats-list';
import { selectData } from '../../../store/cats.selectors';
import { UnsubscriberComponent } from '../unsubscriber/unsubcriber.component';
import { selectFilteredData } from './../../../store/cats.selectors';
import { setListData } from './../../../store/cats.actions';
import { catsNumber } from './../../../global-variables/limit';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.scss'],
})
export class CatsComponent extends UnsubscriberComponent implements OnInit {
  cats$ = this.store.select(selectData);
  searchControl = new FormControl('');
  limitValue = new FormControl('');

  constructor(
    private store: Store<CatsListState>,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this.activatedRoute.data
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.store.dispatch(setListData({ data: data['cat'] }));
      });

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
          catsNumber.limit = 10;
          this.store.dispatch(getListData());
        }
        let limit = Number(query);
        if (query !== null && limit >= 1 && limit <= 100) {
          catsNumber.limit = limit;
          this.store.dispatch(getListData());
        }
      });
  }
}
