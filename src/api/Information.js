import $axios from "./index"

// 资讯的分类
export function Informationtype() {
  const url = `/type/findAll`
  return $axios.get(url)
}

// 资讯列表查看
export function Informationlist(limit, page) {
  const url = `/news/findAll?limit=${limit}&page=${page}`
  return $axios.get(url)
}
// id查找
export function InformatioFind(id) {
  const url = `/news/findById?id=${id}`

  return $axios.get(url)
}

// 资讯添加
export function InformatioAdd(datalist) {
  const url = "/news/add"
  let data = {
    title: datalist.title,
    brief_title: datalist.brief_title,
    image: datalist.image,
    keyword: datalist.keyword,
    abstract: datalist.abstract,
    content: datalist.content,
    create_time: datalist.create_time,
    channel_id: datalist.channel_id,
  }
  return $axios.post(url, data)
}

// 编辑新闻资讯
export function InformatioEdit(datalist) {
  const url = "/news/edit"
  let data = {
    id: datalist.id,
    title: datalist.title,
    brief_title: datalist.brief_title,
    image: datalist.image,
    keyword: datalist.keyword,
    abstract: datalist.abstract,
    content: datalist.content,
    create_time: datalist.create_time,
    channel_id: datalist.channel_id,
  }
  return $axios.post(url, data)
}

// 新闻资讯删除
export function InformatioDel(id) {
  const url = "/news/del"
  let data = {
    id: id,
  }
  return $axios.post(url, data)
}

/**
 * 获取栏目ID
 */

export function chanNelList() {
  const url = "/channel/list"
  return $axios.get(url)
}

/**
 * 生成列表
 */

export function newsGene() {
  const url = "news/generate"
  return $axios.get(url)
}
export function newsDeleteAll(datas) {
  let data = {
    ids: datas,
  }
  const url = "news/batch"
  return $axios.post(url, data)
}
