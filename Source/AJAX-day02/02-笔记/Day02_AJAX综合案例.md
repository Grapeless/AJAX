# Day02_AJAX综合案例



## 知识点自测

1. 以下代码运行结果是什么？（考察扩展运算符的使用）

   ```js
   const result = {
     name: '老李',
     age: 18
   }
   const obj = {
     ...result
   }
   console.log(obj.age)
   ```
   
   A：报错
   
   B：18
   
   <details>
   <summary>答案</summary>
   <ul>
   <li>B正确</li>
   </ul>
   </details>



2. 什么是事件委托？

   A：只能把单击事件委托给父元素绑定

   B：可以把能冒泡的事件，委托给已存在的向上的任意标签元素绑定

   <details>
   <summary>答案</summary>
   <ul>
   <li>B正确</li>
   </ul>
   </details>



3. 事件对象e.target作用是什么?

   A：获取到这次触发事件相关的信息

   B：获取到这次触发事件目标标签元素

   <details>
   <summary>答案</summary>
   <ul>
   <li>B正确</li>
   </ul>
   </details>



4. 如果获取绑定在标签上自定义属性的值10？

   ```html
   <div data-code="10">西游记</div>
   ```
   
   A：div标签对象.innerHTML
   
   B：div标签对象.dataset.code
   
   C：div标签对象.code
   
   <details>
   <summary>答案</summary>
   <ul>
   <li>B正确</li>
   </ul>
   </details>



5. 哪个方法可以判断目标标签是否包含指定的类名?

   ```html
   <div class="my-div title info"></div>
   ```
   
   A: div标签对象.className === 'title'
   
   B: div标签对象.classList.contains('title')
   
   <details>
   <summary>答案</summary>
   <ul>
   <li>B正确</li>
   </ul>
   </details>



6. 伪数组取值哪种方式是正确的?

   ```js
   let obj = { 0: '老李', 1: '老刘' }
   ```
   
   A: obj.0
   
   B: obj[0]
   
   <details>
   <summary>答案</summary>
   <ul>
   <li>B正确</li>
   </ul>
   </details>



7. 以下哪个选项可以，往本地存储键为‘bgImg’，值为图片url网址的代码

   A：localStorage.setItem('bgImg')

   B：localStorage.getItem('bgImg')

   C：localStorage.setItem('bgImg', '图片url网址')

   D：localStorage.getItem('bgImg', '图片url网址')

   <details>
   <summary>答案</summary>
   <ul>
   <li>C正确</li>
   </ul>
   </details>



8. 以下代码运行结果是？

   ```js
   const obj = {
     username: '老李',
     age: 18,
     sex: '男'
   }
   Object.keys(obj)
   ```

   A：代码报错

   B：[username, age, sex]

   C：["username", "age", "sex"]

   D：["老李", 18, "男"]

   <details>
   <summary>答案</summary>
   <ul>
   <li>C正确</li>
   </ul>
   </details>



9. 下面哪个选项可以把数字字符串转成数字类型？

   A：+’10‘

   B：’10‘ + 0

   <details>
   <summary>答案</summary>
   <ul>
   <li>A正确</li>
   </ul>
   </details>



10. 以下代码运行后的结果是什么？（考察逻辑与的短路特性）

    ```js
    const age = 18
    const result1 = (age || '有年龄')
    
    const sex = ''
    const result2 = sex || '没有性别'
    ```

    A：报错，报错

    B：18，没有性别

    C：有年龄，没有性别

    D：18，’‘

    <details>
    <summary>答案</summary>
    <ul>
    <li>B正确</li>
    </ul>
    </details>
    
    



## 目录

* 案例-图书管理
* 图片上传
* 案例-网站换肤
* 案例-个人信息设置



## 学习目标

> 今天主要就是练，巩固 axios 的使用

1. 完成案例-图书管理系统（增删改查）经典业务
2. 掌握图片上传的思路
3. 完成案例-网站换肤并实现图片地址缓存
4. 完成案例-个人信息设置



## 01.案例_图书管理-介绍

### 目标

* 案例-图书管理-介绍（介绍要完成的效果和练习到的思维）



### 讲解

