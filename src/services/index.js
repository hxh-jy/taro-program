import {GET,POST} from "./request"
const api = 'https://data.ourplay.net'
// https://data.ourplay.net/smallprogram/questiontype
// 游戏评论列表接口
export const getQuestiontype = (data) =>
  POST(`${api}/smallprogram/questiontype`, data, true);