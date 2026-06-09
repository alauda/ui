---
version: "10.0.1"
name: "Alauda UI"
description: "A design specification for dense enterprise console interfaces using Alauda UI tokens and SCSS theme tools."
metadata:
  package: "@alauda/ui"
  sourceOfTruth:
    themePreset: "src/theme/_theme-preset.scss"
    sassTokens: "src/theme/_base-var.scss"
    sassMixins: "src/theme/_mixin.scss"
    sassPatterns: "src/theme/_pattern.scss"
    globalStyle: "src/theme/style.scss"
  styleLanguage: "SCSS"
  framework: "Angular"
  cssPrefix: "aui"
colors:
  blue: "rgb(0, 122, 245)"
  blue-0: "rgb(0, 103, 208)"
  blue-1: "rgb(38, 141, 246)"
  blue-2: "rgb(77, 162, 248)"
  blue-3: "rgb(102, 175, 249)"
  blue-4: "rgb(179, 215, 252)"
  blue-5: "rgb(204, 228, 253)"
  blue-6: "rgb(229, 241, 254)"
  blue-7: "rgb(242, 248, 254)"
  primary: "{colors.blue}"
  primary-0: "{colors.blue-0}"
  primary-1: "{colors.blue-1}"
  primary-2: "{colors.blue-2}"
  primary-3: "{colors.blue-3}"
  primary-4: "{colors.blue-4}"
  primary-5: "{colors.blue-5}"
  primary-6: "{colors.blue-6}"
  primary-7: "{colors.blue-7}"
  green: "rgb(0, 194, 97)"
  green-0: "rgb(0, 165, 82)"
  green-1: "rgb(38, 203, 120)"
  green-2: "rgb(76, 212, 144)"
  green-4: "rgb(179, 236, 207)"
  green-6: "rgb(230, 249, 239)"
  green-7: "rgb(242, 251, 246)"
  success: "{colors.green}"
  success-0: "{colors.green-0}"
  success-1: "{colors.green-1}"
  success-2: "{colors.green-2}"
  success-4: "{colors.green-4}"
  success-6: "{colors.green-6}"
  success-7: "{colors.green-7}"
  yellow: "rgb(245, 163, 0)"
  yellow-0: "rgb(220, 146, 0)"
  yellow-1: "rgb(246, 176, 38)"
  yellow-2: "rgb(248, 190, 77)"
  yellow-4: "rgb(252, 227, 179)"
  yellow-6: "rgb(254, 245, 230)"
  yellow-7: "rgb(254, 250, 243)"
  warning: "{colors.yellow}"
  warning-0: "{colors.yellow-0}"
  warning-1: "{colors.yellow-1}"
  warning-2: "{colors.yellow-2}"
  warning-4: "{colors.yellow-4}"
  warning-6: "{colors.yellow-6}"
  warning-7: "{colors.yellow-7}"
  red: "rgb(235, 0, 39)"
  red-0: "rgb(199, 0, 33)"
  red-1: "rgb(237, 38, 71)"
  red-2: "rgb(241, 76, 103)"
  red-4: "rgb(249, 179, 190)"
  red-6: "rgb(253, 230, 233)"
  red-7: "rgb(254, 243, 244)"
  danger: "{colors.red}"
  danger-0: "{colors.red-0}"
  danger-1: "{colors.red-1}"
  danger-2: "{colors.red-2}"
  danger-4: "{colors.red-4}"
  danger-6: "{colors.red-6}"
  danger-7: "{colors.red-7}"
  neutral-1: "rgb(50, 52, 55)"
  neutral-2: "rgb(100, 102, 105)"
  neutral-3: "rgb(124, 126, 129)"
  neutral-4: "rgb(150, 152, 155)"
  neutral-5: "rgb(174, 176, 179)"
  neutral-6: "rgb(200, 202, 205)"
  neutral-7: "rgb(212, 214, 217)"
  neutral-8: "rgb(237, 239, 242)"
  neutral-9: "rgb(247, 249, 252)"
  neutral-10: "rgb(255, 255, 255)"
  text-main: "{colors.neutral-1}"
  text-secondary: "{colors.neutral-2}"
  text-help: "{colors.neutral-4}"
  text-disabled: "{colors.neutral-6}"
  text-placeholder: "{colors.neutral-6}"
  surface-page: "{colors.neutral-9}"
  surface-button: "{colors.neutral-9}"
  surface-raised: "{colors.neutral-10}"
  surface-popper: "{colors.neutral-10}"
  border-default: "{colors.neutral-7}"
  divider: "{colors.neutral-8}"
  shadow-origin: "{colors.neutral-1}"
  white: "rgb(255, 255, 255)"
  dark-blue: "rgb(61, 142, 255)"
  dark-blue-0: "rgb(54, 116, 204)"
  dark-blue-1: "rgb(109, 170, 255)"
  dark-blue-2: "rgb(53, 111, 193)"
  dark-blue-3: "rgb(50, 101, 173)"
  dark-blue-4: "rgb(47, 85, 143)"
  dark-blue-5: "rgb(40, 54, 81)"
  dark-blue-6: "rgb(42, 64, 102)"
  dark-blue-7: "rgb(44, 74, 122)"
  dark-primary: "{colors.dark-blue}"
  dark-green: "rgb(17, 182, 113)"
  dark-green-0: "rgb(21, 146, 97)"
  dark-green-1: "rgb(76, 200, 148)"
  dark-green-2: "rgb(22, 139, 93)"
  dark-green-4: "rgb(27, 103, 78)"
  dark-green-6: "rgb(31, 74, 66)"
  dark-green-7: "rgb(28, 88, 72)"
  dark-success: "{colors.dark-green}"
  dark-success-0: "{colors.dark-green-0}"
  dark-success-1: "{colors.dark-green-1}"
  dark-success-2: "{colors.dark-green-2}"
  dark-success-4: "{colors.dark-green-4}"
  dark-success-6: "{colors.dark-green-6}"
  dark-success-7: "{colors.dark-green-7}"
  dark-yellow: "rgb(237, 172, 44)"
  dark-yellow-0: "rgb(186, 138, 45)"
  dark-yellow-1: "rgb(241, 192, 96)"
  dark-yellow-2: "rgb(176, 132, 45)"
  dark-yellow-4: "rgb(126, 98, 47)"
  dark-yellow-6: "rgb(86, 72, 49)"
  dark-yellow-7: "rgb(105, 85, 48)"
  dark-warning: "{colors.dark-yellow}"
  dark-warning-0: "{colors.dark-yellow-0}"
  dark-warning-1: "{colors.dark-yellow-1}"
  dark-warning-2: "{colors.dark-yellow-2}"
  dark-warning-4: "{colors.dark-yellow-4}"
  dark-warning-6: "{colors.dark-yellow-6}"
  dark-warning-7: "{colors.dark-yellow-7}"
  dark-red: "rgb(226, 50, 79)"
  dark-red-0: "rgb(178, 47, 72)"
  dark-red-1: "rgb(233, 101, 123)"
  dark-red-2: "rgb(168, 46, 70)"
  dark-red-4: "rgb(121, 43, 63)"
  dark-red-6: "rgb(83, 41, 57)"
  dark-red-7: "rgb(101, 42, 60)"
  dark-danger: "{colors.dark-red}"
  dark-danger-0: "{colors.dark-red-0}"
  dark-danger-1: "{colors.dark-red-1}"
  dark-danger-2: "{colors.dark-red-2}"
  dark-danger-4: "{colors.dark-red-4}"
  dark-danger-6: "{colors.dark-red-6}"
  dark-danger-7: "{colors.dark-red-7}"
  dark-neutral-1: "rgb(238, 239, 243)"
  dark-neutral-2: "rgb(200, 201, 205)"
  dark-neutral-3: "rgb(184, 186, 194)"
  dark-neutral-4: "rgb(152, 154, 162)"
  dark-neutral-5: "rgb(144, 147, 159)"
  dark-neutral-6: "rgb(120, 123, 135)"
  dark-neutral-7: "rgb(92, 95, 107)"
  dark-neutral-8: "rgb(67, 70, 82)"
  dark-neutral-9: "rgb(24, 27, 39)"
  dark-neutral-10: "rgb(36, 39, 51)"
  dark-surface-page: "{colors.dark-neutral-9}"
  dark-surface-raised: "{colors.dark-neutral-10}"
  dark-surface-popper: "rgb(56, 59, 71)"
  dark-border-default: "{colors.dark-neutral-7}"
  dark-divider: "{colors.dark-neutral-8}"