1. 打开备课代码运行图书管理案例效果-介绍要完成的增删改查业务效果和 Bootstrap 弹框使用
2. 分析步骤和对应的视频模块
   * 先学习 Bootstrap 弹框的使用（因为添加图书和编辑图书需要这个窗口来承载图书表单）
   * 先做渲染图书列表（这样做添加和编辑以及删除可以看到数据变化，所以先做渲染）
   * 再做新增图书功能
   * 再做删除图书功能
   * 再做编辑图书功能（注意：编辑和新增图书是2套弹框-后续做项目我们再用同1个弹框）



### 小结

1. 做完这个案例我们将会有什么收获呢?

   <details>
   <summary>答案</summary>
   <ul>
   <li>掌握前端经典增删改查的业务和思路，对以后开发很有帮助</li>
   </ul>
   </details>



## 02.Bootstrap 弹框_属性控制

### 目标

* 使用属性方式控制 Bootstarp 弹框的显示和隐藏



### 讲解

1. 什么是 Bootstrap 弹框？

   * 不离开当前页面，显示单独内容，供用户操作

2. 如何使用 Bootstrap 弹框呢？

   * 先引入 bootstrap.css 和 bootstrap.js 到自己网页中

   * 准备弹框标签，确认结构（可以从文档的 Modal 里复制基础例子）

   * 通过自定义属性，通知弹框的显示和隐藏，语法如下：

     ![image-20230220185302251](https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/hm8.1ajax/image-20230220185302251.png)

3. 去代码区实现一下



### 小结

1. 用哪个属性绑定来控制弹框显示呢?

   <details>
   <summary>答案</summary>
   <ul>
   <li>data-bs-toggle和data-bs-target</li>
   </ul>
   </details>

2. 用哪个属性来控制隐藏弹框呢？

   <details>
   <summary>答案</summary>
   <ul>
   <li>data-bs-dismiss 关闭的是标签所在的当前提示框</li>
   </ul>
   </details>



## 03.Bootstrap 弹框_JS控制

### 目标

* 使用JS方式控制 Bootstarp 弹框的显示和隐藏



### 讲解

1. 为什么需要 JS 方式控制呢？

   * 当我显示之前，隐藏之前，需要执行一些 JS 逻辑代码，就需要引入 JS 控制弹框显示/隐藏的方式了

2. 如何使用 JS 方式 控制 Bootstrap 弹框显示和隐藏呢？

   语法如下：

   ![image-20230220185707870](https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/hm8.1ajax/image-20230220185707870.png)

   

3. 去代码区实现一下



### 小结

1. 什么时候用属性控制，什么时候用 JS 控制 Bootstrap 弹框的显示/隐藏?

   <details>
   <summary>答案</summary>
   <ul>
   <li>直接出现/隐藏用属性方式控制，如果需要先执行一段 JS 逻辑再显示/隐藏就用 JS 方式控制</li>
   </ul>
   </details>



## 04.案例_图书管理\_渲染列表

### 目标

* 完成图书管理案例-图书列表数据渲染效果



### 讲解

1. 为什么需要给自己起一个外号呢？

   * 我们所有人数据都来自同一个服务器上，为了区分每个同学不同的数据，需要大家设置一个外号告诉服务器，服务器就会返回你对应的图书数据了

   

2. 完成渲染列表的思路步骤？

   1. 基于 axios 和接口文档获取到图书列表数据
   2. 分析数据结构和标签对应关系，把数据展示到页面上（因为有多处使用-所以可以封装个函数，外号也有多处使用，可以提升到全局常量）

   

### 小结

1. 渲染数据列表的2个步骤是什么？

   <details>
   <summary>答案</summary>
   <ul>
   <li>获取数据，分析结构渲染到页面上</li>
   </ul>
   </details>





## 05.案例_图书管理\_新增图书

### 目标

* 完成图书管理案例-新增图书需求



### 讲解

1. 完成新增图书的思路步骤？

   1. 先控制新增图书弹框的显示和隐藏（基于 Bootstrap 弹框和准备好的表单-用属性和 JS 方式控制）
   2. 在点击添加确认按钮时，收集新增图书表单的数据，提交到服务器
   3. 刷新图书列表（重新调用下之前封装的获取并渲染列表的函数）

   

