<div align="center">
  <a href="https://github.com/lyyyd/nestleify"><img src="docs/caz.png" alt="CAZ"></a>
  <p>nestleify, A simple yet powerful automation tools. markdown file picture to base64, super fast, simple, easy to use.</p>
  <p>
    <a href="https://github.com/lyyyd/nestleify/actions"><img src="https://img.shields.io/github/actions/workflow/status/lyyyd/nestleify/main.yml" alt="Build Status"></a>
    <a href="https://codecov.io/gh/lyyyd/nestleify"><img src="https://img.shields.io/codecov/c/github/lyyyd/nestleify" alt="Coverage Status"></a>
    <a href="https://github.com/lyyyd/nestleify/blob/master/LICENSE"><img src="https://img.shields.io/github/license/lyyyd/nestleify" alt="License"></a>
    <a href="https://npm.im/caz"><img src="https://img.shields.io/npm/v/caz" alt="NPM Version"></a>
    <a href="https://npm.im/caz"><img src="https://img.shields.io/node/v/caz" alt="Node Version"></a>
    <br>
    <a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen" alt="Code Style"></a>
    <a href="https://npm.im/caz"><img src="https://img.shields.io/npm/dm/caz" alt="NPM Downloads"></a>
    <a href="https://packagephobia.com/result?p=caz"><img src="https://packagephobia.com/badge?p=caz" alt="Install Size"></a>
    <a href="https://github.com/lyyyd/nestleify"><img src="https://img.shields.io/github/repo-size/lyyyd/nestleify" alt="Repo Size"></a>
    <a href="https://github.com/lyyyd/nestleify"><img src="https://img.shields.io/librariesio/github/lyyyd/nestleify" alt="Dependencies Status"></a>
  </p>
</div>













<br>

**English** | [简体中文](README.zh-CN.md)

## Introduction

CAZ (**C**reate **A**pp **Z**en)

It's a a simple template-based Scaffolding tools for my personal productivity, inspired by [Yeoman](https://yeoman.io) &amp; [Vue CLI 2](https://npm.im/vue-cli) &amp; etc.

