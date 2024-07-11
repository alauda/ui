import { ComponentType } from '@angular/cdk/portal';
import { InjectionToken, TemplateRef } from '@angular/core';

import { MessageConfig, MessageGlobalConfig } from '../message';

export interface NotificationConfig extends MessageConfig {
  title?: string;
  contentRef?: ComponentType<void> | TemplateRef<any>;
  footerRef?: TemplateRef<any>;
  context?: unknown;
  customClass?: string;
}

// eslint-disable-next-line no-restricted-syntax
export type NotificationGlobalConfig = MessageGlobalConfig;

export const NOTIFICATION_CONFIG = new InjectionToken<NotificationGlobalConfig>(
  'NOTIFICATION_CONFIG',
);

export const NOTIFICATION_DEFAULT_CONFIG = {
  duration: 6000,
  maxStack: 8,
};
