import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    templateUrl: 'anchor.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export default class InnerScrollerComponent {}
