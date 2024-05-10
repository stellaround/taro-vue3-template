<div align="center">
  <img alt="taro-vue3-template logo" width="120" height="120" src="./logo.png">
  <h1>taro-vue3-template</h1>
  <span>English | <a href="./README.zh-CN.md">中文</a></span>
</div>

## 介绍

该框架是一个基于 Taro3（3.6）、Vue3、NutUI4、Pinia、Typescript、vue-router、axios的前端跨段模板。

## 特性

- 状态持久化：借用于[pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/)和[pinia-plugin-persistedstate-mini-program](https://github.com/stellaround/pinia-plugin-persistedstate-mini-program)，我们实现了使用 pinia 去统一管理 localStorage 和 SessionStorage(h5和微信小程序已适配)
- 统一请求函数：基于 axios 封装了一套具有完善类型的请求函数，使用 useGet、usePost、usePut、useDelete 等作为基础接口调用。
- svg加载：统一使用svg-icon组件(h5采用svg-sprite-loader)(h5和微信小程序已适配)。
- scoped兼容：基于[@stellaround/convert-vue-scoped](https://github.com/stellaround/convert-vue-scoped)，实现了在小程序端也可以使用scoped写法。
- 移动端单位适配：小程序端使用rpx、h5端使用vw、vh。
- 自动化发版流程：执行pnpm pb即可自动执行打包、生成日志、推送的自动化流程。
- Vue Devtools调试: 支持Taro3 配合 Vue DevTools调试。
- 支持小程序分包配置
- 支持使用vue-router配置路由
- 自动导入：基于unplugin-vue-components实现了组件的自动导入，基于unplugin-auto-import实现了方法的自动导入。

### 注意事项

1.在使用小程序分包的时候，因为使用了vue-router，所有本来不需要额外在subpackages的pages数组中添加路径，但是不添加会导致这个路径被认为不是一个有效的目录，所以在小程序分包的时候需要手动新增一个占位index页面。

2.因为使用了响应式，所以尽量避免在dom或者ts中改变宽高等属性，在less中的样式会被自动转换，在ts中请使用`Taro.pxTransform(10)`API做转换。

3.svg的变色要保证svg内部所有的fill都为`currentColor`，否则无法变色。
