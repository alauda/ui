import { animate, state, style, transition } from '@angular/animations';

export const scale = [
  state(
    'scale-show',
    style({
      opacity: 1,
      transform: 'scale(1)',
    }),
  ),
  state(
    'scale-hide,void',
    style({
      opacity: 0,
      transform: 'scale(0)',
    }),
  ),
  transition('scale-hide => scale-show, void => scale-show', [
    animate('160ms cubic-bezier(0, 0, 0.2, 1)'),
  ]),
  transition('scale-show => scale-hide', [
    animate('160ms cubic-bezier(0.38, 0, 0.24, 1)'),
  ]),
];

export const scaleY = [
  state(
    'scaleY-show',
    style({
      opacity: 1,
      transform: 'scaleY(1)',
    }),
  ),
  state(
    'scaleY-hide,void',
    style({
      opacity: 0,
      transform: 'scaleY(0)',
    }),
  ),
  transition('scaleY-hide => scaleY-show, void => scaleY-show', [
    animate('160ms cubic-bezier(0, 0, 0.2, 1)'),
  ]),
  transition('scaleY-show => scaleY-hide', [
    animate('160ms cubic-bezier(0.38, 0, 0.24, 1)'),
  ]),
];

export const animations = [...scale, ...scaleY];

export type AnimationType = 'scale' | 'scaleY';
