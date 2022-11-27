import { api } from "../constant/api"


export const locationService = {
    getLocation: ()=> {
        return api.get('/api/vi-tri')
    },
    getLocationById: (data)=> {
        return api.get(`/api/vi-tri/${data}`)
    },
    searchLocation: (data)=> {
        return api.get(`/api/vi-tri/phan-trang-tim-kiem?pageIndex=1&pageSize=100&keyword=${data}`)
    },
    deleteLocation: (data)=> {
        return api.delete(`/api/vi-tri/${data}`)
    },

    putLocation: (data)=> {
        return api.put(`/api/vi-tri/${data.id}/`,data.data)
    },
    postLocation: (data)=> {
        return api.post(`/api/vi-tri`,data)
    },

}