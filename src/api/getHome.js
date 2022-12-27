import axios from "./axiosConfig";

function homePage(id) {
    return axios.get(`/api/home?page=${id}`)
}
const getSearch =(id)=>{
    return axios.get(`/api/search?keyword={${id}}`)
}
const getSong =(id)=>{
    return axios.get(`/api/song?id=${id}`)
}
const getTop100 =()=>{
    return axios.get(`/api/top100`)
}
const getChart =()=>{
    return axios.get(`/api/charthome`)
}

export default {
    homePage,
    getSearch,
    getSong,
    getTop100,
    getTop100,
    getChart
}