export default {
  pages: [
    'pages/index/index',
    "pages/news/index",
    "pages/recommend/index",
    "pages/ask/index",
    "pages/strategy/index",
    "pages/mine/index"
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#0fb8a0',
    navigationBarTitleText: 'OurPlay',
    navigationBarTextStyle: 'white'
  },
  tabBar: {
    list: [
      {
        iconPath: "static/icons/index.png",
        selectedIconPath: "static/icons/index_active.png",
        pagePath: "pages/index/index",
        text: "首页",
      },
      {
        iconPath: "static/icons/news.png",
        selectedIconPath: "static/icons/news_active.png",
        pagePath: "pages/news/index",
        text: "资讯",
      },
      {
        iconPath: "static/icons/recommend.png",
        selectedIconPath: "static/icons/recommend_active.png",
        pagePath: "pages/recommend/index",
        text: "推荐",
      },
      {
        iconPath: "static/icons/ask.png",
        selectedIconPath: "static/icons/ask_active.png",
        pagePath: "pages/ask/index",
        text: "问答",
      },
      {
        iconPath: "static/icons/mine.png",
        selectedIconPath: "static/icons/mine_active.png",
        pagePath: "pages/mine/index",
        text: "我的",
      },
    ]
  }
}
