/*! For license information please see steps-steps-mdx.40d991dc.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_alauda_ui=self.webpackChunk_alauda_ui||[]).push([[7056,4588,8159],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{R:()=>useMDXComponents,x:()=>MDXProvider});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const emptyComponents={},MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext(emptyComponents);function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((function(){return"function"==typeof components?components(contextComponents):{...contextComponents,...components}}),[contextComponents,components])}function MDXProvider(properties){let allComponents;return allComponents=properties.disableParentContext?"function"==typeof properties.components?properties.components(emptyComponents):properties.components||emptyComponents:useMDXComponents(properties.components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},properties.children)}},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";var f=__webpack_require__("./node_modules/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")},"./stories/steps/steps.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>MDXContent});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_home_runner_work_ui_ui_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),_progress_stories__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./stories/steps/progress.stories.ts"),_step_stories__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./stories/steps/step.stories.ts");function _createMdxContent(props){const _components={h1:"h1",h2:"h2",h3:"h3",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,_home_runner_work_ui_ui_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_4__.R)(),...props.components};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.W8,{title:"Example/Steps"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h1,{id:"steps",children:"Steps"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Steps"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_step_stories__WEBPACK_IMPORTED_MODULE_3__.Step,meta:_step_stories__WEBPACK_IMPORTED_MODULE_3__}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_progress_stories__WEBPACK_IMPORTED_MODULE_2__.Progress,meta:_progress_stories__WEBPACK_IMPORTED_MODULE_2__}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"steps-api",children:"Steps API"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"steps-properties",children:"Steps Properties"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.table,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.thead,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.th,{children:"名称"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.th,{children:"类型"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.th,{children:"描述"})]})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tbody,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"selectable"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"boolean"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"是否可以点击步骤切换或查看。默认为 false"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"orientation"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"'vertical' or 'horizontal'"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"方向"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"currentIndex"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"number"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"当前的步骤。当 type 为 progress 时，无需传入，组件会根据 steps 的状态自动设置"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"steps"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"StepItem[]"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"步骤"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"type"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"'step' or 'progress'"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"默认为 step"})]})]})]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"steps-output",children:"Steps Output"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.table,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.thead,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.th,{children:"名称"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.th,{children:"返回值类型"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.th,{children:"描述"})]})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tbody,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"currentIndexChange"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"number"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"当前步骤变化时触发"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"selectedIndexChange"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"number"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"选中的步骤变化时触发。type 为 step 时当前值与选中值相同，无需监听"})]})]})]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"stepitem-definition",children:"StepItem Definition"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.table,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.thead,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.th,{children:"名称"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.th,{children:"类型"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.th,{children:"可选"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.th,{children:"描述"})]})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tbody,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"label"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"string"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"false"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"步骤名称"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"description"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"string"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"true"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"步骤描述"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"state"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"StepState"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"true"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"状态。'done', 'pending' or 'error'"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"optional"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"boolean"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"true"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.td,{children:"是否可跳过。默认为 false"})]})]})]})]})}function MDXContent(props={}){const{wrapper:MDXLayout}={...(0,_home_runner_work_ui_ui_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_4__.R)(),...props.components};return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,{...props,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}},"./node_modules/@storybook/core/dist/components sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/core/dist/components sync recursive",module.exports=webpackEmptyContext},"./node_modules/@storybook/core/dist/theming sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/core/dist/theming sync recursive",module.exports=webpackEmptyContext},"./stories/steps/progress.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Progress:()=>Progress,__namedExportsOrder:()=>__namedExportsOrder,default:()=>progress_stories});var fesm2022_forms=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs"),dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),src=__webpack_require__("./src/index.ts");let BasicVerticalDemoComponent=class BasicVerticalDemoComponent{constructor(){this.orientation="vertical",this.currentIndex=0,this.selectable=!1,this.steps=[{label:"Step 1"},{label:"Step 2",description:"This is description"},{label:"Step 3"},{label:"Step 4"}]}currentIndexChange(index){this.currentIndex=index}selectedIndexChange(index){this.selectedIndex=index}start(){this.setState(src.uki.Pending)}complete(){this.setState(src.uki.Done)}error(){this.setState(src.uki.Error)}setState(state){this.steps[this.currentIndex].state=state,this.steps=[...this.steps]}};BasicVerticalDemoComponent=(0,tslib_es6.Cg)([(0,core.Component)({template:'\n    <aui-steps\n      [orientation]="orientation"\n      [type]="\'progress\'"\n      [selectable]="selectable"\n      [steps]="steps"\n      (currentIndexChange)="currentIndexChange($event)"\n      (selectedIndexChange)="selectedIndexChange($event)"\n    ></aui-steps>\n    <div style="margin-top: 50px">\n      <button\n        aui-button="primary"\n        (click)="start()"\n      >\n        Start\n      </button>\n      <button\n        aui-button="primary"\n        (click)="complete()"\n      >\n        Complete\n      </button>\n      <button\n        aui-button="primary"\n        (click)="error()"\n      >\n        Set Error\n      </button>\n    </div>\n    <div>Selectable: <aui-switch [(ngModel)]="selectable"></aui-switch></div>\n    <div>\n      Selected Index: {{ selectedIndex }}, Current index: {{ currentIndex }}\n    </div>\n  ',changeDetection:core.ChangeDetectionStrategy.OnPush})],BasicVerticalDemoComponent);const progress_stories={title:"Example/Steps",component:BasicVerticalDemoComponent,decorators:[(0,dist.moduleMetadata)({declarations:[BasicVerticalDemoComponent],imports:[fesm2022_forms.YN,src.UXU,src.tmq,src.No7]})]},Progress={name:"Progress",parameters:{docs:{source:{type:"code",code:'\n        @Component({\n            template: \n              <aui-steps\n                [orientation]="orientation"\n                [type]="\'progress\'"\n                [selectable]="selectable"\n                [steps]="steps"\n                (currentIndexChange)="currentIndexChange($event)"\n                (selectedIndexChange)="selectedIndexChange($event)"\n              ></aui-steps>\n              <div style="margin-top: 50px">\n                <button aui-button="primary" (click)="start()">Start</button>\n                <button aui-button="primary" (click)="complete()">Complete</button>\n                <button aui-button="primary" (click)="error()">Set Error</button>\n              </div>\n              <div>\n                Selectable: <aui-switch [(ngModel)]="selectable"></aui-switch>\n              </div>\n              <div>\n                Selected Index: {{ selectedIndex }}, Current index: {{ currentIndex }}\n              </div>\n            ,\n          })\n          export class BasicVerticalDemoComponent {\n            orientation: StepsOrientation = \'vertical\';\n            currentIndex = 0;\n            selectedIndex: number;\n            selectable = false;\n            steps: StepItem[] = [\n              {\n                label: \'Step 1\',\n              },\n              {\n                label: \'Step 2\',\n              },\n              {\n                label: \'Step 3\',\n              },\n              {\n                label: \'Step 4\',\n              },\n            ];\n            currentIndexChange(index: number) {\n              this.currentIndex = index;\n            }\n            selectedIndexChange(index: number) {\n              this.selectedIndex = index;\n            }\n            start() {\n              this.setState(StepState.Pending);\n            }\n            complete() {\n              this.setState(StepState.Done);\n            }\n            error() {\n              this.setState(StepState.Error);\n            }\n            private setState(state: StepState) {\n              this.steps[this.currentIndex].state = state;\n              this.steps = [...this.steps];\n            }\n          }        \n        '}}}},__namedExportsOrder=["Progress"];Progress.parameters={...Progress.parameters,docs:{...Progress.parameters?.docs,source:{originalSource:'{\n  name: \'Progress\',\n  parameters: {\n    docs: {\n      source: {\n        type: \'code\',\n        code: `\n        @Component({\n            template: \n              <aui-steps\n                [orientation]="orientation"\n                [type]="\'progress\'"\n                [selectable]="selectable"\n                [steps]="steps"\n                (currentIndexChange)="currentIndexChange($event)"\n                (selectedIndexChange)="selectedIndexChange($event)"\n              ></aui-steps>\n              <div style="margin-top: 50px">\n                <button aui-button="primary" (click)="start()">Start</button>\n                <button aui-button="primary" (click)="complete()">Complete</button>\n                <button aui-button="primary" (click)="error()">Set Error</button>\n              </div>\n              <div>\n                Selectable: <aui-switch [(ngModel)]="selectable"></aui-switch>\n              </div>\n              <div>\n                Selected Index: {{ selectedIndex }}, Current index: {{ currentIndex }}\n              </div>\n            ,\n          })\n          export class BasicVerticalDemoComponent {\n            orientation: StepsOrientation = \'vertical\';\n            currentIndex = 0;\n            selectedIndex: number;\n            selectable = false;\n            steps: StepItem[] = [\n              {\n                label: \'Step 1\',\n              },\n              {\n                label: \'Step 2\',\n              },\n              {\n                label: \'Step 3\',\n              },\n              {\n                label: \'Step 4\',\n              },\n            ];\n            currentIndexChange(index: number) {\n              this.currentIndex = index;\n            }\n            selectedIndexChange(index: number) {\n              this.selectedIndex = index;\n            }\n            start() {\n              this.setState(StepState.Pending);\n            }\n            complete() {\n              this.setState(StepState.Done);\n            }\n            error() {\n              this.setState(StepState.Error);\n            }\n            private setState(state: StepState) {\n              this.steps[this.currentIndex].state = state;\n              this.steps = [...this.steps];\n            }\n          }        \n        `\n      }\n    }\n  }\n}',...Progress.parameters?.docs?.source}}}},"./stories/steps/step.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Step:()=>Step,__namedExportsOrder:()=>__namedExportsOrder,default:()=>step_stories});var fesm2022_forms=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs"),dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let BasicHorizontalDemoComponent=class BasicHorizontalDemoComponent{constructor(){this.currentIndex=0,this.linear=!1,this.selectable=!1,this.steps=[{label:"Step 1"},{label:"Step 2"},{label:"Step 3"},{label:"Step 4"}]}prev(){this.currentIndex=Math.max(this.currentIndex-1,0)}next(){this.currentIndex=Math.min(this.currentIndex+1,this.steps.length-1)}currentIndexChange(index){this.currentIndex=index}};BasicHorizontalDemoComponent=(0,tslib_es6.Cg)([(0,core.Component)({template:'\n    <aui-steps\n      [currentIndex]="currentIndex"\n      [orientation]="orientation"\n      [steps]="steps"\n      [linear]="linear"\n      [selectable]="selectable"\n      (currentIndexChange)="currentIndexChange($event)"\n    ></aui-steps>\n    <div style="margin-top: 50px">\n      <button\n        aui-button="primary"\n        (click)="prev()"\n      >\n        Previous\n      </button>\n      <button\n        aui-button="primary"\n        (click)="next()"\n      >\n        Next\n      </button>\n    </div>\n    <div>Linear: <aui-switch [(ngModel)]="linear"></aui-switch></div>\n    <div>Selectable: <aui-switch [(ngModel)]="selectable"></aui-switch></div>\n    <div>Current index: {{ currentIndex }}</div>\n  ',changeDetection:core.ChangeDetectionStrategy.OnPush})],BasicHorizontalDemoComponent);var src=__webpack_require__("./src/index.ts");const step_stories={title:"Example/Steps",component:BasicHorizontalDemoComponent,decorators:[(0,dist.moduleMetadata)({declarations:[BasicHorizontalDemoComponent],imports:[fesm2022_forms.YN,src.UXU,src.tmq,src.No7]})]},Step={name:"Step",parameters:{docs:{source:{type:"code",code:'\n        @Component({\n            template: \n              <aui-steps\n                [currentIndex]="currentIndex"\n                [orientation]="orientation"\n                [steps]="steps"\n                [linear]="linear"\n                [selectable]="selectable"\n                (currentIndexChange)="currentIndexChange($event)"\n              ></aui-steps>\n              <div style="margin-top: 50px">\n                <button aui-button="primary" (click)="prev()">Previous</button>\n                <button aui-button="primary" (click)="next()">Next</button>\n              </div>\n              <div>\n                Linear: <aui-switch [(ngModel)]="linear"></aui-switch>\n              </div>\n              <div>\n                Selectable: <aui-switch [(ngModel)]="selectable"></aui-switch>\n              </div>\n              <div>Current index: {{ currentIndex }}</div>\n            ,\n            changeDetection: ChangeDetectionStrategy.OnPush,\n          })\n          export class BasicHorizontalDemoComponent {\n            currentIndex = 0;\n            linear = false;\n            selectable = false;\n            steps: StepItem[] = [\n              {\n                label: \'Step 1\',\n              },\n              {\n                label: \'Step 2\',\n              },\n              {\n                label: \'Step 3\',\n              },\n              {\n                label: \'Step 4\',\n              },\n            ];\n            prev() {\n              this.currentIndex = Math.max(this.currentIndex - 1, 0);\n            }\n            next() {\n              this.currentIndex = Math.min(\n                this.currentIndex + 1,\n                this.steps.length - 1,\n              );\n            }\n            currentIndexChange(index: number) {\n              this.currentIndex = index;\n            }\n          }\n        '}}}},__namedExportsOrder=["Step"];Step.parameters={...Step.parameters,docs:{...Step.parameters?.docs,source:{originalSource:'{\n  name: \'Step\',\n  parameters: {\n    docs: {\n      source: {\n        type: \'code\',\n        code: `\n        @Component({\n            template: \n              <aui-steps\n                [currentIndex]="currentIndex"\n                [orientation]="orientation"\n                [steps]="steps"\n                [linear]="linear"\n                [selectable]="selectable"\n                (currentIndexChange)="currentIndexChange($event)"\n              ></aui-steps>\n              <div style="margin-top: 50px">\n                <button aui-button="primary" (click)="prev()">Previous</button>\n                <button aui-button="primary" (click)="next()">Next</button>\n              </div>\n              <div>\n                Linear: <aui-switch [(ngModel)]="linear"></aui-switch>\n              </div>\n              <div>\n                Selectable: <aui-switch [(ngModel)]="selectable"></aui-switch>\n              </div>\n              <div>Current index: {{ currentIndex }}</div>\n            ,\n            changeDetection: ChangeDetectionStrategy.OnPush,\n          })\n          export class BasicHorizontalDemoComponent {\n            currentIndex = 0;\n            linear = false;\n            selectable = false;\n            steps: StepItem[] = [\n              {\n                label: \'Step 1\',\n              },\n              {\n                label: \'Step 2\',\n              },\n              {\n                label: \'Step 3\',\n              },\n              {\n                label: \'Step 4\',\n              },\n            ];\n            prev() {\n              this.currentIndex = Math.max(this.currentIndex - 1, 0);\n            }\n            next() {\n              this.currentIndex = Math.min(\n                this.currentIndex + 1,\n                this.steps.length - 1,\n              );\n            }\n            currentIndexChange(index: number) {\n              this.currentIndex = index;\n            }\n          }\n        `\n      }\n    }\n  }\n}',...Step.parameters?.docs?.source}}}}}]);