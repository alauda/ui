"use strict";(self.webpackChunk_alauda_ui=self.webpackChunk_alauda_ui||[]).push([[1883],{"./stories/table/data.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{R:()=>DATA_SOURCE});const DATA_SOURCE=[{id:1,name:"element1",displayName:"Element One",value:5},{id:2,name:"element1",displayName:"Element Two",value:8},{id:3,name:"element1",displayName:"Element Three",value:2},{id:4,name:"element1",displayName:"Element Four",value:9},{id:5,name:"element1",displayName:"Element Five",value:3},{id:6,name:"element1",displayName:"Element Six",value:4}]},"./stories/table/sticky-header.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{StickyHeader:()=>StickyHeader,__namedExportsOrder:()=>__namedExportsOrder,default:()=>sticky_header_stories});var animations=__webpack_require__("./node_modules/@angular/platform-browser/fesm2022/animations.mjs"),dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),data=__webpack_require__("./stories/table/data.ts");let StickyHeadersDemoComponent=class StickyHeadersDemoComponent{constructor(){this.dataSource=[...data.R]}};StickyHeadersDemoComponent=(0,tslib_es6.Cg)([(0,core.Component)({template:'\n    <div auiTableScrollWrapper="300px">\n      <aui-table\n        auiTableScrollable\n        [dataSource]="dataSource"\n      >\n        <ng-container auiTableColumnDef="id">\n          <aui-table-header-cell *auiTableHeaderCellDef>\n            No.\n          </aui-table-header-cell>\n          <aui-table-cell *auiTableCellDef="let item">\n            <div>{{ item.id }}</div>\n          </aui-table-cell>\n        </ng-container>\n        <ng-container auiTableColumnDef="name">\n          <aui-table-header-cell *auiTableHeaderCellDef>\n            Name\n          </aui-table-header-cell>\n          <aui-table-cell *auiTableCellDef="let item">\n            <div>{{ item.name }}</div>\n          </aui-table-cell>\n        </ng-container>\n        <ng-container auiTableColumnDef="value">\n          <aui-table-header-cell *auiTableHeaderCellDef>\n            Value\n          </aui-table-header-cell>\n          <aui-table-cell *auiTableCellDef="let item">\n            {{ item.value }}\n          </aui-table-cell>\n        </ng-container>\n        <aui-table-header-row\n          *auiTableHeaderRowDef="[\'id\', \'name\', \'value\']; sticky: true"\n        ></aui-table-header-row>\n        <aui-table-row\n          *auiTableRowDef="let row; columns: [\'id\', \'name\', \'value\']"\n        ></aui-table-row>\n      </aui-table>\n    </div>\n  ',changeDetection:core.ChangeDetectionStrategy.OnPush})],StickyHeadersDemoComponent);var src=__webpack_require__("./src/index.ts");const sticky_header_stories={title:"Example/Table",component:StickyHeadersDemoComponent,decorators:[(0,dist.moduleMetadata)({declarations:[StickyHeadersDemoComponent],imports:[animations.BrowserAnimationsModule,src.du3,src.opy,src.E9V,src.bGq,src.tmq]})]},StickyHeader={name:"Sticky Header"},__namedExportsOrder=["StickyHeader"];StickyHeader.parameters={...StickyHeader.parameters,docs:{...StickyHeader.parameters?.docs,source:{originalSource:"{\n  name: 'Sticky Header'\n}",...StickyHeader.parameters?.docs?.source}}}}}]);