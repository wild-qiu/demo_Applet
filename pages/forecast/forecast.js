// pages/car/car.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day:['今天','明天','后天'],
    region: ['北京市','北京市','东城区'],
    locationY:'',
    daily_forecast:'',
    default:'default'
  },
  changeRegion(e){
 this.setData({
   region:e.detail.value
 })
 this.getWeather();
  },
  getWeather(){
    var that=this
    wx.request({
      url: 'https://free-api.heweather.net/s6/weather/forecast?',
      data:{
        location: that.data.region[1] ,
        key:'a97419bef00441ef89f8209205ae478f'
      },
      success(res){
        console.log(res.data)
        that.setData({
          daily_forecast: res.data.HeWeather6[0].daily_forecast
        })
      }
    }),
      wx.request({
        url: 'https://free-api.heweather.net/s6/weather/now?',
        data: {
          location: that.data.region[1],
          key: 'a97419bef00441ef89f8209205ae478f'
        },
        success(res) {
          console.log(res.data)
          that.setData({
           now: res.data.HeWeather6[0].now
          })
        }
      })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWeather()
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
  }
})