"use strict";(self.webpackChunk_alauda_ui=self.webpackChunk_alauda_ui||[]).push([[9738],{"./stories/dropdown/group.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Group:()=>Group,__namedExportsOrder:()=>__namedExportsOrder,default:()=>group_stories});var animations=__webpack_require__("./node_modules/@angular/platform-browser/fesm2022/animations.mjs"),dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let DropdownGroupComponent=class DropdownGroupComponent{};DropdownGroupComponent=(0,tslib_es6.Cg)([(0,core.Component)({template:'\n    <button\n      aui-button="primary"\n      [plain]="true"\n      [auiDropdown]="menu"\n    >\n      dropdown\n      <aui-icon icon="angle_down"></aui-icon>\n    </button>\n    <ng-template #menu>\n      <aui-menu>\n        <aui-menu-group>\n          <span auiMenuGroupTitle>分组一</span>\n          <aui-menu-item>操作一</aui-menu-item>\n          <aui-menu-item>操作二</aui-menu-item>\n        </aui-menu-group>\n        <aui-menu-group>\n          <span auiMenuGroupTitle>分组二</span>\n          <aui-menu-item>操作三</aui-menu-item>\n          <aui-menu-item>操作四</aui-menu-item>\n        </aui-menu-group>\n        <aui-menu-group>\n          <aui-menu-item>操作五</aui-menu-item>\n          <aui-menu-item>操作六</aui-menu-item>\n        </aui-menu-group>\n      </aui-menu>\n    </ng-template>\n  ',changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!1})],DropdownGroupComponent);const group_component=DropdownGroupComponent;var src=__webpack_require__("./src/index.ts");const group_stories={title:"Example/Dropdown",component:group_component,decorators:[(0,dist.moduleMetadata)({declarations:[group_component],imports:[src.tmq,src.opy,src.krp,animations.BrowserAnimationsModule]})]},Group={name:"Group"},__namedExportsOrder=["Group"];Group.parameters={...Group.parameters,docs:{...Group.parameters?.docs,source:{originalSource:"{\n  name: 'Group'\n}",...Group.parameters?.docs?.source}}}}}]);