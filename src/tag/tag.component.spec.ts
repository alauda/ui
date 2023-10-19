import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { TagModule } from './tag.module';

describe('TagComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TagModule, TestComponent],
    });
  });

  it('should match snapshot', () => {
    const fixture = TestBed.createComponent(TestComponent);
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  template: `
    <aui-tag>primary</aui-tag>
    <aui-tag
      type="success"
      [size]="'medium'"
      [solid]="true"
      [invalid]="true"
    >
      success
    </aui-tag>
    <aui-tag
      type="warning"
      [size]="'small'"
      [closeable]="true"
    >
      warning
    </aui-tag>
    <aui-tag
      type="error"
      [size]="'mini'"
      [round]="true"
      >error</aui-tag
    >
    <aui-tag
      type="info"
      size="mini"
      [solid]="true"
      [closeable]="true"
      [invalid]="true"
      [round]="true"
    >
      info
    </aui-tag>
  `,
  standalone: true,
  imports: [TagModule],
})
class TestComponent {}
