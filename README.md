<div align="center">
  <img alt="taro-vue3-template logo" width="120" height="120" src="./logo.png">
  <h1>taro-vue3-template</h1>
  <span>English | <a href="README.zh-CN.md">中文</a></span>
</div>

## Introduction

This framework is a cross-end template based on Taro3 (3.6), Vue3, NutUI4, Pinia, Typescript, vue-router, and axios.

## Features

- State Persistence: Borrowed from [pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/) and [pinia-plugin-persistedstate-mini-program](https://github.com/stellaround/pinia-plugin-persistedstate-mini-program), we have implemented using pinia to uniformly manage localStorage and SessionStorage (adapted for H5 and WeChat mini-program).
- Unified Request Function: Based on axios, we have encapsulated a set of request functions with complete types, using useGet, usePost, usePut, useDelete, etc., as basic interface calls.
- SVG Loading: Uniformly using the svg-icon component (H5 using svg-sprite-loader) (adapted for H5 and WeChat mini-program).
- Scoped Compatibility: Based on [@stellaround/convert-vue-scoped](https://github.com/stellaround/convert-vue-scoped), we have realized the use of scoped writing in mini-program as well.
- Mobile Unit Adaptation: Mini-program using rpx, H5 using vw, vh.
- Automated Release Process: Executing pnpm pb can automatically carry out the packaging, log generation, push of the automated process.
- Vue Devtools Debugging: Supports debugging Taro3 with Vue DevTools.
- Support for Mini-Program Subpackage Configuration
- Support for Configuring Routing with vue-router
- Automatic Import: Implemented the automatic import of components based on unplugin-vue-components, and implemented the automatic import of methods based on unplugin-auto-import.

### Precautions

1.When using mini-program subpackage, because vue-router is used, initially there is no need to add paths in the subpackages' pages array additionally. However, not adding them will cause the path to be considered not a valid directory, so when using mini-program subpackage, it is necessary to manually add a placeholder index page.

2.Because responsiveness is used, try to avoid changing attributes such as width and height in DOM or TS. The styles in less will be automatically converted, in TS please use the `Taro.pxTransform(10)` API for conversion.

3.The color change of svg must ensure that all fill attributes in svg are `currentColor`, otherwise the color cannot be changed.
