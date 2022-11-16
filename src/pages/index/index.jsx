import React,{useEffect,useState} from 'react'

import {getQuestiontype} from '../../services/index'

import {styled} from 'linaria/react'
import { View,ScrollView } from '@tarojs/components'

let TabNavScroll = styled(ScrollView)`
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  height: 80px;
  white-space: nowrap;
  background: #10b8a1;
  font-size: 28px;
`
let TabNavItem = styled(View)`
  display: inline-block;
  position: relative;
  padding: 0 17px;
  color: rgba(
    255,
    255,
    255,
    ${({current,index}) => (index == current ? "1" : "0.6")}
  );
  &:after {
    position: absolute;
    display: ${({current,index}) => current == index ? 'inline-block' : 'none'};
    bottom: -17px;
    left: 31.5%;
    content: '';
    width: 26%;
    height: 4px;
    background: #fff;
  }
`

const PageWrapper = styled(({className}) => {
  let [queList,setQuelist] = useState([])
  let [current,setCurrent] = useState(0)
  const questiontype = async () => {
    let {data: res} = await getQuestiontype()
    if (res.code == 0 && res.data) {
      setQuelist(res.data)
    }
  }

  const handleTabclick = (index) => {
    setCurrent(index)
  }
  useEffect(() => {
    questiontype()
    console.log(queList)
  },[])
  return (
    <TabNavScroll
    className={className}
    scrollX>
      {
        queList && queList.length > 0 ?
        queList.map((item,index) => {
          return (
            <TabNavItem 
            index={index}
            current={current}
            onClick={() => handleTabclick(index)}
            key={item.id}>
              {item.name}
            </TabNavItem>
          )
        }) : ''
      }
    </TabNavScroll>
  )
})``
const Content = styled(({className}) => {
  useEffect(() => {

  },[])
  return (
    <View className={className}>
      测试主体内容
    </View>
  )
})`
  margin-top: 80px;
`

function Index() {
  return (
    <>
      <PageWrapper/>
      <Content></Content>
    </>
  )
}
export default Index


