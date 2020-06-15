# OPP

## Initialise your development environment

All following commands must be run only once at project installation.

### First clone

```shell
git clone https://github.com/Terralego/opp-front.git
```

### Install NVM

follow official procedures for
[nvm](https://github.com/creationix/nvm#install-script)

## Use your development environment

### Always use npm using nvm

```shell
nvm install && nvm use  # only once per launched shell
nvm $args
```

### Install

```shell
npm ci
```

### Launch dev server

Before launching dev server, you need to define API url

```shell
cp public/.env.dist.json public/.end.json
```

Edit this file, and set api backend url

```json
{
  // example with backend app in dev mode
  "API_PROVIDER": "http://127.0.0.1:8000/api"  
}
```

```shell
npm start
```

### Tests

```shell
npm test
```

## Notes

### Add Library in mode dev

```shell
npm i {nameModule}` -D
```

### Update a specific module

```shell
npm update {nameModule}
```

### Mode debug map/layer in browser console

```js
localStorage.debug = 'terralego:*'
```

## how to test locally

build app

```shell
npm run build
```

serve local build

```shell
npx serve -s build
```

WARNING !

In build mode, a frontend proxy should redirect all /api requests to backend application