"use strict";(self.webpackChunk_alauda_ui=self.webpackChunk_alauda_ui||[]).push([[1931],{"./stories/dropdown/template.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Template:()=>Template,__namedExportsOrder:()=>__namedExportsOrder,default:()=>template_stories});var animations=__webpack_require__("./node_modules/@angular/platform-browser/fesm2022/animations.mjs"),dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let DropdownTemplateComponent=class DropdownTemplateComponent{};DropdownTemplateComponent=(0,tslib_es6.Cg)([(0,core.Component)({template:'\n    <button\n      aui-button="primary"\n      [plain]="true"\n      [auiDropdown]="menu"\n      [auiDropdownContext]="{ canDelete: false }"\n    >\n      dropdown 1\n      <aui-icon icon="angle_down"></aui-icon>\n    </button>\n    <button\n      aui-button="primary"\n      [plain]="true"\n      [auiDropdown]="menu"\n      [auiDropdownContext]="{ canDelete: true }"\n    >\n      dropdown 2\n      <aui-icon icon="angle_down"></aui-icon>\n    </button>\n    <ng-template\n      #menu\n      let-canDelete="canDelete"\n    >\n      <aui-menu>\n        <aui-menu-item>创建</aui-menu-item>\n        <aui-menu-item>更新</aui-menu-item>\n        <aui-menu-item *ngIf="canDelete">删除</aui-menu-item>\n      </aui-menu>\n    </ng-template>\n  ',changeDetection:core.ChangeDetectionStrategy.OnPush})],DropdownTemplateComponent);const template_component=DropdownTemplateComponent;var src=__webpack_require__("./src/index.ts");const template_stories={title:"Example/Dropdown",component:template_component,decorators:[(0,dist.moduleMetadata)({declarations:[template_component],imports:[src.tmq,src.opy,src.krp,animations.BrowserAnimationsModule]})]},Template={name:"Menu Template"},__namedExportsOrder=["Template"];Template.parameters={...Template.parameters,docs:{...Template.parameters?.docs,source:{originalSource:"{\n  name: 'Menu Template'\n}",...Template.parameters?.docs?.source}}}}}]);