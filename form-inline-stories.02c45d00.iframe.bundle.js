"use strict";(self.webpackChunk_alauda_ui=self.webpackChunk_alauda_ui||[]).push([[7837],{"./stories/form/inline.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Inline:()=>Inline,__namedExportsOrder:()=>__namedExportsOrder,default:()=>inline_stories});var fesm2022_forms=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs"),dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let FormInlineComponent=class FormInlineComponent{};FormInlineComponent=(0,tslib_es6.Cg)([(0,core.Component)({template:'\n    <form\n      #form="ngForm"\n      auiForm\n      [auiFormInline]="true"\n      [auiFormEmptyAddon]="true"\n    >\n      <aui-form-item [width]="contentWidth">\n        <label auiFormItemLabel>姓名</label>\n        <input\n          auiFormItemControl\n          name="name"\n          #name="ngModel"\n          aui-input\n          required\n          minlength="3"\n          [(ngModel)]="value1"\n        />\n        <div\n          auiFormItemError\n          *ngIf="name.errors?.required"\n        >\n          required\n        </div>\n        <div\n          auiFormItemError\n          *ngIf="name.errors?.minlength"\n        >\n          minlength: 3\n        </div>\n        <div auiFormItemHint>input your name</div>\n        <div auiFormItemAddon>\n          <aui-icon\n            icon="info_circle_s"\n            background="circle"\n          ></aui-icon>\n        </div>\n      </aui-form-item>\n      <aui-form-item [width]="contentWidth">\n        <label auiFormItemLabel>性别</label>\n        <aui-select\n          auiFormItemControl\n          name="sex"\n          #sex="ngModel"\n          required\n          [(ngModel)]="value2"\n        >\n          <aui-option value="test">test</aui-option>\n        </aui-select>\n        <div auiFormItemAddon>\n          <aui-icon\n            icon="info_circle_s"\n            background="circle"\n          ></aui-icon>\n        </div>\n      </aui-form-item>\n    </form>\n  ',changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!1})],FormInlineComponent);const inline_component=FormInlineComponent;var src=__webpack_require__("./src/index.ts");const inline_stories={title:"Example/Form",component:inline_component,decorators:[(0,dist.moduleMetadata)({declarations:[inline_component],imports:[fesm2022_forms.YN,src.tHK,src.x1Z,src.opy,src.pyx,src.tmq,src.No7,src.s7D,src.q4]})]},Inline={name:"Inline"},__namedExportsOrder=["Inline"];Inline.parameters={...Inline.parameters,docs:{...Inline.parameters?.docs,source:{originalSource:"{\n  name: 'Inline'\n}",...Inline.parameters?.docs?.source}}}}}]);