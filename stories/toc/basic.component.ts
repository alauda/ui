import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TocContainerDirective } from '@alauda/ui';

@Component({
  template: `
    <div class="demo-container">
      <div class="links">
        Links:
        <ul>
          <li>
            <a
              auiTocLink="content1"
              [for]="toc1"
              >content 1</a
            >
          </li>
          <li>
            <a
              auiTocLink="content2"
              [for]="toc1"
              >content 2</a
            >
          </li>
          <li>
            <a
              auiTocLink="content3"
              [for]="toc1"
              >content 3</a
            >
          </li>
          <li *ngFor="let item of list">
            <a
              [auiTocLink]="item"
              [for]="toc1"
              >{{ item }}</a
            >
          </li>
        </ul>
      </div>
      <div
        class="contents"
        auiTocContainer
        #toc1="auiTocContainer"
      >
        <div
          class="content"
          auiTocContent="content1"
        >
          Content 1
        </div>
        <div
          class="content"
          auiTocContent="content2"
        >
          Content 2
        </div>
        <div
          class="content"
          auiTocContent="content3"
        >
          Content 3
        </div>
        <div
          *ngFor="let item of list"
          class="content"
          [auiTocContent]="item"
          (click)="remove(item)"
        >
          {{ item }}
        </div>
        <button (click)="add(list, toc1)">{{ 'add' }}</button>
      </div>
    </div>
  `,
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TocBasicComponent {
  list: string[] = [];
  add = (list: string[], toc: TocContainerDirective) => {
    const item = `add content ${list.length + 4}`;
    list.push(item);
    setTimeout(() => {
      toc.scrollTo(item);
    });
  };
}
