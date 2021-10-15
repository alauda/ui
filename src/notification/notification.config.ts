import { ComponentType } from '@angular/cdk/portal';
import { InjectionToken, TemplateRef } from '@angular/core';

import { MessageConfig, MessageGlobalConfig } from '../message/public-api';

export interface NotificationConfig extends MessageConfig {
  title?: string;
  contentRef?: TemplateRef<any> | ComponentType<void>;
  footerRef?: TemplateRef<any>;
  context?: unknown;
  customClass?: string;
}

export type NotificationGlobalConfig = MessageGlobalConfig;

export const NOTIFICATION_CONFIG = new InjectionToken<NotificationGlobalConfig>(
  'NOTIFICATION_CONFIG',
);

export const NOTIFICATION_DEFAULT_CONFIG = {
  duration: 6000,
  maxStack: 8,
};
