(self.webpackChunk_alauda_ui=self.webpackChunk_alauda_ui||[]).push([[521,8980,9632],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{R:()=>useMDXComponents,x:()=>MDXProvider});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const emptyComponents={},MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext(emptyComponents);function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((function(){return"function"==typeof components?components(contextComponents):{...contextComponents,...components}}),[contextComponents,components])}function MDXProvider(properties){let allComponents;return allComponents=properties.disableParentContext?"function"==typeof properties.components?properties.components(emptyComponents):properties.components||emptyComponents:useMDXComponents(properties.components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},properties.children)}},"./stories/pattern/pattern.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>MDXContent});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_home_runner_work_ui_ui_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),_global_style_stories__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./stories/pattern/global-style.stories.ts"),_shadow_stories__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./stories/pattern/shadow.stories.ts");function _createMdxContent(props){const _components={h1:"h1",h2:"h2",...(0,_home_runner_work_ui_ui_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_4__.R)(),...props.components};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.W8,{title:"Example/Pattern"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h1,{id:"pattern",children:"Pattern"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"global-style",children:"Global Style"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_global_style_stories__WEBPACK_IMPORTED_MODULE_2__.GlobalStyle,meta:_global_style_stories__WEBPACK_IMPORTED_MODULE_2__}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"shadow",children:"Shadow"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_shadow_stories__WEBPACK_IMPORTED_MODULE_3__.Shadow,meta:_shadow_stories__WEBPACK_IMPORTED_MODULE_3__})]})}function MDXContent(props={}){const{wrapper:MDXLayout}={...(0,_home_runner_work_ui_ui_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_4__.R)(),...props.components};return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,{...props,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}},"./node_modules/@storybook/blocks/dist sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/blocks/dist sync recursive",module.exports=webpackEmptyContext},"./node_modules/@storybook/core/dist/components sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/core/dist/components sync recursive",module.exports=webpackEmptyContext},"./node_modules/@storybook/core/dist/theming sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/core/dist/theming sync recursive",module.exports=webpackEmptyContext},"./stories/pattern/global-style.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{GlobalStyle:()=>GlobalStyle,__namedExportsOrder:()=>__namedExportsOrder,default:()=>global_style_stories});var animations=__webpack_require__("./node_modules/@angular/platform-browser/fesm2022/animations.mjs"),dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),global_style_componentngResource=__webpack_require__("./stories/pattern/global-style.component.scss?ngResource"),global_style_componentngResource_default=__webpack_require__.n(global_style_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let GlobalStyleComponent=class GlobalStyleComponent{};GlobalStyleComponent=(0,tslib_es6.Cg)([(0,core.Component)({template:'<section>\n      <div>跳转链接:</div>\n      <div><a href=".">link</a></div>\n    </section>\n    <section>\n      <div>点击复制 icon:</div>\n      <div>\n        <span>跟在 span 后的复制 icon 会自动添加间距</span>\n        <aui-icon\n          icon="copy"\n          auiTooltipCopy="value"\n        ></aui-icon>\n      </div>\n    </section> ',changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!1,styles:[global_style_componentngResource_default()]})],GlobalStyleComponent);var src=__webpack_require__("./src/index.ts");const global_style_stories={title:"Example/Pattern",component:GlobalStyleComponent,decorators:[(0,dist.moduleMetadata)({imports:[src.opy,src.Ss0,animations.BrowserAnimationsModule],declarations:[GlobalStyleComponent]})]},GlobalStyle={name:"global style"},__namedExportsOrder=["GlobalStyle"];GlobalStyle.parameters={...GlobalStyle.parameters,docs:{...GlobalStyle.parameters?.docs,source:{originalSource:"{\n  name: 'global style'\n}",...GlobalStyle.parameters?.docs?.source}}}},"./stories/pattern/shadow.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Shadow:()=>Shadow,__namedExportsOrder:()=>__namedExportsOrder,default:()=>shadow_stories});var dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),shadow_componentngResource=__webpack_require__("./stories/pattern/shadow.component.scss?ngResource"),shadow_componentngResource_default=__webpack_require__.n(shadow_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let ShadowComponent=class ShadowComponent{};ShadowComponent=(0,tslib_es6.Cg)([(0,core.Component)({template:'<div class="container">\n    <div class="card shadow-0">&#64;include shadow-0</div>\n    <div class="card shadow-2">&#64;include shadow-2</div>\n    <div class="card shadow-8">&#64;include shadow-8</div>\n    <div class="card shadow-16">&#64;include shadow-16</div>\n  </div> ',changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!1,styles:[shadow_componentngResource_default()]})],ShadowComponent);const shadow_stories={title:"Example/Pattern",component:ShadowComponent,decorators:[(0,dist.moduleMetadata)({declarations:[ShadowComponent]})]},Shadow={name:"shadow"},__namedExportsOrder=["Shadow"];Shadow.parameters={...Shadow.parameters,docs:{...Shadow.parameters?.docs,source:{originalSource:"{\n  name: 'shadow'\n}",...Shadow.parameters?.docs?.source}}}},"./stories/pattern/global-style.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,'.cdk-overlay-container, .cdk-global-overlay-wrapper {\n  pointer-events: none;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n}\n\n.cdk-overlay-container {\n  position: fixed;\n  z-index: 1000;\n}\n\n.cdk-overlay-container:empty {\n  display: none;\n}\n\n.cdk-global-overlay-wrapper {\n  display: flex;\n  position: absolute;\n  z-index: 1000;\n}\n\n.cdk-overlay-pane {\n  position: absolute;\n  pointer-events: auto;\n  box-sizing: border-box;\n  display: flex;\n  max-width: 100%;\n  max-height: 100%;\n  z-index: 1000;\n}\n\n.cdk-overlay-backdrop {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  pointer-events: auto;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  opacity: 0;\n  z-index: 1000;\n  transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);\n}\n\n.cdk-overlay-backdrop-showing {\n  opacity: 1;\n}\n\n@media (forced-colors: active) {\n  .cdk-overlay-backdrop-showing {\n    opacity: 0.6;\n  }\n}\n.cdk-overlay-dark-backdrop {\n  background: rgba(0, 0, 0, 0.32);\n}\n\n.cdk-overlay-transparent-backdrop {\n  transition: visibility 1ms linear, opacity 1ms linear;\n  visibility: hidden;\n  opacity: 1;\n}\n\n.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing, .cdk-high-contrast-active .cdk-overlay-transparent-backdrop {\n  opacity: 0;\n  visibility: visible;\n}\n\n.cdk-overlay-backdrop-noop-animation {\n  transition: none;\n}\n\n.cdk-overlay-connected-position-bounding-box {\n  position: absolute;\n  display: flex;\n  flex-direction: column;\n  min-width: 1px;\n  min-height: 1px;\n  z-index: 1000;\n}\n\n.cdk-global-scrollblock {\n  position: fixed;\n  width: 100%;\n  overflow-y: scroll;\n}\n\n:root {\n  color-scheme: light;\n  --aui-color-blue: 0, 122, 245;\n  --aui-color-b-0: 0, 103, 208;\n  --aui-color-b-1: 38, 141, 246;\n  --aui-color-b-2: 77, 162, 248;\n  --aui-color-b-3: 102, 175, 249;\n  --aui-color-b-4: 179, 215, 252;\n  --aui-color-b-5: 204, 228, 253;\n  --aui-color-b-6: 229, 241, 254;\n  --aui-color-b-7: 242, 248, 254;\n  --aui-color-primary: var(--aui-color-blue);\n  --aui-color-p-0: var(--aui-color-b-0);\n  --aui-color-p-1: var(--aui-color-b-1);\n  --aui-color-p-2: var(--aui-color-b-2);\n  --aui-color-p-3: var(--aui-color-b-3);\n  --aui-color-p-4: var(--aui-color-b-4);\n  --aui-color-p-5: var(--aui-color-b-5);\n  --aui-color-p-6: var(--aui-color-b-6);\n  --aui-color-p-7: var(--aui-color-b-7);\n  --aui-color-green: 0, 194, 97;\n  --aui-color-g-0: 0, 165, 82;\n  --aui-color-g-1: 38, 203, 120;\n  --aui-color-g-2: 76, 212, 144;\n  --aui-color-g-4: 179, 236, 207;\n  --aui-color-g-6: 230, 249, 239;\n  --aui-color-g-7: 242, 251, 246;\n  --aui-color-yellow: 245, 163, 0;\n  --aui-color-y-0: 220, 146, 0;\n  --aui-color-y-1: 246, 176, 38;\n  --aui-color-y-2: 248, 190, 77;\n  --aui-color-y-4: 252, 227, 179;\n  --aui-color-y-6: 254, 245, 230;\n  --aui-color-y-7: 254, 250, 243;\n  --aui-color-red: 235, 0, 39;\n  --aui-color-r-0: 199, 0, 33;\n  --aui-color-r-1: 237, 38, 71;\n  --aui-color-r-2: 241, 76, 103;\n  --aui-color-r-4: 249, 179, 190;\n  --aui-color-r-6: 253, 230, 233;\n  --aui-color-r-7: 254, 243, 244;\n  --aui-color-n-1: 50, 52, 55;\n  --aui-color-n-2: 100, 102, 105;\n  --aui-color-n-3: 124, 126, 129;\n  --aui-color-n-4: 150, 152, 155;\n  --aui-color-n-5: 174, 176, 179;\n  --aui-color-n-6: 200, 202, 205;\n  --aui-color-n-7: 212, 214, 217;\n  --aui-color-n-8: 237, 239, 242;\n  --aui-color-n-9: 247, 249, 252;\n  --aui-color-n-10: 255, 255, 255;\n  --aui-color-origin-shadow: var(--aui-color-n-1);\n  --aui-color-popper-bg: var(--aui-color-n-10);\n  --aui-color-button-bg: var(--aui-color-n-9);\n  --aui-color-main-bg: var(--aui-color-n-9);\n  --aui-color-divider: var(--aui-color-n-8);\n  --aui-color-border: var(--aui-color-n-7);\n  --aui-color-main-text: var(--aui-color-n-1);\n  --aui-color-secondary-text: var(--aui-color-n-2);\n  --aui-color-help-text: var(--aui-color-n-4);\n  --aui-color-disabled-text: var(--aui-color-n-6);\n  --aui-color-placeholder-text: var(--aui-color-n-6);\n}\n\nhtml[aui-theme-mode=light] {\n  color-scheme: light;\n  --aui-color-blue: 0, 122, 245;\n  --aui-color-b-0: 0, 103, 208;\n  --aui-color-b-1: 38, 141, 246;\n  --aui-color-b-2: 77, 162, 248;\n  --aui-color-b-3: 102, 175, 249;\n  --aui-color-b-4: 179, 215, 252;\n  --aui-color-b-5: 204, 228, 253;\n  --aui-color-b-6: 229, 241, 254;\n  --aui-color-b-7: 242, 248, 254;\n  --aui-color-primary: var(--aui-color-blue);\n  --aui-color-p-0: var(--aui-color-b-0);\n  --aui-color-p-1: var(--aui-color-b-1);\n  --aui-color-p-2: var(--aui-color-b-2);\n  --aui-color-p-3: var(--aui-color-b-3);\n  --aui-color-p-4: var(--aui-color-b-4);\n  --aui-color-p-5: var(--aui-color-b-5);\n  --aui-color-p-6: var(--aui-color-b-6);\n  --aui-color-p-7: var(--aui-color-b-7);\n  --aui-color-green: 0, 194, 97;\n  --aui-color-g-0: 0, 165, 82;\n  --aui-color-g-1: 38, 203, 120;\n  --aui-color-g-2: 76, 212, 144;\n  --aui-color-g-4: 179, 236, 207;\n  --aui-color-g-6: 230, 249, 239;\n  --aui-color-g-7: 242, 251, 246;\n  --aui-color-yellow: 245, 163, 0;\n  --aui-color-y-0: 220, 146, 0;\n  --aui-color-y-1: 246, 176, 38;\n  --aui-color-y-2: 248, 190, 77;\n  --aui-color-y-4: 252, 227, 179;\n  --aui-color-y-6: 254, 245, 230;\n  --aui-color-y-7: 254, 250, 243;\n  --aui-color-red: 235, 0, 39;\n  --aui-color-r-0: 199, 0, 33;\n  --aui-color-r-1: 237, 38, 71;\n  --aui-color-r-2: 241, 76, 103;\n  --aui-color-r-4: 249, 179, 190;\n  --aui-color-r-6: 253, 230, 233;\n  --aui-color-r-7: 254, 243, 244;\n  --aui-color-n-1: 50, 52, 55;\n  --aui-color-n-2: 100, 102, 105;\n  --aui-color-n-3: 124, 126, 129;\n  --aui-color-n-4: 150, 152, 155;\n  --aui-color-n-5: 174, 176, 179;\n  --aui-color-n-6: 200, 202, 205;\n  --aui-color-n-7: 212, 214, 217;\n  --aui-color-n-8: 237, 239, 242;\n  --aui-color-n-9: 247, 249, 252;\n  --aui-color-n-10: 255, 255, 255;\n  --aui-color-origin-shadow: var(--aui-color-n-1);\n  --aui-color-popper-bg: var(--aui-color-n-10);\n  --aui-color-button-bg: var(--aui-color-n-9);\n  --aui-color-main-bg: var(--aui-color-n-9);\n  --aui-color-divider: var(--aui-color-n-8);\n  --aui-color-border: var(--aui-color-n-7);\n  --aui-color-main-text: var(--aui-color-n-1);\n  --aui-color-secondary-text: var(--aui-color-n-2);\n  --aui-color-help-text: var(--aui-color-n-4);\n  --aui-color-disabled-text: var(--aui-color-n-6);\n  --aui-color-placeholder-text: var(--aui-color-n-6);\n}\n\n@media (prefers-color-scheme: dark) {\n  html[aui-theme-mode=system] {\n    color-scheme: dark;\n    --aui-color-blue: 61, 142, 255;\n    --aui-color-b-0: 54, 116, 204;\n    --aui-color-b-1: 109, 170, 255;\n    --aui-color-b-2: 53, 111, 193;\n    --aui-color-b-3: 50, 101, 173;\n    --aui-color-b-4: 47, 85, 143;\n    --aui-color-b-5: 40, 54, 81;\n    --aui-color-b-6: 42, 64, 102;\n    --aui-color-b-7: 44, 74, 122;\n    --aui-color-primary: var(--aui-color-blue);\n    --aui-color-p-0: var(--aui-color-b-0);\n    --aui-color-p-1: var(--aui-color-b-1);\n    --aui-color-p-2: var(--aui-color-b-2);\n    --aui-color-p-3: var(--aui-color-b-3);\n    --aui-color-p-4: var(--aui-color-b-4);\n    --aui-color-p-5: var(--aui-color-b-5);\n    --aui-color-p-6: var(--aui-color-b-6);\n    --aui-color-p-7: var(--aui-color-b-7);\n    --aui-color-green: 17, 182, 113;\n    --aui-color-g-0: 21, 146, 97;\n    --aui-color-g-1: 76, 200, 148;\n    --aui-color-g-2: 22, 139, 93;\n    --aui-color-g-4: 27, 103, 78;\n    --aui-color-g-6: 31, 74, 66;\n    --aui-color-g-7: 28, 88, 72;\n    --aui-color-yellow: 237, 172, 44;\n    --aui-color-y-0: 186, 138, 45;\n    --aui-color-y-1: 241, 192, 96;\n    --aui-color-y-2: 176, 132, 45;\n    --aui-color-y-4: 126, 98, 47;\n    --aui-color-y-6: 86, 72, 49;\n    --aui-color-y-7: 105, 85, 48;\n    --aui-color-red: 226, 50, 79;\n    --aui-color-r-0: 178, 47, 72;\n    --aui-color-r-1: 233, 101, 123;\n    --aui-color-r-2: 168, 46, 70;\n    --aui-color-r-4: 121, 43, 63;\n    --aui-color-r-6: 83, 41, 57;\n    --aui-color-r-7: 101, 42, 60;\n    --aui-color-n-1: 238, 239, 243;\n    --aui-color-n-2: 200, 201, 205;\n    --aui-color-n-3: 184, 186, 194;\n    --aui-color-n-4: 152, 154, 162;\n    --aui-color-n-5: 144, 147, 159;\n    --aui-color-n-6: 120, 123, 135;\n    --aui-color-n-7: 92, 95, 107;\n    --aui-color-n-8: 67, 70, 82;\n    --aui-color-n-9: 24, 27, 39;\n    --aui-color-n-10: 36, 39, 51;\n    --aui-color-origin-shadow: var(--aui-color-n-9);\n    --aui-color-popper-bg: 56, 59, 71;\n    --aui-color-button-bg: 56, 59, 71;\n    --aui-color-main-bg: var(--aui-color-n-9);\n    --aui-color-divider: var(--aui-color-n-8);\n    --aui-color-border: var(--aui-color-n-7);\n    --aui-color-main-text: var(--aui-color-n-1);\n    --aui-color-secondary-text: var(--aui-color-n-2);\n    --aui-color-help-text: var(--aui-color-n-4);\n    --aui-color-disabled-text: var(--aui-color-n-6);\n    --aui-color-placeholder-text: var(--aui-color-n-6);\n  }\n}\n\nhtml[aui-theme-mode=dark] {\n  color-scheme: dark;\n  --aui-color-blue: 61, 142, 255;\n  --aui-color-b-0: 54, 116, 204;\n  --aui-color-b-1: 109, 170, 255;\n  --aui-color-b-2: 53, 111, 193;\n  --aui-color-b-3: 50, 101, 173;\n  --aui-color-b-4: 47, 85, 143;\n  --aui-color-b-5: 40, 54, 81;\n  --aui-color-b-6: 42, 64, 102;\n  --aui-color-b-7: 44, 74, 122;\n  --aui-color-primary: var(--aui-color-blue);\n  --aui-color-p-0: var(--aui-color-b-0);\n  --aui-color-p-1: var(--aui-color-b-1);\n  --aui-color-p-2: var(--aui-color-b-2);\n  --aui-color-p-3: var(--aui-color-b-3);\n  --aui-color-p-4: var(--aui-color-b-4);\n  --aui-color-p-5: var(--aui-color-b-5);\n  --aui-color-p-6: var(--aui-color-b-6);\n  --aui-color-p-7: var(--aui-color-b-7);\n  --aui-color-green: 17, 182, 113;\n  --aui-color-g-0: 21, 146, 97;\n  --aui-color-g-1: 76, 200, 148;\n  --aui-color-g-2: 22, 139, 93;\n  --aui-color-g-4: 27, 103, 78;\n  --aui-color-g-6: 31, 74, 66;\n  --aui-color-g-7: 28, 88, 72;\n  --aui-color-yellow: 237, 172, 44;\n  --aui-color-y-0: 186, 138, 45;\n  --aui-color-y-1: 241, 192, 96;\n  --aui-color-y-2: 176, 132, 45;\n  --aui-color-y-4: 126, 98, 47;\n  --aui-color-y-6: 86, 72, 49;\n  --aui-color-y-7: 105, 85, 48;\n  --aui-color-red: 226, 50, 79;\n  --aui-color-r-0: 178, 47, 72;\n  --aui-color-r-1: 233, 101, 123;\n  --aui-color-r-2: 168, 46, 70;\n  --aui-color-r-4: 121, 43, 63;\n  --aui-color-r-6: 83, 41, 57;\n  --aui-color-r-7: 101, 42, 60;\n  --aui-color-n-1: 238, 239, 243;\n  --aui-color-n-2: 200, 201, 205;\n  --aui-color-n-3: 184, 186, 194;\n  --aui-color-n-4: 152, 154, 162;\n  --aui-color-n-5: 144, 147, 159;\n  --aui-color-n-6: 120, 123, 135;\n  --aui-color-n-7: 92, 95, 107;\n  --aui-color-n-8: 67, 70, 82;\n  --aui-color-n-9: 24, 27, 39;\n  --aui-color-n-10: 36, 39, 51;\n  --aui-color-origin-shadow: var(--aui-color-n-9);\n  --aui-color-popper-bg: 56, 59, 71;\n  --aui-color-button-bg: 56, 59, 71;\n  --aui-color-main-bg: var(--aui-color-n-9);\n  --aui-color-divider: var(--aui-color-n-8);\n  --aui-color-border: var(--aui-color-n-7);\n  --aui-color-main-text: var(--aui-color-n-1);\n  --aui-color-secondary-text: var(--aui-color-n-2);\n  --aui-color-help-text: var(--aui-color-n-4);\n  --aui-color-disabled-text: var(--aui-color-n-6);\n  --aui-color-placeholder-text: var(--aui-color-n-6);\n}\n\n:root {\n  --aui-inline-height-l: 40px;\n  --aui-inline-height-m: 32px;\n  --aui-inline-height-s: 28px;\n  --aui-inline-height-xs: 24px;\n  --aui-inline-padding-l: 19px;\n  --aui-inline-padding-m: 15px;\n  --aui-inline-padding-s: 11px;\n  --aui-inline-padding-xs: 7px;\n  --aui-inline-padding-xxs: 5px;\n  --aui-spacing-xxxxxl: 40px;\n  --aui-spacing-xxxxl: 32px;\n  --aui-spacing-xxxl: 24px;\n  --aui-spacing-xxl: 20px;\n  --aui-spacing-xl: 16px;\n  --aui-spacing-l: 12px;\n  --aui-spacing-m: 8px;\n  --aui-spacing-s: 4px;\n  --aui-spacing-xs: 2px;\n  --aui-font-weight-bold: 500;\n  --aui-font-weight-bolder: 600;\n  --aui-font-weight-normal: 400;\n  --aui-font-size-xxl: 20px;\n  --aui-font-size-xl: 18px;\n  --aui-font-size-l: 16px;\n  --aui-font-size-m: 14px;\n  --aui-font-size-s: 12px;\n  --aui-line-height-xxxl: 32px;\n  --aui-line-height-xxl: 28px;\n  --aui-line-height-xl: 24px;\n  --aui-line-height-l: 22px;\n  --aui-line-height-m: 20px;\n  --aui-line-height-s: 16px;\n  --aui-icon-size-xxl: 24px;\n  --aui-icon-size-xl: 24px;\n  --aui-icon-size-l: 16px;\n  --aui-icon-size-m: 16px;\n  --aui-icon-size-s: 12px;\n  --aui-border-radius-l: 4px;\n  --aui-border-radius-m: 2px;\n  --aui-form-item-width-l: 732px;\n  --aui-form-item-width-m: 436px;\n  --aui-form-item-width-s: 140px;\n}\n\nbody {\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", Arial, "Microsoft YaHei", sans-serif;\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 1.43;\n}\n\nbutton {\n  font-size: var(--aui-font-size-m);\n  line-height: var(--aui-line-height-m);\n  font-weight: var(--aui-font-weight-normal);\n}\n\na {\n  color: rgb(var(--aui-color-primary));\n  text-decoration: none;\n}\na:hover {\n  color: rgb(var(--aui-color-p-1));\n  text-decoration: underline;\n}\na:active, a:focus {\n  color: rgb(var(--aui-color-p-0));\n  text-decoration: underline;\n}\n\n[class^=aui-],\n[class*=" aui-"] {\n  box-sizing: border-box;\n}\n[class^=aui-][hidden],\n[class*=" aui-"][hidden] {\n  display: none;\n}\n\n.aui-tooltip-copy {\n  cursor: pointer;\n}\n\nspan + aui-icon.aui-tooltip-copy {\n  margin-left: var(--aui-spacing-s);\n}\naui-icon.aui-tooltip-copy:hover {\n  color: rgb(var(--aui-color-primary));\n}\n\n.aui-tab-label__content aui-icon:first-child .aui-icon {\n  margin-right: var(--aui-spacing-s);\n}\n\nsection {\n  padding: 20px;\n}\nsection > div + div {\n  margin-top: 8px;\n}',""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./stories/pattern/shadow.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,".container {\n  padding: 20px;\n  display: grid;\n  grid-gap: 16px;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  background-color: #eee;\n}\n\n.card {\n  height: 200px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.shadow-0 {\n  border-radius: var(--aui-border-radius-m);\n  background-color: rgb(var(--aui-color-n-10));\n}\n\n.shadow-2 {\n  border-radius: var(--aui-border-radius-m);\n  background-color: rgb(var(--aui-color-n-10));\n  box-shadow: 0 0 2px 0 rgba(var(--aui-color-origin-shadow), 0.24);\n}\n\n.shadow-8 {\n  border-radius: var(--aui-border-radius-m);\n  background-color: rgb(var(--aui-color-n-10));\n  box-shadow: 0 2px 8px 0 rgba(var(--aui-color-origin-shadow), 0.16);\n}\n\n.shadow-16 {\n  border-radius: var(--aui-border-radius-m);\n  background-color: rgb(var(--aui-color-n-10));\n  box-shadow: 0 4px 16px 0 rgba(var(--aui-color-origin-shadow), 0.16);\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);