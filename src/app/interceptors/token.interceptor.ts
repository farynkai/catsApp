import { environment } from './../../environments/environment.prod';
import { CatsService } from './../services/cats.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private catsService: CatsService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const newRequest = request.clone({
      // setParams: {
      //   limit: this.catsService.limit.toString(),
      //   has_breeds: '1',
      //   order: 'DESC',
      //   api_key: environment.apiKey,
      // },
      params: request.params
        .append('limit', this.catsService.limit)
        .append('has_breeds', 1)
        .append('order', 'DESC')
        .append('api_key', environment.apiKey),
    });
    return next.handle(newRequest);
  }
}
