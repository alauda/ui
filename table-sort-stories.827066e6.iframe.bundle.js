(self.webpackChunk_alauda_ui=self.webpackChunk_alauda_ui||[]).push([[3642],{"./stories/table/data.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{R:()=>DATA_SOURCE});const DATA_SOURCE=[{id:1,name:"element1",displayName:"Element One",value:5},{id:2,name:"element1",displayName:"Element Two",value:8},{id:3,name:"element1",displayName:"Element Three",value:2},{id:4,name:"element1",displayName:"Element Four",value:9},{id:5,name:"element1",displayName:"Element Five",value:3},{id:6,name:"element1",displayName:"Element Six",value:4}]},"./stories/table/sort.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Sort:()=>Sort,__namedExportsOrder:()=>__namedExportsOrder,default:()=>sort_stories});var animations=__webpack_require__("./node_modules/@angular/platform-browser/fesm2022/animations.mjs"),dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),sort_componentngResource=__webpack_require__("./stories/table/sort.component.scss?ngResource"),sort_componentngResource_default=__webpack_require__.n(sort_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),data=__webpack_require__("./stories/table/data.ts");let SortDemoComponent=class SortDemoComponent{constructor(){this.dataSource=data.R.slice()}sortData(sort){const activeKey=sort.active;this.dataSource=data.R.slice().sort(((a,b)=>a[activeKey]===b[activeKey]?0:a[activeKey]>b[activeKey]?"asc"===sort.direction?1:-1:"asc"===sort.direction?-1:1))}};SortDemoComponent=(0,tslib_es6.Cg)([(0,core.Component)({template:'<aui-table\n    auiSort\n    [dataSource]="dataSource"\n    (sortChange)="sortData($event)"\n  >\n    <ng-container auiTableColumnDef="id">\n      <aui-table-header-cell\n        *auiTableHeaderCellDef\n        aui-sort-header\n      >\n        No.\n      </aui-table-header-cell>\n      <aui-table-cell *auiTableCellDef="let item">{{ item.id }}</aui-table-cell>\n    </ng-container>\n    <ng-container auiTableColumnDef="name">\n      <aui-table-header-cell\n        *auiTableHeaderCellDef\n        aui-sort-header\n      >\n        Name\n      </aui-table-header-cell>\n      <aui-table-cell *auiTableCellDef="let item">\n        {{ item.name }}\n        ({{ item.displayName }})\n      </aui-table-cell>\n    </ng-container>\n    <ng-container auiTableColumnDef="value">\n      <aui-table-header-cell\n        *auiTableHeaderCellDef\n        aui-sort-header\n        start="desc"\n      >\n        Value\n      </aui-table-header-cell>\n      <aui-table-cell *auiTableCellDef="let item">\n        {{ item.value }}\n      </aui-table-cell>\n    </ng-container>\n    <aui-table-header-row\n      *auiTableHeaderRowDef="[\'id\', \'name\', \'value\']"\n    ></aui-table-header-row>\n    <aui-table-row\n      *auiTableRowDef="let row; columns: [\'id\', \'name\', \'value\']"\n    ></aui-table-row>\n  </aui-table> ',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[sort_componentngResource_default()]})],SortDemoComponent);var src=__webpack_require__("./src/index.ts");const sort_stories={title:"Example/Table",component:SortDemoComponent,decorators:[(0,dist.moduleMetadata)({declarations:[SortDemoComponent],imports:[animations.BrowserAnimationsModule,src.du3,src.opy,src.E9V,src.bGq,src.tmq]})]},Sort={name:"Sort"},__namedExportsOrder=["Sort"];Sort.parameters={...Sort.parameters,docs:{...Sort.parameters?.docs,source:{originalSource:"{\n  name: 'Sort'\n}",...Sort.parameters?.docs?.source}}}},"./stories/table/sort.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,".aui-table {\n  min-width: 0;\n}\n.aui-table__column-id {\n  flex: 0.5;\n}\n.aui-table__column-name {\n  flex: 2;\n}\n.aui-table__column-value {\n  flex: 1;\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);