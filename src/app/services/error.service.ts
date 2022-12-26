import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor() {}
  showError(error: HttpErrorResponse): void {
    console.log(
      `Error message: ${error.message}, status code: ${error.status}`
    );
  }
}
