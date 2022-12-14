import {useEffect,useState} from 'react'
import { Swiper, SwiperItem,View,ScrollView,Text,Image } from '@tarojs/components'
import {styled} from 'linaria/react'

import { getCurrentInstance,useReachBottom } from "@tarojs/taro";
import { AtActivityIndicator } from 'taro-ui'
import {getQuestiontype,getGptypeqalist} from '../../services/index'

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
let Content = styled(({info,className}) => {
  return (
    <View className={className}>
      <View className='card-top'>
        <View className='title'>{info.title}</View>
        <Text className='content'>{info.headline}</Text>
      </View>
      <View className='bottom-info'>
        <Image className='avatar' src={info.userheader}></Image>
        <Text className='username'>{info.username}</Text>
        <Text className='answer-num'>{info.answernum}问答</Text>
        <Text className='title'>{info.creatdate}</Text>
      </View>
    </View>
  )
})`
  background: #ffffff;
  box-shadow: 0px 10px 24px 0px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  border: 1px solid #e5e5e5;
  margin-bottom: 30px;
  .card-top {
    padding: 30px 25px;
  }
  .title {
    font-size: 36px;
    font-weight: 500;
    color: #000000;
    line-height: 36px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .content {
    font-size: 28px;
    font-weight: 500;
    margin-top: 17px;
    color: #666666;
    line-height: 42px;
    display: -webkit-box;
    overflow: hidden;
    white-space: normal !important;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
  }
  .bottom-info {
    padding: 30px 24px;
    font-size: 24px;
    font-weight: 500;
    color: #999999;
    line-height: 24px;
    display: flex;
    align-items: center;
    border-top: 1px solid #e0e0e0;
    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 100%;
      background-color: #eee;
    }
    .username {
      margin-left: 16px;
    }
    .answer-num {
      margin-left: 30px;
    }
    .time {
      margin-left: 30px;
    }
  }
`
export default function index() {
  let path = getCurrentInstance().router.path.split('/')[2]
  let [queList,setQuelist] = useState([])
  let [typeQalist,setTypeqalist] = useState([])
  let [current,setCurrent] = useState(0)
  let [viewId,setViewId] = useState(0)
  let [loading,setLoading] = useState(false)
  let [currentPage,setCurrentpage] = useState(1)
  let [content,setContent] = useState('加载中...')
  const questiontype = async () => {
    let {data: res} = await getQuestiontype()
    if (res.code == 0 && res.data) {
      setQuelist(res.data)
    }
  }
  const gptypeqalist = async (page=1,cid=0) => {
    let params = {
      cid,
      page,
      pagesize: 15
    }
    let {data: res} = await getGptypeqalist(params)
    if (res.code == 1 && res.data.list && res.data.list.length > 0) {
      if (page != 1) {
        setTypeqalist([...typeQalist,...res.data.list])
      } else {
        setTypeqalist(res.data.list)
      }
    } 
  }
  useEffect(() => {
    questiontype()
    gptypeqalist()
  },[])
  let changeNav = (item,index) => {
    setCurrent(index)
    setViewId(path + current)
  }
  let handleSwiperchange = (e) => {
    let cid = queList[e.target.current].id
    setCurrent(e.target.current)
    setViewId(path + current)
    gptypeqalist(1,cid)
    console.log('轮播图改变了',e)
  }
  useReachBottom(() => {
    console.log('监听上拉触底事件***',current,currentPage)
    setLoading(true)
    let cid = queList[current].id
    setCurrentpage(currentPage + 1)
    let page = currentPage + 1 
    setTimeout(() => {
      gptypeqalist(page,cid)
      setLoading(false)
    },3000)
  })
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
      style="marginTop: 50px;height: 95vh"
      onChange={handleSwiperchange}
      circular>
        {
          queList.map(item => {
            return (
              <SwiperItem key={item.id}>
                <ScrollView style="height: 100%" scrollY>
                  {
                    typeQalist.map(qa => {
                      return (
                        <Content key={qa.id} info={qa}></Content>
                      )
                    })
                  }
                </ScrollView>
              </SwiperItem>
            )
          })
        }
      </Swiper>
      {
        loading ? 
        <AtActivityIndicator
        mode="center"
        color="#10b8a1"
        content={content}
        size="32"
        ></AtActivityIndicator> : ''
      }
    </>
  )
}
