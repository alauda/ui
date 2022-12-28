import { Component, DebugElement, ViewChild } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { InputModule, SearchComponent } from '..';

describe('SearchComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let ins: TestComponent;
  let debugEl: DebugElement;
  let el: HTMLElement;
  let inputEl: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InputModule],
      declarations: [TestComponent],
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    ins = fixture.componentInstance;
    debugEl = fixture.debugElement.query(By.css('.aui-search'));
    el = debugEl.nativeElement;
    inputEl = el.querySelector('input');
  });

  it('should render correct construction', () => {
    expect(el).not.toBeNull();
    expect(el.className).toContain('hasIcon');
    const iconEl = el.querySelector('.aui-search__icon');
    expect(iconEl).not.toBeNull();
    expect(iconEl.querySelector('use').getAttribute('xlink:href')).toBe(
      '#aui-icon-magnifier',
    );
    expect(inputEl).not.toBeNull();
    expect(inputEl.className).toContain('aui-input');
    expect(inputEl.className).toContain('aui-input--medium');
    expect(inputEl.placeholder).toBe('placeholder');
  });

  it('should searchButton option work correctly', () => {
    ins.searchButton = true;
    fixture.detectChanges();
    expect(el.className).not.toContain('hasIcon');
    expect(el.className).toContain('hasButton');
    const buttonEl = el.querySelector('.aui-search__button');
    expect(buttonEl).not.toBeNull();
    expect(buttonEl.querySelector('use').getAttribute('xlink:href')).toBe(
      '#aui-icon-magnifier',
    );
  });

  it('should clearable option work correctly', () => {
    ins.clearable = true;
    fixture.detectChanges();
    expect(el.querySelector('.aui-search__clear').getAttribute('hidden')).toBe(
      '',
    );
    inputEl.value = 'text';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const clearEl = el.querySelector('.aui-search__clear');
    expect(clearEl.getAttribute('hidden')).toBeNull();
    expect(clearEl.querySelector('use').getAttribute('xlink:href')).toBe(
      '#aui-icon-xmark_small',
    );
  });

  it('should searching option work correctly', () => {
    ins.searching = true;
    fixture.detectChanges();
    expect(el.querySelector('.aui-search__spinner')).not.toBeNull();
    expect(el.querySelector('.aui-search__spinner svg').classList).toContain(
      'aui-icon-spinner',
    );

    ins.clearable = true;
    inputEl.value = 'text';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(el.querySelector('.aui-search__spinner')).not.toBeNull();
    const clearEl = el.querySelector('.aui-search__clear');
    expect(clearEl.getAttribute('hidden')).toBe('');
    expect(clearEl.querySelector('use').getAttribute('xlink:href')).toBe(
      '#aui-icon-xmark_small',
    );

    ins.searchButton = true;
    fixture.detectChanges();
    expect(el.querySelector('.aui-search__spinner')).toBeNull();
    expect(
      el.querySelector('.aui-search__clear').getAttribute('hidden'),
    ).toBeNull();
    expect(el.querySelector('.aui-search__button svg').classList).toContain(
      'aui-icon-spinner',
    );
  });

  it('should set inner value & input value when keyword changed', fakeAsync(() => {
    ins.keyword = 'keyword';
    fixture.detectChanges();
    tick();
    expect(ins.searchRef.keyword).toBe('keyword');
    expect(inputEl.value).toBe('keyword');
  }));

  it('should emit change event when user input', () =>
    new Promise<void>(resolve => {
      ins.searchRef.keywordChange.subscribe(($event: string) => {
        expect($event).toBe('text');
        resolve();
      });

      inputEl.value = 'text';
      inputEl.dispatchEvent(new Event('input'));
      fixture.detectChanges();
    }));

  it('should input element be disabled', fakeAsync(() => {
    ins.disabled = true;
    fixture.detectChanges();
    expect(el.className).toContain('isDisabled');
    tick();
    expect(inputEl.disabled).toBeTruthy();
  }));

  it('should emit clear event', () =>
    new Promise<void>(resolve => {
      ins.searchRef.clear.subscribe(() => {
        resolve();
      });

      inputEl.value = 'text';
      inputEl.dispatchEvent(new Event('input'));
      ins.clearable = true;
      fixture.detectChanges();
      el.querySelector('.aui-search__clear').dispatchEvent(new Event('click'));
      expect(ins.searchRef.keyword).toBe('');
    }));

  it('should not emit clear event when disabled', () => {
    ins.searchRef.clear.subscribe(() => {
      throw new Error('should not emit clear event when disabled');
    });

    ins.disabled = true;
    ins.clearable = true;
    ins.keyword = 'text';
    fixture.detectChanges();
    el.querySelector('.aui-search__clear').dispatchEvent(new Event('click'));
    expect(ins.searchRef.keyword).toBe('text');
    expect(ins.keyword).toBe('text');
  });

  it('should emit search event when click search button', () =>
    new Promise<void>(resolve => {
      ins.searchRef.search.subscribe(($event: string) => {
        expect($event).toBe('text');
        resolve();
      });

      inputEl.value = 'text';
      inputEl.dispatchEvent(new Event('input'));
      ins.searchButton = true;
      fixture.detectChanges();
      el.querySelector('.aui-search__button').dispatchEvent(new Event('click'));
    }));

  it('should not emit search event when click search button', () => {
    ins.searchRef.search.subscribe(() => {
      throw new Error('should not emit search event when click search button');
    });

    ins.searchButton = true;
    ins.disabled = true;
    ins.keyword = 'text';
    fixture.detectChanges();
    el.querySelector('.aui-search__button').dispatchEvent(new Event('click'));
  });

  it('should emit search event when press enter', () =>
    new Promise<void>(resolve => {
      ins.searchRef.search.subscribe(($event: string) => {
        expect($event).toBe('text');
        resolve();
      });

      inputEl.value = 'text';
      inputEl.dispatchEvent(new Event('input'));
      ins.searchButton = true;
      fixture.detectChanges();
      inputEl.dispatchEvent(new KeyboardEvent('keyup', { key: 'enter' }));
    }));
});

@Component({
  template: `
    <aui-search
      #searchRef
      [searchButton]="searchButton"
      [searching]="searching"
      [clearable]="clearable"
      [disabled]="disabled"
      [(keyword)]="keyword"
      [placeholder]="placeholder"
    ></aui-search>
  `,
})
class TestComponent {
  searchButton: boolean;
  searching: boolean;
  clearable: boolean;
  disabled: boolean;
  placeholder = 'placeholder';
  keyword = '';

  @ViewChild('searchRef', { static: true })
  searchRef: SearchComponent;
}
