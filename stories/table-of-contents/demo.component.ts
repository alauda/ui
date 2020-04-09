import { TocContainerDirective } from '@alauda/ui';
import { Component } from '@angular/core';

@Component({
  templateUrl: 'demo.component.html',
  styleUrls: ['demo.component.scss'],
})
export class DemoComponent {
  list: string[] = [];
  last = 0;

  add(toc: TocContainerDirective) {
    const item = `add content ${++this.last}`;
    this.list.push(item);
    setTimeout(() => {
      toc.scrollTo(item);
    });
  }

  remove(item: string) {
    const index = this.list.indexOf(item);
    this.list.splice(index, 1);
  }
}