typography:
  body-small:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', Arial, 'Microsoft YaHei', sans-serif"
    fontSize: "12px"
    fontWeight: "400"
    lineHeight: "16px"
  body-medium:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', Arial, 'Microsoft YaHei', sans-serif"
    fontSize: "14px"
    fontWeight: "400"
    lineHeight: "20px"
  body-large:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', Arial, 'Microsoft YaHei', sans-serif"
    fontSize: "16px"
    fontWeight: "400"
    lineHeight: "22px"
  title-small:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', Arial, 'Microsoft YaHei', sans-serif"
    fontSize: "16px"
    fontWeight: "600"
    lineHeight: "22px"
  title-medium:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', Arial, 'Microsoft YaHei', sans-serif"
    fontSize: "18px"
    fontWeight: "600"
    lineHeight: "24px"
  title-large:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', Arial, 'Microsoft YaHei', sans-serif"
    fontSize: "20px"
    fontWeight: "600"
    lineHeight: "28px"
rounded:
  control: "2px"
  surface: "4px"
  circle: "9999px"
spacing:
  xxs: "2px"
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  xxl: "24px"
  xxxl: "32px"
  xxxxl: "40px"
  control-height-mini: "24px"
  control-height-small: "28px"
  control-height-medium: "32px"
  control-height-large: "40px"
  control-padding-xxs: "5px"
  control-padding-xs: "7px"
  control-padding-small: "11px"
  control-padding-medium: "15px"
  control-padding-large: "19px"
  icon-small: "12px"
  icon-medium: "16px"
  icon-large: "16px"
  icon-xlarge: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.white}"
    typography: "{typography.body-medium}"
    rounded: "{rounded.control}"
    height: "{spacing.control-height-medium}"
    padding: "0 15px"
  button-primary-hover:
    backgroundColor: "{colors.primary-1}"
    textColor: "{colors.white}"
  button-primary-active:
    backgroundColor: "{colors.primary-0}"
    textColor: "{colors.white}"
  button-primary-disabled:
    backgroundColor: "{colors.primary-4}"
    textColor: "{colors.white}"
  button-default:
    backgroundColor: "{colors.surface-button}"
    textColor: "{colors.text-main}"
    borderColor: "{colors.border-default}"
    typography: "{typography.body-medium}"
    rounded: "{rounded.control}"
    height: "{spacing.control-height-medium}"
    padding: "0 15px"
  input-default:
    backgroundColor: "{colors.surface-page}"
    textColor: "{colors.text-main}"
    borderColor: "{colors.border-default}"
    typography: "{typography.body-medium}"
    rounded: "{rounded.control}"
    height: "{spacing.control-height-medium}"
    padding: "0 7px"
  input-focus:
    borderColor: "{colors.primary}"
    boxShadow: "0 0 0 2px rgba(var(--aui-color-primary), 0.16)"
  input-error:
    borderColor: "{colors.danger}"
    boxShadow: "0 0 0 2px rgba(var(--aui-color-red), 0.16)"
  text-main:
    textColor: "{colors.text-main}"
    typography: "{typography.body-medium}"
  text-secondary:
    textColor: "{colors.text-secondary}"
    typography: "{typography.body-medium}"
  surface-page:
    backgroundColor: "{colors.surface-page}"
  surface-raised:
    backgroundColor: "{colors.surface-raised}"
    rounded: "{rounded.surface}"
  surface-popper:
    backgroundColor: "{colors.surface-popper}"
    rounded: "{rounded.control}"
    boxShadow: "0 2px 8px 0 rgba(var(--aui-color-origin-shadow), 0.2)"
  surface-modal:
    backgroundColor: "{colors.surface-popper}"
    rounded: "{rounded.control}"
    boxShadow: "0 2px 8px 0 rgba(var(--aui-color-origin-shadow), 0.2)"
  status-success:
    textColor: "{colors.success}"
    backgroundColor: "{colors.success-6}"
  status-warning:
    textColor: "{colors.warning}"
    backgroundColor: "{colors.warning-6}"
  status-danger:
    textColor: "{colors.danger}"
    backgroundColor: "{colors.danger-6}"
