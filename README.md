# Alauda UI

> Internal Angular UI framework for Alauda Frontend Team.

## TOC <!-- omit in TOC -->

- [Online Demo](#online-demo)
- [Getting Started](#getting-started)
  - [Install](#install)
  - [Usage](#usage)
- [Development](#development)
- [Test](#test)
- [Build Storybook](#build-storybook)
- [Build Library](#build-library)
- [Read More](#read-more)
- [LICENCE](#licence)

## Online Demo

[Storybook Demo](http://k8s-cn-alauda-ui.nolimited.haproxy-internet-alaudacn.myalauda.cn)

## Getting Started

### Install

```sh
# npm
npm i @alauda/ui

# yarn
yarn add @alauda/ui
```

### Usage

```ts
import { ButtonModule } from '@alauda/ui';

@NgModule({
  imports: [ButtonModule],
})
export class AppModule {}
```

## Development

```sh
git clone https://github.com/alauda/alauda-ui.git
cd alauda-ui
yarn install
yarn start
```

开发环境基于 [Storybook](https://storybook.js.org/) 运行，查看 [文档](https://storybook.js.org/basics/guide-angular/)。

## Test

```sh
yarn test
```

or

```sh
yarn test:watch
```

## Build Storybook

```sh
yarn storybook:build
```

## Build Library

```sh
yarn build
```

## Read More

- [coding standards](./docs/CODING_STANDARDS.md)
- [contributing](./docs/CONTRIBUTING.md)
- [AOT notes](./docs/AOT_NOTES.md)

## LICENCE

[MIT](LICENCE) © [Alauda](http://www.alauda.io)
