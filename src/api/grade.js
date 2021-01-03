import $axios from './index'
// 所有用户等级
export function getGradeList() {
  const url = '/grade/findAll'
  return $axios.get(url)
}

export function gradeEdit(getGrade) {
  const url = '/grade/edit'
  let data = {
    id: getGrade.id,
      balance: getGrade.balance,
      grade: getGrade.grade,
      grade_img:getGrade.grade_img
  }
  return $axios.post(url,data)
}
