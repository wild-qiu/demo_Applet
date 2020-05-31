// pages/wather/wather.js
const app = getApp()
var util = require('../../utils/utils.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    src: '/images/weixin.png',
    isShow: true,
    onShow: false,
    admin_area: "北京",
    city: '北京市',
    locationY: '',
    nowDate:'',
    now:'',
    lifestyle:'',
    daily_forecast: '',
    day: ['今天', '明天', '后天']
  },
  getMyInfo(e) {
    console.log(e.detail.userInfo);
    let info = e.detail.userInfo;
    this.setData({
      name: info.nickName,//更新名称
      src: info.avatarUrl,//更新图片来源
      isShow: false,
      onShow: true
    })
  },
  

  getWeathers(){
    var that=this;
    wx.request({
      url: 'https://free-api.heweather.net/s6/weather/now?',
      data:{
        location: that.data.locationY,
        key: 'a97419bef00441ef89f8209205ae478f'
      },
      success(res){
        console.log(res.data);
        that.setData({
        admin_area:res.data.HeWeather6[0].basic.admin_area,
        city: res.data.HeWeather6[0].basic.parent_city,
        now: res.data.HeWeather6[0].now,
        })
      }
    }),

    wx.request({
      url: 'https://free-api.heweather.net/s6/weather/lifestyle?',
      data: {
        location: that.data.locationY,
        key: 'a97419bef00441ef89f8209205ae478f'
      },
      success(res) {
        console.log(res.data);
        that.setData({
          lifestyle: res.data.HeWeather6[0].lifestyle,
        })
      }
    }),

      wx.request({
      url: 'https://free-api.heweather.net/s6/weather/forecast?',
        data: {
          location: that.data.locationY,
          key: 'a97419bef00441ef89f8209205ae478f'
        },
        success(res) {
          console.log(res.data);
          that.setData({
            daily_forecast: res.data.HeWeather6[0].daily_forecast
          })
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              console.log(res)
            }
          })
        } else {
          wx.showToast({
            title: '获取失败',
            icon: 'success',
            duration: 1000
          })
        }
      }
    })

    var that = this
    wx.getLocation({
      success: function (res) {
        var locationX= res.latitude + ',' + res.longitude;
        console.log(locationX);
        that.data.locationY = locationX
        that.getWeathers()
      },fail(res){
        var locationX='116,40'
        that.data.locationY = locationX
        that.getWeathers()
        console.log(res);
        wx.showToast({
          title: '获取失败',
          icon: 'success',
          duration: 1000
        })
      }
    }),
      that.setData({
        nowDate: util.formatTime(new Date())
      });
 },
  onReady: function () {
    //获得popup组件
    this.popup = this.selectComponent("#popup");
  },

  showPopup() {
    this.popup.showPopup();
  },
  //确认事件
  _success() {
    this.popup.hidePopup();
  },

 
  onPullDownRefresh: function () {
    wx.getLocation()
  }

})