import React,{useEffect,useState} from 'react'

import {getQuestiontype} from '../../services/index'

import {styled} from 'linaria/react'
import { View,ScrollView } from '@tarojs/components'

const PageWrapper = styled(({className}) => {
  let [queList,setQuelist] = useState([])
  const questiontype = async () => {
    let {data: res} = await getQuestiontype()
    if (res.code == 0 && res.data) {
      setQuelist(res.data)
    }
  }
  useEffect(() => {
    questiontype()
    console.log(queList)
  },[])
  return (
    <ScrollView
    className={className}
    scrollX>
      {
        queList && queList.length > 0 ?
        queList.map(item => {
          return (
            <View key={item.id}>{item.name}</View>
          )
        }) : ''
      }
    </ScrollView>
  )
})``

function Index() {
  return (
    <PageWrapper></PageWrapper>
  )
}
export default Index