---

# Alauda UI Design System

This document defines the design system behind Alauda UI. It is written for coding agents that need to produce styles matching Alauda's product design language. Follow the Google `design.md` structure first; Alauda-specific SCSS guidance is included only where it helps implement the spec correctly.

## Overview

Alauda UI is a dense enterprise console design system. Its screens are used for operational workflows: data comparison, status monitoring, resource management, form entry, and fast corrective actions. The visual tone is calm, precise, and utilitarian.

The system optimizes for clarity, density, and consistency. It should not look like a marketing site, portfolio, or editorial page. Avoid large decorative hero sections, gradient-heavy backgrounds, oversized ornamental type, arbitrary accent colors, and card grids that do not serve a workflow.

When creating interface styles, start with the product task: what state must be scanned, what action must be taken, and what feedback must be visible. Use the tokens in this file to express hierarchy, density, state, and surface relationships.

## Colors

Use colors semantically. Do not choose a token because the raw color looks close; choose it because it expresses the intended role.

Primary blue is for interaction and brand emphasis: primary actions, active indicators, selected states, focus affordances, and links. Stronger or weaker primary steps are used only for interaction states such as hover, active, selected backgrounds, and disabled primary controls.

Status colors communicate system state:

- Success uses `success` and its steps.
- Warning uses `warning` and its steps.
- Error, danger, destructive actions, and failed states use `danger` and its steps.
- Informational active state can use `primary` when the component has no separate info palette.

