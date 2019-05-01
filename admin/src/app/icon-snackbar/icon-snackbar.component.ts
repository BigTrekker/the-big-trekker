import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-icon-snackbar',
  templateUrl: './icon-snackbar.component.html',
  styleUrls: ['./icon-snackbar.component.scss']
})
export class IconSnackbarComponent {

  icon: Object;
  message: String;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.icon = data['icon'];
    this.message = data['message'];
  }

}
