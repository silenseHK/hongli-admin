var formatDate = function(value) {

    if (!value) return ''
    let date = new Date(value * 1000)
    let year = date.getFullYear()  // 获取完整的年份(4位,1970)
    let month = date.getMonth() + 1  // 获取月份(0-11,0代表1月,用的时候记得加上1)
    let day = date.getDate()  // 获取日(1-31)
    let hour = date.getHours()  // 获取小时数(0-23)
    let min = date.getMinutes(); //分
    let sec = date.getSeconds(); //秒  
    return year + '-' + month + '-' + day +' '+ hour+':'+min+':'+sec
  }
  export default formatDate