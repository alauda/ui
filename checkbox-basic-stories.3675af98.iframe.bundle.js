"use strict";(self.webpackChunk_alauda_ui=self.webpackChunk_alauda_ui||[]).push([[3297],{"./stories/checkbox/basic.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Basic:()=>Basic,__namedExportsOrder:()=>__namedExportsOrder,default:()=>basic_stories});var fesm2022_forms=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs"),dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let CheckboxBasicComponent=class CheckboxBasicComponent{constructor(){this.type="label",this.disabled=!1,this.model={a:!0,b:!1}}static#_=this.propDecorators={type:[{type:core.Input}],disabled:[{type:core.Input}]}};CheckboxBasicComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"story-checkbox-basic",template:'\n    value: {{ model | json }}\n    <br />\n    <aui-checkbox\n      [type]="type"\n      [disabled]="disabled"\n      [(ngModel)]="model.a"\n      >选项A</aui-checkbox\n    >\n    <aui-checkbox\n      [type]="type"\n      [disabled]="disabled"\n      [(ngModel)]="model.b"\n      >选项B</aui-checkbox\n    >\n  ',changeDetection:core.ChangeDetectionStrategy.OnPush})],CheckboxBasicComponent);const basic_component=CheckboxBasicComponent;var src=__webpack_require__("./src/index.ts");const basic_stories={title:"Example/Checkbox",component:basic_component,decorators:[(0,dist.moduleMetadata)({declarations:[basic_component],imports:[fesm2022_forms.YN,src.q4]})]},Basic={name:"Basic",args:{type:"label",disabled:!1}},__namedExportsOrder=["Basic"];Basic.parameters={...Basic.parameters,docs:{...Basic.parameters?.docs,source:{originalSource:"{\n  name: 'Basic',\n  args: {\n    type: 'label',\n    disabled: false\n  }\n}",...Basic.parameters?.docs?.source}}}}}]);