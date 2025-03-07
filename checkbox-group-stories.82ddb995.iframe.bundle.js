"use strict";(self.webpackChunk_alauda_ui=self.webpackChunk_alauda_ui||[]).push([[3322],{"./stories/checkbox/group.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Group:()=>Group,__namedExportsOrder:()=>__namedExportsOrder,default:()=>group_stories});var fesm2022_forms=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs"),dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let CheckboxGroupComponent=class CheckboxGroupComponent{constructor(){this.direction="row",this.model=["label1"],this.checkAll=!1,this.indeterminate=!0}handleCheckAllChange(val){this.model=val?["label1","label2","label3"]:[],this.indeterminate=!1}handleCheckBoxGroupChange(value){const checkedCount=value.length;this.checkAll=3===checkedCount,this.indeterminate=checkedCount>0&&checkedCount<3}static{this.propDecorators={direction:[{type:core.Input}]}}};CheckboxGroupComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"story-checkbox-group",template:'\n    value: {{ model }}\n    <br />\n    <aui-checkbox\n      label="label"\n      [(ngModel)]="checkAll"\n      [indeterminate]="indeterminate"\n      (valueChange)="handleCheckAllChange($event)"\n    >\n      全选\n    </aui-checkbox>\n    <br />\n    <aui-checkbox-group\n      [(ngModel)]="model"\n      (valueChange)="handleCheckBoxGroupChange($event)"\n    >\n      <aui-checkbox label="label1">选项一</aui-checkbox>\n      <aui-checkbox label="label2">选项二</aui-checkbox>\n      <aui-checkbox label="label3">选项三</aui-checkbox>\n    </aui-checkbox-group>\n  ',changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!1})],CheckboxGroupComponent);const group_component=CheckboxGroupComponent;var src=__webpack_require__("./src/index.ts");const group_stories={title:"Example/Checkbox",component:group_component,decorators:[(0,dist.moduleMetadata)({declarations:[group_component],imports:[fesm2022_forms.YN,src.q4]})]},Group={name:"Group",args:{direction:"row"}},__namedExportsOrder=["Group"];Group.parameters={...Group.parameters,docs:{...Group.parameters?.docs,source:{originalSource:"{\n  name: 'Group',\n  args: {\n    direction: 'row'\n  }\n}",...Group.parameters?.docs?.source}}}}}]);