"use strict";(self.webpackChunk_alauda_ui=self.webpackChunk_alauda_ui||[]).push([[4634],{"./stories/tabs/basic.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Basic:()=>Basic,__namedExportsOrder:()=>__namedExportsOrder,default:()=>basic_stories});var fesm2022_forms=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs"),dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let TabsBasicComponent=class TabsBasicComponent{constructor(){this.type="line",this.disabled=!1,this.size="medium",this.tab="a"}static#_=this.propDecorators={type:[{type:core.Input}],disabled:[{type:core.Input}],size:[{type:core.Input}]}};TabsBasicComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"story-basic-tabs",template:'\n    <aui-tab-group\n      [type]="type"\n      [size]="size"\n      [(tab)]="tab"\n    >\n      <aui-tab\n        name="a"\n        label="Tab 0"\n        [disabled]="disabled"\n      >\n        <aui-card> Content 1</aui-card>\n      </aui-tab>\n      <aui-tab\n        name="b"\n        label="Tab 1"\n        [disabled]="disabled"\n      >\n        <aui-card> Content 2</aui-card>\n      </aui-tab>\n      <aui-tab\n        name="c"\n        label="Tab 2"\n        [disabled]="disabled"\n      >\n        <aui-card> Content 3</aui-card>\n      </aui-tab>\n    </aui-tab-group>\n  ',changeDetection:core.ChangeDetectionStrategy.OnPush})],TabsBasicComponent);const basic_component=TabsBasicComponent;var src=__webpack_require__("./src/index.ts");const basic_stories={title:"Example/Tabs",component:basic_component,decorators:[(0,dist.moduleMetadata)({declarations:[basic_component],imports:[src.tmq,src.opy,fesm2022_forms.YN,src.tHK,src.s7D,src.jr_,src.Dw2]})]},Basic={name:"Basic",args:{type:"line",size:"medium",disabled:!1}},__namedExportsOrder=["Basic"];Basic.parameters={...Basic.parameters,docs:{...Basic.parameters?.docs,source:{originalSource:"{\n  name: 'Basic',\n  args: {\n    type: 'line',\n    size: 'medium',\n    disabled: false\n  }\n}",...Basic.parameters?.docs?.source}}}}}]);