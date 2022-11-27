import { api } from "../constant/api"



export const roomService = {
    getRoomLocation : (data)=> {
        return api.get(`/api/phong-thue/lay-phong-theo-vi-tri?maViTri=${data}`)
    },
    getRoomById : (data)=> {
        return api.get(`/api/phong-thue/${data}`)
    },
    getRoomList : ()=> {
        return api.get(`/api/phong-thue`)
    },
    searchRoom : (data)=> {
        return api.get(`/api/phong-thue/phan-trang-tim-kiem?pageIndex=1&pageSize=100&keyword=${data}`)
    },
    putRoom : (data)=> {
        return api.put(`/api/phong-thue/${data.id}`,data.data)
    },
    deleteRoom : (data)=> {
        return api.delete(`/api/phong-thue/${data}`)
    },
    postRoom : (data)=> {
        return api.post(`/api/phong-thue/`,data)
    },
}