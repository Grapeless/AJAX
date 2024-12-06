/**
 * 目标1：渲染图书列表
 *  1.1 获取数据
 *  1.2 渲染数据
 */
const creator = '紫阳mo1i2w12w12'
const list = document.querySelector('.list')
function getBooks() {
  // 1.1 获取数据
  axios({
    url: 'http://hmajax.itheima.net/api/books',
    params: {
      creator
    }
  }).then(res => {
    // 1.2 渲染数据
    // console.log(res)
    list.innerHTML = res.data.data.map((item, index) => `<tr>
    <td>${index+1}</td>
    <td>${item.bookname}</td>
    <td>${item.author}</td>
    <td>${item.publisher}</td>
    <td data-id="${item.id}">
      <span class="del">删除</span>
      <span class="edit">编辑</span>
    </td>
  </tr>`).join('')
  })
}

getBooks()

/**
 * 目标2: 新增图书
 * 2.1 通过自定义属性控制新增图书弹框显示隐藏
 * 2.2 点击保存时, 收集用户填写的表单内容, 提交给服务器
 * 2.3 服务器响应成功后
 *    - 重新渲染
 *    - 关闭弹框
 *    - 清空表单
*/

// 获取表单对象
const addForm = document.querySelector('.add-form')
// 创建弹框对象 -> 成功后用于关闭弹框
const modal = new bootstrap.Modal('.add-modal')
// 2.2 点击保存时, 收集用户填写的表单内容, 提交给服务器
document.querySelector('.add-btn').addEventListener('click', () => {
  // 收集用户填写的表单内容
  const data = serialize(addForm, { hash: true, empty: true })
  data.creator = creator
  // console.log(data)
  // 提交给服务器
  axios({
    url: 'http://hmajax.itheima.net/api/books',
    method: 'post',
    // 目标: 将四条数据发给服务器
    // 方法1: 使用展开运算符, 将收集到的数据放到 data 中
    // 方法2: 自己添加数据后, 一起提交
    // data: {
    //   // bookname: addData.bookname,
    //   ...addData, // 展开运算符: 将对象中的属性全部展开放到当前对象中
    //   creator
    // }
    data
  }).then(res => {
    // console.log(res)
    // 2.3 服务器响应成功后
    //     - 重新渲染
    getBooks()
    //     - 关闭弹框
    // a. 创建弹框对象
    // b. 调用 hide() 方法 关闭弹框
    modal.hide()
    //     - 清空表单
    addForm.reset()
  })
})

/**
 * 目标3: 删除图书
 * 3.1 渲染时给操作 td 添加自定义属性 id
 * 3.2 使用事件委托给 tbody 绑定点击事件
 * 3.3 判断点击的是删除按钮
 * 3.4 获取当前被点击的 id
 * 3.5 发请求给服务器删除
 * 3.6 成功后重新渲染
*/

// 3.2 使用事件委托给 tbody 绑定点击事件
list.addEventListener('click', e => {
  // 3.3 判断点击的是删除按钮 (判断标准是类名)
  // console.log(e.target)
  // contains: 判断是否包含指定的类名
  if (e.target.classList.contains('del')) {
    // 3.4 获取当前被点击图书的 id
    const id = e.target.parentNode.dataset.id
    // console.log('我要删除', id)
    // 3.5 发请求给服务器删除
    axios({
      // 路径参数
      url: `http://hmajax.itheima.net/api/books/${id}`,
      method: 'delete'
    }).then(res => {
      // console.log(res)
      // 3.6 成功后重新渲染
      getBooks()
    }).catch(e => {
      getBooks()
    })
  }
})

/**
 * 目标4: 编辑图书
 * (数据回显)
 * 4.1 绑定点击事件获取 id (事件委托)
 * 4.2 弹出编辑框
 * 4.3 向服务器发送请求获取数据
 * 4.4 数据回显
 * (保存数据)
 * 4.5 绑定修改按钮的点击事件
 * 4.6 获取表单数据
 * 4.7 发送请求给服务器
 * 4.8 成功后关闭弹框, 重新渲染
 */

// 创建编辑弹框
const editModal = new bootstrap.Modal('.edit-modal')
// 4.1 绑定点击事件获取 id (事件委托)
list.addEventListener('click', e => {
  if (e.target.classList.contains('edit')) {
    // 4.2 弹出编辑框
    editModal.show()
    // 获取 id
    const id = e.target.parentNode.dataset.id
    // console.log('我要编辑', id)
    // 4.3 向服务器发送请求获取数据
    axios({
      url: `http://hmajax.itheima.net/api/books/${id}`
    }).then(res => {
      console.log(res.data.data)
      const data = res.data.data
      // 4.4 数据回显 (不要忘了回显 id)
      // document.querySelector('.edit-form .bookname').value = data.bookname
      // document.querySelector('.edit-form .author').value = data.author
      // document.querySelector('.edit-form .publisher').value = data.publisher
      // document.querySelector('.edit-form .id').value = data.id
      // 代码优化: 全自动回显
      // 前提: 必须元素的类名和属性名一致
      // id bookname author publisher
      // console.log(k)
      Object.keys(data).forEach(k => document.querySelector(`.edit-form .${k}`).value = data[k])
    })
  }
})

const editForm = document.querySelector('.edit-form')
// 4.5 绑定修改按钮的点击事件
document.querySelector('.edit-btn').addEventListener('click', () => {
  // 4.6 获取表单数据
  // 隐藏域: 在页面上看不到
  // 有啥用? 用户不需要对他进行操作, 但是提交数据时可能要跟随表单一起提交, 可以设置 value 和获取 value 属性
  // <input type="hidden" class="id" name="id">
  const data = serialize(editForm, { hash: true, empty: true })
  data.creator = creator
  // console.log(data)
  // 4.7 发送请求给服务器
  axios({
    url: `http://hmajax.itheima.net/api/books/${data.id}`,
    method: 'put',
    data
  }).then(res => {
    // console.log(res)
    // 4.8 成功后关闭弹框, 重新渲染
    editModal.hide()
    getBooks()
  })
  
})