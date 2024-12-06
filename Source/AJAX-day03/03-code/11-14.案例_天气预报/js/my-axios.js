function myAxios(config) {
  return new Promise((resolve, reject) => {
    if (config.params) {
      const obj = new URLSearchParams(config.params)
      config.url += `?${obj.toString()}`
    }
    const xhr = new XMLHttpRequest()
    xhr.open(config.method || 'GET', config.url)
    xhr.addEventListener('loadend', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.response))
      } else {
        reject(new Error(xhr.response))
      }
    })
    if (config.data) {
      // 1. 设置请求头: Content-Type: application/json
      xhr.setRequestHeader('Content-Type', 'application/json')
      // 2. 请求体携带: JSON 字符串
      xhr.send(JSON.stringify(config.data))
    } else {
      xhr.send()
    }
  })
}