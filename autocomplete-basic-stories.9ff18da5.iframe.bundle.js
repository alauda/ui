"use strict";(self.webpackChunk_alauda_ui=self.webpackChunk_alauda_ui||[]).push([[1402],{"./stories/autocomplete/basic.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Basic:()=>Basic,__namedExportsOrder:()=>__namedExportsOrder,default:()=>basic_stories});var fesm2022_forms=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs"),animations=__webpack_require__("./node_modules/@angular/platform-browser/fesm2022/animations.mjs"),dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let AutoCompleteBasicComponent=class AutoCompleteBasicComponent{};AutoCompleteBasicComponent=(0,tslib_es6.Cg)([(0,core.Component)({template:'\n    <input\n      aui-input\n      value="basketball"\n      [auiAutocomplete]="suggestions"\n      placeholder="爱好"\n    />\n    <aui-autocomplete #suggestions>\n      <aui-suggestion value="basketball">basketball</aui-suggestion>\n      <aui-suggestion value="swimming">swimming</aui-suggestion>\n      <aui-suggestion value="reading">reading</aui-suggestion>\n      <aui-suggestion value="baking">baking</aui-suggestion>\n      <aui-autocomplete-placeholder>\n        no suggestions\n      </aui-autocomplete-placeholder>\n    </aui-autocomplete>\n  ',changeDetection:core.ChangeDetectionStrategy.OnPush})],AutoCompleteBasicComponent);var src=__webpack_require__("./src/index.ts");const basic_stories={title:"Example/Autocomplete",component:AutoCompleteBasicComponent,decorators:[(0,dist.moduleMetadata)({declarations:[AutoCompleteBasicComponent],imports:[src.rLt,src.x1Z,fesm2022_forms.YN,animations.BrowserAnimationsModule]})]},Basic={name:"Basic"},__namedExportsOrder=["Basic"];Basic.parameters={...Basic.parameters,docs:{...Basic.parameters?.docs,source:{originalSource:"{\n  name: 'Basic'\n}",...Basic.parameters?.docs?.source}}}}}]);