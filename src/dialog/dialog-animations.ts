import {
  animate,
  AnimationTriggerMetadata,
  query,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { AnimationDuration } from '../core/animation/animation-consts';
import { getAnimationQueryMetadatas } from '../utils/animations';

export const ZOOM_CLASS_NAME_MAP = {
  enter: 'aui-zoom-enter',
  enterActive: 'aui-zoom-enter-active',
  leave: 'aui-zoom-leave',
  leaveActive: 'aui-zoom-leave-active',
};

export const ZOOM_SLOW_CLASS_NAME_MAP = {
  enter: 'aui-zoom-slow-enter',
  enterActive: 'aui-zoom-slow-enter-active',
  leave: 'aui-zoom-slow-leave',
  leaveActive: 'aui-zoom-slow-leave-active',
};

export const FADE_CLASS_NAME_MAP = {
  enter: 'aui-fade-enter',
  enterActive: 'aui-fade-enter-active',
  leave: 'aui-fade-leave',
  leaveActive: 'aui-fade-leave-active',
};

export const FADE_SLOW_CLASS_NAME_MAP = {
  enter: 'aui-fade-slow-enter',
  enterActive: 'aui-fade-slow-enter-active',
  leave: 'aui-fade-slow-leave',
  leaveActive: 'aui-fade-slow-leave-active',
};

export const ANIMATION_DURATION_BASE_CLASSES = [
  '.aui-dialog--small',
  '.aui-dialog--medium',
  '.aui-dialog--fit-content',
];

export const ANIMATION_DURATION_SLOW_CLASSES = [
  '.aui-dialog--big',
  '.aui-dialog--large',
  '.aui-dialog--fullscreen',
  '.aui-dialog--fit-viewport',
];

const getAnimationQueryMetadata = (duration: string) => (className: string) =>
  query(className, animate(duration, style({})), {
    optional: true,
  });

export const dialogAnimations: {
  readonly dialogContainer: AnimationTriggerMetadata;
} = {
  dialogContainer: trigger('dialogContainer', [
    state('void, exit', style({})),
    state('enter', style({})),
    transition('* => enter', [
      ...getAnimationQueryMetadatas(
        ANIMATION_DURATION_BASE_CLASSES,
        getAnimationQueryMetadata(AnimationDuration.Base),
      ),
      ...getAnimationQueryMetadatas(
        ANIMATION_DURATION_SLOW_CLASSES,
        getAnimationQueryMetadata(AnimationDuration.Slow),
      ),
    ]),
    transition('* => void, * => exit', [
      ...getAnimationQueryMetadatas(
        ANIMATION_DURATION_BASE_CLASSES,
        getAnimationQueryMetadata(AnimationDuration.Base),
      ),
      ...getAnimationQueryMetadatas(
        ANIMATION_DURATION_SLOW_CLASSES,
        getAnimationQueryMetadata(AnimationDuration.Slow),
      ),
    ]),
  ]),
};

// Whitelist dom elements that are allowed to transition with transform
export const WHITELIST_TRANSFORM_ANIMATION_ELEMENTS = ['BUTTON'];
