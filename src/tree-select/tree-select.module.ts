import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconModule } from '../icon/public-api';
import { InputModule } from '../input/public-api';
import { TooltipModule } from '../tooltip/public-api';

import { TreeNodePlaceholderComponent } from './tree-node-placeholder.component';
import { TreeNodeComponent } from './tree-node/tree-node.component';
import { TreeSelectComponent } from './tree-select.component';

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
