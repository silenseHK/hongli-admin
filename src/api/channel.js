import $axios from "./index"

export const statistics = (params) => {
    const url = "/channel/statistics"
    return $axios.post(url, params)
}