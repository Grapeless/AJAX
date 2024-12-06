/**
 * 目标1：完成省市区下拉列表切换
 *  1.1 设置省份下拉菜单数据
 *  1.2 切换省份，设置城市下拉菜单数据，清空地区下拉菜单
 *  1.3 切换城市，设置地区下拉菜单数据
 */

// 尽可能使用 async + await 的语法
// 1.1 设置省份下拉菜单数据
async function getArea() {
  const { data: { list } } = await axios({ url: 'http://hmajax.itheima.net/api/province' })
  // console.log(list)
  document.querySelector('.province').innerHTML = '<option value="">省份</option>' + list.map(item => `<option value="${item}">${item}</option>`).join('')
}

getArea()

let pname
// 1.2 切换省份，设置城市下拉菜单数据，清空地区下拉菜单
document.querySelector('.province').addEventListener('change', async e => {
  // console.log('切换了', e.target.value)
  pname = e.target.value
  const { data: { list } } = await axios({ url: 'http://hmajax.itheima.net/api/city', params: { pname } })
  // console.log(list)
  document.querySelector('.city').innerHTML = '<option value="">城市</option>' + list.map(item => `<option value="${item}">${item}</option>`).join('')

  // 清空地区下拉菜单
  document.querySelector('.area').innerHTML = '<option value="">地区</option>'
})

// 1.3 切换城市，设置区县下拉菜单数据
document.querySelector('.city').addEventListener('change', async e => {
  console.log('切换了', e.target.value)
  const cname = e.target.value
  const { data: { list } } = await axios({ url: 'http://hmajax.itheima.net/api/area', params: { pname, cname } })
  // console.log(list)
  document.querySelector('.area').innerHTML = '<option value="">地区</option>' + list.map(item => `<option value="${item}">${item}</option>`).join('')
})

/**
 * 目标2: 提交数据
 * 2.1 给按钮添加点击事件
 * 2.2 使用 serialize 收集用户填写的表单信息
 * 2.3 提交给服务器
 * 2.4 根据响应结果提示用户
 */

const form = document.querySelector('form')
// 2.1 给按钮添加点击事件
document.querySelector('.submit').addEventListener('click', async () => {
  try {
    // 2.2 使用 serialize 收集用户填写的表单信息
    const data = serialize(form, { hash: true, empty: true })
    // console.log(data)
    // 2.3 提交给服务器
    const res = await axios({
      url: 'http://hmajax.itheima.net/api/feedback',
      method: 'post',
      data
    })

    // console.log(res)
    // 2.4 根据响应结果提示用户
    alert(res.data.message)
  } catch(e) {
    alert(e.response.data.message)
  }
})