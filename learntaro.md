# 一、Taro规范

+ 在 React 中使用这些内置组件前，必须从 `@tarojs/components` 进行引入。

+ 组件属性遵从**大驼峰式命名规范**。
+ 事件触发
  - 内置事件名以 `on` 开头，遵从小驼峰式（camelCase）命名规范。
  - React 中点击事件使用 `onClick`。

+ Taro在小程序端可以使用所有的小程序原生组件，React 中我们需要先从 Taro 标准组件库 `@tarojs/components` 引用组件，再进行使用，例如使用 `<View />`、 `<Text />` 组件，而 Vue 我们则无需引入

```react
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'

export default class C extends Component {
  render () {
    return (
      <View className='c'>
        <Text>c component</Text>
      </View>
    )
  }
}
```

```js
mounted 中
if (applist < 10) {
    moreApp = false
	if (commentlist + applist < 10) {
        moreComment = false
        commentgList
    }
}

methods中点击加载更多
moreApp,moreComment,moreGcomment
if (moreApp) {
    loadApp
    if (!loadApp || loadApp < 10) {
        moreApp = false
        loadCom
        if (loadCom < 10) {
            moreComment = false
        }
        if (!loadCom || loadCom < 10 -loadApp) {
            moreComment = false
            loadG
            if (loadG < 10) {
                moreGcomment = false
            }
        }
    }
} else if (!moreApp && moreCom) {
    loadCom
    if (!loadCom || loadCom < 10) {
        moreComment = false
        loadG
        if (!loadG || loadG < 10) {
            moreGcomment = false
        }
    }
} else if (!moreApp && !moreComment && moreGcomment) {
    loadG
} else if (!moreApp && !moreComment && !moreGcomment) {
    noShow = true
}
```



Taro项目开发过程中遇到的问题
    scroll-view+swiper的组合使用
    scroll-view中scrollIntoView属性的具体使用应该清楚
    import { getCurrentInstance } from "@tarojs/taro";  getCurrentInstance.router用于访问当前组件/页面路由的详情。