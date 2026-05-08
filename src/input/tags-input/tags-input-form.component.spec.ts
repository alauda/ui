import { Component } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import {
  ReactiveFormsModule,
  FormControl,
  Validators,
  FormGroup,
  ValidatorFn,
  AbstractControl,
  AsyncValidatorFn,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TagsInputComponent } from './tags-input.component';
import { of } from 'rxjs';

describe('TagsInputComponent Required Validation Behavior', () => {
  let fixture: ComponentFixture<TestFormComponent>;
  let testHost: TestFormComponent;
  let inputEl: HTMLInputElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFormComponent);
    fixture.detectChanges();
    testHost = fixture.componentInstance;
    const el = fixture.debugElement.query(
      By.css('.aui-tags-input'),
    ).nativeElement;
    inputEl = el.querySelector('input');
  });

  // it('should mark form valid when input has value but tag is not confirmed yet', fakeAsync(() => {
  //   expect(testHost.form.valid).toBeFalsy();

  //   inputEl.value = 'hello';
  //   inputEl.dispatchEvent(new Event('input'));
  //   fixture.detectChanges();
  //   tick();
  //   fixture.detectChanges();

  //   expect(testHost.form.valid).toBeTruthy();

  //   inputEl.dispatchEvent(new Event('blur'));
  //   fixture.detectChanges();
  //   tick();
  //   fixture.detectChanges();

  //   expect(testHost.form.valid).toBeTruthy();
  //   expect(testHost.form.get('tags')!.value).toEqual(['hello']);
  // }));

  describe('allowRepeat Behavior', () => {
    it('should NOT allow duplicate tags when allowRepeat = false', fakeAsync(() => {
      testHost.allowRepeat = false;
      fixture.detectChanges();

      inputEl.value = 'a';
      inputEl.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      tick();

      expect(testHost.form.get('tags')!.value).toEqual([]);

      inputEl.dispatchEvent(new Event('blur'));
      tick();
      fixture.detectChanges();

      expect(testHost.form.get('tags')!.value).toEqual(['a']);

      inputEl.value = 'a';
      inputEl.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      tick();

      expect(testHost.form.get('tags')!.value).toEqual(['a']);

      inputEl.dispatchEvent(new Event('blur'));
      tick();
      fixture.detectChanges();

      expect(testHost.form.get('tags')!.value).toEqual(['a']);
    }));

    it('should allow duplicate tags when allowRepeat = true', fakeAsync(() => {
      testHost.allowRepeat = true;
      fixture.detectChanges();

      inputEl.value = 'a';
      inputEl.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      tick();

      expect(testHost.form.get('tags')!.value).toEqual([]);

      inputEl.dispatchEvent(new Event('blur'));
      tick();
      fixture.detectChanges();

      expect(testHost.form.get('tags')!.value).toEqual(['a']);

      inputEl.value = 'a';
      inputEl.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      tick();

      expect(testHost.form.get('tags')!.value).toEqual(['a']);

      inputEl.dispatchEvent(new Event('blur'));
      tick();
      fixture.detectChanges();

      expect(testHost.form.get('tags')!.value).toEqual(['a', 'a']);
    }));
  });

  describe('allowEmpty Behavior', () => {
    it('should NOT add empty tag when allowEmpty = false', fakeAsync(() => {
      testHost.allowEmpty = false;
      fixture.detectChanges();

      inputEl.value = '';
      inputEl.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      tick();

      expect(testHost.form.get('tags')!.value).toEqual([]);

      inputEl.dispatchEvent(new Event('blur'));
      tick();
      fixture.detectChanges();

      expect(testHost.form.get('tags')!.value).toEqual([]);
    }));

    it('should add empty tag when allowEmpty = true', fakeAsync(() => {
      testHost.allowEmpty = true;
      fixture.detectChanges();

      inputEl.value = '';
      inputEl.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      tick();

      expect(testHost.form.get('tags')!.value).toEqual([]);

      inputEl.dispatchEvent(new Event('blur'));
      tick();
      fixture.detectChanges();

      expect(testHost.form.get('tags')!.value).toEqual(['']);
    }));
  });

  describe('inputValidator behavior', () => {
    it('should NOT add tag when input does NOT pass inputValidator', fakeAsync(() => {
      testHost.checkFn = control => {
        const value = control.value as string;
        if (value.includes('a')) {
          return { patternB: true };
        }
        return null;
      };
      fixture.detectChanges();

      inputEl.value = 'apple';
      inputEl.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      tick();

      expect(testHost.form.get('tags')!.value).toEqual([]);

      inputEl.dispatchEvent(new Event('blur'));
      tick();
      fixture.detectChanges();

      expect(testHost.form.get('tags')!.value).toEqual([]);
      expect(testHost.form.valid).toBeFalsy();
    }));

    it('should add tag when input passes inputValidator', fakeAsync(() => {
      testHost.checkFn = control => {
        const value = control.value as string;
        if (value.includes('a')) {
          return { patternB: true };
        }
        return null;
      };
      fixture.detectChanges();

      inputEl.value = 'ccc';
      inputEl.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      tick();

      expect(testHost.form.get('tags')!.value).toEqual([]);

      inputEl.dispatchEvent(new Event('blur'));
      tick();
      fixture.detectChanges();

      expect(testHost.form.get('tags')!.value).toEqual(['ccc']);
      expect(testHost.form.valid).toBeTruthy();
    }));
  });

  describe('inputAsyncValidator behavior', () => {
    it('should block adding tag when async validator resolves to false', fakeAsync(() => {
      testHost.inputAsyncValidator = (_control: AbstractControl) =>
        of({ tagAsyncInvalid: true });
      fixture.detectChanges();

      inputEl.value = 'bad';
      inputEl.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      tick();

      expect(testHost.form.get('tags')!.value).toEqual([]);

      inputEl.dispatchEvent(new Event('blur'));
      tick();
      fixture.detectChanges();

      expect(testHost.form.get('tags')!.value).toEqual([]);
    }));

    it('should allow adding tag when async validator resolves to true', fakeAsync(() => {
      testHost.inputAsyncValidator = (_control: AbstractControl) =>
        Promise.resolve(null);
      fixture.detectChanges();

      inputEl.value = 'hello';
      inputEl.dispatchEvent(new Event('input'));
      inputEl.dispatchEvent(new Event('blur'));

      tick();
      fixture.detectChanges();

      expect(testHost.form.get('tags')!.value).toEqual(['hello']);
    }));
  });
});

@Component({
  template: `
    <form [formGroup]="form">
      <aui-tags-input
        required
        formControlName="tags"
        [allowRepeat]="allowRepeat"
        [allowEmpty]="allowEmpty"
        [inputValidator]="checkFn"
        [inputAsyncValidator]="inputAsyncValidator"
      ></aui-tags-input>
    </form>
  `,
  imports: [ReactiveFormsModule, TagsInputComponent],
})
class TestFormComponent {
  allowRepeat = false;
  allowEmpty = false;

  inputAsyncValidator: AsyncValidatorFn = (_control: AbstractControl) =>
    Promise.resolve(null);

  checkFn: ValidatorFn = () => {
    return null;
  };

  form = new FormGroup({
    tags: new FormControl<string[]>([], Validators.required),
  });
}
