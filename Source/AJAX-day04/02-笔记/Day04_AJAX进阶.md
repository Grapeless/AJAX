# Day04_AJAX进阶



## 知识点自测

1. 看如下标签回答如下问题？

   ```html
   <select>
       <option value="北京">北京市</option>
       <option value="南京">南京市</option>
       <option value="天津">天津市</option>
   </select>
   ```

   * 当选中第二个 option 时, JS 中获取下拉菜单 select 标签的 value 属性的值是多少?

     <details>
     <summary>答案</summary>
     <ul>
     <li>南京</li>
     </ul>
     </details>

   * 页面上看到的是北京, 还是北京市等？

     <details>
     <summary>答案</summary>
     <ul>
     <li>北京市</li>
     </ul>
     </details>



2. 我给 select 标签的 value 属性赋予"南京"会有什么效果？

   <details>
   <summary>答案</summary>
   <ul>
   <li>什么效果都没有, 没有没有一个option选项的value能匹配</li>
   </ul>
   </details>



## 目录

* 同步代码和异步代码
* 回调函数地狱和 Promise 链式调用
* async 和 await 使用
* 事件循环-EventLoop
* Promise.all 静态方法
* 案例 - 商品分类
* 案例 - 学习反馈



## 学习目标

1. 区分异步代码，回调函数地狱问题和所有解决防范（Promise 链式调用）
1. 掌握 async 和 await 使用
1. 掌握 EventLoop 的概念
1. 了解 Promise.all 静态方法作用
1. 完成省市区切换效果





## 01.同步代码和异步代码

### 目标

* 能够区分出哪些是异步代码



### 讲解

1. 同步代码：逐行执行，需原地等待结果后，才继续向下执行


2. 异步代码：调用后耗时，不阻塞代码继续执行（不必原地等待），在将来完成后触发回调函数传递结果

3. 回答代码打印顺序：发现异步代码接收结果，使用的都是回调函数

   ![image-20230222171348399](https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/hm8.1ajax/image-20230222171348399.png)



### 小结

1. 什么是同步代码?

   <details>
   <summary>答案</summary>
   <ul>
   <li>逐行执行，原地等待结果后，才继续向下执行</li>
   </ul>
   </details>

2. 什么是异步代码?

   <details>
   <summary>答案</summary>
   <ul>
   <li>调用后耗时，不阻塞代码执行，将来完成后触发回调函数</li>
   </ul>
   </details>

3. JS 中有哪些异步代码?

   <details>
   <summary>答案</summary>
   <ul>
   <li>setTimeout / setInterval，事件，AJAX</li>
   </ul>
   </details>

4. 异步代码如何接收结果?

   <details>
   <summary>答案</summary>
   <ul>
   <li>依靠回调函数来接收</li>
   </ul>
   </details>



## 02.回调函数地狱

### 目标

* 了解回调函数地狱的概念和缺点



### 讲解

1. 需求：展示默认第一个省，第一个城市，第一个地区在下拉菜单中

   ![image-20230222173109762](https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/hm8.1ajax/image-20230222173109762.png)

2. 概念：在回调函数中嵌套回调函数，一直嵌套下去就形成了回调函数地狱

3. 缺点：可读性差，异常无法捕获，耦合性严重，牵一发动全身

   ![image-20230222173138836](https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/hm8.1ajax/image-20230222173138836.png)



### 小结

1. 什么是回调函数地狱?

   <details>
   <summary>答案</summary>
   <ul>
   <li>在回调函数一直向下嵌套回调函数，形成回调函数地狱</li>
   </ul>
   </details>

2. 回调函数地狱问题?

   <details>
   <summary>答案</summary>
   <ul>
   <li>可读性差，异常捕获困难，耦合性严重</li>
   </ul>
   </details>



## 03.Promise-链式调用

### 目标

* 了解 Promise 链式调用特点和语法



### 讲解

1. 概念：依靠 then() 方法会返回一个新生成的 Promise 对象特性，继续串联下一环任务，直到结束

2. 细节：then() 回调函数中的返回值，会影响新生成的 Promise 对象最终状态和结果

3. 好处：通过链式调用，解决回调函数嵌套问题

   ![image-20230222173851738](https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/hm8.1ajax/image-20230222173851738.png)



### 小结

1. 什么是 Promise 的链式调用?

   <details>
   <summary>答案</summary>
   <ul>
   <li>使用 then 方法返回新 Promise 对象特性，一直串联下去</li>
   </ul>
   </details>

