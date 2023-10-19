import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SelectComponent } from '../select/select.component';

import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let ins: TestComponent;
  let debugEl: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    ins = fixture.componentInstance;
    debugEl = fixture.debugElement.query(By.css('aui-paginator'));
    el = debugEl.nativeElement;
  });

  it('should render current template', () => {
    expect(fixture).toMatchSnapshot();

    ins.disabled = true;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should navigate working correctly', () => {
    const navBtns = el.querySelectorAll('.aui-paginator__navigator');
    const getFastNavBtn = (i = 0) =>
      el.querySelectorAll('.aui-paginator__fast-navigator').item(i);
    const getCurrentPageBtn = () =>
      el.querySelector('.aui-paginator__page.aui-button--primary');

    expect(getCurrentPageBtn().innerHTML).toContain('1');

    navBtns.item(1).dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(getCurrentPageBtn().innerHTML).toContain('2');
    expect(ins.onPageChange.mock.calls[0][0]).toEqual(2);

    navBtns.item(0).dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(getCurrentPageBtn().innerHTML).toContain('1');
    expect(ins.onPageChange.mock.calls[1][0]).toEqual(1);

    getFastNavBtn().dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(getCurrentPageBtn().innerHTML).toContain('6');
    expect(ins.onPageChange.mock.calls[2][0]).toEqual(6);

    getFastNavBtn().dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(getCurrentPageBtn().innerHTML).toContain('1');
    expect(ins.onPageChange.mock.calls[3][0]).toEqual(1);
  });

  it('should jump to correct page when click page button', () => {
    const pageBtns = el.querySelectorAll('.aui-paginator__page');
    const lastPageBtn = pageBtns.item(pageBtns.length - 1);
    const pageCount = parseInt(
      lastPageBtn.querySelector('.aui-button__content').innerHTML.trim(),
      10,
    );

    lastPageBtn.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(lastPageBtn.className).toContain('aui-button--primary');
    expect(ins.onPageChange.mock.calls[0][0]).toEqual(pageCount);
  });

  it('should jumper working correctly', () => {
    const jumperEl: HTMLInputElement = el.querySelector(
      '.aui-paginator__jumper .aui-input',
    );
    jumperEl.value = '10';
    jumperEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();
    expect(
      el.querySelector('.aui-paginator__page.aui-button--primary').innerHTML,
    ).toContain('10');

    jumperEl.value = '1000';
    jumperEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();
    expect(
      el.querySelector('.aui-paginator__page.aui-button--primary').innerHTML,
    ).toContain('10');
    expect(jumperEl.value).toEqual('10');
  });

  it('should change page size correctly', () => {
    ins.paginator.changePageSize(100);
    fixture.detectChanges();
    expect(ins.onPageSizeChange.mock.calls[0][0]).toEqual(100);
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  template: `
    <aui-paginator
      [(currentPage)]="currentPage"
      [(pageSize)]="pageSize"
      [total]="total"
      [pageSizeOptions]="pageSizeOptions"
      [layout]="layout"
      [disabled]="disabled"
      (currentPageChange)="onPageChange($event)"
      (pageSizeChange)="onPageSizeChange($event)"
    >
      custom content
    </aui-paginator>
  `,
  standalone: true,
  imports: [
    PaginatorComponent,
    // https://github.com/angular/angular/issues/51568
    SelectComponent,
  ],
})
class TestComponent {
  currentPage = 1;
  pageSize = 20;
  total = 350;
  pageSizeOptions = [20, 50, 100];
  layout = ['total', 'pager', 'sizes', 'jumper', 'custom content'];
  disabled = false;

  onPageChange = jest.fn();
  onPageSizeChange = jest.fn();

  @ViewChild(PaginatorComponent, { static: true })
  paginator: PaginatorComponent;
}
