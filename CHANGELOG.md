# Changelog

## 7.4.0

### Minor Changes

- [#548](https://github.com/alauda/ui/pull/548) [`87d2804`](https://github.com/alauda/ui/commit/87d28042b226d87b8e829bed00f021302a2e9827) Thanks [@fengtianze](https://github.com/fengtianze)! - - [BREAKING CHANGE] refactor: remove unnecessary exports

- [#540](https://github.com/alauda/ui/pull/540) [`4504ba8`](https://github.com/alauda/ui/commit/4504ba8d1c80448e54cf61fa5549ab511320f3e7) Thanks [@igauch](https://github.com/igauch)! - - feat: select support readonly

- [#533](https://github.com/alauda/ui/pull/533) [`b4a96de`](https://github.com/alauda/ui/commit/b4a96de507a8625a55216410abc1fe817e9c4202) Thanks [@igauch](https://github.com/igauch)! - - feat: table support resize column width

### Patch Changes

- [#542](https://github.com/alauda/ui/pull/542) [`893f548`](https://github.com/alauda/ui/commit/893f5480ae4f3d3a3b47dfdf1cda3f6fe9c2547d) Thanks [@yangxiaolang](https://github.com/yangxiaolang)! - chore: add plus/minus square icon

## 7.3.2

### Patch Changes

- [#535](https://github.com/alauda/ui/pull/535) [`18ab9e9`](https://github.com/alauda/ui/commit/18ab9e90fe4068b188f00a0d74a72a2b465789bf) Thanks [@igauch](https://github.com/igauch)! - - fix(drawer): no default config when using component mode
  - feat(drawer): template context support contentParams as $implicit

## 7.3.1

### Patch Changes

- [#531](https://github.com/alauda/ui/pull/531) [`780dfb2`](https://github.com/alauda/ui/commit/780dfb2830a0cbac327496e13934240760ea36fc) Thanks [@igauch](https://github.com/igauch)! - - fix: no default config for using service mode
  - fix: not auto destroy when hiding for using service mode

## 7.3.0

### Minor Changes

- [#530](https://github.com/alauda/ui/pull/530) [`9092f15`](https://github.com/alauda/ui/commit/9092f151cf0a91ca5ba43aced520c931747c633b) Thanks [@igauch](https://github.com/igauch)! - - fix: `close` event will be triggered twice - close #247
  - fix: no transition when use drawer service - close #529
  - refactor: only instantiate when opened
  - [BREAKING CHANGE] refactor: return type of `DrawerService#open` is changed from `DrawerComponent` to `DrawerRef`

### Patch Changes

- [#521](https://github.com/alauda/ui/pull/521) [`607c016`](https://github.com/alauda/ui/commit/607c016119b3199d67bc01703585b540457ad8cd) Thanks [@yangxiaolang](https://github.com/yangxiaolang)! - fix: drawer scroll strategy adjust

- [#527](https://github.com/alauda/ui/pull/527) [`3040f5e`](https://github.com/alauda/ui/commit/3040f5e0c6af1446c798500c9d08c668aba0287b) Thanks [@yangxiaolang](https://github.com/yangxiaolang)! - fix: form item label top margin bottom use s

- [#525](https://github.com/alauda/ui/pull/525) [`369ee93`](https://github.com/alauda/ui/commit/369ee9353580ff646dc590255382f1cc84449a1b) Thanks [@yangxiaolang](https://github.com/yangxiaolang)! - fix: autocomplete circle dependencies

## 7.2.0

### Minor Changes

- [#517](https://github.com/alauda/ui/pull/517) [`12815db`](https://github.com/alauda/ui/commit/12815dbaabb13e8a907b31f11f7a21fa3619c338) Thanks [@igauch](https://github.com/igauch)! - feat: select, dropdown, tree-select and autocomplete add animation
  [BREAKING CHANGE] refactor: remove auiMenuContent directive; When using the auiDropdown directive, you cannot directly use aui-menu, but need to wrap it with ng-template, because the aui-menu template has been removed

## 7.1.0

### Minor Changes

- [#498](https://github.com/alauda/ui/pull/498) [`ab236ce`](https://github.com/alauda/ui/commit/ab236ce8fdb0b8128cd3cc152612af81a2de12e7) Thanks [@JounQin](https://github.com/JounQin)! - feat!: migrate to standalone API

### Patch Changes

- [#512](https://github.com/alauda/ui/pull/512) [`457e4e5`](https://github.com/alauda/ui/commit/457e4e56c497032911556445d90f0249c77e2233) Thanks [@JounQin](https://github.com/JounQin)! - fix: update i18n pipe on locale change

- [#506](https://github.com/alauda/ui/pull/506) [`9d04180`](https://github.com/alauda/ui/commit/9d041802b39afd22afd8145704d3a2b3973d3fc1) Thanks [@fengtianze](https://github.com/fengtianze)! - feat: backtop support custom position

- [#516](https://github.com/alauda/ui/pull/516) [`a9b0cb9`](https://github.com/alauda/ui/commit/a9b0cb93c9161fb7cafe6f675952cd744f717b31) Thanks [@JounQin](https://github.com/JounQin)! - fix: check includes on init and known reference issues

## 7.0.3

### Patch Changes

- [#507](https://github.com/alauda/ui/pull/507) [`9e598d3`](https://github.com/alauda/ui/commit/9e598d30786c2a1c393cb07a3c316c1dddd3b959) Thanks [@igauch](https://github.com/igauch)! - fix: autocomplete will show placeholder when sync option

## 7.0.2

### Patch Changes

- [#504](https://github.com/alauda/ui/pull/504) [`2b1da13`](https://github.com/alauda/ui/commit/2b1da138c29404a8fd12ca7fd8c1d3bd2f84fc32) Thanks [@yangxiaolang](https://github.com/yangxiaolang)! - chore: update aui icon

## 7.0.1

### Patch Changes

- [#502](https://github.com/alauda/ui/pull/502) [`296dd2a`](https://github.com/alauda/ui/commit/296dd2af3dd3035b52a761635366ba4246b0da5a) Thanks [@igauch](https://github.com/igauch)! - fix: update overlay position when option is changed

## 7.0.0

### Major Changes

- [#494](https://github.com/alauda/ui/pull/494) [`fe9ef9e`](https://github.com/alauda/ui/commit/fe9ef9ed03bd6205bcbcc57a7685160e45bfb3bb) Thanks [@JounQin](https://github.com/JounQin)! - refactor: remove some deprecated APIs

- [#483](https://github.com/alauda/ui/pull/483) [`3973cd4`](https://github.com/alauda/ui/commit/3973cd4e80fc0fe9f3eae18d18757e47ddbf2de1) Thanks [@liyouzhi666](https://github.com/liyouzhi666)! - angular upgrade v16, storybook upgrade v7

### Minor Changes

- [#488](https://github.com/alauda/ui/pull/488) [`c5ba896`](https://github.com/alauda/ui/commit/c5ba8964b3d9ee9304bd78f701e6988359fc7855) Thanks [@JounQin](https://github.com/JounQin)! - feat: simplify coerceAttrBoolean getter/setter

- [#488](https://github.com/alauda/ui/pull/488) [`c5ba896`](https://github.com/alauda/ui/commit/c5ba8964b3d9ee9304bd78f701e6988359fc7855) Thanks [@JounQin](https://github.com/JounQin)! - feat: use `numberAttribute` from `@angular/core`

### Patch Changes

- [#501](https://github.com/alauda/ui/pull/501) [`c23767f`](https://github.com/alauda/ui/commit/c23767fe2c0a8c73e6aed0f6f031341271fe2448) Thanks [@yangxiaolang](https://github.com/yangxiaolang)! - fix: fix date-picker date disabled error

- [#486](https://github.com/alauda/ui/pull/486) [`8bbbfee`](https://github.com/alauda/ui/commit/8bbbfee361c82abbd7a3a55a634b4ed7d945c833) Thanks [@Chenoops](https://github.com/Chenoops)! - feat: optimize back to top transition

- [#491](https://github.com/alauda/ui/pull/491) [`df2ff1c`](https://github.com/alauda/ui/commit/df2ff1ca209b96dd19db560471955350bd9bbe88) Thanks [@yangxiaolang](https://github.com/yangxiaolang)! - fix: number-input min max undefined & revert common form disabled input

- [#490](https://github.com/alauda/ui/pull/490) [`3a3aefa`](https://github.com/alauda/ui/commit/3a3aefa64e0b1550f7f62c224e2d643c0f8ccb26) Thanks [@JounQin](https://github.com/JounQin)! - fix(back-top): should prefer custom target

- [#484](https://github.com/alauda/ui/pull/484) [`bda1860`](https://github.com/alauda/ui/commit/bda1860b5ff35faee9fff9104bbdaf53830904f8) Thanks [@yinshuxun](https://github.com/yinshuxun)! - fix: fix tree hierarchical relationship

- [#489](https://github.com/alauda/ui/pull/489) [`6f48e86`](https://github.com/alauda/ui/commit/6f48e868c8dbbc429596bc33ff08b149164a67e6) Thanks [@Chenoops](https://github.com/Chenoops)! - feat: optimizing back-to-top style

- [#497](https://github.com/alauda/ui/pull/497) [`28dc7c3`](https://github.com/alauda/ui/commit/28dc7c374d465ff2db5d517591fa7793f7d7ea7f) Thanks [@JounQin](https://github.com/JounQin)! - fix: incorrect autocomplete default input value

## 6.5.9

### Patch Changes

- [#475](https://github.com/alauda/ui/pull/475) [`71a60cc`](https://github.com/alauda/ui/commit/71a60cc050aaf42445fe01e3ed9c083edcb0f153) Thanks [@2eron](https://github.com/2eron)! - feat: number input allow clear

- [#471](https://github.com/alauda/ui/pull/471) [`ca276e0`](https://github.com/alauda/ui/commit/ca276e0ecae6fb238166e6a837cebbac7cefbd70) Thanks [@igauch](https://github.com/igauch)! - fix: tab group auto scroll to active label when init

  feat: optimize disabled animation in base tooltip

- [#474](https://github.com/alauda/ui/pull/474) [`0bb4a32`](https://github.com/alauda/ui/commit/0bb4a32a5166f7aaa39e4c4f332c3a5d21033425) Thanks [@yangxiaolang](https://github.com/yangxiaolang)! - refactor: mod panel host binding method

- [#459](https://github.com/alauda/ui/pull/459) [`54d15b3`](https://github.com/alauda/ui/commit/54d15b3dd7811504de0915c7e856177434807776) Thanks [@EdisonSu768](https://github.com/EdisonSu768)! - fix: overlay-prebuilt not working in drawer

## 6.5.8

### Patch Changes

- [#466](https://github.com/alauda/ui/pull/466) [`74dde67`](https://github.com/alauda/ui/commit/74dde67f6e12c282b1765ea51b624408909205b9) Thanks [@igauch](https://github.com/igauch)! - feat: tooltip add animation
  fix: autocomplete init position

## 6.5.7

### Patch Changes

- [#467](https://github.com/alauda/ui/pull/467) [`c59c4cc`](https://github.com/alauda/ui/commit/c59c4cc6289f22f02639ef87f8ca12876ca0710a) Thanks [@fengtianze](https://github.com/fengtianze)! - fix: number input style when size is small

  fix: tree node text centered

## 6.5.6

### Patch Changes

- [#455](https://github.com/alauda/ui/pull/455) [`606a118`](https://github.com/alauda/ui/commit/606a118af110a4a32c197f6c088096cc8b076a48) Thanks [@fengtianze](https://github.com/fengtianze)! - fix: dialog close button width

## 6.5.5

### Patch Changes

- [#451](https://github.com/alauda/ui/pull/451) [`b0042b6`](https://github.com/alauda/ui/commit/b0042b64310e2917b66238849f3e55b35fb933c1) Thanks [@EdisonSu768](https://github.com/EdisonSu768)! - feat: range picker support start date

## 6.5.4

### Patch Changes

- [#448](https://github.com/alauda/ui/pull/448) [`91f5d2a`](https://github.com/alauda/ui/commit/91f5d2aec969ede9f9e345b179eb8d719b52a212) Thanks [@fengtianze](https://github.com/fengtianze)! - fix: tree select reset filter text

- [#445](https://github.com/alauda/ui/pull/445) [`87b9ae2`](https://github.com/alauda/ui/commit/87b9ae241b1919340993f94843d539008317afdb) Thanks [@yangxiaolang](https://github.com/yangxiaolang)! - fix: number-input border blocked and input disabled text color in safari

- [#432](https://github.com/alauda/ui/pull/432) [`71ce648`](https://github.com/alauda/ui/commit/71ce6488d1aa6d82b605b42353943c0c6fdf9bd7) Thanks [@fengtianze](https://github.com/fengtianze)! - fix: tag custom colors

- [#440](https://github.com/alauda/ui/pull/440) [`8401555`](https://github.com/alauda/ui/commit/8401555ea302b5d1cb71c24a99f74cae7d08a5da) Thanks [@EdisonSu768](https://github.com/EdisonSu768)! - fix: theme pipes add types

- [#441](https://github.com/alauda/ui/pull/441) [`af71ea7`](https://github.com/alauda/ui/commit/af71ea7c8d9498af967cb1ce7e8c670f9f232622) Thanks [@yangxiaolang](https://github.com/yangxiaolang)! - feat: font adjust adapt to win mac

## 6.5.3

### Patch Changes

- [#428](https://github.com/alauda/ui/pull/428) [`b2a98c2`](https://github.com/alauda/ui/commit/b2a98c282329bc8fbad7b3b884f74016df22e1e8) Thanks [@liyouzhi666](https://github.com/liyouzhi666)! - feat: aui-tree-select improvement

## 6.5.2

### Patch Changes

- [#424](https://github.com/alauda/ui/pull/424) [`c36ef81`](https://github.com/alauda/ui/commit/c36ef81d1211579611c3e490ff4ba83e245f3958) Thanks [@JounQin](https://github.com/JounQin)! - fix: unset word break for confirm dialog

- [#414](https://github.com/alauda/ui/pull/414) [`e1ff045`](https://github.com/alauda/ui/commit/e1ff045f149b5f02ce66d14c56fba403e72d9e0e) Thanks [@mario-mui](https://github.com/mario-mui)! - fix: set aui drawer height

## 6.5.1

### Patch Changes

- [#406](https://github.com/alauda/ui/pull/406) [`cea5e3a`](https://github.com/alauda/ui/commit/cea5e3a23074300e87935c5b62a3cd99b5310900) Thanks [@mario-mui](https://github.com/mario-mui)! - feat: dialog support custom class

## 6.5.0

### Minor Changes

- [#386](https://github.com/alauda/ui/pull/386) [`a07e398`](https://github.com/alauda/ui/commit/a07e3981c7c693addcac8facb1c20a38901b7d2f) Thanks [@yangxiaolang](https://github.com/yangxiaolang)! - feat: remove normal table overflow property, scrollShadow set table overflow auto, rename scrollShadow directive to scrollable, add table header sticky to parent story

### Patch Changes

- [#384](https://github.com/alauda/ui/pull/384) [`ecf7ec2`](https://github.com/alauda/ui/commit/ecf7ec2844107329bbe763bbf1325d10d29dde3e) Thanks [@EdisonSu768](https://github.com/EdisonSu768)! - fix: tags-input placeholder

- [#392](https://github.com/alauda/ui/pull/392) [`4ec0696`](https://github.com/alauda/ui/commit/4ec069627b5e7e56987e8541cd4a573aaaf51b12) Thanks [@yangxiaolang](https://github.com/yangxiaolang)! - fix: scroll-table row height less than table 1px

- [#401](https://github.com/alauda/ui/pull/401) [`2011c46`](https://github.com/alauda/ui/commit/2011c467675ad8c7401624b07a68ffc0203bfb55) Thanks [@kkxiaoa](https://github.com/kkxiaoa)! - feat: add dialog motion

- [#393](https://github.com/alauda/ui/pull/393) [`1cd9948`](https://github.com/alauda/ui/commit/1cd9948e391e8d65bf55517c76695e8cb61b950b) Thanks [@liyouzhi666](https://github.com/liyouzhi666)! - fix: aui-number-input angleButton height and move 'watchContentExist' from ngAfterViewInit to ngAfterContentInit

- [#389](https://github.com/alauda/ui/pull/389) [`897e336`](https://github.com/alauda/ui/commit/897e336d02a436aba8cac852464a0646483b3d13) Thanks [@fengtianze](https://github.com/fengtianze)! - fix: controllable table scrollable directive

- [#398](https://github.com/alauda/ui/pull/398) [`61e97fa`](https://github.com/alauda/ui/commit/61e97fa2e731c2d1a490cd8bfc988cac4c6e57c1) Thanks [@igauch](https://github.com/igauch)! - fix: some icons are missing

## 6.4.7

### Patch Changes

- [#381](https://github.com/alauda/ui/pull/381) [`71329d1`](https://github.com/alauda/ui/commit/71329d1962ff0b99c92b083f7135902e59416278) Thanks [@yangxiaolang](https://github.com/yangxiaolang)! - fix: table height collapse when width insufficient

## 6.4.6

### Patch Changes

- [#376](https://github.com/alauda/ui/pull/376) [`4e9c033`](https://github.com/alauda/ui/commit/4e9c033f95c4d969924b95feb9505cc475c54b2a) Thanks [@mario-mui](https://github.com/mario-mui)! - fix: When there is a select in the drawer, the overlay of select will not follow the drawer body scrolling

- [#369](https://github.com/alauda/ui/pull/369) [`476ac02`](https://github.com/alauda/ui/commit/476ac02627cfc81db3e2f20af3019f7b046f3e1b) Thanks [@mario-mui](https://github.com/mario-mui)! - fix: drawer emit close immediately after component constructor

- [#374](https://github.com/alauda/ui/pull/374) [`a7ec1b2`](https://github.com/alauda/ui/commit/a7ec1b274958395438eb3717bb1bf51ff155129d) Thanks [@EdisonSu768](https://github.com/EdisonSu768)! - fix: backspace can delete disabled selected option

- [#372](https://github.com/alauda/ui/pull/372) [`ae415c5`](https://github.com/alauda/ui/commit/ae415c5bf2ced1600bec1a9faf3b0ea8cc8677b7) Thanks [@yangxiaolang](https://github.com/yangxiaolang)! - fix: aui-table sticky-column side border disappear, dialog overflow hidden, scroll-shadow extend cdkscroll , table expand row width fix

- [#377](https://github.com/alauda/ui/pull/377) [`88b5faf`](https://github.com/alauda/ui/commit/88b5fafd66b4e199fb013112067d0ed84acc2dcf) Thanks [@EdisonSu768](https://github.com/EdisonSu768)! - Enter can delete disabled focused option which is incorrect.

## 6.4.5

### Patch Changes

- [#366](https://github.com/alauda/alauda-ui/pull/366) [`d3edaa6`](https://github.com/alauda/alauda-ui/commit/d3edaa64af86aac618ca3f4b61d52ad10e46f8b7) Thanks [@yangxiaolang](https://github.com/yangxiaolang)! - fix: recalc icon pr according to parent class `hasicon` or `hasbutton`, remove useless code

- [#363](https://github.com/alauda/alauda-ui/pull/363) [`a300b76`](https://github.com/alauda/alauda-ui/commit/a300b7684c8c6f3d098c25aae630595cb93d1cfd) Thanks [@JounQin](https://github.com/JounQin)! - feat: support dynamic auiTableScrollShadow input

## 6.4.4

### Patch Changes

- [#359](https://github.com/alauda/alauda-ui/pull/359) [`bddf0e3`](https://github.com/alauda/alauda-ui/commit/bddf0e31dc446ffa6a321105b0f0e3f4a08ccbe5) Thanks [@fengtianze](https://github.com/fengtianze)! - fix: solid info tag color

## 6.4.3

### Patch Changes

- [#357](https://github.com/alauda/alauda-ui/pull/357) [`ee8cf94`](https://github.com/alauda/alauda-ui/commit/ee8cf94c5de6e2230abe9f5c5848ea24d3b4a680) Thanks [@wszgrcy](https://github.com/wszgrcy)! - fix: tag max-width

- [#360](https://github.com/alauda/alauda-ui/pull/360) [`3d7fa50`](https://github.com/alauda/alauda-ui/commit/3d7fa5054c2a596ed9ae331ebddf98f7f4c77de7) Thanks [@mario-mui](https://github.com/mario-mui)! - fix: improve steps style weights

- [#354](https://github.com/alauda/alauda-ui/pull/354) [`1e7316d`](https://github.com/alauda/alauda-ui/commit/1e7316d8c38c8429c8d1511110a00730510f8457) Thanks [@fengtianze](https://github.com/fengtianze)! - fix: focus input element after clear

## 6.4.2

### Patch Changes

- [#339](https://github.com/alauda/alauda-ui/pull/339) [`e98b599`](https://github.com/alauda/alauda-ui/commit/e98b599bf1ce6036cdf0a27dedbf4beb858cd6de) Thanks [@wszgrcy](https://github.com/wszgrcy)! - feat: confirm dialog content support template

- [#341](https://github.com/alauda/alauda-ui/pull/341) [`5ca80b7`](https://github.com/alauda/alauda-ui/commit/5ca80b72859490858ffbec85a4e12f38b363aab2) Thanks [@wszgrcy](https://github.com/wszgrcy)! - feat: confirm dialog content support component

- [#343](https://github.com/alauda/alauda-ui/pull/343) [`305ac14`](https://github.com/alauda/alauda-ui/commit/305ac147b6d7f083a547f5687ae2106308a8fd0b) Thanks [@wszgrcy](https://github.com/wszgrcy)! - fix: table scroll shadow overflow

- [#352](https://github.com/alauda/alauda-ui/pull/352) [`eb0774a`](https://github.com/alauda/alauda-ui/commit/eb0774a386577196e8dabec8a8447af1bc9fd836) Thanks [@EdisonSu768](https://github.com/EdisonSu768)! - fix: autocomplete disabled

- [#346](https://github.com/alauda/alauda-ui/pull/346) [`e022c68`](https://github.com/alauda/alauda-ui/commit/e022c68b2cd0a9789450c02627c2df23fbaee334) Thanks [@fengtianze](https://github.com/fengtianze)! - feat: card header support secondary size

- [#351](https://github.com/alauda/alauda-ui/pull/351) [`e24e025`](https://github.com/alauda/alauda-ui/commit/e24e025fb2109a6539048807147a18a1e88b9f1b) Thanks [@HaoxiangShen](https://github.com/HaoxiangShen)! - fix: tree-select `labelFn` takes higher priority than `label`

- [#345](https://github.com/alauda/alauda-ui/pull/345) [`e4efe38`](https://github.com/alauda/alauda-ui/commit/e4efe38a31d87ff8dc5ba58794f12200be1053e6) Thanks [@mario-mui](https://github.com/mario-mui)! - fix: check tag space to 8px

- [#347](https://github.com/alauda/alauda-ui/pull/347) [`ddf79bb`](https://github.com/alauda/alauda-ui/commit/ddf79bbfffed58e457b219af086038a634b6851b) Thanks [@JounQin](https://github.com/JounQin)! - fix: use flex layout for all table cells

- [#350](https://github.com/alauda/alauda-ui/pull/350) [`bacb05b`](https://github.com/alauda/alauda-ui/commit/bacb05bac65c10feab4b8e2ebecc2c9644a5dd5f) Thanks [@fengtianze](https://github.com/fengtianze)! - feat: table scroll wrapper support height setting

## 6.4.1

### Patch Changes

- [#332](https://github.com/alauda/alauda-ui/pull/332) [`2640166`](https://github.com/alauda/alauda-ui/commit/2640166ba015d453fcc2d5207725606f3e8abd4b) Thanks [@JounQin](https://github.com/JounQin)! - fix: trigger autocomplete autoFocusFirstSuggestion on suggestions change

- [#328](https://github.com/alauda/alauda-ui/pull/328) [`8ff6976`](https://github.com/alauda/alauda-ui/commit/8ff69764fae5b01198bb71fe002f7df051983787) Thanks [@JounQin](https://github.com/JounQin)! - fix: suggestions could be empty array

- [#331](https://github.com/alauda/alauda-ui/pull/331) [`ba73b4d`](https://github.com/alauda/alauda-ui/commit/ba73b4d20fed18c7cf0972d5e8150bdb102c0877) Thanks [@JounQin](https://github.com/JounQin)! - fix: handle click as focus for autocomplete

## 6.4.0

### Minor Changes

- [#327](https://github.com/alauda/alauda-ui/pull/327) [`af31503`](https://github.com/alauda/alauda-ui/commit/af3150321a4c13b10250146994766d725e6e9c8e) Thanks [@fengtianze](https://github.com/fengtianze)! - fix: form field indicator color

  fix: drawer scrollbar position

### Patch Changes

- [#325](https://github.com/alauda/alauda-ui/pull/325) [`66bdefb`](https://github.com/alauda/alauda-ui/commit/66bdefbc2a51c0577314d10eb396af3e6e40d335) Thanks [@JounQin](https://github.com/JounQin)! - feat: form item support plain input

- [#325](https://github.com/alauda/alauda-ui/pull/325) [`66bdefb`](https://github.com/alauda/alauda-ui/commit/66bdefbc2a51c0577314d10eb396af3e6e40d335) Thanks [@JounQin](https://github.com/JounQin)! - fix: table placeholder will scroll as the header scrolls horizontally

- [#325](https://github.com/alauda/alauda-ui/pull/325) [`66bdefb`](https://github.com/alauda/alauda-ui/commit/66bdefbc2a51c0577314d10eb396af3e6e40d335) Thanks [@JounQin](https://github.com/JounQin)! - fix: breadcrumb height

## 6.3.5

### Patch Changes

- [#317](https://github.com/alauda/alauda-ui/pull/317) [`e182a75`](https://github.com/alauda/alauda-ui/commit/e182a75e8112fce07dff84980e8d97a9a2d791fa) Thanks [@fengtianze](https://github.com/fengtianze)! - fix: time picker may not emit value

## 6.3.4

### Patch Changes

- [#315](https://github.com/alauda/alauda-ui/pull/315) [`0bae98d`](https://github.com/alauda/alauda-ui/commit/0bae98d637476fb06951bcb17ba28a66e91ce885) Thanks [@fengtianze](https://github.com/fengtianze)! - fix: icon background size

## 6.3.3

### Patch Changes

- [#309](https://github.com/alauda/alauda-ui/pull/309) [`456eb80`](https://github.com/alauda/alauda-ui/commit/456eb80d85500b94b188d76f2a0638b42ba0c54e) Thanks [@fengtianze](https://github.com/fengtianze)! - fix: sticky table border radius

## 6.3.2

### Patch Changes

- [#307](https://github.com/alauda/alauda-ui/pull/307) [`0923b50`](https://github.com/alauda/alauda-ui/commit/0923b5088d7ea7a0a13ac0db727569df5f387a92) Thanks [@fengtianze](https://github.com/fengtianze)! - fix: remove unused sass var

## 6.3.1

### Patch Changes

- [#295](https://github.com/alauda/alauda-ui/pull/295) [`6764aaf`](https://github.com/alauda/alauda-ui/commit/6764aaf6a18ad356507b6acfb1d6cd1d0ea0f5d9) Thanks [@fengtianze](https://github.com/fengtianze)! - fix: theme mixins

  fix: color of tab active indicator

* [#303](https://github.com/alauda/alauda-ui/pull/303) [`b45adbc`](https://github.com/alauda/alauda-ui/commit/b45adbc6c803b3282cd02a9ac72fe189a614b9b9) Thanks [@JounQin](https://github.com/JounQin)! - fix: better compatibility with empty form control

- [#301](https://github.com/alauda/alauda-ui/pull/301) [`7e32fce`](https://github.com/alauda/alauda-ui/commit/7e32fce199b53e0e3a79bff74c94c7e88d2a5d8b) Thanks [@JounQin](https://github.com/JounQin)! - fix: check trackFn on select all

* [#298](https://github.com/alauda/alauda-ui/pull/298) [`698665a`](https://github.com/alauda/alauda-ui/commit/698665a24b3b04db5c224cdcc8bb242578fc99f7) Thanks [@JounQin](https://github.com/JounQin)! - fix: disabled option should not be closeable

- [#299](https://github.com/alauda/alauda-ui/pull/299) [`d3f5d22`](https://github.com/alauda/alauda-ui/commit/d3f5d22fed7120297543020909ab7e957abfc634) Thanks [@fengtianze](https://github.com/fengtianze)! - fix: system scrollbar color

## 6.3.0

### Minor Changes

- [#291](https://github.com/alauda/alauda-ui/pull/291) [`af7ef00`](https://github.com/alauda/alauda-ui/commit/af7ef00295e875c97cfac9c32159b2e3e4d30e26) Thanks [@fengtianze](https://github.com/fengtianze)! - fix: backtop button style
  feat: upgrade to angular 13

## 6.2.2

### Patch Changes

- [#279](https://github.com/alauda/alauda-ui/pull/279) [`ab14ff7`](https://github.com/alauda/alauda-ui/commit/ab14ff7d697b34c2bf026980d6dc0daa63a02359) Thanks [@fengtianze](https://github.com/fengtianze)! - fix: select option height

- [#283](https://github.com/alauda/alauda-ui/pull/283) [`b26097e`](https://github.com/alauda/alauda-ui/commit/b26097ec1bde2d3be7c76497fd467eedd0a4c7a3) Thanks [@fengtianze](https://github.com/fengtianze)! - fix: dark mode issues
  fix: multi-select height

## 6.2.1

### Patch Changes

- [#271](https://github.com/alauda/alauda-ui/pull/271) [`b0c1e7c`](https://github.com/alauda/alauda-ui/commit/b0c1e7c0930000dd2d5d8fb31bd1faa5f1605eb1) Thanks [@fengtianze](https://github.com/fengtianze)! - feat: solid icon background
  feat: support rgbColor, rgbaColor, cssVar pipes

- [#268](https://github.com/alauda/alauda-ui/pull/268) [`0e13f60`](https://github.com/alauda/alauda-ui/commit/0e13f606ddf06de371e9d978304e839b9d35687d) Thanks [@fengtianze](https://github.com/fengtianze)! - fix: paginator button background color

- [#266](https://github.com/alauda/alauda-ui/pull/266) [`06f3d00`](https://github.com/alauda/alauda-ui/commit/06f3d00ae5642dadd7467d5695cf9927baad8405) Thanks [@fengtianze](https://github.com/fengtianze)! - feat: theme picker pipe support array

## 6.2.0

### Minor Changes

- [#259](https://github.com/alauda/alauda-ui/pull/259) [`6212b5f`](https://github.com/alauda/alauda-ui/commit/6212b5fddff8fb3fe5abbc321f7da18bd211a37a) Thanks [@fengtianze](https://github.com/fengtianze)! - [BREAKING CHANGE]
  refactor: rename sass function name
  get-size -> use-var
  get-color -> use-rgb
  get-rgba -> use-rgba
  get-text-color -> use-text-color

  feat: support dark theme
  feat: support export custom theme

## 6.1.5

### Patch Changes

- [#260](https://github.com/alauda/alauda-ui/pull/260) [`a9a18b3`](https://github.com/alauda/alauda-ui/commit/a9a18b357d5b30f1c86d44e67f549ffe9e96c731) Thanks [@zChanges](https://github.com/zChanges)! - drawer add divider

## 6.1.4

### Patch Changes

- [#251](https://github.com/alauda/alauda-ui/pull/251) [`ead91ba`](https://github.com/alauda/alauda-ui/commit/ead91ba4a9696563c88c62365876d942a5b0c5f5) Thanks [@fengtianze](https://github.com/fengtianze)! - fix: drawer content padding
  fix: message, drawer critical imports

## 6.1.3

### Patch Changes

- [#243](https://github.com/alauda/alauda-ui/pull/243) [`8305e37`](https://github.com/alauda/alauda-ui/commit/8305e370675378b6a8a5fe7e44d2122bf87f7084) Thanks [@2eron](https://github.com/2eron)! - fix: steps icon align issue

## 6.1.2

### Patch Changes

- [#241](https://github.com/alauda/alauda-ui/pull/241) [`c8bf374`](https://github.com/alauda/alauda-ui/commit/c8bf374f96fa6da62e9bc57e74b297e97dd9fbcf) Thanks [@fengtianze](https://github.com/fengtianze)! - fix: card content margin

## 6.1.1

### Patch Changes

- [#240](https://github.com/alauda/alauda-ui/pull/240) [`441198a`](https://github.com/alauda/alauda-ui/commit/441198a747c95f55e5e59c7aa021e014d94fd9b9) Thanks [@fengtianze](https://github.com/fengtianze)! - fix: search input supports size property

- [#237](https://github.com/alauda/alauda-ui/pull/237) [`1bc629b`](https://github.com/alauda/alauda-ui/commit/1bc629b62769e0e5e67d6dd264a8c0b0ad6e7342) Thanks [@mario-mui](https://github.com/mario-mui)! - fix: status bar hover

- [#239](https://github.com/alauda/alauda-ui/pull/239) [`0a7b808`](https://github.com/alauda/alauda-ui/commit/0a7b8081087ee10b20d4d32799ceaa950362ec9b) Thanks [@fengtianze](https://github.com/fengtianze)! - fix: form item width is not working with input group

- [#235](https://github.com/alauda/alauda-ui/pull/235) [`c3426e5`](https://github.com/alauda/alauda-ui/commit/c3426e58dd0215ab1cb64e2d12231757aa48ee06) Thanks [@yinshuxun](https://github.com/yinshuxun)! - fix: fix table wrap

## 6.1.0

### Minor Changes

- [#232](https://github.com/alauda/alauda-ui/pull/232) [`6f82358`](https://github.com/alauda/alauda-ui/commit/6f823583055a93eacdb826914ac18e43ed4b72a4) Thanks [@fengtianze](https://github.com/fengtianze)! - feat: new accordion design

- [#230](https://github.com/alauda/alauda-ui/pull/230) [`6f82358`](https://github.com/alauda/alauda-ui/commit/763ad5fb7d7702162e8647b06a3e1b34efbdb50d) Thanks [@fengtianze](https://github.com/fengtianze)! - feat: tab group supports switch by tab name. #141

## 6.0.3

### Patch Changes

- [#221](https://github.com/alauda/alauda-ui/pull/221) [`7f72eb4`](https://github.com/alauda/alauda-ui/commit/7f72eb4654816fce90f9e82c1dcd40abdbcdbf28) Thanks [@2eron](https://github.com/2eron)! - feat: add selectable input param, deprecate linear param and editable property of StepItem

## 6.0.2

### Patch Changes

- [#213](https://github.com/alauda/alauda-ui/pull/213) [`4eb27c8`](https://github.com/alauda/alauda-ui/commit/4eb27c85edc0080544fed27656cb22b069c39e64) Thanks [@zChanges](https://github.com/zChanges)! - fix: drawer content component error

- [#212](https://github.com/alauda/alauda-ui/pull/212) [`0755c21`](https://github.com/alauda/alauda-ui/commit/0755c2101ce037b4d11be206c8c00c61ad518505) Thanks [@JounQin](https://github.com/JounQin)! - feat: support dynamic options loading on filtering

- [#218](https://github.com/alauda/alauda-ui/pull/218) [`37d87cd`](https://github.com/alauda/alauda-ui/commit/37d87cdf17851160f82b77350d8993cebc4406b6) Thanks [@zChanges](https://github.com/zChanges)! - repeat drawer fix

- [#210](https://github.com/alauda/alauda-ui/pull/210) [`3c369a4`](https://github.com/alauda/alauda-ui/commit/3c369a49a167a9fae824699d3b1c42c15d1598a4) Thanks [@JounQin](https://github.com/JounQin)! - feat: support nested aui-checkbox in group for custom UI

## 6.0.1

### Patch Changes

- [#202](https://github.com/alauda/alauda-ui/pull/202) [`fd5ab24`](https://github.com/alauda/alauda-ui/commit/fd5ab241d1ddf28fc1e7e3ccf7f5eefdcfacd949) Thanks [@zangguodong](https://github.com/zangguodong)! - fix: info tag color,tag padding block

- [#194](https://github.com/alauda/alauda-ui/pull/194) [`1b9757e`](https://github.com/alauda/alauda-ui/commit/1b9757e177380e15e35ddc2ce4c65acce6d19ff4) Thanks [@mario-mui](https://github.com/mario-mui)! - fix: form label width default value null

- [#196](https://github.com/alauda/alauda-ui/pull/196) [`7a5fd77`](https://github.com/alauda/alauda-ui/commit/7a5fd774b23019fd667c4e8cc91b7ddd955136f3) Thanks [@yinshuxun](https://github.com/yinshuxun)! - feat: String input support for the form item with 'large' | 'small' | 'medium'

## 6.0.0

### Major Changes

- [#144](https://github.com/alauda/alauda-ui/pull/144) [`b04b11e`](https://github.com/alauda/alauda-ui/commit/b04b11e8112eed174958a58af3b6ab263a62f005) Thanks [@fengtianze](https://github.com/fengtianze)! - new design and color system

## 5.7.6

### Patch Changes

- [#154](https://github.com/alauda/alauda-ui/pull/154) [`919cafc`](https://github.com/alauda/alauda-ui/commit/919cafce60aa339d03ba403798ce59b2f866e5d4) Thanks [@tunblr](https://github.com/tunblr)! - feat: select all AIT-8411

## 5.7.5

### Patch Changes

- [#151](https://github.com/alauda/alauda-ui/pull/151) [`8cd83cc`](https://github.com/alauda/alauda-ui/commit/8cd83cc10030da727fc0605f22aea78173c6275d) Thanks [@JounQin](https://github.com/JounQin)! - feat: ignore filter case by default

- [#151](https://github.com/alauda/alauda-ui/pull/151) [`8cd83cc`](https://github.com/alauda/alauda-ui/commit/8cd83cc10030da727fc0605f22aea78173c6275d) Thanks [@JounQin](https://github.com/JounQin)! - feat: support autocomplete for custom form item

- [#151](https://github.com/alauda/alauda-ui/pull/151) [`8cd83cc`](https://github.com/alauda/alauda-ui/commit/8cd83cc10030da727fc0605f22aea78173c6275d) Thanks [@JounQin](https://github.com/JounQin)! - feat: add `auiAutocompleteSelected` output for `aui-search`

## 5.7.4

### Patch Changes

- [#145](https://github.com/alauda/alauda-ui/pull/145) [`c0c2f82`](https://github.com/alauda/alauda-ui/commit/c0c2f829f46c3ea7aa046eb356b19289618e77a7) Thanks [@zangguodong](https://github.com/zangguodong)! - fix: date-picker style problem

## 5.7.3

### Patch Changes

- [#138](https://github.com/alauda/alauda-ui/pull/138) [`4051ae7`](https://github.com/alauda/alauda-ui/commit/4051ae77c2f9c011f785322170a482c5b0852e80) Thanks [@fengtianze](https://github.com/fengtianze)! - feat: select support lazy render options

- [#140](https://github.com/alauda/alauda-ui/pull/140) [`fe8c2ff`](https://github.com/alauda/alauda-ui/commit/fe8c2ff0d934acca7d8786e17c85d1313f14c415) Thanks [@tunblr](https://github.com/tunblr)! - fix: rendered rows not consist with input

### [5.7.2](https://github.com/alauda/alauda-ui/compare/v5.6.8...v5.7.2) (2021-06-29)

### Features

- date picker & time picker ([#124](https://github.com/alauda/alauda-ui/issues/124)) ([c8dece2](https://github.com/alauda/alauda-ui/commit/c8dece2f7318530dfd263263cabce32dd36e35ca))
- fixed size table virtual scroll ([#123](https://github.com/alauda/alauda-ui/issues/123)) ([0ad29cf](https://github.com/alauda/alauda-ui/commit/0ad29cf045753d03bc1dc72805e9cb3169a005ad))
- support observable active status for tab component ([#130](https://github.com/alauda/alauda-ui/issues/130)) ([2ced08f](https://github.com/alauda/alauda-ui/commit/2ced08fb53c5c05578ef24b1646045b5c2c6094d))
- table column sticky ([#129](https://github.com/alauda/alauda-ui/issues/129)) ([c464cd5](https://github.com/alauda/alauda-ui/commit/c464cd5d8fd94edb4bab40e14db3cce968b4c464))

### Bug Fixes

- detect textarea value changes for autosize ([#134](https://github.com/alauda/alauda-ui/issues/134)) ([8453e51](https://github.com/alauda/alauda-ui/commit/8453e519cedac8bc00533bb974dfc17f9f3df583))
- only get first value from observable for beforeAction ([#131](https://github.com/alauda/alauda-ui/issues/131)) ([e1c92c6](https://github.com/alauda/alauda-ui/commit/e1c92c6880e5555282ec9087d64bff23c3c3b9dc))

### [5.6.8](https://github.com/alauda/alauda-ui/compare/v5.6.7...v5.6.8) (2021-05-13)

### Features

- treeselect support select leaf only ([#122](https://github.com/alauda/alauda-ui/issues/122)) ([8556560](https://github.com/alauda/alauda-ui/commit/85565601a353fbf58a0a6c7d93b0ac6787924ca2))

### [5.6.7](https://github.com/alauda/alauda-ui/compare/v5.6.6...v5.6.7) (2021-05-07)

### [5.6.6](https://github.com/alauda/alauda-ui/compare/v5.6.5...v5.6.6) (2021-04-06)

### Features

- notification style wrap ([#118](https://github.com/alauda/alauda-ui/issues/118)) ([f61814a](https://github.com/alauda/alauda-ui/commit/f61814ac8e85a025494d8584fce018fea72eb3eb))
- optimize tooltip hiding delay ([e0a09f2](https://github.com/alauda/alauda-ui/commit/e0a09f2d9f41f949ce9cfef0648cc102f5ed205f))

### Bug Fixes

- option disable style ([6bcad3b](https://github.com/alauda/alauda-ui/commit/6bcad3b46f7b81cd513bdbfbda8d9fee6ebfb951))

### [5.6.5](https://github.com/alauda/alauda-ui/compare/v5.6.4...v5.6.5) (2021-03-18)

### Bug Fixes

- status bar error/info color ([2d77ea2](https://github.com/alauda/alauda-ui/commit/2d77ea2bb50b954ee57152a29b81a5ec9c04b5b5))

### [5.6.4](https://github.com/alauda/alauda-ui/compare/v5.6.3...v5.6.4) (2021-03-18)

### Bug Fixes

- status bar colors ([74b8a78](https://github.com/alauda/alauda-ui/commit/74b8a780fbae50abc21314d3da331cc771f600c7))

### [5.6.3](https://github.com/alauda/alauda-ui/compare/v5.6.2...v5.6.3) (2021-03-15)

### Features

- add anchor module ([#111](https://github.com/alauda/alauda-ui/issues/111)) ([47403b9](https://github.com/alauda/alauda-ui/commit/47403b9651d780c40f38e8af8d1a1154f8be8718))
- support dark mode ([6e75972](https://github.com/alauda/alauda-ui/commit/6e759728c7e5872b233b3a4302ca98324912ba5f))
- tag input and multi select support max row count ([#113](https://github.com/alauda/alauda-ui/issues/113)) ([ee1dcbf](https://github.com/alauda/alauda-ui/commit/ee1dcbfaec954fbea7c99686914ba83f26a14af3))

### [5.6.2](https://github.com/alauda/alauda-ui/compare/v5.6.1...v5.6.2) (2021-03-08)

### Bug Fixes

- multi select label template display error ([8ac18f5](https://github.com/alauda/alauda-ui/commit/8ac18f55b804f829312a86a8f1606d9c79b5d447))

### [5.6.1](https://github.com/alauda/alauda-ui/compare/v5.6.0...v5.6.1) (2021-03-02)

### Features

- change back top style ([b1fdc3d](https://github.com/alauda/alauda-ui/commit/b1fdc3d24928a44bd97ac39c69d0676d5c7c2768))

### Bug Fixes

- multi select tags should have border ([0bb064a](https://github.com/alauda/alauda-ui/commit/0bb064ac3b2c98ab65b160ca6e098b662e1a152b))
- number input min value set 0 error ([#107](https://github.com/alauda/alauda-ui/issues/107)) ([8f368a4](https://github.com/alauda/alauda-ui/commit/8f368a46b0dc7f6f670ca8c893e19126342bbafd))

## [5.6.0](https://github.com/alauda/alauda-ui/compare/v5.5.2...v5.6.0) (2021-02-25)

### Features

- improve compatibility with `strictTemplates` ([#105](https://github.com/alauda/alauda-ui/issues/105)) ([b6760a2](https://github.com/alauda/alauda-ui/commit/b6760a275f69dc7553792fb4ff826dcc515bc6a5)), closes [#104](https://github.com/alauda/alauda-ui/issues/104)

### [5.5.2](https://github.com/alauda/alauda-ui/compare/v5.5.1...v5.5.2) (2021-02-23)

### Bug Fixes

- support undefined filter string which is common initial value ([#103](https://github.com/alauda/alauda-ui/issues/103)) ([0ee4c0d](https://github.com/alauda/alauda-ui/commit/0ee4c0da55a4f8293c13a349b9212e217f4c6379))

### [5.5.1](https://github.com/alauda/alauda-ui/compare/v5.5.0...v5.5.1) (2021-02-23)

### Bug Fixes

- autocomplete change detection ([1f5fed3](https://github.com/alauda/alauda-ui/commit/1f5fed3a39c46fb04f8c062e497039b8b3331de4))
- multi select dont display selected labels ([86a5c74](https://github.com/alauda/alauda-ui/commit/86a5c749f6e93478d0bae436a699a47c9ce6edf2))
- support dynamic hints and errors rendering ([aca336a](https://github.com/alauda/alauda-ui/commit/aca336a0dc2fa0b199ab49336cdb333a98e39133))
- tooltip active directive is not working ([6ecd764](https://github.com/alauda/alauda-ui/commit/6ecd764404b24d31fb4c36b4418f095a149e373a))

## [5.5.0](https://github.com/alauda/alauda-ui/compare/v5.4.1...v5.5.0) (2021-02-18)

### Features

- add labelFn Input for select, better select related types ([#98](https://github.com/alauda/alauda-ui/issues/98)) ([570cc55](https://github.com/alauda/alauda-ui/commit/570cc55f0063a8d3ee3ae1852ccb7a1ddf32acc5))
- breadcrumb item context max width ([5306e4c](https://github.com/alauda/alauda-ui/commit/5306e4c7df0f9269b3fdf9bddf7e8b0a59b21679))
- optimize number input invalid style ([374d648](https://github.com/alauda/alauda-ui/commit/374d6487e59bc2cd1c5ffc73d149a900e19099e6))

### Bug Fixes

- dialog dont hide multi line title ([29d79a2](https://github.com/alauda/alauda-ui/commit/29d79a2dd108aebdf4f828ba77edb354151e77a8))
- number input displays initial value ([958c682](https://github.com/alauda/alauda-ui/commit/958c6826b15fdfaf1f26614064157878539a3ecb))

### [5.4.1](https://github.com/alauda/alauda-ui/compare/v5.4.0...v5.4.1) (2021-01-12)

### Bug Fixes

- aui-platform-nav title not display fix ([37accb8](https://github.com/alauda/alauda-ui/commit/37accb8b42673341d6d8937db7a568efcb3fd143))

## [5.4.0](https://github.com/alauda/alauda-ui/compare/v5.3.6...v5.4.0) (2021-01-11)

### Features

- optimizing common form control useage ([d68cc36](https://github.com/alauda/alauda-ui/commit/d68cc36da0878f9cb1119735a14609ec23cb5ff5))
- readonly tags, forbid delete ([#86](https://github.com/alauda/alauda-ui/issues/86)) ([f4a1f73](https://github.com/alauda/alauda-ui/commit/f4a1f738eecb48add7b568f2a56c23c7447dc132))
- support return Promise/Observable directly for ConfirmDialog ([#91](https://github.com/alauda/alauda-ui/issues/91)) ([2034ffe](https://github.com/alauda/alauda-ui/commit/2034ffeba595e8dbcfaa8ec8a08cf533c0605b95)), closes [#83](https://github.com/alauda/alauda-ui/issues/83)

### Bug Fixes

- avoid ngTemplateOutletContext to modify object reference ([55f28f8](https://github.com/alauda/alauda-ui/commit/55f28f85f6459fa0b5a76381b431298bf181ea90))
- number input format value error ([476b435](https://github.com/alauda/alauda-ui/commit/476b435c3a8b66f4701408cf3233ed090312f61b))

### [5.3.6](https://github.com/alauda/alauda-ui/compare/v5.3.5...v5.3.6) (2020-12-24)

### Bug Fixes

- select background color ([3d5ec1b](https://github.com/alauda/alauda-ui/commit/3d5ec1b96dc53d25a3de2e14b925fc902b3beb38))

### [5.3.5](https://github.com/alauda/alauda-ui/compare/v5.3.4...v5.3.5) (2020-12-24)

### Features

- base tooltip support override TooltipComponent ([b4f383f](https://github.com/alauda/alauda-ui/commit/b4f383f822a572e97a9f234ab93c1bf4d3a3b418))

### Bug Fixes

- emitValueChange method of CommonFormControl should be public ([7baac16](https://github.com/alauda/alauda-ui/commit/7baac16c40425759c8f86d6c50639b8b33fd5a83))
- resolved input and select components hover style bug ([35dad00](https://github.com/alauda/alauda-ui/commit/35dad005289941121cce88e34c1325bf93507fbd))
- word not aligin middle in vertical ([c3e91db](https://github.com/alauda/alauda-ui/commit/c3e91dbeb59d11d0ce26b7242ae6dddb48ed3fec))

### [5.3.4](https://github.com/alauda/alauda-ui/compare/v5.3.3...v5.3.4) (2020-12-21)

### Features

- add tab-card border ([b477f97](https://github.com/alauda/alauda-ui/commit/b477f9706960dfb6085cecb8373e75ad328b82fe))
- add tag border props ([06ae89e](https://github.com/alauda/alauda-ui/commit/06ae89ea33a75866db11890f5d5997f6697e0824))
- provide tags-input input validation ([9310f1a](https://github.com/alauda/alauda-ui/commit/9310f1ac1ba4bce598420c2b3e40a342a93c1d50))
- remove tag border ([2684df2](https://github.com/alauda/alauda-ui/commit/2684df2357869272e9d9842b9b0d9a7849e5eea5))

### Bug Fixes

- aui option labelContext AIT-4714 ([a4009b1](https://github.com/alauda/alauda-ui/commit/a4009b1e7e6644081a0deddd2ed5be1cd70fbf6e))
- aui-sort cursor style ([3738796](https://github.com/alauda/alauda-ui/commit/3738796d3d93f8ad89d90ae5cc6f1a3b19625887))
- background color of default tooltip ([c46d621](https://github.com/alauda/alauda-ui/commit/c46d621a5e3e62f9ed7eb95e81e4271b1f80da3a))
- height of custom scroll bar ([e5413c4](https://github.com/alauda/alauda-ui/commit/e5413c4e0b793636937d58182f60ecccc85a402b))
- host aui-tooltip-copy class for ng 11 ([9c6cb40](https://github.com/alauda/alauda-ui/commit/9c6cb4024ac55535885004313428b286ca25e7e5))
- input-group hover css bug ([#60](https://github.com/alauda/alauda-ui/issues/60)) ([c62a77b](https://github.com/alauda/alauda-ui/commit/c62a77bf93d925b95028259dbf8c7e0b920469c0))

### [5.3.3](https://github.com/alauda/alauda-ui/compare/v5.3.2...v5.3.3) (2020-11-09)

### Features

- form control components support readonly state ([bd8742d](https://github.com/alauda/alauda-ui/commit/bd8742de880e61ffe170b61bd9b2364efc7073a5))

### Bug Fixes

- form item may won't show error hint ([6fc6ebe](https://github.com/alauda/alauda-ui/commit/6fc6ebeab4b8b0c0f689a72edf68794a94092f9b))
- readme online demo address ([b760715](https://github.com/alauda/alauda-ui/commit/b76071544c3087a233c4bb0145f471343909b3d8))
- **number input:** check button state when write value ([b2fa11a](https://github.com/alauda/alauda-ui/commit/b2fa11ac4c8be1ee3bd3c1db4b0aea9a9c596496))
- form container should never overflow due to width 100% ([#54](https://github.com/alauda/alauda-ui/issues/54)) ([bd269db](https://github.com/alauda/alauda-ui/commit/bd269db1c4ed9355f24c15e09d7b8e6f3ec4d6fb)), closes [#ACP-3614](https://github.com/alauda/alauda-ui/issues/ACP-3614)
- input min-width error and tags input value may null ([4ac1a9e](https://github.com/alauda/alauda-ui/commit/4ac1a9eea93bc19b0c499f54dfd263b8aef9f63c))

### [5.3.2](https://github.com/alauda/alauda-ui/compare/v5.3.1...v5.3.2) (2020-09-25)

### Features

- bump deps, support typescript 4.0+ ([#51](https://github.com/alauda/alauda-ui/issues/51)) ([7291f95](https://github.com/alauda/alauda-ui/commit/7291f9519fb69664a9e5bff729a6ae25d4320cee))

### Bug Fixes

- changeValue should trigger before blur ([#52](https://github.com/alauda/alauda-ui/issues/52)) ([a4980e9](https://github.com/alauda/alauda-ui/commit/a4980e9e1f9bc1d6e6b5c23c188a02e6662f556d))
- compatible with cdk 10.2+, support sticky header ([#50](https://github.com/alauda/alauda-ui/issues/50)) ([d900f45](https://github.com/alauda/alauda-ui/commit/d900f4573415929f2e0a9a8b842f8888ce3d8c62))
- firefox aui-number-input css bug ([#48](https://github.com/alauda/alauda-ui/issues/48)) ([ebe3249](https://github.com/alauda/alauda-ui/commit/ebe324924f440025069435ebcad99782cd3566c4))

### [5.3.1](https://github.com/alauda/alauda-ui/compare/v5.3.0...v5.3.1) (2020-09-14)

### Bug Fixes

- auiTocLink support array input ([a647e80](https://github.com/alauda/alauda-ui/commit/a647e80df0a68231fe897844369e802e63f671fd))
- common form control typing ([c80e5a4](https://github.com/alauda/alauda-ui/commit/c80e5a44173cadaac87f4d543186440848f1e7ab))

## [5.3.0](https://github.com/alauda/alauda-ui/compare/v5.2.0...v5.3.0) (2020-08-13)

### Bug Fixes

- **select:** auto scroll to focused option ([1bec1e5](https://github.com/alauda/alauda-ui/commit/1bec1e592c544ec40372e5eef0cb44b4551a5ed4))
- compatibility with cdk 10.1+ ([#41](https://github.com/alauda/alauda-ui/issues/41)) ([de02bc7](https://github.com/alauda/alauda-ui/commit/de02bc79b97fe4e8bb4bdce8750c8db0d262e492))
- input should hide when unfocus ([#38](https://github.com/alauda/alauda-ui/issues/38)) ([605491d](https://github.com/alauda/alauda-ui/commit/605491d9405110e393a0194ec1f5192b353f88c0))
- resize card section margin ([83182f0](https://github.com/alauda/alauda-ui/commit/83182f0d29c7daab4e8efb2d35345c49c861aecf))

## [5.2.0](https://github.com/alauda/alauda-ui/compare/v5.1.4...v5.2.0) (2020-07-14)

### ⚠ BREAKING CHANGES

- upgrade to Angular 10 (#33)

### Features

- add title to tag in tag input AIT-3046 ([#34](https://github.com/alauda/alauda-ui/issues/34)) ([4b05ac3](https://github.com/alauda/alauda-ui/commit/4b05ac3843b4a61e749a7fb97de03639e5270548))
- add toc doc ([#27](https://github.com/alauda/alauda-ui/issues/27)) ([932cb38](https://github.com/alauda/alauda-ui/commit/932cb388b752e8f40ff30287b58b7e37ff9828eb))
- select tag card docs ([58e6888](https://github.com/alauda/alauda-ui/commit/58e68882b25cad85fe19ea8a5558655bb18afd09))
- upgrade to Angular 10 ([#33](https://github.com/alauda/alauda-ui/issues/33)) ([03efc87](https://github.com/alauda/alauda-ui/commit/03efc87eb4c56fd7e7b82835aa4ca29f8603328b))

### Bug Fixes

- empty line when one row filled by tag and optimize #ACP-2796 ([#31](https://github.com/alauda/alauda-ui/issues/31)) ([7b8b9b1](https://github.com/alauda/alauda-ui/commit/7b8b9b12d781444371032397e6512ca885026d85)), closes [#ACP-2796](https://github.com/alauda/alauda-ui/issues/ACP-2796)
- tag input not hide placeholder when update ([#35](https://github.com/alauda/alauda-ui/issues/35)) ([5289daa](https://github.com/alauda/alauda-ui/commit/5289daa2862affb2e3083c4bf3d7d69c53fa1cb8))

### [5.1.10](https://github.com/alauda/alauda-ui/compare/v5.1.4...v5.1.10) (2020-06-09)

### Features

- **checkbox:** add indeterminate state ([732d489](https://github.com/alauda/alauda-ui/commit/732d48996ddf84efd83033900739ad6ff87ac8c4))
- add switch,autocomplete,backtop docs ([6e0b8b2](https://github.com/alauda/alauda-ui/commit/6e0b8b292795cd955d7116000f67864623c970b7))

### Bug Fixes

- card header hasDivider apply only chind header ([1741a73](https://github.com/alauda/alauda-ui/commit/1741a731311741572e115651ae3f8230eb4b974d))

### [5.1.9](https://github.com/alauda/alauda-ui/compare/v5.1.4...v5.1.9) (2020-05-15)

### Bug Fixes

- toc container had multi instance ([43115e4](https://github.com/alauda/alauda-ui/commit/43115e4c9877142bc9eeb0a6d5e2e08c4e2f9aa6))

### [5.1.8](https://github.com/alauda/alauda-ui/compare/v5.1.4...v5.1.8) (2020-05-12)

### Bug Fixes

- **select:** remove line through error style ([8a86be5](https://github.com/alauda/alauda-ui/commit/8a86be5a62bba2080875cc3366bdbb726903f2ea))

### [5.1.7](https://github.com/alauda/alauda-ui/compare/v5.1.4...v5.1.7) (2020-04-26)

### Bug Fixes

- initial value snapshot of tags input ([d9c12a7](https://github.com/alauda/alauda-ui/commit/d9c12a771d422d80d5dde5ddb293df74da30cd42))

### [5.1.6](https://github.com/alauda/alauda-ui/compare/v5.1.4...v5.1.6) (2020-04-24)

### Features

- common form control set snapshot by default ([a5782a5](https://github.com/alauda/alauda-ui/commit/a5782a5c99a124672ff3dd49bca02855d4f0ae46))
- **accordion:** add lazy load to accordion item ([0370784](https://github.com/alauda/alauda-ui/commit/0370784b87ed6922e70e9d98ad93cfe802a0c108))

### [5.1.5](https://github.com/alauda/alauda-ui/compare/v5.1.4...v5.1.5) (2020-04-22)

### Features

- page sider static false ([0ed3881](https://github.com/alauda/alauda-ui/commit/0ed3881b7c69bdcfd3b6484af003076a476aef78))

### Bug Fixes

- radio button can't inject radio group ([c0f8e07](https://github.com/alauda/alauda-ui/commit/c0f8e07e902b15e05015cea2c9b9f627adc111fb))

### 5.1.4 (2020-04-09)

### Bug Fixes

- multi-select height ([4bc59ec](https://github.com/alauda/alauda-ui/commit/4bc59eceecf265b893f4e00aaaaab8985af025d6))

### [5.1.3](https://bitbucket.org/mathildetech/alauda-ui/branches/compare/v5.1.3..v5.1.2#diff) (2020-04-08)

### Bug Fixes

- placeholder rely on value of hasSelected changes ([d448ba1](https://bitbucket.org/mathildetech/alauda-ui/commits/d448ba1e561f74ab022eb99177f396ce2afd6cbc))
- style for class names includes aui- ([217fdc4](https://bitbucket.org/mathildetech/alauda-ui/commits/217fdc40bc136651a1e900ffbddd4e8a9d341d32))

### [5.1.2](https://bitbucket.org/mathildetech/alauda-ui/branches/compare/v5.1.2..v5.1.1#diff) (2020-03-26)

### Features

- optimize taginput ([e3e549d](https://bitbucket.org/mathildetech/alauda-ui/commits/e3e549dd9e1dbd17617955726f95d7cd9b9696ea))

### Bug Fixes

- ivy compatibility ([8fcc012](https://bitbucket.org/mathildetech/alauda-ui/commits/8fcc01291087ac7174a13bd0368cc0fab8e1330b))

### [5.1.1](https://bitbucket.org/mathildetech/alauda-ui/branches/compare/v5.1.1..v5.1.0#diff) (2020-03-16)

### Bug Fixes

- using unique spinner mask id ([b7b58ac](https://bitbucket.org/mathildetech/alauda-ui/commits/b7b58acdc516be5e9b2fc417d2c483f2e276742e))

## [5.1.0](https://bitbucket.org/mathildetech/alauda-ui/branches/compare/v5.1.0..v5.0.2#diff) (2020-03-09)

### ⚠ BREAKING CHANGES

- basic icons are removed, and some aui icons are renamed

### Features

- change the color of info type notification/message to blue ([b99f941](https://bitbucket.org/mathildetech/alauda-ui/commits/b99f941ae4c494326682f9a4bc245b5bf8442b1d))
- include cdk scrolling module ([bdabaa3](https://bitbucket.org/mathildetech/alauda-ui/commits/bdabaa35d7c99bbce5d7883cf7ab8eba8083704c))
- remove basic icons ([697ee60](https://bitbucket.org/mathildetech/alauda-ui/commits/697ee60a346f7cbb08de08e7b69b425053be6a12))
- replace spinner icon ([579a3fb](https://bitbucket.org/mathildetech/alauda-ui/commits/579a3fb593c7afa231e0e0eac7d3fdc76b14b00c))

### [5.0.2](https://bitbucket.org/mathildetech/alauda-ui/branches/compare/v5.0.2..v5.0.1#diff) (2020-02-18)

### Bug Fixes

- add debounce to toc container scroll event handler ([00b3f6a](https://bitbucket.org/mathildetech/alauda-ui/commits/00b3f6a82801a5cc7dfd222ee66297685c280383))

### [5.0.1](https://bitbucket.org/mathildetech/alauda-ui/branches/compare/v5.0.1..v5.0.0#diff) (2020-02-14)

## [5.0.0](https://bitbucket.org/mathildetech/alauda-ui/branches/compare/v5.0.0..v4.3.3#diff) (2020-02-07)

### ⚠ BREAKING CHANGES

- upgrade angular to 9.0, remove deprecated modules

### Features

- upgrade angular to 9.0, remove deprecated modules ([9f5c81c](https://bitbucket.org/mathildetech/alauda-ui/commits/9f5c81cde219c9a613e960fc4deb4b423cd8a4c3))

### [4.3.3](https://bitbucket.org/mathildetech/alauda-ui/branches/compare/v4.3.3..v4.3.2#diff) (2020-02-03)

### Bug Fixes

- can't resolve 'clipboard-polyfill' ([940221f](https://bitbucket.org/mathildetech/alauda-ui/commits/940221f16f2aec4904f595794a0e70f8cee0383e))
- num-aui-input min max ui bug #PT-263 ([3d0a06b](https://bitbucket.org/mathildetech/alauda-ui/commits/3d0a06bcb8cc4c9192be76ab7fcc87814cf62eb9)), closes [#PT-263](http://jira.alaudatech.com/browse/PT-263)
- storybook build error ([eb605be](https://bitbucket.org/mathildetech/alauda-ui/commits/eb605befbd81220fcdc738412a857f65abb19abe))

### [4.3.2](https://bitbucket.org/mathildetech/alauda-ui/branches/compare/v4.3.2..v4.3.1#diff) (2019-12-11)

### Features

- use union [@1st](https://bitbucket.org/mathildetech/alauda-ui)G configs, bump all (dev)Dependencies ([355a814](https://bitbucket.org/mathildetech/alauda-ui/commits/355a81464c8c583e805301433141a828a38ecc46))

### [4.3.1](https://bitbucket.org/mathildetech/alauda-ui/branches/compare/v4.3.1..v4.3.0#diff) (2019-12-10)

### Features

- support to disable table row ([6108ab4](https://bitbucket.org/mathildetech/alauda-ui/commits/6108ab490212aeb73adf7541fd959eb466c57cab))

## [4.3.0](https://bitbucket.org/mathildetech/alauda-ui/branches/compare/v4.3.0..v4.2.12#diff) (2019-12-05)

### Features

- support muilt select options label use template ([a6d895d](https://bitbucket.org/mathildetech/alauda-ui/commits/a6d895d43644d98658a330d9d07deb12b8fd3cc6))

### Bug Fixes

- form item content should align to the center of container ([b4757d3](https://bitbucket.org/mathildetech/alauda-ui/commits/b4757d3b16b0fd93a1ab14c2eb49dcdf7e0cc481))

## [1.5.0](https://bitbucket.org/mathildetech/alauda-ui/branches/compare/v1.5.0..v4.2.12#diff) (2019-12-05)

### Features

- support muilt select options label use template ([a6d895d](https://bitbucket.org/mathildetech/alauda-ui/commits/a6d895d43644d98658a330d9d07deb12b8fd3cc6))

### Bug Fixes

- form item content should align to the center of container ([b4757d3](https://bitbucket.org/mathildetech/alauda-ui/commits/b4757d3b16b0fd93a1ab14c2eb49dcdf7e0cc481))

### [4.2.12](https://bitbucket.org/mathildetech/alauda-ui/branches/compare/v4.2.12..v4.2.11#diff) (2019-12-03)

### Bug Fixes

- form-item-addon should align to the top of the container ([0907081](https://bitbucket.org/mathildetech/alauda-ui/commits/09070819ed7089385f2ec9364b3f2bfa6b0f4278))

### [4.2.11](https://bitbucket.org/mathildetech/alauda-ui/branches/compare/v4.2.11..v4.2.10#diff) (2019-11-28)

### Bug Fixes

- add fill color for tree select icon ([f062006](https://bitbucket.org/mathildetech/alauda-ui/commits/f06200669affe69e265c1a67c7b36b0de2ad23da))
- optimize the postion of the close button in dialog header ([f1d1129](https://bitbucket.org/mathildetech/alauda-ui/commits/f1d11297a8a5bfdcf9ce69bb16e6c77480216a7f))

### [4.2.10](https://bitbucket.org/mathildetech/alauda-ui/branches/compare/v4.2.10..v4.2.9#diff) (2019-11-14)

### Icon

- update basic icon v0.75 ([026dd69](https://bitbucket.org/mathildetech/alauda-ui/commits/026dd693cdc29224063427102895203fbd524a5f))

### [4.2.9](https://bitbucket.org/mathildetech/alauda-ui/branches/compare/v4.2.9..v4.2.8#diff) (2019-10-21)

### Bug Fixes

- number input add type attribute ([c60dae1](https://bitbucket.org/mathildetech/alauda-ui/commits/c60dae1053cade76a70768e37a6ffc1b49be9593))

### [4.2.8](https://bitbucket.org/mathildetech/alauda-ui/branches/compare/v4.2.8..v4.2.7#diff) (2019-10-17)

### Bug Fixes

- multi select custom create value bug ([db908ce](https://bitbucket.org/mathildetech/alauda-ui/commits/db908ce71537bda9f6f68a5ff44ca4c451e3b448))

### [4.2.7](https://bitbucket.org/mathildetech/alauda-ui/branches/compare/v4.2.7..v4.2.6#diff) (2019-10-16)

### Bug Fixes

- icon doc url ([396e186](https://bitbucket.org/mathildetech/alauda-ui/commits/396e1867b78b39eb6413a41ac1f0dee4cf45eb0f))

### Icon

- update basic icon v0.73 ([be43888](https://bitbucket.org/mathildetech/alauda-ui/commits/be438888c71d48821abdccf8ccd406e535fabaee))

### [4.2.6](https://bitbucket.org/mathildetech/alauda-ui/branches/compare/v4.2.6..v4.2.5#diff) (2019-10-15)

### Bug Fixes

- select allow create bug ([e816a2f](https://bitbucket.org/mathildetech/alauda-ui/commits/e816a2f6c77a133c21e93625cca3d5d4e7d85440))

### [4.2.5](https://bitbucket.org/mathildetech/alauda-ui/branches/compare/v4.2.5..v4.2.4#diff) (2019-09-18)

### Bug Fixes

- confirm dialog type error ([e376a1b](https://bitbucket.org/mathildetech/alauda-ui/commits/e376a1b))

### [4.2.4](https://bitbucket.org/mathildetech/alauda-ui/branches/compare/v4.2.4..v4.2.3#diff) (2019-09-18)

### Bug Fixes

- dialog confirm method return type ([113a4ea](https://bitbucket.org/mathildetech/alauda-ui/commits/113a4ea))

### Icon

- update v0.72, fix viewBox ([c06729a](https://bitbucket.org/mathildetech/alauda-ui/commits/c06729a))

### [4.2.3](https://bitbucket.org/mathildetech/alauda-ui/branches/compare/v4.2.3..v4.2.2#diff) (2019-09-18)

### [4.2.2](https://bitbucket.org/mathildetech/alauda-ui/branches/compare/v4.2.2..v4.2.1#diff) (2019-09-16)

### Bug Fixes

- bitbucket pipeline ([c349be9](https://bitbucket.org/mathildetech/alauda-ui/commits/c349be9))
- update dev readme ([f88e232](https://bitbucket.org/mathildetech/alauda-ui/commits/f88e232))

### Icon

- update basic icon v0.71 ([87794c0](https://bitbucket.org/mathildetech/alauda-ui/commits/87794c0))

### [4.2.1](https://bitbucket.org/mathildetech/alauda-ui/compare/v4.2.0...v4.2.1) (2019-08-27)

### Bug Fixes

- change all similar codes ([7edf3a6](https://bitbucket.org/mathildetech/alauda-ui/commit/7edf3a6))
- workaround for fesm2015 package building error ([d4701e6](https://bitbucket.org/mathildetech/alauda-ui/commit/d4701e6)), closes [/github.com/angular/angular-cli/issues/14247#issuecomment-486582423](https://bitbucket.org/mathildetech/alauda-ui/issues/issuecomment-486582423)

## [4.2.0](https://bitbucket.org/mathildetech/alauda-ui/branches/compare/v4.2.0..v4.1.2#diff) (2019-08-18)

### Features

- confirm dialog return result ([839e0b0](https://bitbucket.org/mathildetech/alauda-ui/commits/839e0b0))

### [4.1.2](https://bitbucket.org/mathildetech/alauda-ui/branches/compare/v4.1.2..v4.1.1#diff) (2019-08-15)

### Bug Fixes

- add icon 0.70 ([6f619d9](https://bitbucket.org/mathildetech/alauda-ui/commits/6f619d9))
- menu-group-title margin bottom ([c43b8da](https://bitbucket.org/mathildetech/alauda-ui/commits/c43b8da))

### [4.1.1](https://bitbucket.org/mathildetech/alauda-ui/branches/compare/v4.1.1..v4.1.0#diff) (2019-08-05)

### Bug Fixes

- menu item add icon margin ([7e56525](https://bitbucket.org/mathildetech/alauda-ui/commits/7e56525)), closes [#PT-220](http://jira.alaudatech.com/browse/PT-220)

### Icon

- update basic icon 0.69 ([5437436](https://bitbucket.org/mathildetech/alauda-ui/commits/5437436))

## [4.1.0](https://bitbucket.org/mathildetech/alauda-ui/branches/compare/v4.1.0..v4.0.5#diff) (2019-07-26)

### Bug Fixes

- call \_changeActivatedTabs on selectedIndex changes ([c73a46e](https://bitbucket.org/mathildetech/alauda-ui/commits/c73a46e))
- change tab component static metadata ([8f3b7a6](https://bitbucket.org/mathildetech/alauda-ui/commits/8f3b7a6))
- input group addon support dynamic render ([8556bf1](https://bitbucket.org/mathildetech/alauda-ui/commits/8556bf1))
- story should declare used component ([0572490](https://bitbucket.org/mathildetech/alauda-ui/commits/0572490))

### Refactor

- remove unused layout component ([578c016](https://bitbucket.org/mathildetech/alauda-ui/commits/578c016))

### BREAKING CHANGES

- aui-layout has been removed

### [4.0.5](https://bitbucket.org/mathildetech/alauda-ui/branches/compare/v4.0.5..v4.0.4#diff) (2019-07-10)

### Bug Fixes

- aui header addon not show error ([d96a1b9](https://bitbucket.org/mathildetech/alauda-ui/commits/d96a1b9))
- ContentChild static false for form-item ([a85139a](https://bitbucket.org/mathildetech/alauda-ui/commits/a85139a))