2. then 回调函数中，return 的值会传给哪里?

   <details>
   <summary>答案</summary>
   <ul>
   <li>传给 then 方法生成的新 Promise 对象</li>
   </ul>
   </details>

3. Promise 链式调用有什么用?

   <details>
   <summary>答案</summary>
   <ul>
   <li>解决回调函数嵌套问题</li>
   </ul>
   </details>



## 04.Promise-链式调用_解决回调地狱

### 目标

* 了解 Promise 链式调用解决回调地狱



### 讲解

1. 目标：使用 Promise 链式调用，解决回调函数地狱问题

2. 做法：每个 Promise 对象中管理一个异步任务，用 then 返回 Promise 对象，串联起来

   ![image-20230222174946534](https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/hm8.1ajax/image-20230222174946534.png)



### 小结

1. Promise 链式调用如何解决回调函数地狱?

   <details>
   <summary>答案</summary>
   <ul>
   <li>then 的回调函数中 return Promise对象，影响当前新 Promise 对象的值</li>
   </ul>
   </details>



## 05.async 函数和 await

### 目标

* 掌握 async 和 await 语法来编写简洁的异步代码



### 讲解

1. 概念：在 async 函数内，使用 await 关键字取代 then 函数，等待获取 Promise 对象成功状态的结果值 

2. 做法：使用 async 和 await 解决回调地狱问题

   ![image-20230222180035098](https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/hm8.1ajax/image-20230222180035098.png)

   > 使用 await 替代 then 的方法

### 小结

1. await 的作用是什么？

   <details>
   <summary>答案</summary>
   <ul>
   <li>替代 then 方法来提取 Promise 对象成功状态的结果</li>
   </ul>
   </details>



## 06.async 函数和 await 捕获错误

### 目标

* 了解用 try catch 捕获同步流程的错误



### 讲解

1. try 和 catch 的作用：用于捕获错误

   ![image-20230222180741620](https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/hm8.1ajax/image-20230222180741620.png)

   > try 里报错的代码会立刻跳转到 catch 中



### 小结

1. try 和 catch 有什么作用？

   <details>
   <summary>答案</summary>
   <ul>
   <li>捕获同步流程的代码报错信息</li>
   </ul>
   </details>



## 07.事件循环

### 目标

* 掌握事件循环模型是如何执行异步代码的



### 讲解

1. 事件循环（EventLoop）：掌握后知道 JS 是如何安排和运行代码的

   ![image-20230222181836863](https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/hm8.1ajax/image-20230222181836863.png)

2. 作用：事件循环负责执行代码，收集和处理事件以及执行队列中的子任务

3. 原因：JavaScript 单线程（某一刻只能执行一行代码），为了让耗时代码不阻塞其他代码运行，设计了事件循环模型

4. 概念：执行代码和收集异步任务的模型，在调用栈空闲，反复调用任务队列里回调函数的执行机制，就叫事件循环

   ![image-20230222182338992](https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/hm8.1ajax/image-20230222182338992.png)



### 小结

1. 什么是事件循环？

   <details>
   <summary>答案</summary>
   <ul>
   <li>执行代码和收集异步任务，在调用栈空闲时，反复调用任务队列里回调函数执行机制
   </li>
   </ul>
   </details>

2. 为什么有事件循环？

   <details>
   <summary>答案</summary>
   <ul>
   <li>JavaScript 是单线程的，为了不阻塞 JS 引擎，设计执行代码的模型
   </li>
   </ul>
   </details>

3. JavaScript 内代码如何执行？

   <details>
   <summary>答案</summary>
   <ul>
   <li> 执行同步代码，遇到异步代码交给宿主浏览器环境执行
    异步有了结果后，把回调函数放入任务队列排队
    当调用栈空闲后，反复调用任务队列里的回调函数
   </li>
   </ul>
   </details>



## 08.事件循环-练习

### 目标

* 了解事件循环的执行模型



### 讲解

1. 使用模型，分析代码执行过程

   ![image-20230222183656761](https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/hm8.1ajax/image-20230222183656761.png)



### 小结

暂无



## 09.宏任务与微任务

### 目标

* 掌握微任务和宏任务的概念和区分



### 讲解

1. ES6 之后引入了 Promise 对象， 让 JS 引擎也可以发起异步任务

