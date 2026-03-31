import api from "./api";

export const authService = {

  async login(email: string, password: string) {

    const res = await api.post("/login", {
      email,
      password
    });
   
    return res.data;

  },

  async signup(email: string, password: string) {

    const res = await api.post("/signup", {
      email,
      password
    });

    return res.data;

  }

};