umi-plugin-separate-route
================

[![NPM version](https://img.shields.io/npm/v/umi-plugin-separate-route.svg?style=flat)](https://npmjs.org/package/umi-plugin-separate-route)
[![NPM downloads](http://img.shields.io/npm/dm/umi-plugin-separate-route.svg?style=flat)](https://npmjs.org/package/umi-plugin-separate-route)

# 介绍
为了尽可能地实现关注点分离，我需要把 umi 的路由配置信息与对应的组件放在一起。通过 `umi-plugin-separate-route` 这个umi插件就可以实现让路由配置分散在各个组件的旁边！

# 安装

```bash
# 或 yarn
$ npm install umi-plugin-separate-route
```

# 启用插件

在 umi的配置文件（如：`.umirc.js`）中，增加 `separateRoute` 选项，如：

```js
export default {
  separateRoute: {},
}
```


# 使用
通过该插件，你可以将各个组件的路由配置信息，放在组件的旁边的js文件 `[组件文件名].route.js` 中；对于文件名为 `index` 的组件，也可将路由信息放在 `route.js` 中；

组名文件名 与 路由文件名的对应关系如下：
- 对于文件名为 `index` 的组件，路由的配置文件名为 `route.js` 或 `index.route.js`；
- 对于文件名不是 `index` 的组件，路由的配置文件名为 `[组件的文件名].route.js`，如：组件 `login.tsx` 的路由配置文件名为 `login.route.js`;
- 组件的路由文件是通过 node 的 `require` 加载的，所以：
   + 组件的路由文件也可以是 json 文件；
   + 组件的路由文件必须以 `CommonJS` 模块导出；
- 组件的路由文件名中的 `route` 是可以在配置中更改的；
- 组件的路由文件配置会与 umi 中对应路由的配置进行合并，重复的键会优先使用组件的路由文件配置的配置；

`[组件的文件名].route.js`中可以配置任何的路由信息，如：

**仅配置部分路由信息用于补充**
```
module.exports = {
    name: '文件管理',
  };
```

**配置 `path` 和 `component`用于覆盖umi生成的路由信息**
```
module.exports = {
    path: '/file-manage',
    component: '@/pages/file-manage',
  };
```



# separateRoute可配置的属性
- `fileName: string`
   + 默认值：`"route"`
   + 组件的路由配置文件的中缀名；


# 证书

MIT
