# FBVUE3 -- Firebase integration with Vue 3 Template

## AKA noemulate1

This template should help get you started developing with Vue 3 in Vite.

"npx firebase deploy" -- to publish

## CRITICAL ISSUE WITH FIREBASE EMULATOR 

Problems with "firebase emulator" and ACTUAL "firebase hosting" working concurrently forced me to focus on hosting to firebase as the means of debugging for obvious reasons.  When actually trying to deploy to Firebase, problems with callback promises between vue files and js files of function definitions arose. I was led to refactor entire cross file process whereby entire features are now defined in vue file just to get code to work.  I believe vue-router to be a culprit.  Without temporarily hacking this, we suffer an asynchronous race condition with threading such that Firebase refuses to initiate an app instance. Yes, it is neanderthal, but the code works. The entire point here is to prototype a solution with Firebase, NOT use this code in ACTUAL PRODUCTION. 

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
