/**
 * 目标：网站-更换背景
 *  1. 选择图片上传，设置body背景
 *  2. 上传成功时，"保存"图片url网址
 *  3. 网页运行后，"获取"url网址使用
 * */
const fileInp = document.querySelector('.bg-ipt')
fileInp.addEventListener('change',function (){
    const data = new FormData()
    data.append('img',this.files[0])
    axios({
        url:'http://hmajax.itheima.net/api/uploadimg',
        method:'post',
        data
    }).then(res =>{
        // console.log(res.data.data.url)
        document.body.style.backgroundImage = `url(${res.data.data.url})`
        localStorage.setItem('bgurl',res.data.data.url)
    })
})
document.body.style.backgroundImage = `url(${localStorage.getItem('bgurl')})` || ''