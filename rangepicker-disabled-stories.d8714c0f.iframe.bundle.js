"use strict";(self.webpackChunk_alauda_ui=self.webpackChunk_alauda_ui||[]).push([[8113],{"./stories/rangepicker/disabled.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Disabled:()=>Disabled,__namedExportsOrder:()=>__namedExportsOrder,default:()=>disabled_stories});var fesm2022_forms=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs"),animations=__webpack_require__("./node_modules/@angular/platform-browser/fesm2022/animations.mjs"),dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),dayjs_min=__webpack_require__("./node_modules/dayjs/dayjs.min.js"),dayjs_min_default=__webpack_require__.n(dayjs_min);let RangeDisabledComponent=class RangeDisabledComponent{constructor(){this.control=new fesm2022_forms.MJ({value:[dayjs_min_default()(),dayjs_min_default()().add(3,"day")],disabled:!0})}};RangeDisabledComponent=(0,tslib_es6.Cg)([(0,core.Component)({template:'\n    <aui-range-picker\n      [formControl]="control"\n      [showTime]="false"\n    ></aui-range-picker>\n    <br />\n    Form value: {{ control?.value | json }}\n  ',changeDetection:core.ChangeDetectionStrategy.OnPush})],RangeDisabledComponent);var src=__webpack_require__("./src/index.ts");const disabled_stories={title:"Example/RangePicker",component:RangeDisabledComponent,decorators:[(0,dist.moduleMetadata)({declarations:[RangeDisabledComponent],imports:[src.tZU,fesm2022_forms.YN,fesm2022_forms.X1,src.tmq,animations.BrowserAnimationsModule]})]},Disabled={name:"Disabled"},__namedExportsOrder=["Disabled"];Disabled.parameters={...Disabled.parameters,docs:{...Disabled.parameters?.docs,source:{originalSource:"{\n  name: 'Disabled'\n}",...Disabled.parameters?.docs?.source}}}}}]);