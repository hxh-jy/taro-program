import { Component } from 'react'
import { View, Text } from '@tarojs/components'

import {
  getAppCommentList
} from '../../services/index';

export default class Index extends Component {

  componentWillMount () { }

  async componentDidMount () {
    let list = await getAppCommentList({appid: 145,page: 1,pagesize: 20})
    console.log('测试接口数据',list)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
