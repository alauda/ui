import { animate, keyframes, style, transition } from '@angular/animations';

import { TimingFunction } from '../core/animation/animation-consts';

const duration = '160ms';

export const scale = [
  transition('scale-hide => scale-show, void => scale-show', [
    animate(
      `${duration} ${TimingFunction.easeOut}`,
      keyframes([
        style({
          opacity: 0,
          transform: 'scale(0)',
        }),
        style({
          opacity: 1,
          transform: 'scale(1)',
        }),
      ]),
    ),
  ]),
  transition('scale-show => scale-hide, scale-show => void', [
    animate(
      `${duration} ${TimingFunction.easeInOut}`,
      keyframes([
        style({
          opacity: 1,
          transform: 'scale(1)',
        }),
        style({
          opacity: 0,
          transform: 'scale(0)',
        }),
      ]),
    ),
  ]),
];

export const scaleY = [
  transition('scaleY-hide => scaleY-show, void => scaleY-show', [
    animate(
      `${duration} ${TimingFunction.easeOut}`,
      keyframes([
        style({
          opacity: 0,
          transform: 'scaleY(0)',
        }),
        style({
          opacity: 1,
          transform: 'scaleY(1)',
        }),
      ]),
    ),
  ]),
  transition('scaleY-show => scaleY-hide, scaleY-show => void', [
    animate(
      `${duration} ${TimingFunction.easeInOut}`,
      keyframes([
        style({
          opacity: 1,
          transform: 'scaleY(1)',
        }),
        style({
          opacity: 0,
          transform: 'scaleY(0)',
        }),
      ]),
    ),
  ]),
];

export const animations = [...scale, ...scaleY];

export type AnimationType = 'none' | 'scale' | 'scaleY';
