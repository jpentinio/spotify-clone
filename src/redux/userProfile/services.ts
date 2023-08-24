import axios from "axios";

class Services {
  static async getUserProfile(access_token: string) {
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
      throw new Error(error.message);
    }
  }
}

export default Services;
