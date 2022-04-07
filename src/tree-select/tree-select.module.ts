import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconModule } from '../icon';
import { InputModule } from '../input';
import { TooltipModule } from '../tooltip';

import { TreeNodePlaceholderComponent } from './tree-node-placeholder.component';
import {
  TreeNodeComponent,
  TreeSelectComponent,
} from './tree-select.component';

@NgModule({
  imports: [CommonModule, TooltipModule, IconModule, InputModule],
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
