/*! For license information please see paginator-paginator-mdx.163e991e.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_alauda_ui=self.webpackChunk_alauda_ui||[]).push([[2160,3618,9954],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{R:()=>useMDXComponents,x:()=>MDXProvider});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const emptyComponents={},MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext(emptyComponents);function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((function(){return"function"==typeof components?components(contextComponents):{...contextComponents,...components}}),[contextComponents,components])}function MDXProvider(properties){let allComponents;return allComponents=properties.disableParentContext?"function"==typeof properties.components?properties.components(emptyComponents):properties.components||emptyComponents:useMDXComponents(properties.components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},properties.children)}},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";var f=__webpack_require__("./node_modules/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")},"./stories/paginator/paginator.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>MDXContent});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_home_runner_work_ui_ui_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),_paginator_en_stories__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./stories/paginator/paginator-en.stories.ts"),_paginator_stories__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./stories/paginator/paginator.stories.ts");function _createMdxContent(props){const _components={h1:"h1",h2:"h2",...(0,_home_runner_work_ui_ui_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_4__.R)(),...props.components};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.W8,{title:"Example/Paginator"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h1,{id:"paginator",children:"Paginator"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"zh",children:"ZH"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_paginator_stories__WEBPACK_IMPORTED_MODULE_3__.Paginator_zh,meta:_paginator_stories__WEBPACK_IMPORTED_MODULE_3__}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.H2,{of:_paginator_stories__WEBPACK_IMPORTED_MODULE_3__.Paginator_zh}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"en",children:"EN"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_paginator_en_stories__WEBPACK_IMPORTED_MODULE_2__.Paginator_en,meta:_paginator_en_stories__WEBPACK_IMPORTED_MODULE_2__}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.H2,{of:_paginator_en_stories__WEBPACK_IMPORTED_MODULE_2__.Paginator_en})]})}function MDXContent(props={}){const{wrapper:MDXLayout}={...(0,_home_runner_work_ui_ui_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_4__.R)(),...props.components};return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,{...props,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}},"./node_modules/@storybook/core/dist/components sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/core/dist/components sync recursive",module.exports=webpackEmptyContext},"./node_modules/@storybook/core/dist/theming sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/core/dist/theming sync recursive",module.exports=webpackEmptyContext},"./stories/paginator/paginator-en.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Paginator_en:()=>Paginator_en,__namedExportsOrder:()=>__namedExportsOrder,default:()=>paginator_en_stories});var animations=__webpack_require__("./node_modules/@angular/platform-browser/fesm2022/animations.mjs"),dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let paginatorEnComponent=class paginatorEnComponent{constructor(){this.currentPage=1,this.pageSize=20,this.total=150,this.pageSizeOptions=["10","20","50"]}static#_=this.propDecorators={currentPage:[{type:core.Input}],pageSize:[{type:core.Input}],total:[{type:core.Input}],pageSizeOptions:[{type:core.Input}]}};paginatorEnComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"story-paginator-en",template:'\n    <aui-paginator\n      layout="total,pager,sizes,jumper"\n      [(currentPage)]="currentPage"\n      [(pageSize)]="pageSize"\n      [total]="total"\n      [pageSizeOptions]="pageSizeOptions"\n    ></aui-paginator>\n  ',changeDetection:core.ChangeDetectionStrategy.OnPush})],paginatorEnComponent);var src=__webpack_require__("./src/index.ts");const paginator_en_stories={title:"Example/Paginator",component:paginatorEnComponent,decorators:[(0,dist.moduleMetadata)({declarations:[paginatorEnComponent],imports:[animations.BrowserAnimationsModule,src.IPs]})]},Paginator_en={name:"english",args:{currentPage:1,pageSize:20,total:350,pageSizeOptions:["10","20","50"]}},__namedExportsOrder=["Paginator_en"];Paginator_en.parameters={...Paginator_en.parameters,docs:{...Paginator_en.parameters?.docs,source:{originalSource:"{\n  name: 'english',\n  args: {\n    currentPage: 1,\n    pageSize: 20,\n    total: 350,\n    pageSizeOptions: ['10', '20', '50']\n  }\n}",...Paginator_en.parameters?.docs?.source}}}},"./stories/paginator/paginator.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{PaginatorZh:()=>PaginatorZh,Paginator_zh:()=>Paginator_zh,__namedExportsOrder:()=>__namedExportsOrder,default:()=>paginator_stories});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),animations=__webpack_require__("./node_modules/@angular/platform-browser/fesm2022/animations.mjs"),dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),Subject=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Subject.js");let paginatorComponent=class paginatorComponent{constructor(){this.layout="total,pager,sizes,jumper,content",this.currentPage=1,this.pageSize=20,this.total=350,this.pageSizeOptions=["10","20","50"],this.disabled=!1}static#_=this.propDecorators={layout:[{type:core.Input}],currentPage:[{type:core.Input}],pageSize:[{type:core.Input}],total:[{type:core.Input}],pageSizeOptions:[{type:core.Input}],disabled:[{type:core.Input}]}};paginatorComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"story-paginator-zh",template:'\n    <aui-paginator\n      [layout]="layout"\n      [(currentPage)]="currentPage"\n      [(pageSize)]="pageSize"\n      [total]="total"\n      [pageSizeOptions]="pageSizeOptions"\n      [disabled]="disabled"\n    >\n      custom content\n    </aui-paginator>\n  ',changeDetection:core.ChangeDetectionStrategy.OnPush})],paginatorComponent);var src=__webpack_require__("./src/index.ts");let PaginatorZh=class PaginatorZh extends src.NfZ{constructor(){super(...arguments),this.changes=new Subject.B,this.itemsPerPageLabel="条/页",this.jumperLabelPrefix="前往",this.jumperLabelSuffix="页",this.getTotalLabel=length=>`共 ${length} 条`}};PaginatorZh=(0,tslib_es6.Cg)([(0,core.Injectable)()],PaginatorZh);const paginator_stories={title:"Example/Paginator",component:paginatorComponent,decorators:[(0,dist.moduleMetadata)({declarations:[paginatorComponent],imports:[animations.BrowserAnimationsModule,src.IPs],providers:[{provide:src.NfZ,useClass:PaginatorZh}]})]},Paginator_zh={name:"chinese",args:{layout:"total,pager,sizes,jumper,content",currentPage:1,pageSize:20,total:350,pageSizeOptions:["10","20","50"],disabled:!1}},__namedExportsOrder=["PaginatorZh","Paginator_zh"];Paginator_zh.parameters={...Paginator_zh.parameters,docs:{...Paginator_zh.parameters?.docs,source:{originalSource:"{\n  name: 'chinese',\n  args: {\n    layout: 'total,pager,sizes,jumper,content',\n    currentPage: 1,\n    pageSize: 20,\n    total: 350,\n    pageSizeOptions: ['10', '20', '50'],\n    disabled: false\n  }\n}",...Paginator_zh.parameters?.docs?.source}}}}}]);