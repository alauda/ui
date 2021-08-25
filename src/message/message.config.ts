import { InjectionToken } from '@angular/core';

export enum MessageType {
  Error = 'error',
  Success = 'success',
  Warning = 'warning',
  Info = 'info',
}

/**
 * messageOptions: contains Basic configuration
 * Just for some containers like Message-Container
 * Detailed document： http://confluence.alaudatech.com/pages/viewpage.action?pageId=23383163
 */

export class MessageConfig {
  /**
   * the message type
   */
  type?: MessageType;

  /**
   * The id of this message, The same ID can only have one at the same time
   */
  id?: string | number;

  /**
   * automatically shut down after a few seconds, if <= 0 ,non automatic closure
   */
  duration?: number;

  /**
   * message content
   */
  content?: string;
}

export interface MessageGlobalConfig {
  /**
   * max instance in one time
   */
  maxStack: number;
  duration: number | { [key in MessageType]: number };
}

export const MESSAGE_CONFIG = new InjectionToken<MessageGlobalConfig>(
  'MESSAGE_CONFIG',
);

export const MESSAGE_DEFAULT_CONFIG = {
  duration: 3000,
  maxStack: 8,
};
