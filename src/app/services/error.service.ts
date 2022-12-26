import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor() {}
  showError(error: Error): void {
    console.log(error.message);
  }
}