2. 异步任务划分为了

   * 宏任务：由浏览器环境执行的异步代码
   * 微任务：由 JS 引擎环境执行的异步代码

3. 微任务和宏任务划分：

   ![image-20230222184920343](https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/hm8.1ajax/image-20230222184920343.png)

4. 事件循环模型

   ![image-20230222184949605](https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/hm8.1ajax/image-20230222184949605.png)



### 小结

1. 什么是宏任务？

   <details>
   <summary>答案</summary>
   <ul>
   <li>浏览器执行的异步代码
    例如：JS 执行脚本事件，setTimeout/setInterval，AJAX请求完成事件，用户交互事件等
   </li>
   </ul>
   </details>

2. 什么是微任务？

   <details>
   <summary>答案</summary>
   <ul>
   <li>JS 引擎执行的异步代码
    例如：Promise对象.then()的回调
   </li>
   </ul>
   </details>

3. JavaScript 内代码如何执行？

   <details>
   <summary>答案</summary>
   <ul>
   <li>  执行第一个 script 脚本事件宏任务，里面同步代码
    遇到 宏任务/微任务 交给宿主环境，有结果回调函数进入对应队列
    当执行栈空闲时，清空微任务队列，再执行下一个宏任务，从1再来
   </li>
   </ul>
   </details>

![image-20230222185205193](https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/hm8.1ajax/image-20230222185205193.png)



## 10.事件循环 - 经典面试题

### 目标

* 锻炼事件循环模型的使用



### 讲解

1. 请切换到对应配套代码，查看具体代码，并回答打印顺序

   ![image-20230222185939276](https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/hm8.1ajax/image-20230222185939276.png)



### 小结

暂无



## 11.Promise.all 静态方法

### 目标

* 了解 Promise.all 作用和使用场景



### 讲解

1. 概念：合并多个 Promise 对象，等待所有同时成功完成（或某一个失败），做后续逻辑

   ![image-20230222190117045](https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/hm8.1ajax/image-20230222190117045.png)

2. 语法：

   ![image-20230222190153424](https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/hm8.1ajax/image-20230222190153424.png)



3. 需求：同时请求“北京”，“上海”，“广州”，“深圳”的天气并在网页尽可能同时显示

   ![image-20230222190230351](https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/hm8.1ajax/image-20230222190230351.png)



### 小结

1. Promise.all 什么时候使用？

   <details>
   <summary>答案</summary>
   <ul>
   <li>合并多个 Promise 对象并等待所有同时成功的结果，如果有一个报错就会最终为失败状态，当需要同时渲染多个接口数据同时到网页上时使用
   </li>
   </ul>
   </details>



## 12.案例-商品分类

### 目标

* 完成商品分类效果



### 讲解

1. 需求：尽可能同时展示所有商品分类到页面上

   ![image-20230222191151264](https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/hm8.1ajax/image-20230222191151264.png)

2. 步骤：

   1.获取所有的一级分类数据

   2.遍历id，创建获取二级分类请求

   3.合并所有二级分类Promise对象

   4.等待同时成功，开始渲染页面





### 小结

暂无



## 13.案例-学习反馈-省市区切换

### 目标

* 完成省市区切换效果



### 讲解

1. 需求：完成省市区切换效果

   ![image-20230222191239971](https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/hm8.1ajax/image-20230222191239971.png)

2. 步骤：

   1.设置省份数据到下拉菜单

   2.切换省份，设置城市数据到下拉菜单，并清空地区下拉菜单

   3.切换城市，设置地区数据到下拉菜单





### 小结

暂无



## 14.案例-学习反馈-数据提交

### 目标

* 完成学习反馈数据提交



### 讲解

1. 需求：收集学习反馈数据，提交保存

   ![image-20230222191239971](https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/hm8.1ajax/image-20230222191239971.png)

2. 步骤：

   1.监听提交按钮的点击事件

   2.依靠插件收集表单数据

   3.基于 axios 提交保存，显示结果





### 小结

暂无



## 今日重点(必须会)

1. 掌握 async 和 await 的使用

2. 理解 EventLoop 和宏任务微任务执行顺序

3. 了解 Promise.all 的作用和使用场景

4. 完成案例-学习反馈

   

## 今日作业(必完成)

参考作业文件夹里md文档的要求



## 参考文献

1. [async和await的mdn讲解](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function#%E5%B0%9D%E8%AF%95%E4%B8%80%E4%B8%8B)