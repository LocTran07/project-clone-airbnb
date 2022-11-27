import { api } from "../constant/api"


export const userService = {
    getDetailUser : (data)=> {
        return api.get(`/api/users/${data}`)
    },
    editUser : (data)=> {
        return api.put(`/api/users/${data.id}`,data.data)
    },
    getUserList : ()=> {
        return api.get('/api/users')
    },
    deleteUser : (data)=> {
        return api.delete(`/api/users?id=${data}`)
    },
    postUser : (data)=> {
        return api.post('/api/users',data)
    },
    postAvatar : (data)=> {
        return api.post(`/api/users/upload-avatar`,data)
    },
    searchUser : (data)=> {
        return api.get(`/api/users/search/${data}`)
    },
}