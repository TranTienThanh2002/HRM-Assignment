import { request } from "../../core/http.js";

export const employeeAPI = {
  getAll() {
    return request("/employees");
  },
  create(data) {
    return request("/employees", {
      method: "POST",
      body: JSON.stringify(data)
    });
  }
};