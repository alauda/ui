import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, NgModule, TemplateRef, ViewChild } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  inject,
  tick,
} from '@angular/core/testing';
import { timer } from 'rxjs';

import { DialogModule, DialogService, DialogSize } from './public-api';

describe('DialogService', () => {
  let fixture: ComponentFixture<TestComponent>;
  let ocEl: HTMLElement;
  let dialogService: DialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
    });

    fixture = TestBed.createComponent(TestComponent);

    inject(
      [OverlayContainer, DialogService],
      (overlayContainer: OverlayContainer, service: DialogService) => {
        ocEl = overlayContainer.getContainerElement();
        dialogService = service;
      },
    )();
  });

  it('should open dialog with component portal', () => {
    dialogService.open(DialogContentComponent, {
      size: DialogSize.Large,
    });

    fixture.detectChanges();

    expect(ocEl.querySelector('.aui-dialog')).not.toBeNull();
    expect(ocEl.querySelector('.aui-dialog').classList).toContain(
      'aui-dialog--large',
    );
    expect(
      ocEl.querySelector('.aui-dialog>test-dialog-content'),
    ).not.toBeNull();
  });

  it('should be closed by click cancel button', () => {
    const dialogRef = dialogService.open(DialogContentComponent);
    dialogRef.afterClosed().subscribe(result => {
      expect(result).toBeFalsy();
      expect(ocEl.querySelector('aui-dialog')).toBeNull();
    });

    fixture.detectChanges();
    ocEl.querySelector('#cancel').dispatchEvent(new Event('click'));
  });

  it('should open dialog with template portal', () => {
    const ins = fixture.componentInstance;
    dialogService.open(ins.templateRef);
    fixture.detectChanges();

    expect(ocEl.querySelector('.aui-dialog button').innerHTML).toContain(
      'close',
    );
  });

  it('should be closed by click close button', () => {
    return new Promise<void>(resolve => {
      const ins = fixture.componentInstance;
      ins.result = 'result';
      dialogService
        .open(ins.templateRef)
        .afterClosed()
        .subscribe(result => {
          expect(result).toBe('result');
          expect(ocEl.querySelector('aui-dialog')).toBeNull();
          resolve();
        });
      fixture.detectChanges();
      ocEl.querySelector('#close').dispatchEvent(new Event('click'));
      fixture.detectChanges();
    });
  });

  it('should open confirm dialog and invoke confirm callback', () => {
    return new Promise<void>(resolve => {
      dialogService
        .confirm({
          title: 'title',
          content: 'content',
        })
        .then(() => {
          expect(ocEl.querySelector('aui-dialog')).toBeNull();
          resolve();
        });
      fixture.detectChanges();

      ocEl
        .querySelector('.aui-confirm-dialog__confirm-button')
        .dispatchEvent(new Event('click'));
    });
  });

  it('should open confirm dialog and invoke cancel callback', () => {
    return new Promise<void>(resolve => {
      dialogService
        .confirm({
          title: 'custom title',
          content: 'custom content',
        })
        .catch(() => {
          expect(ocEl.querySelector('aui-dialog')).toBeNull();
          resolve();
        });
      fixture.detectChanges();

      expect(
        ocEl.querySelector('.aui-confirm-dialog__title').innerHTML,
      ).toContain('custom title');
      expect(
        ocEl.querySelector('.aui-confirm-dialog__content').innerHTML,
      ).toContain('custom content');
      ocEl
        .querySelector('.aui-confirm-dialog__cancel-button')
        .dispatchEvent(new Event('click'));
    });
  });

  it('should before confirm work correctly', () => {
    return new Promise<void>(resolve => {
      const t1 = Date.now();
      dialogService
        .confirm({
          title: '',
          beforeConfirm: resolve => {
            setTimeout(resolve, 100);
          },
        })
        .then(() => {
          const t2 = Date.now();
          expect(t2 - t1).toBeGreaterThanOrEqual(100);
          resolve();
        });
      fixture.detectChanges();

      const confirmBtn: HTMLButtonElement = ocEl.querySelector(
        '.aui-confirm-dialog__confirm-button',
      );
      confirmBtn.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      expect(confirmBtn.className).toContain('isLoading');
      expect(confirmBtn.disabled).toBeTruthy();
    });
  });

  it('should before confirm observable work correctly', () => {
    return new Promise<void>(resolve => {
      const t1 = Date.now();
      dialogService
        .confirm({
          title: '',
          beforeConfirm: () => timer(100),
        })
        // eslint-disable-next-line sonarjs/no-identical-functions
        .then(() => {
          const t2 = Date.now();
          expect(t2 - t1).toBeGreaterThanOrEqual(100);
          resolve();
        });
      fixture.detectChanges();

      const confirmBtn: HTMLButtonElement = ocEl.querySelector(
        '.aui-confirm-dialog__confirm-button',
      );
      confirmBtn.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      expect(confirmBtn.className).toContain('isLoading');
      expect(confirmBtn.disabled).toBeTruthy();
    });
  });

  it('should before cancel work correctly', () => {
    return new Promise<void>(resolve => {
      const t1 = Date.now();
      dialogService
        .confirm({
          title: '',
          beforeCancel: resolve => {
            setTimeout(resolve, 100);
          },
        })
        // eslint-disable-next-line sonarjs/no-identical-functions
        .catch(() => {
          const t2 = Date.now();
          expect(t2 - t1).toBeGreaterThanOrEqual(100);
          resolve();
        });
      fixture.detectChanges();

      const cancelBtn: HTMLButtonElement = ocEl.querySelector(
        '.aui-confirm-dialog__cancel-button',
      );
      cancelBtn.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      expect(cancelBtn.className).toContain('isLoading');
      expect(cancelBtn.disabled).toBeTruthy();
    });
  });

  it('should before cancel observable work correctly', () => {
    return new Promise<void>(resolve => {
      const t1 = Date.now();
      dialogService
        .confirm({
          title: '',
          beforeCancel: () => timer(100),
        })
        // eslint-disable-next-line sonarjs/no-identical-functions
        .catch(() => {
          const t2 = Date.now();
          expect(t2 - t1).toBeGreaterThanOrEqual(100);
          resolve();
        });
      fixture.detectChanges();

      const cancelBtn: HTMLButtonElement = ocEl.querySelector(
        '.aui-confirm-dialog__cancel-button',
      );
      cancelBtn.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      expect(cancelBtn.className).toContain('isLoading');
      expect(cancelBtn.disabled).toBeTruthy();
    });
  });

  it('should before confirm callback could prevent close event', fakeAsync(() => {
    dialogService
      .confirm({
        title: '',
        beforeConfirm: (_, reject) => {
          setTimeout(reject, 100);
        },
      })
      .then(() => {
        throw new Error('confirm dialog should not be closed');
      })
      .catch(() => {
        throw new Error('confirm dialog should not be closed');
      });
    fixture.detectChanges();

    const confirmBtn: HTMLButtonElement = ocEl.querySelector(
      '.aui-confirm-dialog__confirm-button',
    );
    const cancelBtn: HTMLButtonElement = ocEl.querySelector(
      '.aui-confirm-dialog__cancel-button',
    );
    confirmBtn.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(confirmBtn.className).toContain('isLoading');
    expect(confirmBtn.disabled).toBeTruthy();
    expect(cancelBtn.disabled).toBeTruthy();

    tick(100);
    fixture.detectChanges();

    expect(ocEl.querySelector('aui-dialog')).not.toBeNull();
    expect(confirmBtn.className).not.toContain('isLoading');
    expect(confirmBtn.disabled).toBeFalsy();
    expect(cancelBtn.disabled).toBeFalsy();
  }));

  it('custom class name should be work', () => {
    dialogService.open(DialogContentComponent, {
      className: 'custom-class',
    });

    fixture.detectChanges();

    expect(ocEl.querySelector('.aui-dialog')).not.toBeNull();
    expect(ocEl.querySelector('.aui-dialog').classList).toContain(
      'custom-class',
    );
  });

  it('custom style offsetTop should be work', () => {
    dialogService.open(DialogContentComponent, {
      offsetTop: '10vh',
    });

    fixture.detectChanges();

    expect(ocEl.querySelector('.aui-dialog')).not.toBeNull();
    expect(ocEl.querySelector<HTMLElement>('.aui-dialog').style.marginTop).toEqual(
      '10vh',
    );
  });
});

@Component({
  template: `
    <ng-template #template>
      <aui-dialog-header [closeable]="false">title</aui-dialog-header>
      <button id="close" [auiDialogClose]="result">close</button>
    </ng-template>
  `,
})
class TestComponent {
  result: any;
  @ViewChild('template', { static: true })
  templateRef: TemplateRef<any>;
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'test-dialog-content',
  template: `
    <aui-dialog-header>title</aui-dialog-header>
    <aui-dialog-content>content</aui-dialog-content>
    <aui-dialog-footer>
      <div>
        <button id="confirm" [auiDialogClose]="true"></button>
        <button id="cancel" [auiDialogClose]="false"></button>
      </div>
    </aui-dialog-footer>
  `,
})
class DialogContentComponent {}

@NgModule({
  imports: [DialogModule],
  declarations: [DialogContentComponent, TestComponent],
  entryComponents: [DialogContentComponent],
})
class TestModule {}
