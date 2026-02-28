import { request } from "../../core/http.js";

export const leaveAPI = {
  getAll() {
    return request("/leave");
  },

  create(data) {
    return request("/leave", {
      method: "POST",
      body: JSON.stringify(data)
    });
  },

  approve(id) {
    return request(`/leave/${id}/approve`, {
      method: "PATCH"
    });
  },
  reject(id) {
    return request(`/leave/${id}/reject`, {
      method: "PATCH"
    });
  }
};