import { OverlayContainer } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  inject,
  tick,
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { timer } from 'rxjs';

import { DialogCloseDirective } from './dialog-content/dialog-close.directive';
import { DialogContentComponent } from './dialog-content/dialog-content.component';
import { DialogFooterComponent } from './dialog-content/dialog-footer.component';
import { DialogHeaderComponent } from './dialog-content/dialog-header.component';

import { DialogService, DialogSize } from '.';

describe('DialogService', () => {
  let fixture: ComponentFixture<TestComponent>;
  let ocEl: HTMLElement;
  let dialogService: DialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      providers: [DialogService],
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
    dialogService.open(TestDialogContentComponent, {
      size: DialogSize.Large,
      noAnimation: true,
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

  it('should open dialog set custom class work', () => {
    dialogService.open(TestDialogContentComponent, {
      customClass: 'test-class',
    });

    fixture.detectChanges();

    expect(ocEl.querySelector('.aui-dialog')).not.toBeNull();
    expect(ocEl.querySelector('.aui-dialog').classList).toContain('test-class');
  });

  it('should be closed by click cancel button', () => {
    const dialogRef = dialogService.open(TestDialogContentComponent, {
      noAnimation: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      expect(result).toBeFalsy();
      expect(ocEl.querySelector('aui-dialog')).toBeNull();
    });

    fixture.detectChanges();
    ocEl.querySelector('#cancel').dispatchEvent(new Event('click'));
  });

  it('should open dialog with template portal', () => {
    const ins = fixture.componentInstance;
    dialogService.open(ins.templateRef, { noAnimation: true });
    fixture.detectChanges();

    expect(ocEl.querySelector('.aui-dialog button').innerHTML).toContain(
      'close',
    );
  });

  it('should be closed by click close button', () =>
    new Promise<void>(resolve => {
      const ins = fixture.componentInstance;
      ins.result = 'result';
      dialogService
        .open(ins.templateRef, { noAnimation: true })
        .afterClosed()
        .subscribe(result => {
          expect(result).toBe('result');
          expect(ocEl.querySelector('aui-dialog')).toBeNull();
          resolve();
        });
      fixture.detectChanges();
      ocEl.querySelector('#close').dispatchEvent(new Event('click'));
      fixture.detectChanges();
    }));

  it('should open confirm dialog and invoke confirm callback', fakeAsync(() =>
    new Promise<void>(resolve => {
      dialogService
        .confirm({
          title: 'title',
          content: 'content',
          noAnimation: true,
        })
        .then(() => {
          expect(ocEl.querySelector('aui-dialog')).toBeNull();
          resolve();
        });
      fixture.detectChanges();

      ocEl
        .querySelector('.aui-confirm-dialog__confirm-button')
        .dispatchEvent(new Event('click'));
    })));

  it('should open confirm dialog and invoke cancel callback', () =>
    new Promise<void>(resolve => {
      dialogService
        .confirm({
          title: 'custom title',
          content: 'custom content',
          noAnimation: true,
        })
        .catch(() => {
          // eslint-disable-next-line jest/no-conditional-expect
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
    }));

  it('should before confirm work correctly', fakeAsync(() =>
    new Promise<void>(resolve => {
      const t1 = Date.now();
      dialogService
        .confirm({
          title: '',
          beforeConfirm: resolve => {
            setTimeout(resolve, 100);
          },
          noAnimation: true,
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
      tick(100);
      fixture.detectChanges();
    })));

  it('should before confirm observable work correctly', fakeAsync(() =>
    new Promise<void>(resolve => {
      const t1 = Date.now();
      dialogService
        .confirm({
          title: '',
          beforeConfirm: () => timer(100, 100),
          noAnimation: true,
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
      tick(100);
      fixture.detectChanges();
    })));

  it('should before cancel work correctly', () =>
    new Promise<void>(resolve => {
      const t1 = Date.now();
      dialogService
        .confirm({
          title: '',
          beforeCancel: resolve => {
            setTimeout(resolve, 100);
          },
          noAnimation: true,
        })
        .catch(() => {
          const t2 = Date.now();
          // eslint-disable-next-line jest/no-conditional-expect
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
    }));

  it('should before cancel observable work correctly', () =>
    new Promise<void>(resolve => {
      const t1 = Date.now();
      dialogService
        .confirm({
          title: '',
          beforeCancel: () => timer(100),
          noAnimation: true,
        })
        .catch(() => {
          const t2 = Date.now();
          // eslint-disable-next-line jest/no-conditional-expect
          expect(t2 - t1).toBeGreaterThanOrEqual(100);
          resolve();
        });
      fixture.detectChanges();

      const cancelBtn = ocEl.querySelector(
        '.aui-confirm-dialog__cancel-button',
      ) as HTMLButtonElement;
      cancelBtn.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      expect(cancelBtn.className).toContain('isLoading');
      expect(cancelBtn.disabled).toBeTruthy();
    }));

  it('should before confirm callback could prevent close event', fakeAsync(() => {
    dialogService
      .confirm({
        title: '',
        beforeConfirm: (_, reject) => {
          setTimeout(reject, 100);
        },
        noAnimation: true,
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

  it('should open confirm dialog with templateRef content', fakeAsync(() =>
    new Promise<void>(resolve => {
      const contentTemplateRefTestComponent = TestBed.createComponent(
        ContentTemplateRefTestComponent,
      );

      dialogService
        .confirm({
          title: 'title',
          content:
            contentTemplateRefTestComponent.componentInstance.templateRef,
          noAnimation: true,
        })
        .then(() => {
          expect(ocEl.querySelector('aui-dialog')).toBeNull();
          resolve();
        });
      fixture.detectChanges();
      expect(ocEl.querySelector('.content-template')).toBeTruthy();
      ocEl
        .querySelector('.aui-confirm-dialog__confirm-button')
        .dispatchEvent(new Event('click'));
    })));

  it('should open confirm dialog with component content', fakeAsync(() =>
    new Promise<void>(resolve => {
      dialogService
        .confirm({
          title: 'title',
          content: ContentTemplateRefTestComponent,
          noAnimation: true,
        })
        .then(() => {
          expect(ocEl.querySelector('aui-dialog')).toBeNull();
          resolve();
        });
      fixture.detectChanges();
      expect(ocEl.querySelector('content-component')).toBeTruthy();
      ocEl
        .querySelector('.aui-confirm-dialog__confirm-button')
        .dispatchEvent(new Event('click'));
    })));
});

@Component({
  template: `
    <ng-template #template>
      <aui-dialog-header [closeable]="false">title</aui-dialog-header>
      <button
        id="close"
        [auiDialogClose]="result"
      >
        close
      </button>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DialogHeaderComponent, DialogCloseDirective],
})
class TestComponent {
  result: any;
  @ViewChild('template', { static: true })
  templateRef: TemplateRef<any>;
}

@Component({
  selector: 'content-component',
  template: `
    <ng-template #template>
      <div class="content-template">content-templateRef</div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
class ContentTemplateRefTestComponent {
  @ViewChild('template', { static: true })
  templateRef: TemplateRef<any>;
}

@Component({
  selector: 'test-dialog-content',
  template: `
    <aui-dialog-header>title</aui-dialog-header>
    <aui-dialog-content>content</aui-dialog-content>
    <aui-dialog-footer>
      <div>
        <button
          id="confirm"
          [auiDialogClose]="true"
        ></button>
        <button
          id="cancel"
          [auiDialogClose]="false"
        ></button>
      </div>
    </aui-dialog-footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DialogHeaderComponent,
    DialogContentComponent,
    DialogFooterComponent,
    DialogCloseDirective,
  ],
})
class TestDialogContentComponent {}
