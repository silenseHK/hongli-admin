let w_canClick = true
const canClickFn = (cb,time=2000) => {
  if(w_canClick){
    w_canClick = false
    setTimeout(() =>{
        w_canClick = true
    },time)
    cb()
  }
}

export {
  canClickFn
}