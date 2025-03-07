"use strict";(self.webpackChunk_alauda_ui=self.webpackChunk_alauda_ui||[]).push([[8920],{"./stories/autocomplete/disabled.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Disabled:()=>Disabled,__namedExportsOrder:()=>__namedExportsOrder,default:()=>disabled_stories});var fesm2022_forms=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs"),animations=__webpack_require__("./node_modules/@angular/platform-browser/fesm2022/animations.mjs"),dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let AutoCompleteDisabledComponent=class AutoCompleteDisabledComponent{};AutoCompleteDisabledComponent=(0,tslib_es6.Cg)([(0,core.Component)({template:'\n    <button (click)="disabled = !disabled">\n      {{ disabled ? \'Enable\' : \'Disable\' }}\n    </button>\n    <br />\n    <br />\n    <aui-tags-input\n      name="fruit"\n      [(value)]="value"\n      [auiAutocomplete]="suggestions"\n      placeholder="水果"\n      [disabled]="disabled"\n    ></aui-tags-input>\n    <aui-autocomplete #suggestions>\n      <aui-suggestion value="apple">apple</aui-suggestion>\n      <aui-suggestion value="banana">banana</aui-suggestion>\n      <aui-suggestion value="peach">peach</aui-suggestion>\n      <aui-suggestion value="grapes">grapes</aui-suggestion>\n      <aui-suggestion value="orange">orange</aui-suggestion>\n      <aui-autocomplete-placeholder>\n        no suggestions\n      </aui-autocomplete-placeholder>\n    </aui-autocomplete>\n  ',changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!1})],AutoCompleteDisabledComponent);var src=__webpack_require__("./src/index.ts");const disabled_stories={title:"Example/Autocomplete",component:AutoCompleteDisabledComponent,decorators:[(0,dist.moduleMetadata)({declarations:[AutoCompleteDisabledComponent],imports:[src.rLt,src.x1Z,fesm2022_forms.YN,animations.BrowserAnimationsModule]})]},Disabled={name:"Disabled"},__namedExportsOrder=["Disabled"];Disabled.parameters={...Disabled.parameters,docs:{...Disabled.parameters?.docs,source:{originalSource:"{\n  name: 'Disabled'\n}",...Disabled.parameters?.docs?.source}}}}}]);