import  api  from "./api";



export const notificationService = {


async createNotification( data: {
    message: string;
    targetRoles: string[];
  }){

    const res = await  api.post("/notification", {
      type: "ADMIN_NOTIFICATION",
      ...data
    });

    return res.data;

  },
  
  async getNotifications(filters: {
    userId: string;
    page?: number;
    limit?: number;
  }) {

    const res = await api.get("/notification", { params: filters })

    return res.data;

  },

  

  async getNotification(id:string) {

    const res = await  api.get(`/notification/${id}`);

    return res.data;

  },
 
   async getUnreadCount(userId:string) {

    const res = await   api.get("/notification/unread", {
      params: { userId }
    });

    return res.data;

  },

 
  async markAsRead(id: string, userId: string){

    const res = await api.patch(`/notification/${id}/read`, { userId });

    return res.data;

  },

 
  async markAllAsRead( userId: string){

    const res = await api.patch(`/notification/all/read`, { userId });
console.log("res data",res.data);

    return res.data;

  },

  // MARK ALL READ
 
};