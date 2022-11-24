import React,{useEffect,useState} from 'react'
import { Swiper, SwiperItem,View,ScrollView } from '@tarojs/components'
import {styled} from 'linaria/react'

import {getQuestiontype} from '../../services/index'

import { getCurrentInstance } from "@tarojs/taro";

let TabNav = styled(ScrollView)`
  position: fixed;
  left: 0;
  top: 0;

  display: flex;
  height: 80px;
  white-space: nowrap;
  background: #10b8a1;
  font-size: 28px;
  color: #fff;
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
export default function index() {
  let data = ['数据1','数据2','数据3','数据4','数据5','数据5','数据6','数据7','数据8','数据9']
  let path = getCurrentInstance().router.path.split('/')[2]
  let [queList,setQuelist] = useState([])
  let [current,setCurrent] = useState(0)
  let [viewId,setViewId] = useState(0)
  const questiontype = async () => {
    let {data: res} = await getQuestiontype()
    if (res.code == 0 && res.data) {
      setQuelist(res.data)
    }
  }
  useEffect(() => {
    questiontype()
    console.log('测试quelist',queList)
  },[])
  let changeNav = (item,index) => {
    setCurrent(index)
    setViewId(path + current)
    console.log('测试获取导航栏下标',index)
  }
  let handleSwiperchange = (e) => {
    setCurrent(e.target.current)
    setViewId(path + current)
    console.log('轮播图改变了',e.target.current)
  }
  return (
    <>
      <TabNav 
      scrollIntoView={viewId}
      scrollWithAnimation 
      scrollX>
        {
          queList.map((item,index) => {
            return(
              <TabNavItem  
              id={path + index}
              index={index}
              current={current}
              onClick={() => changeNav(item,index)} 
              key={item.id}>{item.name}</TabNavItem>
            )
          })
        }
      </TabNav>
    <Swiper
    current={current}
    style="marginTop: 200px"
    indicatorDots
    onChange={handleSwiperchange}
    circular>
      {
        data.map(item => {
          return (
            <SwiperItem key={item}>
              <View>{item}+{current}</View>
            </SwiperItem>
          )
        })
      }
    </Swiper>
    </>
  )
}
