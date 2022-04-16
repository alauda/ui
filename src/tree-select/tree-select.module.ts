import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconModule } from '../icon';
import { InputModule } from '../input';
import { SharedModule } from '../shared/shared.module';
import { TooltipModule } from '../tooltip';

import { TreeNodePlaceholderComponent } from './tree-node-placeholder.component';
import {
  TreeNodeComponent,
  TreeSelectComponent,
} from './tree-select.component';

@NgModule({
  imports: [CommonModule, TooltipModule, IconModule, InputModule, SharedModule],
  declarations: [
    TreeSelectComponent,
    TreeNodeComponent,
    TreeNodePlaceholderComponent,
  ],
  exports: [
    TreeSelectComponent,
    TreeNodeComponent,
    TreeNodePlaceholderComponent,
  ],
})
export class TreeSelectModule {}
