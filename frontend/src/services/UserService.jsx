import api from "../api/axios";

class UserService {
  static async login(email, password) {
    try {
      const response = await api.post(`/auth/login`, { email, password });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async register(userData, token) {
    try {
      const response = await api.post(`/auth/register`, userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getAllUsers(token) {
    try {
      const response = await api.get(`/superadmin/get-all-users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getYourProfile(token) {
    try {
      const response = await api.get(`/superadmin/get-profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getUserById(userId, token) {
    try {
      const response = await api.get(`/superadmin/get-users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async deleteUser(userId, token) {
    try {
      const response = await api.delete(`/superadmin/delete/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async updateUser(userId, userData, token) {
    try {
      const response = await api.put(`/superadmin/update/${userId}`, userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  /**AUTHENTICATION CHECKER */
  static logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  static isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
  }

  static isAdmin() {
    const role = localStorage.getItem("role");
    return role === "ADMIN";
  }

  static isSuperAdmin() {
    const role = localStorage.getItem("role");
    return role === "SUPERADMIN";
  }

  static SuperAdminOnly() {
    return this.isAuthenticated() && this.isSuperAdmin();
  }
}

export default UserService;
