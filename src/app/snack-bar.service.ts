import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(public snackBar: MatSnackBar) { }
  showFailureSnackBar (message: string) {
    this. openSnackBar(message, 'failure');
  }
  showSuccessSnackBar (message: string) {
    this. openSnackBar(message, 'success');
  }
  showWarningSnackBar (message: string) {
    this. openSnackBar(message, 'warning');
  }
  showInfoSnackBar (message: string) {
    this. openSnackBar(message, 'info');
  }
  openSnackBar(message: string, tone = 'info') {
    this.snackBar.open(message, 'CLOSE', {
      duration: 15000,
      verticalPosition: 'bottom',
      panelClass: 'hccc-' + tone + '-snack-bar'
    });
  }

}
