(self.webpackChunk_alauda_ui=self.webpackChunk_alauda_ui||[]).push([[1786,2061,2234,3576,5047,6520,8980,9526],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{R:()=>useMDXComponents,x:()=>MDXProvider});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const emptyComponents={},MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext(emptyComponents);function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((function(){return"function"==typeof components?components(contextComponents):{...contextComponents,...components}}),[contextComponents,components])}function MDXProvider(properties){let allComponents;return allComponents=properties.disableParentContext?"function"==typeof properties.components?properties.components(emptyComponents):properties.components||emptyComponents:useMDXComponents(properties.components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},properties.children)}},"./stories/input/input.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>MDXContent});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_home_runner_work_ui_ui_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),_auto_size_stories__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./stories/input/auto-size.stories.ts"),_input_group_stories__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./stories/input/input-group.stories.ts"),_input_stories__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./stories/input/input.stories.ts"),_number_input_stories__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./stories/input/number-input.stories.ts"),_search_input_stories__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./stories/input/search-input.stories.ts"),_tags_input_stories__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./stories/input/tags-input.stories.ts");function _createMdxContent(props){const _components={h1:"h1",h2:"h2",...(0,_home_runner_work_ui_ui_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_8__.R)(),...props.components};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_9__.W8,{title:"Example/Input"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h1,{id:"input",children:"Input"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"input-1",children:"input"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_9__.Hl,{of:_input_stories__WEBPACK_IMPORTED_MODULE_4__.Input,meta:_input_stories__WEBPACK_IMPORTED_MODULE_4__}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"input-group",children:"input group"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_9__.Hl,{of:_input_group_stories__WEBPACK_IMPORTED_MODULE_3__.InputGroup,meta:_input_group_stories__WEBPACK_IMPORTED_MODULE_3__}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"tags-input",children:"tags input"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_9__.Hl,{of:_tags_input_stories__WEBPACK_IMPORTED_MODULE_7__.TagsInput,meta:_tags_input_stories__WEBPACK_IMPORTED_MODULE_7__}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"search-input",children:"search input"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_9__.Hl,{of:_search_input_stories__WEBPACK_IMPORTED_MODULE_6__.SearchInput,meta:_search_input_stories__WEBPACK_IMPORTED_MODULE_6__}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"number-input",children:"number input"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_9__.Hl,{of:_number_input_stories__WEBPACK_IMPORTED_MODULE_5__.NumberInput,meta:_number_input_stories__WEBPACK_IMPORTED_MODULE_5__}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"autosize",children:"autosize"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_9__.Hl,{of:_auto_size_stories__WEBPACK_IMPORTED_MODULE_2__.AutoSize,meta:_auto_size_stories__WEBPACK_IMPORTED_MODULE_2__})]})}function MDXContent(props={}){const{wrapper:MDXLayout}={...(0,_home_runner_work_ui_ui_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_8__.R)(),...props.components};return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,{...props,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}},"./node_modules/@storybook/blocks/dist sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/blocks/dist sync recursive",module.exports=webpackEmptyContext},"./node_modules/@storybook/core/dist/components sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/core/dist/components sync recursive",module.exports=webpackEmptyContext},"./node_modules/@storybook/core/dist/theming sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/core/dist/theming sync recursive",module.exports=webpackEmptyContext},"./stories/input/auto-size.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{AutoSize:()=>AutoSize,__namedExportsOrder:()=>__namedExportsOrder,default:()=>auto_size_stories});var fesm2022_forms=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs"),dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let AutoSizeComponent=class AutoSizeComponent{constructor(){this.minRows=0,this.maxRows=0,this.value="Hello world!"}};AutoSizeComponent=(0,tslib_es6.Cg)([(0,core.Component)({template:'\n    <textarea\n      [autosize]="{ minRows: minRows, maxRows: maxRows }"\n      [(ngModel)]="value"\n    ></textarea>\n  ',changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!1})],AutoSizeComponent);var src=__webpack_require__("./src/index.ts");const auto_size_stories={title:"Example/Input",component:AutoSizeComponent,decorators:[(0,dist.moduleMetadata)({declarations:[AutoSizeComponent],imports:[src.x1Z,fesm2022_forms.YN]})]},AutoSize={name:"autosize"},__namedExportsOrder=["AutoSize"];AutoSize.parameters={...AutoSize.parameters,docs:{...AutoSize.parameters?.docs,source:{originalSource:"{\n  name: 'autosize'\n}",...AutoSize.parameters?.docs?.source}}}},"./stories/input/input-group.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{InputGroup:()=>InputGroup,__namedExportsOrder:()=>__namedExportsOrder,default:()=>input_group_stories});var dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let InputGroupComponent=class InputGroupComponent{static{this.propDecorators={disabled:[{type:core.Input}]}}};InputGroupComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"storybook-input-group",template:'\n    <div style="margin-top: 20px;">\n      <aui-input-group>\n        <span auiInputAddonBefore>HTTPS</span>\n        <span auiInputAddonAfter>GB</span>\n        <aui-icon\n          auiInputPrefix\n          icon="magnifier"\n        ></aui-icon>\n        <aui-icon\n          auiInputSuffix\n          icon="spinner"\n        ></aui-icon>\n        <input\n          aui-input\n          size="large"\n          [disabled]="disabled"\n          placeholder="placeholder"\n        />\n      </aui-input-group>\n    </div>\n    <div style="margin-top: 20px;">\n      <aui-input-group>\n        <span auiInputAddonBefore>HTTPS</span>\n        <span auiInputAddonAfter>GB</span>\n        <aui-icon\n          auiInputPrefix\n          icon="magnifier"\n        ></aui-icon>\n        <aui-icon\n          auiInputSuffix\n          icon="spinner"\n        ></aui-icon>\n        <input\n          aui-input\n          size="medium"\n          [disabled]="disabled"\n          placeholder="placeholder"\n        />\n      </aui-input-group>\n    </div>\n    <div style="margin-top: 20px;">\n      <aui-input-group>\n        <span auiInputAddonBefore>HTTPS</span>\n        <span auiInputAddonAfter>GB</span>\n        <aui-icon\n          auiInputPrefix\n          icon="magnifier"\n        ></aui-icon>\n        <aui-icon\n          auiInputSuffix\n          icon="spinner"\n        ></aui-icon>\n        <input\n          aui-input\n          size="small"\n          [disabled]="disabled"\n          placeholder="placeholder"\n        />\n      </aui-input-group>\n    </div>\n    <div style="margin-top: 20px;">\n      <aui-input-group>\n        <span auiInputAddonBefore>HTTPS</span>\n        <span auiInputAddonAfter>GB</span>\n        <aui-icon\n          auiInputPrefix\n          icon="magnifier"\n        ></aui-icon>\n        <aui-icon\n          auiInputSuffix\n          icon="spinner"\n        ></aui-icon>\n        <input\n          aui-input\n          size="mini"\n          [disabled]="disabled"\n          placeholder="placeholder"\n        />\n      </aui-input-group>\n    </div>\n  ',changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!1})],InputGroupComponent);var src=__webpack_require__("./src/index.ts");const input_group_stories={title:"Example/Input",component:InputGroupComponent,decorators:[(0,dist.moduleMetadata)({declarations:[InputGroupComponent],imports:[src.x1Z,src.opy]})]},InputGroup={name:"input group",args:{disabled:!0}},__namedExportsOrder=["InputGroup"];InputGroup.parameters={...InputGroup.parameters,docs:{...InputGroup.parameters?.docs,source:{originalSource:"{\n  name: 'input group',\n  args: {\n    disabled: true\n  }\n}",...InputGroup.parameters?.docs?.source}}}},"./stories/input/input.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Input:()=>Input,__namedExportsOrder:()=>__namedExportsOrder,default:()=>input_stories});var fesm2022_forms=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs"),dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let InputComponent=class InputComponent{};InputComponent=(0,tslib_es6.Cg)([(0,core.Component)({template:'\n    <div>\n      <p style="margin-top: 26px;">Input:</p>\n      <input\n        style="margin-top: 16px;"\n        size="large"\n        aui-input\n        [(ngModel)]="value"\n        placeholder="placeholder"\n      />\n      <input\n        style="margin-top: 16px;"\n        size="medium"\n        aui-input\n        [(ngModel)]="value"\n        placeholder="placeholder"\n      />\n      <input\n        readonly\n        style="margin-top: 16px;"\n        size="small"\n        aui-input\n        [(ngModel)]="value"\n        placeholder="readonly"\n      />\n      <input\n        disabled\n        style="margin-top: 16px;"\n        size="mini"\n        aui-input\n        [(ngModel)]="value"\n        placeholder="disabled"\n      />\n      <p style="margin-top: 26px;">Textarea:</p>\n      <textarea\n        style="margin-top: 16px;"\n        size="large"\n        aui-input\n        [(ngModel)]="value"\n        placeholder="size:large, default 3 rows"\n      ></textarea>\n      <textarea\n        style="margin-top: 16px;"\n        size="medium"\n        aui-input\n        [(ngModel)]="value"\n        placeholder="size:medium, default 3 rows"\n      ></textarea>\n      <textarea\n        readonly\n        style="margin-top: 16px;"\n        size="small"\n        aui-input\n        [(ngModel)]="value"\n        placeholder="size:small, default 3 rows"\n      ></textarea>\n      <textarea\n        disabled\n        style="margin-top: 16px;"\n        size="mini"\n        aui-input\n        [(ngModel)]="value"\n        placeholder="size:mini, default 3 rows"\n      ></textarea>\n      <p style="margin-top: 26px;">\n        Textarea with autosize (size:default = medium):\n      </p>\n    </div>\n  ',changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!1})],InputComponent);var src=__webpack_require__("./src/index.ts");const input_stories={title:"Example/Input",component:InputComponent,decorators:[(0,dist.moduleMetadata)({declarations:[InputComponent],imports:[src.x1Z,fesm2022_forms.YN]})]},Input={name:"input"},__namedExportsOrder=["Input"];Input.parameters={...Input.parameters,docs:{...Input.parameters?.docs,source:{originalSource:"{\n  name: 'input'\n}",...Input.parameters?.docs?.source}}}},"./stories/input/number-input.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{NumberInput:()=>NumberInput,__namedExportsOrder:()=>__namedExportsOrder,default:()=>number_input_stories});var fesm2022_forms=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs"),dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),src=__webpack_require__("./src/index.ts");let numberInputComponent=class numberInputComponent{constructor(){this.size=src.H7o.Medium,this.min=0,this.max=10,this.step=1,this.precision=1,this.value=4,this.disabled=!1,this.controls=!0,this.clearable=!1}};numberInputComponent=(0,tslib_es6.Cg)([(0,core.Component)({template:'\n    <aui-number-input\n      [size]="size"\n      [step]="step"\n      [precision]="precision"\n      [min]="min"\n      [max]="max"\n      [controls]="controls"\n      [disabled]="disabled"\n      placeholder="placeholder"\n      [(ngModel)]="value"\n      [clearable]="clearable"\n    ></aui-number-input>\n    <br />\n    <br />\n    <aui-number-input\n      [size]="size"\n      [step]="step"\n      [precision]="precision"\n      [min]="min"\n      [max]="max"\n      [controls]="controls"\n      [angleControls]="true"\n      [disabled]="disabled"\n      placeholder="placeholder"\n      [(ngModel)]="value"\n      [clearable]="clearable"\n    ></aui-number-input>\n    <br />\n    <br />\n    <aui-number-input\n      [size]="size"\n      [step]="step"\n      [precision]="precision"\n      [min]="min"\n      [max]="max"\n      [controls]="controls"\n      [angleControls]="true"\n      [disabled]="disabled"\n      placeholder="placeholder"\n      [(ngModel)]="value"\n      [clearable]="clearable"\n    >\n      <span auiInputAddonBefore>Memory</span>\n      <span auiInputAddonAfter>Gi</span>\n    </aui-number-input>\n    <br />\n    <br />\n    value: {{ value | json }}\n  ',changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!1})],numberInputComponent);const number_input_stories={title:"Example/Input",component:numberInputComponent,decorators:[(0,dist.moduleMetadata)({declarations:[numberInputComponent],imports:[src.x1Z,fesm2022_forms.YN]})]},NumberInput={name:"number input"},__namedExportsOrder=["NumberInput"];NumberInput.parameters={...NumberInput.parameters,docs:{...NumberInput.parameters?.docs,source:{originalSource:"{\n  name: 'number input'\n}",...NumberInput.parameters?.docs?.source}}}},"./stories/input/search-input.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{SearchInput:()=>SearchInput,__namedExportsOrder:()=>__namedExportsOrder,default:()=>search_input_stories});var dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),src=__webpack_require__("./src/index.ts");let SearchInputComponent=class SearchInputComponent{constructor(){this.size=src.H7o.Medium,this.searchButton=!1,this.searching=!1,this.clearable=!1,this.disabled=!1,this.keyword="keyword",this.onChangeHandler=()=>{console.log("change")},this.onSearchHandler=()=>{console.log("search")},this.onClearHandler=()=>{console.log("clear")}}};SearchInputComponent=(0,tslib_es6.Cg)([(0,core.Component)({template:'\n    <aui-search\n      [size]="size"\n      [searchButton]="searchButton"\n      [searching]="searching"\n      [clearable]="clearable"\n      [disabled]="disabled"\n      [(keyword)]="keyword"\n      placeholder="placeholder"\n      (search)="onSearchHandler($event)"\n      (keywordChange)="onChangeHandler($event)"\n      (clear)="onClearHandler($event)"\n    ></aui-search>\n    <div style="margin-top: 20px;">\n      <aui-search\n        [size]="size"\n        [searchButton]="searchButton"\n        [searching]="searching"\n        [clearable]="true"\n        [disabled]="disabled"\n        [(keyword)]="keyword"\n        placeholder="placeholder"\n        (search)="onSearchHandler($event)"\n        (keywordChange)="onChangeHandler($event)"\n        (clear)="onClearHandler($event)"\n      ></aui-search>\n    </div>\n    <div style="margin-top: 20px;">\n      <aui-search\n        [size]="size"\n        [searchButton]="searchButton"\n        [searching]="true"\n        [clearable]="true"\n        [disabled]="disabled"\n        [(keyword)]="keyword"\n        placeholder="placeholder"\n        (search)="onSearchHandler($event)"\n        (keywordChange)="onChangeHandler($event)"\n        (clear)="onClearHandler($event)"\n      ></aui-search>\n    </div>\n    <div style="margin-top: 20px;">\n      <aui-search\n        [size]="size"\n        [searchButton]="true"\n        [searching]="searching"\n        [clearable]="true"\n        [disabled]="disabled"\n        [(keyword)]="keyword"\n        placeholder="placeholder"\n        (search)="onSearchHandler($event)"\n        (keywordChange)="onChangeHandler($event)"\n        (clear)="onClearHandler($event)"\n      ></aui-search>\n    </div>\n    <div style="margin-top: 20px;">\n      <aui-search\n        [size]="size"\n        [searchButton]="true"\n        [searching]="true"\n        [clearable]="true"\n        [disabled]="disabled"\n        [(keyword)]="keyword"\n        placeholder="placeholder"\n        (search)="onSearchHandler($event)"\n        (keywordChange)="onChangeHandler($event)"\n        (clear)="onClearHandler($event)"\n      ></aui-search>\n    </div>\n\n    {{ keyword }}\n  ',changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!1})],SearchInputComponent);const search_input_stories={title:"Example/Input",component:SearchInputComponent,decorators:[(0,dist.moduleMetadata)({declarations:[SearchInputComponent],imports:[src.x1Z]})]},SearchInput={name:"search input"},__namedExportsOrder=["SearchInput"];SearchInput.parameters={...SearchInput.parameters,docs:{...SearchInput.parameters?.docs,source:{originalSource:"{\n  name: 'search input'\n}",...SearchInput.parameters?.docs?.source}}}},"./stories/input/tags-input.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{TagsInput:()=>TagsInput,__namedExportsOrder:()=>__namedExportsOrder,default:()=>tags_input_stories});var fesm2022_forms=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs"),dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),src=__webpack_require__("./src/index.ts");let TagsInputComponent=class TagsInputComponent{constructor(){this.value=["app","service"],this.pattern=/^a/,this.sizeOptions={[src.H7o.Large]:src.H7o.Large,[src.H7o.Medium]:src.H7o.Medium,[src.H7o.Small]:src.H7o.Small,[src.H7o.Mini]:src.H7o.Mini},this.checkArrFn=control=>control.value.includes("b")?{patternB:!0}:null,this.control=new fesm2022_forms.MJ(this.value,{validators:[this.checkArrFn]}),this.size=src.H7o.Medium,this.allowRepeat=!0,this.allowEmpty=!1,this.checkFn=control=>control.value.startsWith("a")?{patternA:!0}:null,this.printStatus=()=>{console.log("print control status to make sure sync",this.control.status)}}};TagsInputComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"storybook-tags-input",template:'\n    <aui-tags-input\n      [size]="size"\n      [formControl]="control"\n      [inputValidator]="checkFn"\n      [clearable]="true"\n      [allowRepeat]="allowRepeat"\n      [allowEmpty]="allowEmpty"\n      placeholder="placeholder"\n      [maxRowCount]="3"\n    ></aui-tags-input>\n    {{ control.value | json }} status:{{ control.status }}\n    <br />\n    <button (click)="printStatus()">submit</button>\n    <br />\n    <br />\n    <div>只读标签，不可删除</div>\n    <aui-tags-input\n      [size]="size"\n      [formControl]="control"\n      [inputValidator]="checkFn"\n      [maxRowCount]="3"\n      [clearable]="true"\n      [readonlyTags]="[\'service\']"\n      [allowRepeat]="allowRepeat"\n      [allowEmpty]="allowEmpty"\n      placeholder="placeholder"\n    ></aui-tags-input>\n  ',changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!1})],TagsInputComponent);const tags_input_stories={title:"Example/Input",component:TagsInputComponent,decorators:[(0,dist.moduleMetadata)({declarations:[TagsInputComponent],imports:[src.x1Z,fesm2022_forms.X1]})]},TagsInput={name:"tags input"},__namedExportsOrder=["TagsInput"];TagsInput.parameters={...TagsInput.parameters,docs:{...TagsInput.parameters?.docs,source:{originalSource:"{\n  name: 'tags input'\n}",...TagsInput.parameters?.docs?.source}}}}}]);