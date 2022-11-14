# Alauda UI

> Internal Angular UI framework for Alauda Frontend Team.

## TOC <!-- omit in TOC -->

- [Online Demo](#online-demo)
- [Getting Started](#getting-started)
  - [Install](#install)
  - [Project Config](#project-config)
  - [Usage](#usage)
- [Development](#development)
- [Test](#test)
- [Build Storybook](#build-storybook)
- [Build Library](#build-library)
- [Incremental Builds](#incremental-builds)
  - [Parameter](#parameter)
  - [Config File](#config-file)
- [Read More](#read-more)
- [LICENCE](#licence)

## Online Demo

[Storybook Demo](https://aui.js.org)

## Getting Started

### Install

```sh
# npm
npm i @alauda/ui

# yarn
yarn add @alauda/ui
```

and also need to confirm the peer dependencies have been installed

    yarn add dayjs @angular/cdk

### Project Config

```json
// tsconfig.json
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "skipLibCheck": true,
    ...
  },
  ...
}
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

## Incremental Builds

Develop and debug UI component libraries quickly and efficiently by incremental builds

### Parameter

```sh
yarn build:watch
```

Also can copy a dist to another project to debug

    yarn build:watch <project_path>

In this way, after every incremental build completed, dist will be copied to `node_modules` which in specified project

### Config File

In order to incremental build dist to your project directly instead of adding parameter to specify project path every time, can use your own `ng-package.json` by

```sh
npm run debug
```

Edit you own build config by adding a new file called `ng-package.debug.json`, like

```json
// ng-package.debug.json
{
  "$schema": "./node_modules/ng-packagr/ng-package.schema.json",
  "dest": "/home/alauda/projects/<target_project_path>/node_modules/@alauda/ui",
  "lib": {
    "entryFile": "./src/index.ts"
  }
}
```

## Read More

- [coding standards](./docs/CODING_STANDARDS.md)
- [contributing](./docs/CONTRIBUTING.md)
- [AOT notes](./docs/AOT_NOTES.md)

## LICENCE

[MIT](LICENSE) © [Alauda](http://www.alauda.io)
