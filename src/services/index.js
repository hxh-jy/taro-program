import {GET,POST} from "./request"
const prefix3 = "https://api.ourplay.net/opseoapi"

// 游戏评论列表接口
export const getAppCommentList = (data) =>
  GET(`${prefix3}/app/commentlist`, data, false);