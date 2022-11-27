
import { api } from "../constant/api";

export const bookingService = {
  getBookingByUserId: (data) => {
    return api.get(`/api/dat-phong/lay-theo-nguoi-dung/${data}`);
  },
  getBookingList: () => {
    return api.get('/api/dat-phong');
  },
  getBookingById: (data) => {
    return api.get(`/api/dat-phong/${data}`);
  },
 
  postBooking: (data) => {
    return api.post('/api/dat-phong',data);
  },
  putBooking: (data) => {
    return api.put(`/api/dat-phong/${data.id}`,data.data);
  },
 
  deleteBooking: (data) => {
    return api.delete(`/api/dat-phong/${data}`);
  },
 

 
};
