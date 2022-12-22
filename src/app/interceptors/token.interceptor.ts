import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { environment } from './../../environments/environment.prod';
import { CatsListState } from './../interfaces/cats-list';
import { selectLimit } from './../store/cats.selectors';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  limit$: number;
  constructor(private store: Store<CatsListState>) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.store.select(selectLimit).subscribe((a) => {
      this.limit$ = a;
    });
    const newRequest = request.clone({
      params: request.params
        .append('limit', this.limit$)
        .append('has_breeds', 1)
        .append('order', 'DESC')
        .append('api_key', environment.apiKey),
    });
    return next.handle(newRequest);
  }
}
