import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}
  showError(error: HttpErrorResponse): void {
    this.snackBar.open(`Error message: ${error.message}`, 'Undo', { duration: 3000, });
  }
}
