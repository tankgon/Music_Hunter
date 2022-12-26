import axios from "./axiosConfig";

function getMVVN() {
    return axios.get('/api/listmv?id=IWZ9Z08I&page=max&count=500')
}
function getMVUSUK() {
    return axios.get('/api/listmv?id=IWZ9Z08O&page=max&count=500')
}
function getKpop() {
    return axios.get('/api/listmv?id=IWZ9Z08W&page=max&count=500')
}
function getHoaTau() {
    return axios.get('/api/listmv?id=IWZ9Z086&page=max&count=500')
}
function getDetailMV(id) {
    return axios.get(`/api/video?id=${id}`)
}

export default {
    getMVVN,
    getMVUSUK,
    getKpop,
    getHoaTau,
    getDetailMV,
}