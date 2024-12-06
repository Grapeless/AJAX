/**
 * 目标1：信息渲染
 *  1.1 获取用户的数据
 *  1.2 回显数据到标签上
 * */
const creator = 'Lim'
const form = document.querySelector('.user-form')
//性别
const genderRadio = document.querySelectorAll('.gender')
//头像
const avatar = document.querySelector('.prew')

//数据回显
axios({
    url: 'http://hmajax.itheima.net/api/settings',
    params: {
        creator
    }
}).then(res => {
    // console.log(res.data.data)
    const data = res.data.data
    Object.keys(data).forEach(value => {
        if (value === 'avatar') {
            // console.log(data[value])
            avatar.src = `${data[value]}`

        } else if (value === 'gender') {
            // console.log(data.gender)
            genderRadio[data[value]].checked = true

        } else {
            document.querySelector(`.${value}`).value = data[value]
        }
    })

})
//更换头像
const avatarInp = document.querySelector('#upload')
avatarInp.addEventListener('change', function () {
    const data = new FormData()
    data.append('avatar', this.files[0])
    data.append('creator', creator)
    axios({
        url: 'http://hmajax.itheima.net/api/avatar',
        method: 'put',
        data
    }).then(res => {
        // console.log(res.data.data.avatar)
        avatar.src = res.data.data.avatar
    })
})
//保存数据
//提示信息框
const toast = new bootstrap.Toast('.my-toast')
document.querySelector('.submit').addEventListener('click',function () {
    const data = serialize(form,{hash:true,empty:true})
    data.creator = creator
    data.gender = +data.gender
    console.log(data)
    axios({
        url:'http://hmajax.itheima.net/api/settings',
        method: 'put',
        data
    }).then(()=>{
        toast.show()
    })
})