Neutral colors define information hierarchy:

- `text-main`, `text-secondary`, `text-help`, `text-disabled`, and `text-placeholder` are preferred for text roles.
- `surface-page`, `surface-button`, `surface-raised`, and `surface-popper` define background roles.
- `border-default` and `divider` separate information without heavy visual weight.
- `shadow-origin` is an input to shadow formulas, not a visible text or icon color.

Alauda CSS color variables store RGB triplets, not complete CSS colors. In SCSS, prefer theme helpers. In raw CSS, wrap the variable.

```scss
@use '@alauda/ui/theme/var' as var;

.summary {
  color: var.use-text-color(main);
  background-color: var.use-rgb(n-10);
  border: 1px solid var.use-rgb(border);
}

.raw-css-example {
  color: rgb(var(--aui-color-main-text));
}
```

Never write `color: var(--aui-color-primary)`. Never introduce missing palette steps.

## Typography

Alauda UI typography is compact and task-oriented. `body-medium` is the default product text style: 14px text on a 20px line. Use larger type only for real hierarchy, such as page titles, section titles, or tab headers.

Use the SCSS text mixin when writing custom styles. It keeps font size, line height, weight, and text color aligned with the design tokens.

```scss
@use '@alauda/ui/theme/mixin' as mixin;

.section-title {
  @include mixin.text-set(l, main, bolder);
}

.help-text {
  @include mixin.text-set(s, help);
}
```

Do not scale font sizes with viewport width. Do not use display-scale typography inside compact panels, table cells, form rows, or operational toolbars.

## Layout

Layout should support scanning and repeated action. A typical enterprise console screen contains a title or context header, a toolbar or filter area, a primary data/form surface, and contextual feedback. Surfaces should be quiet; the data and state should carry the page.

Use spacing tokens to create rhythm. The base working gap is 8px. Use 12px and 16px for section spacing, 20px and above for larger separation. Avoid arbitrary values such as 6px, 10px, 14px, 18px, or 30px unless an existing component requires them.

Control density follows a fixed height scale:

- Mini: 24px for compact embedded controls.
- Small: 28px for dense toolbars and table-adjacent controls.
- Medium: 32px for normal working density.
- Large: 40px for intentionally spacious forms.

Use page and raised surfaces semantically. `surface-page` is the default background. `surface-raised` is for framed content. Borders and dividers should be subtle and structural, not decorative.

## Elevation & Depth

Elevation represents hierarchy, overlay position, or focus. It is not decoration. Use the existing shadow mixins and pattern mixins rather than custom shadow formulas.

