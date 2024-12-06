/**
 * 目标1：渲染图书列表
 *  1.1 获取数据
 *  1.2 渲染数据
 */
const bookList = document.querySelector('.list')

function render() {
    axios({
        url: 'http://hmajax.itheima.net/api/books',
        params: {
            creator: '紫阳'
        }
    }).then(res => {
        // console.log(res);
        bookList.innerHTML = res.data.data.map((value, index) => `
            <tr>
                    <td>${index + 1}</td>
                    <td>${value.bookname}</td>
                    <td>${value.author}</td>
                    <td>${value.publisher}</td>
                    <td>
                        <span class="del" data-id="${value.id}">删除</span>
                        <span class="edit" data-id="${value.id}">编辑</span>
                    </td>
                </tr>`).join('')
    })
}

render()

//增
const formOfAdd = document.querySelector('.add-form')
const modal = new bootstrap.Modal('.add-modal')
document.querySelector('.add-btn').addEventListener('click', function () {
    const data = serialize(formOfAdd, {hash: true, empty: true})
    data.creator = '紫阳'
    axios({
        url: 'http://hmajax.itheima.net/api/books',
        method: 'post',
        data
    }).then(() => {
        //1.重新渲染
        render()
        //隐藏弹窗
        modal.hide()
        //重置表单
        formOfAdd.reset()
    })
})

//删
bookList.addEventListener('click', e => {
    if (e.target.classList.contains('del')) {
        const id = e.target.dataset.id
        console.log(id)
        axios({
            url: `http://hmajax.itheima.net/api/books/${id}`,
            method: 'delete'
        }).then(res => {
            render()
        })
    }
})

//编辑
const modalOfEdit = new bootstrap.Modal('.edit-modal')
bookList.addEventListener('click', e => {
    if (e.target.classList.contains('edit')) {
        const id = e.target.dataset.id
        //数据回显
        axios({
            url: `http://hmajax.itheima.net/api/books/${id}`,
        }).then(res => {
            console.log(res)
            const data = res.data.data
            modalOfEdit.show()
            Object.keys(data).forEach(value => {
                document.querySelector(`.edit-form .${value}`).value = data[value]
            })
        })
    }
})

const formOfEdit = document.querySelector('.edit-form')
document.querySelector('.edit-btn').addEventListener('click', function () {
    const data = serialize(formOfEdit, {hash: true, empty: true})
    data.creator = '紫阳'
    axios({
        url: `http://hmajax.itheima.net/api/books/${data.id}`,
        method: 'put',
        data
    }).then(res => {
        modalOfEdit.hide()
        render()
    })
})