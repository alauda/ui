import {
  AnimationTriggerMetadata,
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const MessageAnimations: {
  readonly inOut: AnimationTriggerMetadata;
} = {
  inOut: trigger('inOut', [
    state(
      'flyRight, flyLeft',
      style({ opacity: 1, transform: 'translateX(0)' }),
    ),
    state('slideDown', style({ opacity: 1, transform: 'translateY(0)' })),
    transition('* => slideDown', [
      style({ opacity: 0, transform: 'translateY(-50%)' }),
      animate('100ms ease-in-out'),
    ]),
    state('slideUp', style({ opacity: 0, 'margin-top': '-50%' })),
    transition('* => slideUp', [
      style({ opacity: 1, 'margin-top': '0' }),
      animate('100ms 200ms ease-in-out'),
    ]),

    state('flyLeft', style({ opacity: 1, transform: 'translateX(0)' })),
    transition('* => flyLeft', [
      style({ opacity: 0, transform: 'translateX(5%)' }),
      animate('100ms ease-in-out'),
    ]),
    state('flyUp', style({ opacity: 0, 'margin-top': '-30%' })),
    transition('* => flyUp', [
      style({ opacity: 1, 'margin-top': '0' }),
      animate('100ms 150ms ease-in-out'),
    ]),
    state('void', style({ opacity: 0 })),
    state('true', style({ opacity: 1 })),
    state('false', style({ opacity: 0 })),
    transition('* => true', animate('150ms cubic-bezier(0.0, 0.0, 0.2, 1)')),
    transition('* => void', animate('150ms cubic-bezier(0.4, 0.0, 1, 1)')),
  ]),
};
