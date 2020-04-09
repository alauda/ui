import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, DebugElement, ViewChild } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  inject,
  tick,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { TreeSelectComponent } from './tree-select.component';
import { TreeSelectModule } from './tree-select.module';
import { TreeNode } from './tree-select.types';

describe('TreeSelectComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let ins: TestComponent;
  let debugEl: DebugElement;
  let el: HTMLElement;
  let inputEl: HTMLInputElement;
  let ocEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TreeSelectModule, FormsModule],
      declarations: [TestComponent],
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    ins = fixture.componentInstance;
    debugEl = fixture.debugElement.query(By.css('.aui-tree-select'));
    el = debugEl.nativeElement;
    inputEl = debugEl.query(By.css('.aui-input'))
      .nativeElement as HTMLInputElement;

    inject([OverlayContainer], (overlayContainer: OverlayContainer) => {
      ocEl = overlayContainer.getContainerElement();
    })();
  });

  it('should properties work correctly', () => {
    expect(inputEl.placeholder).toBe('');
    expect(inputEl.disabled).toBeFalsy();

    ins.disabled = true;
    ins.loading = true;
    ins.clearable = true;
    ins.placeholder = 'placeholder';
    fixture.detectChanges();

    expect(inputEl.placeholder).toBe('placeholder');
    expect(inputEl.disabled).toBeTruthy();
    expect(
      el
        .querySelector('.aui-tree-select__indicator .aui-icon')
        .getAttribute('class'),
    ).toContain('aui-icon-spinner');
  });

  it('should ngModel work', fakeAsync(() => {
    ins.selectRef.openNodes();
    fixture.detectChanges();

    expect(
      ocEl.querySelector('.aui-tree-node[data-value=a-1]').className,
    ).toContain('isSelected');
    expect(inputEl.value).toBe('a-1');

    ins.value = 'b-2';
    fixture.detectChanges();
    tick();
    expect(inputEl.value).toBe('b-2');
    ins.selectRef.openNodes();
    fixture.detectChanges();
    expect(
      ocEl.querySelector('.aui-tree-node[data-value=b-2]').className,
    ).toContain('isSelected');

    ocEl
      .querySelector('.aui-tree-node[data-value=a-4-1] .aui-tree-node__title')
      .dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(ins.value).toBe('a-4-1');
    expect(ins.selectRef.displayText).toBe('a-4-1');
  }));

  it('should clearable work', () => {
    ins.clearable = true;
    fixture.detectChanges();
    const closeEl = el.querySelector('.aui-tree-select__clear');
    expect(closeEl).not.toBeNull();
    closeEl.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(ins.value).toBe('');
    expect(inputEl.value).toBe('');
  });

  it('should tree node could be disabled', () => {
    ins.selectRef.openNodes();
    fixture.detectChanges();
    ocEl
      .querySelector('.aui-tree-node[data-value=a-3] .aui-tree-node__title')
      .dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(inputEl.value).toBe('a-1');
  });
});

@Component({
  template: `
    <aui-tree-select
      #selectRef
      [(value)]="value"
      [nodesData]="treeNodes"
      [disabled]="disabled"
      [clearable]="clearable"
      [loading]="loading"
      [placeholder]="placeholder"
    >
      <aui-tree-node-placeholder>None</aui-tree-node-placeholder>
    </aui-tree-select>
  `,
})
class TestComponent {
  value = 'a-1';
  disabled: boolean;
  clearable: boolean;
  loading: boolean;
  placeholder = '';

  treeNodes: TreeNode[] = [
    {
      label: 'a',
      value: 'a',
      expanded: true,
      children: [
        {
          label: 'a-1',
          value: 'a-1',
        },
        {
          label: 'a-2',
          value: 'a-2',
          children: [
            {
              label: 'a-2-1',
              value: 'a-2-1',
            },
          ],
        },
        { label: 'a-3', value: 'a-3', disabled: true },
        {
          label: 'a-4',
          value: 'a-4',
          disabled: true,
          children: [
            {
              label: 'a-4-1',
              value: 'a-4-1',
            },
          ],
        },
      ],
    },
    {
      label: 'b',
      value: 'b',
      children: [
        {
          label: 'b-1',
          value: 'b-1',
        },
        {
          label: 'b-2',
          value: 'b-2',
        },
        {
          label: 'b-3',
          value: 'b-3',
        },
        {
          label: 'b-4',
          value: 'b-4',
        },
      ],
    },
  ];

  @ViewChild('selectRef', { static: true })
  selectRef: TreeSelectComponent;
}
