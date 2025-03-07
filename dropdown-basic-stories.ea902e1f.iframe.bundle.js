"use strict";(self.webpackChunk_alauda_ui=self.webpackChunk_alauda_ui||[]).push([[6801],{"./stories/dropdown/basic.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Basic:()=>Basic,__namedExportsOrder:()=>__namedExportsOrder,default:()=>basic_stories});var animations=__webpack_require__("./node_modules/@angular/platform-browser/fesm2022/animations.mjs"),dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let DropdownBasicComponent=class DropdownBasicComponent{};DropdownBasicComponent=(0,tslib_es6.Cg)([(0,core.Component)({template:'\n    <button\n      aui-button="primary"\n      [plain]="true"\n      [auiDropdown]="menu"\n    >\n      dropdown\n      <aui-icon icon="angle_down"></aui-icon>\n    </button>\n    <ng-template #menu>\n      <aui-menu>\n        <aui-menu-item>默认按钮</aui-menu-item>\n        <aui-menu-item type="success">成功按钮</aui-menu-item>\n        <aui-menu-item type="warning">警告按钮</aui-menu-item>\n        <aui-menu-item type="danger">危险按钮</aui-menu-item>\n        <aui-menu-item [disabled]="true">禁用按钮</aui-menu-item>\n      </aui-menu>\n    </ng-template>\n  ',changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!1})],DropdownBasicComponent);const basic_component=DropdownBasicComponent;var src=__webpack_require__("./src/index.ts");const basic_stories={title:"Example/Dropdown",component:basic_component,decorators:[(0,dist.moduleMetadata)({declarations:[basic_component],imports:[src.tmq,src.opy,src.krp,animations.BrowserAnimationsModule]})]},Basic={name:"Basic"},__namedExportsOrder=["Basic"];Basic.parameters={...Basic.parameters,docs:{...Basic.parameters?.docs,source:{originalSource:"{\n  name: 'Basic'\n}",...Basic.parameters?.docs?.source}}}}}]);