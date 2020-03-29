import request from './network.js'

export function getMutiData() {
  return request({
    url: 'http://123.207.32.32:8000/home/multidata'
  });
}

export function getGoodsData(pagenum) {
  return  new Promise((resolve, reject) => {

    wx.request({
      url: 'https://api-ugo-web.itheima.net/api/public/v1/goods/search',
      data: {
        pagenum
      },
      success: resolve,
      fail: reject
    })
  })

}