```scss
@use '@alauda/ui/theme/var' as var;
@use '@alauda/ui/theme/mixin' as mixin;
@use '@alauda/ui/theme/pattern' as pattern;

.raised-surface {
  @include pattern.shadow-2;
}

.floating-panel {
  background-color: var.use-rgb(popper-bg);
  @include mixin.popper-shadow;
}

.modal-panel {
  @include mixin.modal-shadow;
}
```

Focus rings are part of depth. Use `outline-shadow(...)`; it adapts opacity for light and dark themes.

```scss
@use '@alauda/ui/theme/mixin' as mixin;

.custom-control.isFocused {
  @include mixin.outline-shadow(primary);
}
```

Do not use large blurred shadows, glow effects, or colored decorative shadows.

## Shapes

Shapes are restrained. Most controls use the small 2px radius. Larger framed surfaces use 4px. Circular controls and pills should derive from the component height or use a full radius.

Use shape to clarify affordance, not to decorate. Do not introduce large rounded cards or soft pill containers unless the existing component pattern requires them.

## Components

Component tokens in the front matter describe style roles, not an exhaustive API catalog. Use them as examples of how primitives compose into controls, input states, text roles, surfaces, and status feedback.

For SCSS, use Alauda's theme tools:

```scss
@use '@alauda/ui/theme/var' as var;
@use '@alauda/ui/theme/mixin' as mixin;
@use '@alauda/ui/theme/pattern' as pattern;
```

Core helpers:

- `var.use-var(name)` returns `var(--aui-<name>)`.
- `var.use-rgb(name)` returns `rgb(var(--aui-color-<name>))`.
- `var.use-rgb(name, level)` returns a palette step, for example `var.use-rgb(primary, 6)`.
- `var.use-rgba(name, opacity)` returns `rgba(var(--aui-color-<name>), <opacity>)`.
- `var.use-text-color(level)` returns semantic text roles such as `main`, `secondary`, `help`, `disabled`, or `placeholder`.
- `mixin.text-set(size, color, weight)` applies compact typography.
- `mixin.icon-set(size, color)` aligns icons to text rhythm.
- `mixin.theme-light` and `mixin.theme-dark` scope theme-aware overrides.
- `mixin.card-shadow`, `mixin.popper-shadow`, `mixin.modal-shadow`, and `mixin.modal-backdrop` encode surface depth.
- `mixin.transition(target)` and `mixin.scroll-bar` keep motion and scrollbars consistent.
- `pattern.shadow-0`, `pattern.shadow-2`, `pattern.shadow-8`, and `pattern.shadow-16` define raised surfaces.

Angular style-related inputs should map to design semantics. `size` usually means `large`, `medium`, `small`, or `mini`; use `medium` as the default product density. Inputs such as `type`, `status`, `plain`, `solid`, `disabled`, `readonly`, `loading`, `checked`, and `active` should express action hierarchy, feedback state, density, or interaction state. Prefer the style input over custom overrides when it exists.

Custom SCSS should compose layout around components or implement product-specific surfaces while still using these tokens and helpers.

## Do's and Don'ts

Do:

- Use the canonical token groups in this file when choosing color, type, spacing, radius, and component roles.
- Treat color as semantic state and hierarchy.
- Keep pages data-first, compact, and task-oriented.
- Use `@use '@alauda/ui/theme/var' as var`, `mixin`, and `pattern` for custom SCSS.
- Use `rgb(...)`/`rgba(...)` wrappers or Sass helpers for `--aui-color-*` variables.
- Use theme scopes instead of hard-coded dark-mode colors.
- Keep hover, active, focus, disabled, error, and loading states visible and dimensionally stable.

Don't:

- Do not simplify this document by removing Google-required token groups or canonical sections.
- Do not use raw hex colors for themeable UI.
- Do not use `var(--aui-color-*)` as a complete CSS color.
- Do not invent palette steps or unrelated accent colors.
- Do not inflate spacing or typography for decorative effect.
- Do not create one-off shadows, focus rings, scrollbars, or dark-mode overrides when theme mixins exist.
- Do not compensate for the wrong Angular style input with raw CSS overrides.
