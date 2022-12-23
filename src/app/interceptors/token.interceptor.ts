import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment.prod';
import { catsNumber } from './../global-variables/limit';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const newRequest = request.clone({
      params: request.params
        .append('limit', catsNumber.limit)
        .append('has_breeds', 1)
        .append('order', 'DESC')
        .append('api_key', environment.apiKey),
    });
    return next.handle(newRequest);
  }
}
