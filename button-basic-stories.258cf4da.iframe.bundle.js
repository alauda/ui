"use strict";(self.webpackChunk_alauda_ui=self.webpackChunk_alauda_ui||[]).push([[3358],{"./stories/button/basic.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Basic:()=>Basic,__namedExportsOrder:()=>__namedExportsOrder,default:()=>basic_stories});var dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let ButtonBasicComponent=class ButtonBasicComponent{constructor(){this.plain=!1,this.round=!1,this.disabled=!1,this.loading=!1,this.size="medium"}static#_=this.propDecorators={plain:[{type:core.Input}],round:[{type:core.Input}],disabled:[{type:core.Input}],loading:[{type:core.Input}],size:[{type:core.Input}]}};ButtonBasicComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"story-basic-button",template:'\n    <button\n      aui-button\n      [plain]="plain"\n      [round]="round"\n      [disabled]="disabled"\n      [loading]="loading"\n      [size]="size"\n    >\n      默认按钮\n    </button>\n    <button\n      aui-button="primary"\n      [plain]="plain"\n      [round]="round"\n      [disabled]="disabled"\n      [loading]="loading"\n      [size]="size"\n    >\n      主要按钮\n    </button>\n    <button\n      aui-button="success"\n      [plain]="plain"\n      [round]="round"\n      [disabled]="disabled"\n      [loading]="loading"\n      [size]="size"\n    >\n      成功按钮\n    </button>\n    <button\n      aui-button="warning"\n      [plain]="plain"\n      [round]="round"\n      [disabled]="disabled"\n      [loading]="loading"\n      [size]="size"\n    >\n      警告按钮\n    </button>\n    <button\n      aui-button="danger"\n      [plain]="plain"\n      [round]="round"\n      [disabled]="disabled"\n      [loading]="loading"\n      [size]="size"\n    >\n      危险按钮\n    </button>\n  ',changeDetection:core.ChangeDetectionStrategy.OnPush})],ButtonBasicComponent);const basic_component=ButtonBasicComponent;var src=__webpack_require__("./src/index.ts");const basic_stories={title:"Example/Button",component:basic_component,decorators:[(0,dist.moduleMetadata)({declarations:[basic_component],imports:[src.tmq,src.opy]})]},Basic={name:"Basic",args:{plain:!1,round:!1,disabled:!1,loading:!1,size:"medium"}},__namedExportsOrder=["Basic"];Basic.parameters={...Basic.parameters,docs:{...Basic.parameters?.docs,source:{originalSource:"{\n  name: 'Basic',\n  args: {\n    plain: false,\n    round: false,\n    disabled: false,\n    loading: false,\n    size: 'medium'\n  }\n}",...Basic.parameters?.docs?.source}}}}}]);