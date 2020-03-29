// pages/home/home.js
import {
  getMutiData,
  getGoodsData
} from '../../service/home.js'

const TYPES = ['新款', '精选', '流行']

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    recommends: [],
    titles: ['新款', '精选', '流行'],
    currentType: '',
    goods: [],
    currentIndex: 0,
    isShowBackTop: false,
    isFiexd: false,
    top: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this._getMutiData();

    this._getGoodsData();
  },

  _getMutiData() {
    getMutiData().then(res => {
      console.info(res)
      this.setData({
        banners: res.data.data.banner.list,
        recommends: res.data.data.recommend.list
      })
    })
  },
  _getGoodsData() {
    let index = this.data.currentIndex + 1;
    getGoodsData(index).then(res => {
      console.log(res)
      this.data.goods.push(...res.data.message.goods);
      this.setData({
        goods: this.data.goods
      })
    })

    this.setData({
      currentIndex: index
    })
  },

  tabControlItemClick(e) {
    //console.log(e)
    let index = e.detail.index;
    this.setData({
      currentType: TYPES[index]
    })
  },

  imgLoad() {
    console.log('-------------')
    wx.createSelectorQuery().select("#tabcontrol").boundingClientRect(res => {
      console.log(res)
      this.data.top = res.top;
    }).exec();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  onPageScroll: function(e) {
    //console.log(e)

    const isShow = 500 <= e.scrollTop;

    if (this.data.isShowBackTop != isShow) {
      this.setData({
        isShowBackTop: isShow
      })
    }
    const isFiexd = this.data.top <= e.scrollTop;
    if (this.data.isFiexd != isFiexd) {
        this.setData({
          isFiexd
        })
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this._getGoodsData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: "购物街被分享"
    }
  }
})