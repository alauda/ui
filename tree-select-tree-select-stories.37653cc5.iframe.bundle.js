"use strict";(self.webpackChunk_alauda_ui=self.webpackChunk_alauda_ui||[]).push([[4646],{"./stories/tree-select/tree-select.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,default:()=>tree_select_stories,treeSelect:()=>treeSelect});var fesm2022_forms=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs"),animations=__webpack_require__("./node_modules/@angular/platform-browser/fesm2022/animations.mjs"),dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let TreeSelectComponent=class TreeSelectComponent{constructor(){this.filterable=!0,this.clearable=!0,this.disabled=!1,this.loading=!1,this.placeholder="placeholder",this.leafOnly=!1,this.value="b-1",this.treeNodes=[{label:"a",value:"a",expanded:!1,children:[{label:"a-1",value:"a-1"},{label:"a-2",value:"a-2",children:[{label:"a-2-1",value:"a-2-1"}]},{label:"a-3",value:"a-3",disabled:!0},{label:"a-4",value:"a-4",disabled:!0,children:[{label:"a-4-1",value:"a-4-1"}]}]},{label:"b",value:"b",expanded:!0,children:[{label:"b-1",value:"b-1"},{label:"b-2",value:"b-2"},{label:"b-3",value:"b-3"},{label:"b-4",value:"b-4"}]},{label:"c",value:"c",expanded:!0,icon:"folder",expandedIcon:"folder_open",children:[{label:"c-0",value:"c-0",icon:"folder",children:[{label:"c-0-1",value:"c-0-1",icon:"file"},{label:"c-0-2",value:"c-0-2",icon:"file"}]},{label:"c-1",value:"c-1",icon:"folder"},{label:"c-2",value:"c-2",icon:"file"}]},{label:"d",value:"d",expanded:!0,icon:"file",loading:!0,children:[]}]}static#_=this.propDecorators={filterable:[{type:core.Input}],clearable:[{type:core.Input}],disabled:[{type:core.Input}],loading:[{type:core.Input}],placeholder:[{type:core.Input}],leafOnly:[{type:core.Input}]}};TreeSelectComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"tree-select",template:'\n    {{ value | json }}\n    <aui-tree-select\n      [(value)]="value"\n      [nodesData]="treeNodes"\n      [disabled]="disabled"\n      [loading]="loading"\n      [clearable]="clearable"\n      [filterable]="filterable"\n      [placeholder]="placeholder"\n      [leafOnly]="leafOnly"\n    >\n      <aui-tree-node-placeholder>None</aui-tree-node-placeholder>\n    </aui-tree-select>\n  ',changeDetection:core.ChangeDetectionStrategy.OnPush})],TreeSelectComponent);const tree_select_component=TreeSelectComponent;var src=__webpack_require__("./src/index.ts");const tree_select_stories={title:"Example/TreeSelect",component:tree_select_component,render:args=>({props:args}),decorators:[(0,dist.moduleMetadata)({declarations:[tree_select_component],imports:[fesm2022_forms.YN,src.VG,animations.BrowserAnimationsModule]})]},treeSelect={name:"tree select",args:{filterable:!0,clearable:!0,disabled:!1,loading:!1,placeholder:"placeholder",leafOnly:!1}},__namedExportsOrder=["treeSelect"];treeSelect.parameters={...treeSelect.parameters,docs:{...treeSelect.parameters?.docs,source:{originalSource:"{\n  name: 'tree select',\n  args: {\n    filterable: true,\n    clearable: true,\n    disabled: false,\n    loading: false,\n    placeholder: 'placeholder',\n    leafOnly: false\n  }\n}",...treeSelect.parameters?.docs?.source}}}}}]);