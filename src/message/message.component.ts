import { AnimationEvent } from '@angular/animations';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';

import { IconComponent } from '../icon/icon.component';
import { Bem, buildBem } from '../utils';

import { MessageAnimations } from './message-animations';
import { MessageConfig, MessageType } from './message.config';

let uniqueId = 0;

const typeIcon: { [key: string]: string } = {
  [MessageType.Error]: 'exclamation_triangle_s',
  [MessageType.Success]: 'check_circle_s',
  [MessageType.Warning]: 'exclamation_circle_s',
  [MessageType.Info]: 'info_circle_s',
};

@Component({
  selector: 'aui-message',
  templateUrl: './message.component.html',
  animations: [MessageAnimations.inOut],
  styleUrls: ['./message.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  standalone: true,
  imports: [IconComponent],
})
export class MessageComponent implements AfterViewInit {
  protected readonly animateStartState: string = 'slideDown';
  protected readonly animateStartEnd: string = 'slideUp';

  bem: Bem = buildBem('aui-message');
  animateState = this.animateStartState;
  uniqueId = `aui-message-${uniqueId++}`;
  beforeClosed: Subject<void> = new Subject();
  afterClosed: Subject<void> = new Subject();

  id: string | number;
  type: MessageType;
  content: string;
  duration: number;

  get icon(): string {
    return typeIcon[this.type];
  }

  protected timerId: number;

  constructor(
    protected viewContainerRef: ViewContainerRef,
    protected cdr: ChangeDetectorRef,
  ) {}

  ngAfterViewInit(): void {
    if (this.duration > 0) {
      this.timerId = window.setTimeout(() => {
        this.close();
      }, this.duration);
    }
  }

  setConfig(config: MessageConfig) {
    this.id = config.id;
    this.type = config.type;
    this.content = config.content;
    this.duration = config.duration;
  }

  close() {
    clearTimeout(this.timerId);
    this.beforeClosed.next();
    this.beforeClosed.complete();
    this.animateState = this.animateStartEnd;
    this.cdr.markForCheck();
  }

  onAnimationEnd(event: AnimationEvent) {
    try {
      if (
        this.viewContainerRef.element &&
        event.toState === this.animateStartEnd
      ) {
        (this.viewContainerRef.element.nativeElement as HTMLElement).remove();
        this.afterClosed.next();
        this.afterClosed.complete();
      }
    } catch {
      throw new Error('No outer layer can be found!');
    }
  }
}
