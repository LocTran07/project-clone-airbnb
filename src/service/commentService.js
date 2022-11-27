import { api } from "../constant/api"



export const commentService = {
    getCommentList : ()=> {
        return api.get('/api/binh-luan')
    },
    postComment : (data)=> {
        return api.post('/api/binh-luan',data)
    },
  
}