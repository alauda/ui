"use strict";(self.webpackChunk_alauda_ui=self.webpackChunk_alauda_ui||[]).push([[6997],{"./stories/select/group.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Group:()=>Group,__namedExportsOrder:()=>__namedExportsOrder,default:()=>group_stories});var fesm2022_forms=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs"),animations=__webpack_require__("./node_modules/@angular/platform-browser/fesm2022/animations.mjs"),dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let SelectGroupComponent=class SelectGroupComponent{constructor(){this.arr=Array.from({length:5}).fill(null).map(((_,i)=>i+1)),this.value={key:Symbol("special"),value:"option11"},this.labelFn=option=>option?.value,this.trackFn=val=>val&&val.key||val}};SelectGroupComponent=(0,tslib_es6.Cg)([(0,core.Component)({template:'\n    <aui-select\n      [(ngModel)]="value"\n      [labelFn]="labelFn"\n      [trackFn]="trackFn"\n    >\n      <aui-option-group *ngFor="let i of arr">\n        <div\n          auiOptionGroupTitle\n          *ngIf="i !== 1"\n        >\n          group {{ i }}\n        </div>\n        <aui-option\n          *ngFor="let j of arr"\n          [label]="\'option\' + (arr.length * i + j)"\n          [value]="{ key: \'option\' + (arr.length * i + j) }"\n        >\n          <aui-icon icon="sun"></aui-icon>\n          option {{ arr.length * i + j }}\n        </aui-option>\n      </aui-option-group>\n      <aui-option-placeholder>Empty</aui-option-placeholder>\n    </aui-select>\n    <br />\n    <br />\n    value: {{ value | json }}\n  ',changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!1})],SelectGroupComponent);const group_component=SelectGroupComponent;var src=__webpack_require__("./src/index.ts");const group_stories={title:"Example/Select",component:group_component,decorators:[(0,dist.moduleMetadata)({declarations:[group_component],imports:[fesm2022_forms.YN,src.pyx,src.opy,animations.BrowserAnimationsModule]})]},Group={name:"Group"},__namedExportsOrder=["Group"];Group.parameters={...Group.parameters,docs:{...Group.parameters?.docs,source:{originalSource:"{\n  name: 'Group'\n}",...Group.parameters?.docs?.source}}}}}]);