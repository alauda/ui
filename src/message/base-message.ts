import { Overlay } from '@angular/cdk/overlay';
import {
  ComponentPortal,
  ComponentType,
  DomPortalOutlet,
} from '@angular/cdk/portal';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  Injector,
} from '@angular/core';

import { MessageWrapperComponent } from './message-wrapper.component';
import { MessageComponent } from './message.component';
import {
  MessageConfig,
  MessageGlobalConfig,
  MessageType,
} from './message.config';

export abstract class BaseMessage<
  Wrapper extends MessageWrapperComponent,
  Component extends MessageComponent,
  Config extends MessageConfig,
> {
  wrapperInstance: { elementRef: ElementRef<HTMLElement> };
  componentRefs: Array<ComponentRef<Component>> = [];

  constructor(
    protected overlay: Overlay,
    protected injector: Injector,
    protected applicationRef: ApplicationRef,
    protected cfr: ComponentFactoryResolver,
    protected overlayPaneClassName: string,
    protected wrapperClass: ComponentType<Wrapper>,
    protected componentClass: ComponentType<Component>,
    protected globalConfig: MessageGlobalConfig,
  ) {
    this.initWrapperContainer();
  }

  create(config: Config): ComponentRef<Component>;
  create(config: MessageType, content: string): ComponentRef<Component>;
  create(config: Config | MessageType, content?: string) {
    const type = content ? (config as MessageType) : (config as Config).type;
    const mergedConfig = {
      duration:
        typeof this.globalConfig.duration === 'number'
          ? this.globalConfig.duration
          : this.globalConfig.duration[type],
      ...(content
        ? { type: config as MessageType, content }
        : (config as Config)),
    } as Config;

    this.removeNeedless(mergedConfig.id);

    const componentRef = this.initComponentRef(mergedConfig);
    componentRef.instance.afterClosed.subscribe(() => {
      componentRef.destroy();
      this.remove(componentRef.instance.uniqueId);
    });
    this.componentRefs.push(componentRef);
    return componentRef;
  }

  createType(type: MessageType, option: Config | string) {
    return typeof option === 'string'
      ? this.create(type, option)
      : this.create({ ...option, type } as Config);
  }

  success(option: Config | string): ComponentRef<Component> {
    return this.createType(MessageType.Success, option);
  }

  warning(option: Config | string): ComponentRef<Component> {
    return this.createType(MessageType.Warning, option);
  }

  error(option: Config | string): ComponentRef<Component> {
    return this.createType(MessageType.Error, option);
  }

  info(option: Config | string): ComponentRef<Component> {
    return this.createType(MessageType.Info, option);
  }

  remove(id: string | number) {
    const index = this.componentRefs.findIndex(
      ref => ref.instance.uniqueId === id || ref.instance.id === id,
    );
    if (index >= 0) {
      this.componentRefs[index].instance.remove();
      this.componentRefs.splice(index, 1);
    }
  }

  removeAll() {
    this.componentRefs.forEach(ref => {
      ref.instance.remove();
    });
    this.componentRefs = [];
  }

  protected initWrapperContainer() {
    this.wrapperInstance = this.overlay
      .create({
        panelClass: this.overlayPaneClassName,
      })
      .attach(new ComponentPortal(this.wrapperClass)).instance;
  }

  protected initComponentRef(config: Config): ComponentRef<Component> {
    const portalHost = new DomPortalOutlet(
      this.wrapperInstance.elementRef.nativeElement,
      this.cfr,
      this.applicationRef,
      this.injector,
    );
    const componentRef = portalHost.attachComponentPortal(
      new ComponentPortal(this.componentClass),
    );
    componentRef.instance.setConfig(config);
    return componentRef;
  }

  protected removeNeedless(id: string | number) {
    if (id) {
      this.remove(id);
    }
    if (
      this.globalConfig.maxStack &&
      this.componentRefs.length >= this.globalConfig.maxStack
    ) {
      this.componentRefs
        .slice(0, this.componentRefs.length - this.globalConfig.maxStack + 1)
        .forEach(ref => this.remove(ref.instance.uniqueId));
    }
  }
}
