import { Component } from '@angular/core';

@Component({
  templateUrl: './template.html',
})
export class LoadingSwitchComponent {
  data = false;
  loading = false;

  toggle() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.data = !this.data;
    }, 500);
  }
}
