import {GET,POST} from "./request"
const api = 'https://data.ourplay.net'
const ourApi = 'https://api.ourplay.net/opseoapi/'
// https://data.ourplay.net/smallprogram/questiontype

// 游戏问答tab列表接口
export const getQuestiontype = (data) =>
  POST(`${api}/smallprogram/questiontype`, data, true);

// 游戏问答内容列表接口
export const getGptypeqalist = (data) =>
  GET(`${ourApi}minipgqa/gptypeqalist`, data, false);