### 小结

1. 新增数据的3个步骤是什么？

   <details>
   <summary>答案</summary>
   <ul>
   <li>准备好数据标签和样式，然后收集表单数据提交保存，刷新列表</li>
   </ul>
   </details>



## 06.案例_图书管理\_删除图书

### 目标

* 完成图书管理案例-删除图书需求



### 讲解

1. 完成删除图书的思路步骤？

   1. 给删除元素，绑定点击事件（事件委托方式并判断点击的是删除元素才走删除逻辑代码），并获取到要删除的数据id
   2. 基于 axios 和接口文档，调用删除接口，让服务器删除这条数据
   3. 重新获取并刷新图书列表

   

### 小结

1. 删除数据的步骤是什么？

   <details>
   <summary>答案</summary>
   <ul>
   <li>告知服务器要删除的数据id，服务器删除后，重新获取并刷新列表</li>
   </ul>
   </details>



## 07-09.案例_图书管理\_编辑图书

### 目标

* 完成图书管理案例-编辑图书需求



### 讲解

1. 因为编辑图书要做回显等，比较复杂，所以分了3个视频来讲解

2. 编辑数据的核心思路：

   1. 给编辑元素，绑定点击事件（事件委托方式并判断点击的是编辑元素才走编辑逻辑代码），并获取到要编辑的数据id
   2. 基于 axios 和接口文档，调用查询图书详情接口，获取正在编辑的图书数据，并回显到表单中（页面上的数据是在用户的浏览器中不够准备，所以只要是查看数据都要从服务器获取）
   3. 收集并提交保存修改数据，并重新从服务器获取列表刷新页面

   

### 小结

1. 编辑数据的步骤是什么？

   <details>
   <summary>答案</summary>
   <ul>
   <li>获取正在编辑数据并回显，收集编辑表单的数据提交保存，重新获取并刷新列表</li>
   </ul>
   </details>



## 10.案例_图书管理\_总结

### 目标

* 总结下增删改查的核心思路



### 讲解

把之前讲解的思路在重新的总结一遍



### 小结

1. 学完图书管理案例，我们收货了什么？

   <details>
   <summary>答案</summary>
   <ul>
   <li>现在编辑的虽然是图书数据，以后编辑其他数据，再做增删改查都是差不多的思路</li>
   </ul>
   </details>



## 11.图片上传

### 目标

* 把本地图片上传到网页上显示



### 讲解

1. 什么是图片上传？
   * 就是把本地的图片上传到网页上显示
2. 图片上传怎么做？
   * 先依靠文件选择元素获取用户选择的本地文件，接着提交到服务器保存，服务器会返回图片的 url 网址，然后把网址加载到 img 标签的 src 属性中即可显示
3. 为什么不直接显示到浏览器上，要放到服务器上呢？
   * 因为浏览器保存是临时的，如果你想随时随地访问图片，需要上传到服务器上
4. 图片上传怎么做呢？
   1. 先获取图片文件对象
   2. 使用 FormData 表单数据对象装入（因为图片是文件而不是以前的数字和字符串了所以传递文件一般需要放入 FormData 以键值对-文件流的数据传递（可以查看请求体-确认请求体结构）
   3. 提交表单数据对象，服务器返回图片 url 网址
5. 到代码区尝试一下



### 小结

1. 图片上传的思路是什么？

   <details>
   <summary>答案</summary>
   <ul>
   <li>先用文件选择元素，获取到文件对象，然后装入 FormData 表单对象中，再发给服务器，得到图片在服务器的 URL 网址，再通过 img 标签加载图片显示</li>
   </ul>
   </details>



## 12.案例_网站-更换背景图

### 目标

* 实现更换网站背景图的效果



### 讲解

1. 先运行备课代码，查看要完成的效果
2. 网站更换背景图如何实现呢，并且保证刷新后背景图还在？
   1. 先获取到用户选择的背景图片，上传并把服务器返回的图片 url 网址设置给 body 背景
   2. 上传成功时，保存图片 url 网址到 localStorage 中
   3. 网页运行后，获取 localStorage 中的图片的 url 网址使用（并判断本地有图片 url 网址字符串才设置）
3. 代码区实现下



