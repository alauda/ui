"use strict";(self.webpackChunk_alauda_ui=self.webpackChunk_alauda_ui||[]).push([[3437],{"./stories/radio/basic.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Basic:()=>Basic,__namedExportsOrder:()=>__namedExportsOrder,default:()=>basic_stories});var fesm2022_forms=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs"),dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let RadioBasicComponent=class RadioBasicComponent{constructor(){this.plain=!1,this.disabled=!1,this.direction="row",this.size="medium",this.model="1"}static#_=this.propDecorators={plain:[{type:core.Input}],disabled:[{type:core.Input}],direction:[{type:core.Input}],size:[{type:core.Input}]}};RadioBasicComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"story-basic-radio",template:'\n    <p>aui-radio</p>\n    <aui-radio-group\n      [direction]="direction"\n      [(ngModel)]="model"\n      [size]="size"\n    >\n      <aui-radio\n        value="1"\n        [disabled]="disabled"\n        >选项一</aui-radio\n      >\n      <aui-radio\n        value="2"\n        [disabled]="disabled"\n        >选项二</aui-radio\n      >\n      <aui-radio\n        value="3"\n        [disabled]="disabled"\n        >选项三</aui-radio\n      >\n    </aui-radio-group>\n\n    <p>aui-radio-button</p>\n    <aui-radio-group\n      [direction]="direction"\n      [plain]="plain"\n      [(ngModel)]="model"\n      [size]="size"\n    >\n      <aui-radio-button\n        value="1"\n        [disabled]="disabled"\n        >选项一</aui-radio-button\n      >\n      <aui-radio-button\n        value="2"\n        [disabled]="disabled"\n        >选项二</aui-radio-button\n      >\n      <aui-radio-button\n        value="3"\n        [disabled]="disabled"\n        >选项三</aui-radio-button\n      >\n    </aui-radio-group>\n  ',changeDetection:core.ChangeDetectionStrategy.OnPush})],RadioBasicComponent);const basic_component=RadioBasicComponent;var src=__webpack_require__("./src/index.ts");const basic_stories={title:"Example/Radio",component:basic_component,decorators:[(0,dist.moduleMetadata)({declarations:[basic_component],imports:[fesm2022_forms.YN,src.s7D]})]},Basic={name:"Basic",args:{plain:!1,disabled:!1,direction:"row",size:"medium"}},__namedExportsOrder=["Basic"];Basic.parameters={...Basic.parameters,docs:{...Basic.parameters?.docs,source:{originalSource:"{\n  name: 'Basic',\n  args: {\n    plain: false,\n    disabled: false,\n    direction: 'row',\n    size: 'medium'\n  }\n}",...Basic.parameters?.docs?.source}}}}}]);