import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment.prod';
import { CatsListState } from './../interfaces/cats-list';
import { selectLimit } from './../store/cats.selectors';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private store: Store<CatsListState>) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const newRequest = request.clone({
      params: request.params
        .append('limit', 10)
        .append('has_breeds', 1)
        .append('order', 'DESC')
        .append('api_key', environment.apiKey),
    });
    return next.handle(newRequest);
  }
}