### 小结

1. localStorage 取值和赋值的语法分别是什么？

   <details>
   <summary>答案</summary>
   <ul>
   <li>localStorage.getItem('key')是取值，localStorage.setItem('key', 'value')是赋值</li>
   </ul>
   </details>



## 13.案例_个人信息设置-介绍

### 目标

* 介绍个人信息设置案例-需要完成哪些效果，分几个视频讲解



### 讲解

1. 先运行备课代码，查看要完成的效果
2. 本视频分为，头像修改和信息修改2部分
   1. 先完成信息回显
   2. 再做头像修改-立刻就更新给此用户
   3. 收集个人信息表单-提交保存
   4. 提交后反馈结果给用户



### 小结

暂无



## 14.案例_个人信息设置-信息渲染

### 目标

* 把外号对应的用户信息渲染到页面上



### 讲解

1. 还是需要准备一个外号，因为想要查看自己对应的用户信息，不想被别人影响
2. 实现个人信息渲染-回显到页面步骤：
   * 获取数据
   * 渲染数据到页面



### 小结

1. 渲染数据和图书列表的渲染思路是否一样呢，是什么？

   <details>
   <summary>答案</summary>
   <ul>
   <li>一样的，都是获取到数据，然后渲染到页面上</li>
   </ul>
   </details>



## 15.案例_个人信息设置-头像修改

### 目标

* 修改用户的头像并立刻生效



### 讲解

1. 实现步骤如下：
   1. 获取到用户选择的头像文件
   2. 调用头像修改接口，并除了头像文件外，还要在 FormData 表单数据对象中携带外号
   3. 提交到服务器保存此用户对应头像文件，并把返回的头像图片 url 网址设置在页面上
2. 注意：重新刷新重新获取，已经是修改后的头像了（证明服务器那边确实保存成功）



### 小结

1. 为什么这次上传头像，需要携带外号呢？

   <details>
   <summary>答案</summary>
   <ul>
   <li>因为这次头像到后端，是要保存在某个用户名下的，所以要把外号名字一起携带过去</li>
   </ul>
   </details>



## 16.案例_个人信息设置-信息修改

### 目标

* 把用户修改的信息提交到服务器保存



### 讲解

1. 类似编辑实现的思路，只不过表单标签准备好了，而且数据已经在页面
   1. 收集表单数据
   2. 提交到服务器保存-调用用户信息更新接口（注意请求方法是 PUT）代表数据更新的意思



### 小结

1. 信息修改数据和以前增删改查哪个实现的思路比较接近呢？

   <details>
   <summary>答案</summary>
   <ul>
   <li>编辑，首先回显已经做完了，然后收集用户最新改动后的数据，提交到服务器保存，因为页面最终就是用户刚写的数据，所以不用重新获取并刷新页面了</li>
   </ul>
   </details>



## 17.案例_个人信息设置-提示框

### 目标

* 把用户更新个人信息结果，用提示框反馈给用户



### 讲解

1. 这里准备好 bootstrap 提示框和内容
2. 在提交成功的 axios 回调函数中，用 JS 的方式，展示 bootstrap 提示框告知用户更新成功



### 小结

1. bootstrap 弹框什么时候用 JS 方式控制显示呢？

   <details>
   <summary>答案</summary>
   <ul>
   <li>需要执行一些其他的 JS 逻辑后，再去显示/隐藏弹框时</li>
   </ul>
   </details>



## 今日重点(必须会)

1. 掌握增删改查数据的思路
2. 掌握图片上传的思路和流程
3. 理解调用接口时，携带外号的作用
4. 了解 bootstrap 弹框的使用



## 今日作业(必完成)

在配套作业文件夹的md内



## 参考文献

1. [表单概念->百度百科](https://baike.baidu.com/item/%E8%A1%A8%E5%8D%95)
2. [accept属性->mdn](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Content_negotiation/List_of_default_Accept_values)
3. [accept属性->菜鸟教程](https://www.runoob.com/tags/att-input-accept.html)
4. [FormData->mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData)
5. [BS的Model文档](https://v5.bootcss.com/docs/components/modal/#passing-options)
6. [axios请求方式别名](https://www.axios-http.cn/docs/api_intro)