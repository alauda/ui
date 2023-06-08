import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `<div class="container">
    <div class="card shadow-0">@include shadow-0</div>
    <div class="card shadow-2">@include shadow-2</div>
    <div class="card shadow-8">@include shadow-8</div>
    <div class="card shadow-16">@include shadow-16</div>
  </div> `,
  styleUrls: ['shadow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShadowComponent {}
