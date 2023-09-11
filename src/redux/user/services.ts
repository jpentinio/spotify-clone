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
      throw error.response.data.error;
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
      throw error.response.data.error;
    }
  }

  static async getUserTopTracks() {
    try {
      let response = await axios.get(
        `https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=short_term`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      return response;
    } catch (error: any) {
      throw error.response.data.error;
    }
  }

  static async getUserTopArtists() {
    try {
      let response = await axios.get(
        `https://api.spotify.com/v1/me/top/artists?limit=6&time_range=short_term`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      return response;
    } catch (error: any) {
      throw error.response.data.error;
    }
  }
}

export default Services;
