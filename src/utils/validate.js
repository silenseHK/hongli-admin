export function isAbsolutePath(path) {
  return /^(https?|tel|mailto)/.test(path)
}

export const objDele = (conditions) => {
  for (const key in conditions) {
    if (conditions[key] === "") {
      delete conditions[key]
    }
  }
  return conditions
}
/**
 ** 加法函数，用来得到精确的加法结果
 ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 ** 调用：accAdd(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
function accAdd(arg1, arg2) {
  var r1, r2, m, c
  try {
    r1 = arg1.toString().split(".")[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split(".")[1].length
  } catch (e) {
    r2 = 0
  }
  c = Math.abs(r1 - r2)
  m = Math.pow(10, Math.max(r1, r2))
  if (c > 0) {
    var cm = Math.pow(10, c)
    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace(".", ""))
      arg2 = Number(arg2.toString().replace(".", "")) * cm
    } else {
      arg1 = Number(arg1.toString().replace(".", "")) * cm
      arg2 = Number(arg2.toString().replace(".", ""))
    }
  } else {
    arg1 = Number(arg1.toString().replace(".", ""))
    arg2 = Number(arg2.toString().replace(".", ""))
  }
  return (arg1 + arg2) / m
}
/**
 ** 减法函数，用来得到精确的减法结果
 ** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
 ** 调用：accSub(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
function accSub(arg1, arg2) {
  var r1, r2, m, n
  try {
    r1 = arg1.toString().split(".")[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split(".")[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2)) //last modify by deeka //动态控制精度长度
  n = r1 >= r2 ? r1 : r2
  return ((arg1 * m - arg2 * m) / m).toFixed(n)
}

export const winorLose = (item) => {
  if (item !== "undefined" || item !== null || item !== {}) {
    const datas = []
    item.map((item,index) => {
      const { total_recharge, balance, cl_withdrawal } = item
      datas.push(
        Object.assign(item, {
          numLose:
            Number(total_recharge) > accAdd(cl_withdrawal, balance)
              ? '-' + accSub(total_recharge, accAdd(balance, cl_withdrawal))
              : '+' + accSub(accAdd(balance, cl_withdrawal), total_recharge),
        })
      )
    })

    return datas
  } else {
    return 0
  }
}
