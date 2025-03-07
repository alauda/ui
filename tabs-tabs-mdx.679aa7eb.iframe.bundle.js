(self.webpackChunk_alauda_ui=self.webpackChunk_alauda_ui||[]).push([[3402,4634,5382,5454,7332,7442,8980,9370],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{R:()=>useMDXComponents,x:()=>MDXProvider});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const emptyComponents={},MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext(emptyComponents);function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((function(){return"function"==typeof components?components(contextComponents):{...contextComponents,...components}}),[contextComponents,components])}function MDXProvider(properties){let allComponents;return allComponents=properties.disableParentContext?"function"==typeof properties.components?properties.components(emptyComponents):properties.components||emptyComponents:useMDXComponents(properties.components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},properties.children)}},"./stories/tabs/tabs.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>MDXContent});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_home_runner_work_ui_ui_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),_basic_stories__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./stories/tabs/basic.stories.ts"),_editable_stories__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./stories/tabs/editable.stories.ts"),_label_stories__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./stories/tabs/label.stories.ts"),_lazy_stories__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./stories/tabs/lazy.stories.ts"),_nest_stories__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./stories/tabs/nest.stories.ts"),_title_stories__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./stories/tabs/title.stories.ts");function _createMdxContent(props){const _components={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,_home_runner_work_ui_ui_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_8__.R)(),...props.components};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_9__.W8,{title:"Example/Tabs"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h1,{id:"tabs",children:"Tabs"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.blockquote,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"移植自 Angular Material, 增加了风格（卡片/线条）和尺寸（大/中/小）选项和 lazy 模式。"}),"\n"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"基础用法",children:"基础用法"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_9__.Hl,{of:_basic_stories__WEBPACK_IMPORTED_MODULE_2__.Basic,meta:_basic_stories__WEBPACK_IMPORTED_MODULE_2__}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_9__.H2,{of:_basic_stories__WEBPACK_IMPORTED_MODULE_2__.Basic}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"自定义-label",children:"自定义 Label"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_9__.Hl,{of:_label_stories__WEBPACK_IMPORTED_MODULE_4__.Label,meta:_label_stories__WEBPACK_IMPORTED_MODULE_4__}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"添加删除",children:"添加删除"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_9__.Hl,{of:_editable_stories__WEBPACK_IMPORTED_MODULE_3__.Editable,meta:_editable_stories__WEBPACK_IMPORTED_MODULE_3__}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"lazy-模式",children:"Lazy 模式"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_9__.Hl,{of:_lazy_stories__WEBPACK_IMPORTED_MODULE_5__.Lazy,meta:_lazy_stories__WEBPACK_IMPORTED_MODULE_5__}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"tab-嵌套",children:"Tab 嵌套"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_9__.Hl,{of:_nest_stories__WEBPACK_IMPORTED_MODULE_6__.Nest,meta:_nest_stories__WEBPACK_IMPORTED_MODULE_6__}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"自定义-title",children:"自定义 Title"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_9__.Hl,{of:_title_stories__WEBPACK_IMPORTED_MODULE_7__.Title,meta:_title_stories__WEBPACK_IMPORTED_MODULE_7__}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"tabgroupcomponent-inputs",children:"TabGroupComponent Inputs"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.table,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.thead,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.th,{children:"名称"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.th,{children:"类型"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.th,{children:"默认值"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.th,{children:"描述"})]})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tbody,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"type"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"TabType"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"TabType.Line"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"样式主题"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"size"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"TabSize"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"TabSize.Medium"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"尺寸"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"tab"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"string"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"-"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"选中 Tab 的名称"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"selectedIndex"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"number"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"-"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"选中 Tab 的索引"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"lazy"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"boolean"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"false"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"懒加载模式"})]})]})]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"tabgroupcomponent-outputs",children:"TabGroupComponent Outputs"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.pre,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{className:"language-ts",children:"interface TabChangeEvent {\n  index: number;\n  tab: TabComponent;\n}\n"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.table,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.thead,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.th,{children:"名称"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.th,{children:"类型"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.th,{children:"描述"})]})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tbody,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"tabChange"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"string"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"Tab 切换时发射 Tab 的名称"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"selectedIndexChange"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"number"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"Tab 切换时发射 Tab 的索引"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"selectedTabChange"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"TabChangeEvent"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"Tab 切换时发射 TabChangeEvent"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"focusChange"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"TabChangeEvent"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.td,{children:["Tab ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"focus"})," 切换时发射"]})]})]})]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"tabcomponent-inputs",children:"TabComponent Inputs"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.table,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.thead,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.th,{children:"名称"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.th,{children:"类型"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.th,{children:"默认值"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.th,{children:"说明"})]})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tbody,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"name"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"string"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"-"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"tab 的名称"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"label"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"string"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"-"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"文字 label"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"closeable"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"boolean"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"false"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"是否显示关闭按键"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"disabled"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"boolean"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"false"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"是否禁用此 tab"})]})]})]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"tabcomponent-outputs",children:"TabComponent Outputs"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.table,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.thead,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.th,{children:"名称"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.th,{children:"类型"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.th,{children:"描述"})]})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.tbody,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"close"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"void"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"关闭按键被点击时发射"})]})})]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"directives",children:"Directives"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.table,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.thead,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.th,{children:"名称"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.th,{children:"作用范围"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.th,{children:"描述"})]})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tbody,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"auiTabHeaderAddon"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"TabGroupComponent"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"自定义 Group Header"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"auiTabLabel"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"TabComponent"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"自定义 Tab Label"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"auiTabContent"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"TabComponent"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"Tab 内容区域，lazy 模式必用"})]})]})]})]})}function MDXContent(props={}){const{wrapper:MDXLayout}={...(0,_home_runner_work_ui_ui_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_8__.R)(),...props.components};return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,{...props,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}},"./node_modules/@storybook/blocks/dist sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/blocks/dist sync recursive",module.exports=webpackEmptyContext},"./node_modules/@storybook/core/dist/components sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/core/dist/components sync recursive",module.exports=webpackEmptyContext},"./node_modules/@storybook/core/dist/theming sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/core/dist/theming sync recursive",module.exports=webpackEmptyContext},"./stories/tabs/basic.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Basic:()=>Basic,__namedExportsOrder:()=>__namedExportsOrder,default:()=>basic_stories});var fesm2022_forms=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs"),dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let TabsBasicComponent=class TabsBasicComponent{constructor(){this.type="line",this.disabled=!1,this.size="medium",this.tab="a"}static{this.propDecorators={type:[{type:core.Input}],disabled:[{type:core.Input}],size:[{type:core.Input}]}}};TabsBasicComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"story-basic-tabs",template:'\n    <aui-tab-group\n      [type]="type"\n      [size]="size"\n      [(tab)]="tab"\n    >\n      <aui-tab\n        name="a"\n        label="Tab 0"\n        [disabled]="disabled"\n      >\n        <aui-card> Content 1</aui-card>\n      </aui-tab>\n      <aui-tab\n        name="b"\n        label="Tab 1"\n        [disabled]="disabled"\n      >\n        <aui-card> Content 2</aui-card>\n      </aui-tab>\n      <aui-tab\n        name="c"\n        label="Tab 2"\n        [disabled]="disabled"\n      >\n        <aui-card> Content 3</aui-card>\n      </aui-tab>\n    </aui-tab-group>\n  ',changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!1})],TabsBasicComponent);const basic_component=TabsBasicComponent;var src=__webpack_require__("./src/index.ts");const basic_stories={title:"Example/Tabs",component:basic_component,decorators:[(0,dist.moduleMetadata)({declarations:[basic_component],imports:[src.tmq,src.opy,fesm2022_forms.YN,src.tHK,src.s7D,src.jr_,src.Dw2]})]},Basic={name:"Basic",args:{type:"line",size:"medium",disabled:!1}},__namedExportsOrder=["Basic"];Basic.parameters={...Basic.parameters,docs:{...Basic.parameters?.docs,source:{originalSource:"{\n  name: 'Basic',\n  args: {\n    type: 'line',\n    size: 'medium',\n    disabled: false\n  }\n}",...Basic.parameters?.docs?.source}}}},"./stories/tabs/editable.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Editable:()=>Editable,__namedExportsOrder:()=>__namedExportsOrder,default:()=>editable_stories});var fesm2022_forms=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs"),dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let TabsEditableComponent=class TabsEditableComponent{constructor(){this.tabs=[1,2,3]}add(num=1){this.tabs=this.tabs.concat(Array.from({length:num}).fill("").map(((_,i)=>this.tabs.at(-1)+i+1)))}remove(index){this.tabs.splice(index,1)}};TabsEditableComponent=(0,tslib_es6.Cg)([(0,core.Component)({template:'\n    <aui-tab-group>\n      <aui-tab\n        *ngFor="let tab of tabs; index as i; count as len"\n        [closeable]="len > 1"\n        [label]="\'tab\' + tab"\n        (close)="remove(i)"\n      >\n        <aui-card> content {{ i }} </aui-card>\n      </aui-tab>\n      <button\n        *auiTabHeaderAddon\n        aui-button="primary"\n        (click)="add()"\n        size="small"\n        [square]="true"\n      >\n        <aui-icon icon="plus"></aui-icon>\n      </button>\n    </aui-tab-group>\n  ',changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!1})],TabsEditableComponent);const editable_component=TabsEditableComponent;var src=__webpack_require__("./src/index.ts");const editable_stories={title:"Example/Tabs",component:editable_component,decorators:[(0,dist.moduleMetadata)({declarations:[editable_component],imports:[src.tmq,src.opy,fesm2022_forms.YN,src.tHK,src.s7D,src.jr_,src.Dw2]})]},Editable={name:"Editable"},__namedExportsOrder=["Editable"];Editable.parameters={...Editable.parameters,docs:{...Editable.parameters?.docs,source:{originalSource:"{\n  name: 'Editable'\n}",...Editable.parameters?.docs?.source}}}},"./stories/tabs/label.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Label:()=>Label,__namedExportsOrder:()=>__namedExportsOrder,default:()=>label_stories});var fesm2022_forms=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs"),dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let TabsLabelComponent=class TabsLabelComponent{constructor(){this.tab=Array.from({length:3}).fill("")}};TabsLabelComponent=(0,tslib_es6.Cg)([(0,core.Component)({template:'\n    <aui-tab-group>\n      <ng-container *auiTabTitle>aa2</ng-container>\n      <aui-tab>\n        <ng-container *auiTabLabel>\n          <aui-icon icon="sun"></aui-icon>\n          Custom Label\n        </ng-container>\n        <aui-card> Content 1 </aui-card>\n      </aui-tab>\n      <aui-tab label="Tab 1"><aui-card>Content 2</aui-card></aui-tab>\n      <aui-tab>\n        <ng-container *auiTabLabel>\n          <aui-icon icon="moon"></aui-icon>\n          Custom Label\n        </ng-container>\n        <aui-card> Content 3 </aui-card>\n      </aui-tab>\n    </aui-tab-group>\n  ',changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!1})],TabsLabelComponent);const label_component=TabsLabelComponent;var src=__webpack_require__("./src/index.ts");const label_stories={title:"Example/Tabs",component:label_component,decorators:[(0,dist.moduleMetadata)({declarations:[label_component],imports:[src.tmq,src.opy,fesm2022_forms.YN,src.tHK,src.s7D,src.jr_,src.Dw2]})]},Label={name:"CustomLabel"},__namedExportsOrder=["Label"];Label.parameters={...Label.parameters,docs:{...Label.parameters?.docs,source:{originalSource:"{\n  name: 'CustomLabel'\n}",...Label.parameters?.docs?.source}}}},"./stories/tabs/lazy.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Lazy:()=>Lazy,__namedExportsOrder:()=>__namedExportsOrder,default:()=>lazy_stories});var fesm2022_forms=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs"),dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),scheduler_async=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/scheduler/async.js"),timer=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/timer.js");var take=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/take.js");let LazyTestComponent=class LazyTestComponent{constructor(){this.num$=function interval(period,scheduler){return void 0===period&&(period=0),void 0===scheduler&&(scheduler=scheduler_async.E),period<0&&(period=0),(0,timer.O)(period,period,scheduler)}(1e3).pipe((0,take.s)(100))}};LazyTestComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"tabs-lazy-test",template:"\n    <ng-content></ng-content>\n    num: {{ num$ | async }}\n  ",changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!1})],LazyTestComponent);let TabsLazyComponent=class TabsLazyComponent{constructor(){this.tabs=Array.from({length:10}).fill(""),this.lazy=!0}};TabsLazyComponent=(0,tslib_es6.Cg)([(0,core.Component)({template:'\n    <aui-form-item>\n      <label auiFormItemLabel>启用</label>\n      <aui-radio-group\n        auiFormItemControl\n        [(ngModel)]="lazy"\n        [plain]="false"\n      >\n        <aui-radio-button [value]="true">是</aui-radio-button>\n        <aui-radio-button [value]="false">否</aui-radio-button>\n      </aui-radio-group>\n    </aui-form-item>\n    <aui-tab-group [lazy]="lazy">\n      <aui-tab label="Tab 1">\n        <tabs-lazy-test *auiTabContent\n          ><aui-card> Content 1 </aui-card></tabs-lazy-test\n        >\n      </aui-tab>\n      <aui-tab label="Tab 2">\n        <tabs-lazy-test *auiTabContent\n          ><aui-card> Content 2 </aui-card></tabs-lazy-test\n        >\n      </aui-tab>\n      <aui-tab label="Tab 3">\n        <tabs-lazy-test *auiTabContent\n          ><aui-card> Content 3 </aui-card></tabs-lazy-test\n        >\n      </aui-tab>\n    </aui-tab-group>\n  ',changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!1})],TabsLazyComponent);const lazy_component=TabsLazyComponent;var src=__webpack_require__("./src/index.ts");const lazy_stories={title:"Example/Tabs",component:lazy_component,decorators:[(0,dist.moduleMetadata)({declarations:[lazy_component,LazyTestComponent],imports:[src.tmq,src.opy,fesm2022_forms.YN,src.tHK,src.s7D,src.jr_,src.Dw2]})]},Lazy={name:"Lazy"},__namedExportsOrder=["Lazy"];Lazy.parameters={...Lazy.parameters,docs:{...Lazy.parameters?.docs,source:{originalSource:"{\n  name: 'Lazy'\n}",...Lazy.parameters?.docs?.source}}}},"./stories/tabs/nest.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Nest:()=>Nest,__namedExportsOrder:()=>__namedExportsOrder,default:()=>nest_stories});var fesm2022_forms=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs"),dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),Subject=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Subject.js"),takeUntil=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/takeUntil.js"),src=__webpack_require__("./src/index.ts");let ActiveTestComponent=class ActiveTestComponent{constructor(tabComponent,tabContext){this.tabComponent=tabComponent,this.tabContext=tabContext,this.destroy$$=new Subject.B}ngOnInit(){this.tabContext.active$.pipe((0,takeUntil.Q)(this.destroy$$)).subscribe((active=>{console.log(this.tabComponent.textLabel,active)}))}ngOnDestroy(){this.destroy$$.next(),this.destroy$$.complete()}static{this.ctorParameters=()=>[{type:src.jeq},{type:src.AYl}]}};ActiveTestComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"tabs-active-test",template:" <ng-content></ng-content> ",changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!1})],ActiveTestComponent);let TabsNestComponent=class TabsNestComponent{constructor(){this.lazy=!0}};TabsNestComponent=(0,tslib_es6.Cg)([(0,core.Component)({template:'\n    <aui-form-item>\n      <label auiFormItemLabel>启用 Lazy</label>\n      <aui-radio-group\n        auiFormItemControl\n        [(ngModel)]="lazy"\n        [plain]="false"\n      >\n        <aui-radio-button [value]="true">是</aui-radio-button>\n        <aui-radio-button [value]="false">否</aui-radio-button>\n      </aui-radio-group>\n    </aui-form-item>\n    <aui-tab-group [lazy]="lazy">\n      <aui-tab label="Tab 1">\n        <tabs-active-test *auiTabContent\n          ><aui-card>Content 1</aui-card></tabs-active-test\n        >\n      </aui-tab>\n      <aui-tab label="Tab 2">\n        <tabs-active-test *auiTabContent>\n          <aui-tab-group [lazy]="true">\n            <aui-tab label="Tab 2-1">\n              <tabs-active-test *auiTabContent>\n                <aui-card> Content 2-1 </aui-card>\n              </tabs-active-test>\n            </aui-tab>\n            <aui-tab label="Tab 2-2">\n              <tabs-active-test *auiTabContent>\n                <aui-card> Content 2-2 </aui-card>\n              </tabs-active-test>\n            </aui-tab>\n          </aui-tab-group>\n        </tabs-active-test>\n      </aui-tab>\n    </aui-tab-group>\n  ',changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!1})],TabsNestComponent);const nest_component=TabsNestComponent,nest_stories={title:"Example/Tabs",component:nest_component,decorators:[(0,dist.moduleMetadata)({declarations:[nest_component,ActiveTestComponent],imports:[src.tmq,src.opy,fesm2022_forms.YN,src.tHK,src.s7D,src.jr_,src.Dw2]})]},Nest={name:"Nest"},__namedExportsOrder=["Nest"];Nest.parameters={...Nest.parameters,docs:{...Nest.parameters?.docs,source:{originalSource:"{\n  name: 'Nest'\n}",...Nest.parameters?.docs?.source}}}},"./stories/tabs/title.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Title:()=>Title,__namedExportsOrder:()=>__namedExportsOrder,default:()=>title_stories});var fesm2022_forms=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs"),dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let TabsTitleComponent=class TabsTitleComponent{};TabsTitleComponent=(0,tslib_es6.Cg)([(0,core.Component)({template:'\n    <aui-tab-group size="large">\n      <ng-container *auiTabTitle>Title</ng-container>\n      <aui-tab label="Tab 0"> <aui-card> Content 1 </aui-card> </aui-tab>\n      <aui-tab label="Tab 1"><aui-card> Content 2 </aui-card></aui-tab>\n      <aui-tab label="Tab 2"><aui-card> Content 3 </aui-card></aui-tab>\n      <aui-tab label="Tab 3"><aui-card> Content 4 </aui-card></aui-tab>\n    </aui-tab-group>\n  ',changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!1})],TabsTitleComponent);const title_component=TabsTitleComponent;var src=__webpack_require__("./src/index.ts");const title_stories={title:"Example/Tabs",component:title_component,decorators:[(0,dist.moduleMetadata)({declarations:[title_component],imports:[src.tmq,src.opy,fesm2022_forms.YN,src.tHK,src.s7D,src.jr_,src.Dw2]})]},Title={name:"Title"},__namedExportsOrder=["Title"];Title.parameters={...Title.parameters,docs:{...Title.parameters?.docs,source:{originalSource:"{\n  name: 'Title'\n}",...Title.parameters?.docs?.source}}}}}]);