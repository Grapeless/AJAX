/**
 * 目标：网站-更换背景
 *  1. 选择图片上传，设置body背景
 *  2. 上传成功时，"保存"图片url网址
 *  3. 网页运行后，"获取"url网址使用
 * */

document.querySelector('#bg').addEventListener('change', e => {
  // 1. 获取文件对象
  // console.log(e.target.files[0])
  // 2. 创建 FormData 来存储文件对象
  const data = new FormData()
  data.append('img', e.target.files[0])
  // 3. 发请求给服务器上传图片
  axios({
    url: 'http://hmajax.itheima.net/api/uploadimg',
    method: 'post',
    data
  }).then(res => {
    // console.log(res.data.data.url)
    // 4. 获取结果后设置背景图
    document.body.style.backgroundImage = `url(${res.data.data.url})`
    // 5. 存储到 localStorage
    localStorage.setItem('bg', res.data.data.url)
  })
})

// 6. 初次加载时获取本地背景图
// 如果没有就是 ''
const bg = localStorage.getItem('bg') || ''
// 7. 设置给 body 背景图
document.body.style.backgroundImage = `url(${bg})`