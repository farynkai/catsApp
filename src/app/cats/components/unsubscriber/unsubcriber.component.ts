import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-unsubscriber',
  template: `<p>unsubcriber</p>`,
  styleUrls: ['./unsubscriber.component.css'],
})
export class UnsubscriberComponent implements OnDestroy {
  destroyed$ = new Subject<void>();
  constructor() {}
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
