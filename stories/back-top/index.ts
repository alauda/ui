import { BackTopModule } from '@alauda/ui';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Component } from '@angular/core';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';

storiesOf('BackTop', module)
  .addDecorator(withKnobs)
  .add('back top', () => {
    return {
      moduleMetadata: {
        imports: [BackTopModule, ScrollingModule],
        declarations: [DemoComponent],
      },
      component: DemoComponent,
    };
  });

@Component({
  template: `
    <div class="out-container">
      <div class="inner-container-wrapper">
        <div class="inner-container" cdkScrollable>
          <div class="inner-content">
            Choose scroll by outer cdkScrollable
          </div>
          <aui-back-top
            [visibilityHeight]="visibilityHeight"
            (click)="onClickHandler()"
          ></aui-back-top>
        </div>
        <div class="inner-container2">
          <div class="inner-content">
            Choose scroll by selector
          </div>
        </div>
        <div class="inner-container" #containerRef>
          <div class="inner-content">
            Choose scroll by element ref
          </div>
        </div>
      </div>
      Choose scroll by default: Window
      <div>
        <button (click)="setPosition()">
          change visibilityHeight from 100 to 200
        </button>
      </div>
      <aui-back-top class="aui-icon__window"></aui-back-top>
      <aui-back-top
        [visibilityHeight]="visibilityHeight"
        [target]="'.inner-container2'"
        class="aui-icon__selector"
      ></aui-back-top>
      <aui-back-top
        [visibilityHeight]="visibilityHeight"
        [target]="containerRef"
        class="aui-icon__ref"
      ></aui-back-top>
    </div>
  `,
  styles: [
    `
      :host ::ng-deep .aui-icon__window .aui-back-top {
        right: 60px;
      }

      :host ::ng-deep .aui-icon__selector .aui-back-top {
        right: 110px;
      }

      :host ::ng-deep .aui-icon__ref .aui-back-top {
        right: 160px;
      }

      .out-container {
        height: 1200px;
        text-align: center;
      }

      .inner-container-wrapper {
        height: 300px;
        display: flex;
        align-items: stretch;
      }

      .inner-container {
        width: 300px;
        overflow: auto;
        border: 2px dotted #ddd;
      }

      .inner-container2 {
        width: 300px;
        margin: 0 40px;
        overflow: auto;
        border: 2px dotted #ddd;
      }

      .inner-content {
        height: 800px;
        font-weight: bold;
      }
    `,
  ],
})
class DemoComponent {
  visibilityHeight = 100;

  onClickHandler() {
    console.log('onClick');
  }

  setPosition() {
    this.visibilityHeight = 200;
  }
}
