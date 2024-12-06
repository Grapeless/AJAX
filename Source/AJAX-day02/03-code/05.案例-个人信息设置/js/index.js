/**
 * 目标1：信息渲染
 *  1.1 获取用户的数据
 *  1.2 回显数据到标签上
 * */
const creator = '紫阳'
// 1.1 获取用户的数据
axios({
  url: 'http://hmajax.itheima.net/api/settings',
  params: {
    creator
  }
}).then(res => {
  const data = res.data.data
  console.log(data)
  // 1.2 回显数据到标签上
  Object.keys(data).forEach(k => {
    console.log(k)
    if (k === 'avatar') {
      // 1.3 单独对 avatar 头像进行处理
      document.querySelector('.prew').src = data[k]
    } else if (k === 'gender') {
      // 1.4 单独针对 gender 性别进行处理
      // 思路:
      // a. 获取到所有的单选框, 伪数组 (有索引)
      // b. 获取服务器给的性别代码
      // c. 服务器给的性别代码正好对应着伪数组的索引
      const genders = document.querySelectorAll('.gender')
      const n = data[k]
      // console.log(genders)
      // console.log(data[k])
      genders[n].checked = true
    } else {
      // 全自动回显表单元素
      document.querySelector(`.${k}`).value = data[k]
    }
  })
})

/**
 * 目标2: 更换头像
 * 2.1 给文件选择框绑定 change 事件
 * 2.2 当用户选择图片后上传给服务器
 *      - FormData 格式
 *      - 获取图片对象
 * 2.3 获取服务器返回的图片 url 地址, 设置给 img 的 src
 */

// 2.1 给文件选择框绑定 change 事件
document.querySelector('#upload').addEventListener('change', e => {
  // 获取图片对象
  // console.log(e.target.files[0])
  // 放到 FormData 对象中
  const data = new FormData()
  data.append('avatar', e.target.files[0])
  data.append('creator', creator)
  // 2.2 当用户选择图片后上传给服务器
  axios({
    url: 'http://hmajax.itheima.net/api/avatar',
    method: 'put',
    data
  }).then(res => {
    // 2.3 获取服务器返回的图片 url 地址, 设置给 img 的 src
    // console.log(res)
    document.querySelector('.prew').src = res.data.data.avatar
  })
})

/**
 * 目标3: 提交数据
 * 3.1 给提交按钮绑定点击事件
 * 3.2 收集用户填写的表单数据
 * 3.3 提交给服务器
 * 3.4 服务器返回成功后提示用户
 */

// 创建 Toast 对象
const toast = new bootstrap.Toast('.my-toast')

// 3.1 给提交按钮绑定点击事件
const userForm = document.querySelector('.user-form')
document.querySelector('.submit').addEventListener('click', () => {
  // 3.2 收集用户填写的表单数据
  const data = serialize(userForm, { hash: true, empty: true })
  // 添加一个参数 creator
  data.creator = creator
  // 将 gender 属性转换成 number 类型
  data.gender = +data.gender
  // console.log(data)
  axios({
    url: 'http://hmajax.itheima.net/api/settings',
    method: 'put',
    data
  }).then(res => {
    // console.log('更新成功')
    toast.show()
  })
})