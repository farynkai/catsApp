import { Component, OnInit } from '@angular/core';
import { takeUntil, tap } from 'rxjs/operators';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
} from '@angular/forms';
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
  filterForm!: UntypedFormGroup;

  get filterFormControls(): { [key: string]: AbstractControl } {
    return this.filterForm.controls;
  }

  constructor(
    private fb: UntypedFormBuilder,
    private store: Store<CatsListState>,
    private activatedRoute: ActivatedRoute
  ) {
    super();
    this.initFilterForm();
  }

  private initFilterForm(): void {
    this.filterForm = this.fb.group({
      searchByBreedInput: [],
      setLimitInput: [],
    });

    this.filterForm.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        let filterQuery = this.filterFormControls['searchByBreedInput'].value;
        let limitQuery = this.filterFormControls['setLimitInput'].value;
        let limit = Number(limitQuery);
        if (filterQuery === '' && limitQuery === null) {
          catsNumber.limit = 10;
          this.store.dispatch(getListData());
          this.cats$ = this.store.select(selectData);
        } else if (filterQuery !== null && limitQuery === null) {
          this.store.dispatch(setFilterBy({ filters: { query: filterQuery } }));
          this.cats$ = this.store.select(selectFilteredData);
        } else if (limitQuery !== null && limit >= 1 && limit <= 100) {
          catsNumber.limit = limit;
          this.store.dispatch(getListData());
          this.cats$ = this.store.select(selectData);
        }
      });
  }

  ngOnInit() {
    this.activatedRoute.data
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.store.dispatch(setListData({ data: data['cat'] }));
      });
  }
}