- pronounced: [[kæz]](http://dict.youdao.com/dictvoice?audio=caz) 📷 ✌
- written: CAZ / caz

_For more introduction, please refer to the [How it works](#how-it-works)._

### Features

- Easy to use
- Light-weight
- Still powerful
- High efficiency
- Zero dependencies
- Template-based
- Configurable
- Extensible
- TypeScript
- Use modern API

> I'll give you specific reasons later.

## Table of Contents

- [Introduction](#introduction)
  - [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Quick Start](#quick-start)
- [Recipes](#recipes)
  - [GitHub Repo Templates](#github-repo-templates)
  - [Local Templates](#local-templates)
  - [Remote ZIP Templates](#remote-zip-templates)
  - [Offline Mode](#offline-mode)
  - [Prompts Override](#prompts-override)
  - [Debug Mode](#debug-mode)
  - [List Available Templates](#list-available-templates)
- [Official Templates](#official-templates)
- [Advanced](#advanced)
  - [Configuration](#configuration)
  - [Create Your Template](#create-your-template)
  - [Create Your Scaffold](#create-your-scaffold)
- [References](#references)
- [Motivation](#motivation)
- [About](#about)
  - [How It Works](#how-it-works)
  - [Built With](#built-with)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) (>= 14.14 required, >= 16.13 preferred)
- [npm](https://www.npmjs.com) (>= 7.x) or [pnpm](https://pnpm.io) (>= 6.x) or [yarn](https://yarnpkg.com) (>= 1.22)
- [Git](https://git-scm.com) (>= 2.0)

### Installation

```shell
# install it globally
$ npm install -g caz

# or yarn
$ yarn global add caz
```

### Quick Start

Create new project from a template.

```shell
$ caz <template> [project] [-f|--force] [-o|--offline]

# caz with an official template
$ caz <template> [project]

# caz with a github repo
$ caz <owner>/<repo> [project]
```

If you only use it occasionally, I recommend that you use `npx` to run `caz` directly.

```shell
$ npx caz <template> [project] [-f|--force] [-o|--offline]
```

#### Options

- `-f, --force`: Overwrite if the target exists
- `-o, --offline`: Try to use an offline template

## Recipes

### GitHub Repo Templates

```shell
$ caz nm my-project
```

The above command pulls the template from [caz-templates/nm](https://github.com/caz-templates/nm), then prompts for some information according to the configuration of this template, and generate the project at `./my-project`.

```shell
$ caz nm#typescript my-project
```

By running this command, CAZ will pulls the template from `typescript` branch of [caz-templates/nm](https://github.com/caz-templates/nm).

#### Use Custom templates

```shell
$ caz zce/nm my-project
```

The above command pulls the template from [zce/nm](https://github.com/zce/nm). This means that you can also pull templates from your public GitHub repository.

**Public repository is necessary.**

### Local Templates

Instead of a GitHub repo, you can also use a template on your local file system.

e.g.

```shell
$ caz ~/local/template my-project
```

The above command use the template from `~/local/template`.

### Remote ZIP Templates

Instead of a GitHub repo, you can also use a template with a zip file uri.

e.g.

```shell
$ caz https://cdn.zce.me/boilerplate.zip my-project
```

The above command will download & extract template from `https://cdn.zce.me/boilerplate.zip`.

### Offline Mode

```shell
$ caz nm my-project --offline
```

By running this command, CAZ will try to find a cached version of `nm` template or download from GitHub if it's not yet cached.

### Prompts Override

CAZ allows you to specify prompt response answers through cli parameters.

```shell
$ caz minima my-project --name my-proj
```

By running this command, you don't have to answer the next `name` prompts.

### Debug Mode

```shell
$ caz nm my-project --debug
```

`--debug` parameter will open the debug mode.

In debug mode, once an exception occurs, the exception details will be automatically output. This is very helpful in finding errors in the template.

### List Available Templates

Show all available templates:

```shell
$ caz list [owner] [-j|--json] [-s|--short]
```

#### Arguments

- `[owner]`: GitHub orgs or user slug, default: `'caz-templates'`

#### Options

- `-j, --json`: Output with json format
- `-s, --short`: Output with short format

## Official Templates

Current available templates list:

- [template](https://github.com/caz-templates/template) - for creating [caz](https://github.com/lyyyd/nestleify) templates.
- [nm](https://github.com/caz-templates/nm) - for creating [node](https://nodejs.org) modules.
- [vercel](https://github.com/caz-templates/vercel) - for creating [vercel](https://vercel.com) apps.
- [react](https://github.com/caz-templates/react) - for creating modern [react](https://reactjs.org) apps.
- [vue](https://github.com/caz-templates/vue) - for creating modern [vue.js](https://vuejs.org) apps.
- [vite](https://github.com/caz-templates/vite) - for creating vue.js apps powered by [vite](https://github.com/vitejs/vite).
- [electron](https://github.com/caz-templates/electron) - :construction: for creating [electron](https://electronjs.org) apps.
- [mp](https://github.com/caz-templates/mp) - :construction: for creating wechat [mini-programs](https://developers.weixin.qq.com/miniprogram/dev/framework).
- [jekyll](https://github.com/caz-templates/jekyll) - :construction: for creating [jekyll](https://jekyllrb.com) site.
- [x-pages](https://github.com/caz-templates/x-pages) - for creating [x-pages](https://github.com/zce/x-pages) static site.

Maybe more: https://github.com/caz-templates

> You can also run `$ caz list` to see all available official templates in real time.

**All templates are currently hosted on GitHub, Chinese users can [use the mirror](#mirror-for-chinese) on coding.net.**

## Advanced

### Configuration

CAZ will read the configuration file in `~/.cazrc`, default config:

```ini
; template download registry
; {owner} & {name} & {branch} will eventually be replaced by the corresponding value.
registry = https://github.com/{owner}/{name}/archive/{branch}.zip
; template offlicial organization name
official = caz-templates
; default template branch name
branch = master
```

This means that you can customize the configuration by modifying the configuration file.

For example, in your `~/.cazrc`:

```ini
registry = https://gitlab.com/{owner}/{name}/archive/{branch}.zip
official = faker
branch = main
```

Then run the following command:

```shell
$ caz nm my-project
```

The above command will download & extract template from `https://gitlab.com/faker/nm/archive/main.zip`.

#### Mirror for Chinese

Due to network limitations, the template download may time out, you can consider using the mirror repository I configured on [coding.net](https://coding.net).

`~/.cazrc`:

```ini
registry = https://zce.coding.net/p/{owner}/d/{name}/git/archive/{branch}
official = caz
```

#### Socks Proxy

CAZ supports socks proxy config.

`~/.cazrc`:

```ini
proxy = socks5://127.0.0.1:1080
```

or environment variable:

```shell
$ ALL_PROXY=socks5://127.0.0.1:1080 caz nm my-project
```

### Create Your Template

```shell
$ caz template my-template
```

The above command will pulls the template from [caz-templates/template](https://github.com/caz-templates/template), and help you create your own CAZ template.

To create and distribute your own template, please refer to the [How to create template](docs/create-template.md).

> Maybe fork an official template is also a good decision.

### Create Your Scaffold

```shell
# install it locally
$ npm install caz

# or yarn
$ yarn add caz
```

with ESM and async/await:

```javascript
import caz from 'caz'

try {
  const template = 'nm'
  // project path (relative cwd or full path)
  const project = 'my-project'
  const options = { force: false, offline: false }
  // scaffolding by caz...
  await caz(template, project, options)
  // success created my-project by nm template
} catch (e) {
  // error handling
  console.error(e)
}
```

or with CommonJS and Promise:

```javascript
const { default: caz } = require('caz')

const template = 'nm'
// project path (relative cwd or full path)
const project = 'my-project'
const options = { force: false, offline: false }
// scaffolding by caz...
caz(template, project, options)
  .then(() => {
    // success created my-project by nm template
  })
  .catch(e => {
    // error handling
    console.error(e)
  })
```

This means that you can develop your own scaffolding module based on it.

To create and distribute your own scaffolding tools, please refer to the [How to create scaffolding tools based on CAZ](docs/create-scaffold.md).

## References

<!-- API Docs -->

### caz(template, project?, options?)

Create new project from a template

#### template

- Type: `string`
- Details: template name, it can also be a template folder path

#### project

- Type: `string`
- Details: project name, it can also be a project folder path
- Default: `'.'`

#### options

- Type: `object`
- Details: options & prompts override
- Default: `{}`

##### force

- Type: `boolean`
- Details: overwrite if the target exists
- Default: `false`

##### offline

- Type: `boolean`
- Details: try to use an offline template
- Default: `false`

##### [key: string]

- Type: `any`
- Details: cli options to override prompts

## Motivation

👉 🛠 ⚙

Joking: I want to make wheels ;P

The real reason is that I think I need a scaffolding tool that is more suitable for my personal productivity. The existing tools have more or less certain limitations because of their different starting points.

Nothing else.

## Concepts

### How It Works

![Scaffolding flow](https://user-images.githubusercontent.com/6166576/88473012-d4ecb180-cf4b-11ea-968a-5508c6f84502.png)

> P.S. The picture is from the Internet, but I have forgotten the specific source, sorry to the author.

#### Main Workflow

The [core code](src/index.ts) is based on the middleware mechanism provided by [zce/mwa](https://github.com/zce/mwa).

The following middleware will be executed sequentially.

1. [confirm](src/confirm.ts) - Confirm destination by [prompts](https://github.com/terkelg/prompts).
2. [resolve](src/resolve.ts) - Resolve template from remote or local filesystem.
3. [load](src/load.ts) - Install template dependencies, load template config by `require`.
4. [inquire](src/inquire.ts) - Inquire template prompts by [prompts](https://github.com/terkelg/prompts).
5. [setup](src/setup.ts) - Only apply template setup hook function.
6. [prepare](src/prepare.ts) - Filter out unnecessary files and prepare all files to be generated.
7. [rename](src/rename.ts) - Rename each file if the filename contains interpolations.
8. [render](src/render.ts) - Render the contents of each file if template.
9. [emit](src/emit.ts) - Emit files to destination.
10. [install](src/install.ts) - Execute `npm | yarn | pnpm install` command if necessary.
11. [init](src/init.ts) - Execute `git init && git add && git commit` command if necessary.
12. [complete](src/complete.ts) - Only apply template complete hook function.

### Built With

- [adm-zip](https://github.com/cthackers/adm-zip) - A Javascript implementation of zip for nodejs. Allows user to create or extract zip files both in memory or to/from disk
- [cac](https://github.com/cacjs/cac) - Simple yet powerful framework for building command-line apps.
- [env-paths](https://github.com/sindresorhus/env-paths) - Get paths for storing things like data, config, cache, etc
- [fast-glob](https://github.com/mrmlnc/fast-glob) - It's a very fast and efficient glob library for Node.js
- [ini](https://github.com/npm/ini) - An ini encoder/decoder for node
- [lodash](https://github.com/lodash/lodash) - Lodash modular utilities.
- [node-fetch](https://github.com/node-fetch/node-fetch) - A light-weight module that brings Fetch API to node.js
- [ora](https://github.com/sindresorhus/ora) - Elegant terminal spinner
- [prompts](https://github.com/terkelg/promptss) - Lightweight, beautiful and user-friendly prompts
- [semver](https://github.com/npm/node-semver) - The semantic version parser used by npm.
- [validate-npm-package-name](https://github.com/npm/validate-npm-package-name) - Give me a string and I'll tell you if it's a valid npm package name

## Roadmap

The following are the features I want to achieve or are under development:

- [ ] config command
- [ ] cache command
- [ ] all lifecycle hooks
- [ ] console output (colorful & verbose)
- [ ] more and more official templates

See the [open issues](https://github.com/lyyyd/nestleify/issues) for a list of proposed features (and known issues).

## Contributing

1. **Fork** it on GitHub!
2. **Clone** the fork to your own machine.
3. **Checkout** your feature branch: `git checkout -b my-awesome-feature`
4. **Commit** your changes to your own branch: `git commit -am 'Add some feature'`
5. **Push** your work back up to your fork: `git push -u origin my-awesome-feature`
6. Submit a **Pull Request** so that we can review your changes.

> **NOTE**: Be sure to merge the latest from "upstream" before making a pull request!

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information. &copy; [汪磊](https://zce.me)

<!-- Acknowledgements -->
