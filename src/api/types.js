import $axios from './index'
// 获取所有游戏类型
// export function gettypeType(limit, page) {
//     const url = `/gettypeType?limit=${limit}&page=${page}`
//     return $axios.get(url)
// }

// 资讯类型查看
export function typeList() {
    const url = `/type/findAll`

    return $axios.get(url)
}


// 根据id查询类型接口
export function typeFind(id) {
    const url = `/type/findById?id=${id}`

    return $axios.get(url
    )
}
// 类型添加接口
export function typeAdd(typeData) {
    const url = '/type/add'
    let data = {
        text: typeData.text,
       
        
    }
    return $axios.post(url, data
    )
}


// 类型编辑接口
export function typeEdit(typeDataEdit) {
    const url = `/type/edit`
    const data = {
        id: typeDataEdit.id,
        text: typeDataEdit.text,
       
    }
    return $axios.post(url, data)
}

// 类型删除
export function typeDel(id) {
    const url = `/type/del`
    const data = {
        id: id
    }
    return $axios.post(url, data
    )
}


