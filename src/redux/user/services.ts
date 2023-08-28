import axios from "axios";

class Services {
  static async getCurrentUserProfile(access_token: string) {
    try {
      let response = await axios.get(`https://api.spotify.com/v1/me`, {
        headers: {
          Authorization: `Bearer ${
            access_token || localStorage.getItem("access_token")
          }`,
        },
      });

      return response;
    } catch (error: any) {
      throw error.response;
    }
  }

  static async getUser(id: string) {
    try {
      let response = await axios.get(`https://api.spotify.com/v1/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      return response;
    } catch (error: any) {
      throw error.response;
    }
  }
}

export default Services;
