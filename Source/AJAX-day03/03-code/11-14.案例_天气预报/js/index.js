/**
 * 目标1：默认显示-北京市天气
 *  1.1 获取北京市天气数据
 *  1.2 数据展示到页面
 */

function getWeather(city) {
  // 1.1 获取北京市天气数据
  myAxios({
    url: 'http://hmajax.itheima.net/api/weather',
    params: {
      city
    }
  }).then(res => {
    console.log(res)
    const data = res.data
    // data: 数据 
    // date: 日期
    // 1.2 渲染数据
    // 头部日期
    document.querySelector('.title').innerHTML = `<span class="dateShort">${data.date}</span>
      <span class="calendar">农历&nbsp;
        <span class="dateLunar">${data.dateLunar}</span>
      </span>`

    // 头部天气
    document.querySelector('.weather-box').innerHTML = `<div class="tem-box">
      <span class="temp">
        <span class="temperature">${data.temperature}</span>
        <span>°</span>
      </span>
    </div>
    <div class="climate-box">
      <div class="air">
        <span class="psPm25">${data.psPm25}</span>
        <span class="psPm25Level">${data.psPm25Level}</span>
      </div>
      <ul class="weather-list">
        <li>
          <img src="${data.weatherImg}" class="weatherImg" alt="">
          <span class="weather">${data.weather}</span>
        </li>
        <li class="windDirection">${data.windDirection}</li>
        <li class="windPower">${data.windPower}</li>
      </ul>
    </div>`

    // 今日天气
    const today = data.todayWeather
    document.querySelector('.today-weather').innerHTML = `<div class="range-box">
      <span>今天：</span>
      <span class="range">
        <span class="weather">${today.weather}</span>
        <span class="temNight">${today.temNight}</span>
        <span>-</span>
        <span class="temDay">${today.temDay}</span>
        <span>℃</span>
      </span>
    </div>
    <ul class="sun-list">
      <li>
        <span>紫外线</span>
        <span class="ultraviolet">${today.ultraviolet}</span>
      </li>
      <li>
        <span>湿度</span>
        <span class="humidity">${today.humidity}</span>%
      </li>
      <li>
        <span>日出</span>
        <span class="sunriseTime">${today.sunriseTime}</span>
      </li>
      <li>
        <span>日落</span>
        <span class="sunsetTime">${today.sunsetTime}</span>
      </li>
    </ul>`

    // 渲染一周的天气预报
    document.querySelector('.week-wrap').innerHTML = data.dayForecast.map(item => `<li class="item">
      <div class="date-box">
        <span class="dateFormat">今天</span>
        <span class="date">${item.date}</span>
      </div>
      <img src="${item.weatherImg}" alt="" class="weatherImg">
      <span class="weather">${item.weather}</span>
      <div class="temp">
        <span class="temNight">${item.temNight}</span>-
        <span class="temDay">${item.temDay}</span>
        <span>℃</span>
      </div>
      <div class="wind">
        <span class="windDirection">${item.windDirection}</span>
        <span class="windPower">${item.windPower}</span>
      </div>
    </li>`).join('')
  })
}

getWeather('110100')

/**
 * 目标2: 渲染城市列表
 * 2.1 输入城市名称时发请求 => input 事件
 * 2.2 发送请求获取数据并渲染
 *  */
document.querySelector('.search-city').addEventListener('input', e => {
  // console.log(e.target.value)
  myAxios({
    url: 'http://hmajax.itheima.net/api/weather/city',
    params: {
      city: e.target.value
    }
  }).then(res => {
    // console.log(res)
    document.querySelector('.search-list').innerHTML = res.data.map(item => `<li data-code="${item.code}" class="city-item">${item.name}</li>`).join('')
  })
})

/**
 * 目标3: 点击城市渲染天气
 * 3.1 使用事件委托给 li 绑定点击事件
 * 3.2 通过自定义属性获取当前城市的 code
 * 3.3 调用 getWeather() 函数获取当前城市的天气信息
 */
document.querySelector('.search-list').addEventListener('click', e => {
  if (e.target.tagName === 'LI') {
    const code = e.target.dataset.code
    // console.log(code)
    getWeather(code)
  }
})